var n = 1;
$(function () {
    // Bach comment visitor
    if ($('form#comment_visitor').length > 0) {
        $('form#comment_visitor').validate({
            errorElement: "p",
            onkeyup: false,
            ignore: [],
            "rules" : {
                "comment"      : {
                    "required"  : true,
                },
                "fullname_visitor"      : {
                    "required"  : true,
                    "maxlength" : 50,
                },
                "email_visitor" : {
                    "required"  : true,
                    "email"     : true,
                },
            },
            "messages" : {
                "comment"      : {
                    "required"  : 'Bạn chưa nhập nội dung bình luận !',
                },
                "fullname_visitor"      : {
                    "required"  : "Bạn chưa nhập họ tên !",
                    "maxlength" : "Bạn chỉ được phép nhập tối đa 50 ký tự",
                },
                "email_visitor"    : {
                    "required"  : "Bạn chưa nhập địa chỉ email !",
                    "email"     : "Email không đúng định dạng",
                },
            },
            errorPlacement: function(error, element) {
                if (element.attr("name") == "comment" ) {
                    error.insertBefore($(".style-textarea"));
                }else{
                    error.insertBefore(element);
                }
            },
            submitHandler: function (form) {
                $(".send").attr("disabled", true);
                var fullname_visitor  = $('#fullname_visitor').val();
                var email_visitor     = $('#email_visitor').val();
                var comment_visitor   = $('#styled').val();
                var resp = $.ajax({
                    type: "POST",
                    url: "/product_detail/comment_visitor",
                    data: {fullname:fullname_visitor,email:email_visitor,comment:comment_visitor,product_id:product_id},
                    success: function (data) {
                        data = JSON.parse(data);
                        if(data.done == 'true'){
                            var hr = '';
                            if(data.number_comment > 1){
                                var hr = '<hr>';
                            }
                            $('#content-comment').prepend(' <div class="commend-detail">\
                                    <p class="name-person">'+data.fullname+'</p> <span class="date"> - lúc '+data.date_create+'</span>\
                                    <p class="idea">'+data.comment+'</p>\
                                    <div onclick="open_reply('+data.id_product+');return false;" class="reply" id="first-click_'+data.id_product+'">\
                                    <i class="fa fa-reply" aria-hidden="true"></i> <span>Trả lời</span>\
                                    </div>\
                                    <div class="sub-reply" id="first-reply_'+data.id_product+'">\
                                        <form class="form_reply" id="frm_reply_'+data.id_product+'" method="" action="">\
                                            <input name="parent_id" value="'+data.id_product+'" class="input-text" type="hidden">\
                                            <input name="product_id" value="'+product_id+'" class="input-text" type="hidden">\
                                            <div class="txtarea-reply">\
                                                <textarea name="comment_reply" class="bg-textarea" placeholder="Nhập nội dung trả lời ..."></textarea>\
                                            </div>\
                                            <div class="input col-sm-12">\
                                                <div class="col-sm-6">\
                                                    <input name="fullname" class="input-text" type="text" placeholder="Nhập họ tên bạn (bắt buộc)">\
                                                </div>\
                                                <div class="col-sm-6">\
                                                    <input name="email" class="input-text" type="email" placeholder="Email">\
                                                </div>\
                                            </div>\
                                            <a href="#" class="third-cancel">Bỏ qua</a>\
                                            <input class="btn-reply" type="submit" value="Trả lời">\
                                        </form>\
                                    </div>\
                                    <div class="phoney_reply"></div>\
                                </div><hr>').fadeIn();
                            $('#fullname_visitor').val('');
                            $('#email_visitor').val('');
                            $('#styled').val('');
                            validate_frm_reply('#frm_reply_'+data.id_product);
                            $(".send").attr("disabled", false);
                        }
                    }
                },'json');
                if( resp.state() === 'resolved' ) {
                    return false;
                }
                return false;
            }
        });
    }
});
//pagination load more ajax
var is_busy = false;
var page = 1;
var record_per_page = 2;
var stopped = false;
$(document).ready(function()
{
    $('#load_more').click(function()
    {
        number_row = $('#content-comment .commend-detail').length;
        id_load_more = $('#id_load_more').val();
        $element = $('#content-comment');
        $button = $(this);
        if (is_busy == true) {
            return false;
        }
        page++;
        $button.html('LOADDING ...');
        $.ajax(
            {
                type: 'post',
                dataType: 'json',
                url: '/ajax-load-more-wap',
                data: {page: page,id:id_load_more,comment:'comment',number_row : number_row},
                success: function(result)
                {
                    var html = '';
                    if (result.length <= record_per_page)

                    {
                        //console.log(result);return false;
                        $.each(result, function (key, obj){
                            var content_comment = JSON.parse(obj.comment);
                            html += '<div class="commend-detail">\
                                        <p class="name-person">'+obj.fullname+'</p> <span class="date"> - lúc '+obj.date_created+'</span>\
                                        <p class="idea">'+content_comment.comment+'</p>\
                                        <div onclick="open_reply('+obj.id+');return false;" class="reply" id="first-click_'+obj.id+'">\
                                            <i class="fa fa-reply" aria-hidden="true"></i> <span>Trả lời</span>\
                                        </div>\
                                        <div class="sub-reply"  id="first-reply_'+obj.id+'">\
                                            <form class="form_reply" id="frm_reply_'+obj.id+'">\
                                                <input name="parent_id" value="'+obj.id+'" class="input-text" type="hidden">\
                                                <input name="product_id" value="'+obj.product_id+'" class="input-text" type="hidden">\
                                                <div class="txtarea-reply">\
                                                    <textarea name="comment_reply" class="bg-textarea" placeholder="Nhập nội dung trả lời ..."></textarea>\
                                                </div>\
                                                <div class="input col-sm-12">\
                                                    <div class="col-sm-6">\
                                                        <input name="fullname" class="input-text" type="text" placeholder="Nhập họ tên bạn (bắt buộc)">\
                                                    </div>\
                                                    <div class="col-sm-6">\
                                                        <input name="email" class="input-text" type="email" placeholder="Email">\
                                                    </div>\
                                                </div>\
                                                <a href="#" class="first-cancel">Bỏ qua</a>\
                                                <input class="btn-reply" type="submit" value="Trả lời">\
                                            </form>\
                                        </div>\
                                        <div class="phoney_reply"></div>';
                            if(obj.reply_comment.length > 2 ){
                                html+= '<div class="reply_load_more">';
                                $.each(obj.reply_comment, function (key_r, obj_r){
                                    if (key_r < obj.reply_comment.length - 1){
                                        var content_reply = JSON.parse(obj_r.comment);
                                        html+= '<div class="subreply-person first-reply">\
                                                        <p class="name-person reply-person ">'+obj_r.fullname+'</p>\
                                                        <span class="date"> - lúc '+obj_r.date_created+'</span>\
                                                        <p>'+content_reply.comment+'</p>\
                                                    </div>';
                                    }
                                });
                                html+= '</div>';
                                html+= '<div>\
                                            <input type="hidden" value="'+obj.id+'" class="parent_id">\
                                            <input type="hidden" value="false" class="is_busy_r">\
                                            <input type="hidden" value="false" class="stopped_r">\
                                            <input type="hidden" value="2" class="record_per_page_r">\
                                            <input type="hidden" value="1" class="page_r">\
                                            <a href="javascript:void(0)" class="view-more view-more-reply">Xem thêm</a>\
                                        </div>';
                            }else{
                                html+= '<div>';
                                $.each(obj.reply_comment, function (key_r, obj_r){
                                    var content_reply = JSON.parse(obj_r.comment);
                                    html+= '<div class="subreply-person first-reply">\
                                                        <p class="name-person reply-person ">'+obj_r.fullname+'</p>\
                                                        <span class="date"> - lúc '+obj_r.date_created+'</span>\
                                                        <p>'+content_reply.comment+'</p>\
                                                    </div>';
                                });
                                html+= '</div>';
                            }
                            html +='</div>\
                                    <hr>';

                        });
                        $element.append(html);
                        $.each(result, function (key, obj){
                            validate_frm_reply('#frm_reply_'+obj.id);
                        });
                        $button.remove();

                    }

                    else{
                        //console.log(result);return false;
                        $.each(result, function (key, obj){
                                if (key < result.length - 1){
                                    var content_comment = JSON.parse(obj.comment);
                                    html += '<div class="commend-detail">\
                                        <p class="name-person">'+obj.fullname+'</p> <span class="date"> - lúc '+obj.date_created+'</span>\
                                        <p class="idea">'+content_comment.comment+'</p>\
                                        <div onclick="open_reply('+obj.id+');return false;" class="reply" id="first-click_'+obj.id+'">\
                                            <i class="fa fa-reply" aria-hidden="true"></i> <span>Trả lời</span>\
                                        </div>\
                                        <div class="sub-reply"  id="first-reply_'+obj.id+'">\
                                            <form class="form_reply" id="frm_reply_'+obj.id+'">\
                                                <input name="parent_id" value="'+obj.id+'" class="input-text" type="hidden">\
                                                <input name="product_id" value="'+obj.product_id+'" class="input-text" type="hidden">\
                                                <div class="txtarea-reply">\
                                                    <textarea name="comment_reply" class="bg-textarea" placeholder="Nhập nội dung trả lời ..."></textarea>\
                                                </div>\
                                                <div class="input col-sm-12">\
                                                    <div class="col-sm-6">\
                                                        <input name="fullname" class="input-text" type="text" placeholder="Nhập họ tên bạn (bắt buộc)">\
                                                    </div>\
                                                    <div class="col-sm-6">\
                                                        <input name="email" class="input-text" type="email" placeholder="Email">\
                                                    </div>\
                                                </div>\
                                                <a href="#" class="first-cancel">Bỏ qua</a>\
                                                <input class="btn-reply" type="submit" value="Trả lời">\
                                            </form>\
                                        </div>\
                                        <div class="phoney_reply"></div>';
                                    if(obj.reply_comment.length > 2 ){
                                        html += '<div class="reply_load_more">';
                                        $.each(obj.reply_comment, function (key_r, obj_r){
                                            if (key_r < obj.reply_comment.length - 1){
                                                var content_reply = JSON.parse(obj_r.comment);
                                                html+= '<div class="subreply-person first-reply">\
                                                        <p class="name-person reply-person ">'+obj_r.fullname+'</p>\
                                                        <span class="date"> - lúc '+obj_r.date_created+'</span>\
                                                        <p>'+content_reply.comment+'</p>\
                                                    </div>';
                                            }
                                        });
                                        html += '</div>'
                                        html+= '<div>\
                                                    <input type="hidden" value="'+obj.id+'" class="parent_id">\
                                                    <input type="hidden" value="false" class="is_busy_r">\
                                                    <input type="hidden" value="false" class="stopped_r">\
                                                    <input type="hidden" value="2" class="record_per_page_r">\
                                                    <input type="hidden" value="1" class="page_r">\
                                                    <a href="javascript:void(0)" class="view-more view-more-reply">Xem thêm</a>\
                                                </div>';
                                    }else{
                                        html += '<div>';
                                        $.each(obj.reply_comment, function (key_r, obj_r){
                                            var content_reply = JSON.parse(obj_r.comment);
                                            html+= '<div class="subreply-person first-reply">\
                                                        <p class="name-person reply-person ">'+obj_r.fullname+'</p>\
                                                        <span class="date"> - lúc '+obj_r.date_created+'</span>\
                                                        <p>'+content_reply.comment+'</p>\
                                                    </div>';
                                        });
                                        html += '</div>';
                                    }
                                    html +='</div>\
                                    <hr>';
                                }
                            }
                        );
                        $element.append(html);
                        $.each(result, function (key, obj){
                            validate_frm_reply('#frm_reply_'+obj.id);
                        });
                    }
                }
            },'json')
            .always(function()
            {
                $button.html('Xem thêm bình luận');
                is_busy = false;
            });
    });
});

function validate_frm_reply(element) {
    $(element).validate({
        errorElement: "p",
        onkeyup: false,
        ignore: '',
        "rules": {
            "comment_reply": {
                "required": true,
            },
            "fullname": {
                "required": true,
                "maxlength": 50,
            },
            "email": {
                "required": true,
                "email": true,
            },
        },
        "messages": {
            "comment_reply": {
                "required": 'Bạn chưa nhập nội dung trả lời !',
            },
            "fullname": {
                "required": "Bạn chưa nhập họ tên !",
                "maxlength": "Bạn chỉ được phép nhập tối đa 50 ký tự",
            },
            "email": {
                "required"  : "Bạn chưa nhập địa chỉ email !",
                "email"     : "Email không đúng định dạng",
            },
        },
        submitHandler: function (form) {
            $(".btn-reply").attr("disabled", true);
            var datastring = $(form).serialize();
             var resp = $.ajax({
                type: "POST",
                url: '/product_detail/reply_comment_visitor',
                data: datastring, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                dataType: 'json',
                success: function (data) {
                    if (data.done == 'true') {
                        $(form)[0].reset();
                        $(form).closest( ".sub-reply" ).hide();
                        $(form).closest( ".sub-reply" ).parent().children('.phoney_reply').after('<div class="subreply-person first-reply">\
                                        <p class="name-person reply-person ">' + data.fullname + '</p> <span class="date"> - lúc ' + data.date_create + '</span>\
                                        <p>' + data.comment + '</p>\
                                        </div>').fadeIn();
                        $(".btn-reply").attr("disabled", false);
                    }
                }
            });
            if( resp.state() === 'resolved' ) {
                return false;
            }
            return false;
        }
    });
}

$('form.form_reply').each(function () {
    validate_frm_reply('#'+$(this).attr('id'));
});

var key_cart = 'spcart';
function Special_char (event) {
    return (event.ctrlKey || event.altKey || (47<event.keyCode && event.keyCode<58 && event.shiftKey==false) || (95<event.keyCode && event.keyCode<106) || (event.keyCode==8) || (event.keyCode==9) || (event.keyCode>34 && event.keyCode<40) || (event.keyCode==46) );
}
function goBack() {
    window.history.back();
}
$(document).on("keydown","input#amout_update",function(event){
    return Special_char(event);
});

function cutString(string,limit) {
    var res = '',old_string = string;
    if (string!="") {
        string = string.split(" ");
        if (string.length > limit) {
            for (var i=0;i<limit;i++) {
                res+= string[i]+" ";
            }
            res = $.trim(res);
            res+='...';
            return res;
        } else {
            return old_string;
        }
    }

}
function isoffProductCart() {
    var shoppingcart = [];
    if (localStorage.getItem(key_cart) != null){
        shoppingcart = JSON.parse(localStorage.getItem(key_cart));
    }
    var result = false;
    $.ajax({
        'url'     : encodeURI('/products/getlistproductorder'),
        'type'    : 'POST',
        'async' : false,
        'data'    : 'order_info=' + JSON.stringify(shoppingcart),
        'success': function (data) {
            var obj  = JSON.parse(data);
            var cart = obj.products;
            for (var j=0;j<shoppingcart.length;j++) {
                for (var i=0;i<cart.length;i++) {
                    if (shoppingcart[j].hasOwnProperty('is_gift') == false) {
                        if ((shoppingcart[j].id == cart[i].product_id) && cart[i].product_count == 0) {
                            result= true;
                            break;
                        }
                        if ((shoppingcart[j].id == cart[i].product_id) && (shoppingcart[j].amount > cart[i].product_count)) {
                            result= true;
                            break;
                        }
                    }
                }
            }
        }
    });
    return result;
}
function init_cart_payment() {
    // get shopping cart from local storage.
    var shoppingcart = [];
    if (localStorage.getItem('spcart') != null){
        shoppingcart = JSON.parse(localStorage.getItem('spcart'));
    }
    // Set shoppingcart to from for submit
    $('#shoppingcart').val(encodeURI(JSON.stringify(shoppingcart)));

    $(document).on('click', '.id_delivery', function(){
        console.log($(this).val());
        $('#id_delivery-error').remove();
        $('#id_delivery').val($(this).val());
        localStorage.id_delivery = $(this).val();
        //reset coupon khi da nhap coupon
        if($('#coupon_code').val() != ''){
            localStorage.deliveryChange = 1;
        }
        getTotalFee_ajax();
    });
    $(document).on('click', '.btn-apply-coupon', function() {
        checkCoupon_ajax();
    });
    $('form#cartpayment').validate({
        ignore: "",
        errorElement: 'p',
        invalidHandler: function(event, validator) {
            // 'this' refers to the form
            var errors = validator.numberOfInvalids();
            if (errors) {
                if(errors == 1){
                    $('html, body').animate({
                        scrollTop: 0
                    }, 400);
                }
            }
        },
        errorPlacement: function(error, element) {
            if (element.attr("name") == "id_delivery" ) {
                $(".address-form .td_id_delivery").find('.error').remove();
                $(".address-form .td_id_delivery").append(error);
            }
            else if (element.attr("name") == "id_payment" ) {
                $("#td_id_payment").find('.error').remove();
                $("#td_id_payment").append(error);
            }
            else {
                error.append($('.errorTxt span'));
            }
        },
        success: function(label,element) {
            label.parent().removeClass('error');
            label.remove();
        },
        rules: {
            id_delivery: {
                required: true,
            },
            id_payment: {
                required: true
            }
        },
        messages: {
            id_delivery: {
                required: $('.td_id_delivery').attr('data-title'),
            },
            id_payment: {
                required: 'Vui lòng nhập số điện thoại',
            },
            vat_name: {
                required: 'Vui lòng nhập Tên công ty',
            },
            vat_code: {
                required: 'Vui lòng nhập Mã số thuế',
            },
            vat_address: {
                required: 'Vui lòng nhập Địa chỉ công ty',
            },
        },
        submitHandler: function(form) {
            if(isoffProductCart() == true) {
                window.location.href = '/mcart';
            } else {
                if (form.attr('data-is-submit') == 'no') {
                    $('.scrollup').trigger('click');
                    return false;
                }
                localStorage.removeItem('delivery_default');
                form.submit();
            }
            return false;
        }
    });

    $('#is_vat').on('click', function() {
        var action = $(this).is(':checked') ? "add" : "remove";
        $('#VAT-info .error').remove();
        $('#value_vat').val($(this).is(':checked') ? 1 : 0);

        $('input[name="vat_name"]').rules(action, "required");
        $('input[name="vat_code"]').rules(action, "required");
        $('input[name="vat_address"]').rules(action, "required");
    });

    $('.input_vat').on('change', function() {
        $($(this).attr('data-target')).val($(this).val()).valid();
    });
}
function create_html_delivery(d, cities, name, value){
    html = '' +
        '<div class="item-address ia_'+d.id+'">' +
            '<div class="edit-address" data-id="'+d.id+'">' +
                '<i class="fa fa-pencil-square-o" aria-hidden="true"></i><span> Sửa địa chỉ</span>' +
            '</div>' +
            '<input type="radio" name="defaut" class="id_delivery" value="'+d.id+'">' +
            '<label>'+d.name+'</label>' +
            '<p class="ad">'+d.street+', '+d.ward_type+' '+d.ward_name+', '+d.district_type+' '+
                d.district_name+', '+d.city_name+
            '</p>' +
            '<p class="ad">Đt: '+d.phone+'</p>' +
            '<!-- form edit address -->' +
            '<form id="edit-form">' +
                '<div class="form-group ">' +
                    '<label>Họ tên người nhận hàng</label>' +
                    '<div class="row">' +
                        '<select class="form-control gender" name="gender" id="gender">' +
                            '<option value="0" '+(0 == d.gender ? 'selected' : '')+'>Nam</option>' +
                            '<option value="1" '+(1 == d.gender ? 'selected' : '')+'>Nữ</option>' +
                        '</select>' +
                        '<input class="name" name="name" type="text" placeholder="VD: Nguyễn Văn A" value="'+d.name+'">' +
                    '</div>' +
                '</div>' +
                '<div class="form-group row col-sm-12">' +
                    '<div class="input-phone col-sm-6">' +
                        '<label>Điện thoại</label>' +
                        '<input type="text" placeholder="Vd: 0123.456.7899" name="phone" value="'+d.phone+'">' +
                    '</div>' +
                    '<div class="input-email col-sm-6">' +
                       '<label>Email <span>(để gửi thông tin đơn hàng)</span></label>' +
                        '<input type="email" placeholder="Vd: nguyenvanan@gmail.com" name="email" value="'+d.email+'">' +
                    '</div>' +
                '</div>' +
                '<div class="form-group row city">' +
                    '<label>Địa chỉ</label>' +
                    '<select class="form-control city_id" name="city" id="city_'+d.id+'" data-group="'+d.id+'">' +
                        '<option value="">Chọn Tỉnh/Thành Phố</option>';
                        $.each(cities, function(key,value){
                            if(value.city_id == d.id_city){
                                html += '<option value="'+value.city_id+'" selected>'+value.city_name+'</option>';
                            }else{
                                html += '<option value="'+value.city_id+'">'+value.city_name+'</option>';
                            }
                        });
            html += '</select>'+
                '</div>' +
                '<div class="form-group row">' +
                    '<div class="district">' +
                    '<select id="district_'+d.id+'" name="district" class="form-control district_id" data-value="'+d.id_district+'" data-group="'+d.id+'">' +
                        '<option value="">Chọn Quận/Huyện</option>' +
                    '</select>' +
                '</div>' +
                '<div class="village">' +
                    '<select class="form-control" id="ward_'+d.id+'" name="wards" data-value="'+d.id_ward+'" data-group="'+d.id+'">' +
                        '<option value="">Chọn Phường/Xã</option>' +
                    '</select>' +
                '</div>' +
            '</div>' +
            '<div class="form-group row choose-street">' +
                '<input type="text" class="street" value="'+d.street+'" name="street" placeholder="Đường/ Phố, số nhà, ngõ ngách, hẻm...">' +
            '</div>' +
            '<input type="hidden" name="deliveryId" value="'+d.id+'">'+
            '<button class="continue" type="submit" value="continue">Cập nhật</button>' +
            '<span class="cancel-continue"><a href="javascript:void(0)" data-id="'+d.id+'">Hủy bỏ</a></span>' +
        '</form>' +
        '<!-- end -->' +
    '</div>';

    return html;
}
function output_html_delivery() {
    $(document).ready(function(){
        if(jQuery.isEmptyObject(data_js.delivery)){

            $('#click-add').click();

        }else{
            var value, i;
            for(i=0; i<data_js.delivery.length; i++) {
                value = data_js.delivery[i];
                html = create_html_delivery(value, data_js.cities, data_js.name, data_js.value);
                $('.wrap-form-yes a#click-add').before(html);

                init_form_address('.ia_'+value.id+' #edit-form');
            }
        }

        if(localStorage.delivery_default){
            $('input.id_delivery').each(function(){
                if($(this).val() == localStorage.delivery_default){
                    $(this).trigger('click');
                    listen = 1;
                    return false;
                }else{
                    listen = 0;
                }
            });
            if(listen == 0){
                $('.id_delivery').first().trigger('click');
            }
        }else{
            $('.id_delivery').first().trigger('click');
        }

        $('.form-address .address-form').hide();
    })
}

$(document).on('click','input.id_delivery',function(){
    localStorage.setItem('delivery_default',$(this).val());
});

$(document).on('click', ".edit-address", function(){
    $(this).hide();
    var id = $(this).attr('data-id');
    $('.ia_'+id+' #edit-form').slideDown("slow");
    console.log(id);
    $('#city_'+id).trigger('change');
});

$(document).on('click', '.cancel-continue a', function(){
    var id = $(this).attr('data-id');
    $('.ia_'+id+' #edit-form').slideUp("fast");
    $('.ia_'+id+' .edit-address').show();
});
function checkCoupon_ajax(){
    $('div.loading').show();

    var coupon_code = $('#coupon_code').val();
    if(coupon_code.length == 0){
        coupon_code = ' ';
        localStorage.couponCodeNone = 1;
    }
    if(coupon_code.length > 0) {

        $('#btn_checkCoupon').prop("disabled",true);

        var shoppingcart = [];
        if (localStorage.getItem('spcart') != null){
            shoppingcart = JSON.parse(localStorage.getItem('spcart'));
        }

        console.log(shoppingcart);
        //phone = $('#lidelivery_'+$('#id_delivery').val()+' .input-phone input').val();

        phone = $('.ia_'+$('#id_delivery').val()+' .input-phone input').val();

        if(!phone){
            $('#coupon_msg').html('Bạn phải đăng nhập để sử dụng mã coupon').show();
            return false;
        }

        console.log(phone);

        $.post("/cart/checkCoupon_ajax", {
            coupon_code     : encodeURI(JSON.stringify(coupon_code)),
            shoppingcart    : encodeURI(JSON.stringify(shoppingcart)),
            phone           : phone
        }, function(data){

            console.log(data);

            var isfree = '';

            if (package1==1) {

                var total_dis = $('input[name=valuedis]').val();
                isfree = IsFreeShipping(total_dis);

            }

            if(data.coupon_type == 'fee'){

                $('#coupon_discount').html('-'+ number_format(data.coupon_discount,0,'.','.') + '<sup>đ</sup>');
                $('#total_fee').html('Miễn phí');
                $('#coupon_code_hidden').attr('data-type','free-fee');
                var tmp_total = parseInt(data.tmp_total);

                saveTotalTmpToSess(tmp_total);
                tmp_total = parseInt(tmp_total) - parseInt(resultDiscoutXu());

            }else{

                $('#coupon_code_hidden').attr('data-type','');
                $('#coupon_discount').html('-'+ number_format(data.coupon_discount,0,'.','.') + '<sup>đ</sup>');
                var tmp_total = parseInt(data.tmp_total) - parseInt(data.coupon_discount);

                saveTotalTmpToSess(tmp_total);
                tmp_total = parseInt(tmp_total) - parseInt(resultDiscoutXu());

                if(isfree == 'true'){
                    $('#total_fee').html('Miễn phí');
                }else{
                    if((data.checkCity == 0 && tmp_total < 300000) || (data.checkCity == 1 && tmp_total < 150000)){
                        tmp_total += data.transport_fee;
                        $('#total_fee').html('+'+number_format(data.transport_fee,0,'.','.') + '<sup>đ</sup>');
                    }else{
                        $('#total_fee').html('Miễn phí');
                    }
                }

            }

            $('#tmp_total').html(number_format(tmp_total,0,'.','.') + 'đ');

            $('#coupon_msg').html(data.msg).show();
            $('#coupon_code_hidden').val(data.coupon_code);
            $('#coupon_discount').attr('data-value',data.coupon_discount);

            if(localStorage.deliveryChange || localStorage.couponCodeNone){
                $('#coupon_code').val('');
                $('#coupon_msg').hide();
                localStorage.removeItem('deliveryChange');
                localStorage.removeItem('couponCodeNone');
            }

        },'json');

        $('#btn_checkCoupon').prop("disabled",false);
    }

    $('div.loading').hide();

}
// set header amount
$(document).ready(function(){
    // IF Empty Cart
    if (check_Empty_Cart() == false) {
        return false;
    } else {
        $("div#empty").css({"display":"block"});
    }
    var total_header = 0;
    if (window.localStorage.getItem('total_cart')!=null) {
        total_header = window.localStorage.getItem('total_cart');
    }
    $(".amount_header_cart").text(total_header);

    $(".link-payment").on('click', function(){
        var target = $(this).attr('data-target');
        $('.address-form').hide();
        $(target).show();
    });
});

// function addcart
function myAddCart() {
    var target = $("div#attribute").offset();
    $('a.add-to-cart-btn').attr("disabled", true);
    $('a.add-to-cart-btn').removeAttr("onclick");

    //phung option
    /*
     var option = [];
     submit = true;

     $('input.cache-option').each(function(){
     val     =   $(this).val();
     gid     =   $(this).attr('rel-gid');

     if(val == ''){
     $('[data-toggle="tooltip_'+gid+'"]').tooltip('show');
     submit = false;
     }else{
     option.push({gid:gid,name:val});
     }
     });
     if(!submit){
     $('a.add-to-cart-btn').removeAttr("disabled");
     $('a.add-to-cart-btn').attr("onclick", "myAddCart()");
     window.scrollTo(target.left, target.top);
     return false;
     } */
    //end phung
    var size = '', color = '', use_for = '';
    if ($('input#cacheColor').val() && $('input#cacheColor').val() == 'empty') {
        //alert('vui lòng chọn màu sắc');
        //$('[data-toggle="tooltip_color"]').tooltip('show');
        $('.error_color').show();
        $('a.add-to-cart-btn').removeAttr("disabled");
        $('a.add-to-cart-btn').attr("onclick", "myAddCart()");
        $("html, body").animate({ scrollTop: $('.choose-color').offset().top - 200 }, 1000);
        return false;
    } else if ($('input#cacheColor').val() && $('input#cacheColor').val() != 'empty') {
        var color = $('input#cacheColor').val();
        $('.error_color').hide();
        //$('[data-toggle="tooltip_color"]').tooltip('hide');
    }
    if ($('input#cacheSize').val() && $('input#cacheSize').val() == 'empty') {
        //alert('vui lòng chọn kích thước');
        $('.error_size').show();
        //$('[data-toggle="tooltip_size"]').tooltip('show');
        $('a.add-to-cart-btn').removeAttr("disabled");
        $('a.add-to-cart-btn').attr("onclick", "myAddCart()");
        //window.scrollTo(target.left, target.top);
        $("html, body").animate({ scrollTop: $('.choose-size').offset().top - 200 }, 1000);
        return false;
    } else if ($('input#cacheSize').val() && $('input#cacheSize').val() != 'empty') {
        var size = $('input#cacheSize').val();
        $('.error_color').hide();
        //$('[data-toggle="tooltip_size"]').tooltip('hide');
    }
    if ($('input#cacheUseFor').val() && $('input#cacheUseFor').val() == 'empty') {
        //$('[data-toggle="tooltip_userfor"]').tooltip('show');
        $('.error_user').show();
        $('a.add-to-cart-btn').removeAttr("disabled");
        $('a.add-to-cart-btn').attr("onclick", "myAddCart()");
        $("html, body").animate({ scrollTop: $('.choose-user').offset().top - 200 }, 1000);
        return false;
    } else if ($('input#cacheUseFor').val() && $('input#cacheUseFor').val() != 'empty') {
        use_for = $('input#cacheUseFor').val();
        $('.error_color').hide();
        //$('[data-toggle="tooltip_userfor"]').tooltip('hide');
    }

    var amount       = $('#txtsl').val();
    try {
        ga('send', 'event', {eventCategory: 'Add to cart', eventAction: 'Add'});
    } catch (err) {
        console.log(err);
    }

    /** CHECK-OUT PROCESS AS A PAGEVIEW **/
    ga("send", "pageview", "http://local.mymall-v2.vn/chuot-chuyen-game-cao-cap-venr-6d-eagle-m1-den-70845.html/"+cate_name+"/" + product_name);
    addProductIntoOrder(product_id, product_name, size, color, amount, use_for);
    $('a.add-to-cart-btn').removeAttr("disabled");
}

function addProductIntoOrder(product_id, product_name, size, color, amount,use_for) {
    //Xử lý khi người dùng nhập tào lao
    if (isNaN(amount) || amount < 0 || amount > 100){
        amount = 1;
    }


    var price_p = $('span#Price-mymall').text();
    // check Package 8
    var isPackage8='';
    if (package8 == 1) {
        if (Promotion_package(8,cateid,price,amount,'')!='') {
            isPackage8 = Promotion_package(8,cateid,price,amount,'');
        }
    }
    // xử lý GA GOOGLE
    ga('ec:addCart', {               // Provide product details in a productFieldObject.
        'id'      : product_id,                   // Product ID (string).
        'name'    : product_name,   // Product name (string).
        'category': cateid,            // Product category (string).
        'brand'   : '',           // Product brand (string).
        'variant' : color,       // Product variant (string).
        'price'   : price,    // Product price (currency).
        'quantity': amount    // Product quantity (number).
    });

    var shoppingcart = [];
    if (localStorage.getItem(key_cart) != null){
        shoppingcart = JSON.parse(localStorage.getItem(key_cart));
    }
    var is_exist = 0;

    for(var i=0;i<shoppingcart.length;i++){
        if (!shoppingcart[i].hasOwnProperty('is_gift')) {
            if (shoppingcart[i].id == product_id && undefinedToString(shoppingcart[i].size) == undefinedToString(size) && undefinedToString(shoppingcart[i].color) == undefinedToString(color) && undefinedToString(shoppingcart[i].use_for) == undefinedToString(use_for) ) {
                is_exist = 1;
                shoppingcart[i].amount += parseInt(amount);
            }
        }
    }

    if (is_exist == 0){
        var product = {
            id         : product_id,
            size       : size,
            color      : color ,
            use_for    : use_for,
            amount     : parseInt(amount),
            total      : 0,
            discount   : discount, // for Promotion
            cateid     : cateid,
            price      : price,
            ispackage8 : isPackage8,
            cate_apply : giftCate9,
            brand_10   : brand10
        };
        shoppingcart.push(product);
    }

    localStorage.setItem(key_cart, JSON.stringify(shoppingcart));
    /** Add Package 12 **/
    var inputRdoPackage = $("input[name=rdoSelect12]").length;
    if (inputRdoPackage != 0) {
        var chooseItem  = $("input[name=rdoSelect12]:checked").val();
        $.ajax({
            "url"  : "/cart/addProductIdPackage12?chooseItem="+chooseItem+'&pid='+product_id,
            "type" : "get",
            "data" : {
                "chooseItem" : chooseItem,
                "pid"        : product_id
            },
            "async"   : false,
            "success" : function(response){
                console.log(response);
            }
        });
    }
    // return false;

    /** Add Package 13 **/
    if (package13 == 1) {
        addPromotionpackage(13,brand10);
    }
    window.location = "/mcart";
}

function undefinedToString(a){
    if (a == undefined)
        return 'undefined';
    else
        return a;
}
// Choose option cart and detail
// choose option
$(document).ready(function(){
    //$("li#color_89").addClass("mm-selected");
});
function choose_option(param,option_id,option_name) {
    if (param == 'color') {
        $('[data-toggle="tooltip_color"]').tooltip("hide");
        $('[data-toggle="tooltip_color"]').tooltip('disable');
        if ( $('ul#ul_color').find("li a").length !=0) {
             $('ul#ul_color').find("li a").removeClass("active_option");
        } else {
            $('ul#attr_color').find("li a").removeClass("active_option");
        }
        $("li#color_"+option_id).find("a").addClass("active_option");
        if ($('input[name=res_color]').length!=0) {
            $('input[name=res_color]').val(option_name);
        }
        if ($('input[name=res_color_option]').length!=0) {
            $('input[name=res_color_option]').val(option_name);
        }
    } if (param == 'size') {
        $('[data-toggle="tooltip_size"]').tooltip("hide");
        $('[data-toggle="tooltip_size"]').tooltip('disable');
        if ($('ul#ul_size').find('li a').length !=0) {
            $('ul#ul_size').find('li a').removeClass("active_option");
        } else {
            $('ul#attr_size').find('li a').removeClass("active_option");
        }
        $("li#size_"+option_id).find("a").addClass("active_option");
        if ($('input[name=res_size]').length!=0) {
            $('input[name=res_size]').val(option_name);
        }
        if ($('input[name=res_size_option]').length!=0) {
            $('input[name=res_size_option]').val(option_name);
        }
    } if (param == 'use_for') {
        $('[data-toggle="tooltip_use_for"]').tooltip("hide");
        $('[data-toggle="tooltip_use_for"]').tooltip('disable');
        if ($('ul#ul_use_for').find('li a').length !=0) {
            $('ul#ul_use_for').find('li a').removeClass("active_option");
        } else {
            $('ul#attr_use_for').find('li a').removeClass("active_option");
        }
        $("li#use_for_"+option_id).find("a").addClass("active_option");
        if ($('input[name=res_use_for]').length!=0) {
            $('input[name=res_use_for]').val(option_name);
        }
        if ($('input[name=res_use_for_option]').length!=0) {
            $('input[name=res_use_for_option]').val(option_name);
        }
    }
}

// function convert Money the same number format php
function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number, prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point, s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + (Math.round(n * k) / k).toFixed(prec);
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}
// Proccess amount is true
function check_amout(amount) {
    if (!$.isNumeric(amount) || amount > 20 || amount <= 0 || Math.floor(amount) != amount ) {
        amount = 1;
    }
    return amount;
}

// Proccess Change Amount Cart
$(document).on("change","input#amount",function() {
    var amount = check_amout($('input#amount').val());
    $('input#amount').val(amount);
    $("form#FormCart input#amount_cart").val(amount);
    // cart pages
    if ($("input[name=new_amount]").length!=0) {
        $("input[name=new_amount]").val(amount);
    }
});

// Change Amout with onclick
function change_click_amount($param) {
    if ($param == 'dec') {
        var amount = check_amout($('input#amount').val());
        if (amount > 1) {
            amount--;
        }
    } else {
        var amount = $('input#amount').val();
        if (!$.isNumeric(amount) || amount >= 20 || amount < 0) {
            amount = 1;
        } else {
            amount++;
        }
    }
    $('input#amount').val(amount);
    $("form#FormCart input#amount_cart").val(amount);
    // in change attr cart page
    if ($("input#new_amount").length!=0) {
        $("input#new_amount").val(amount);
    }
}

// Add Cart
function addCart() {
    // checking is choose properties of products
    var exists_color = $('ul#ul_color');
    var exists_size  = $('ul#ul_size');
    var choose       = true;
    if (exists_color.length > 0 && $("form#FormCart input[name=res_color]").val() == '') {
        //$('[data-toggle="tooltip_color"]').tooltip("show");
        $('.error_color').show();
        choose = false;
    }
    if(exists_size.length > 0 && $("form#FormCart input[name=res_size]").val() == '') {
        //$('[data-toggle="tooltip_size"]').tooltip("show");
        $('.error_size').show();
        choose = false;
    }
    if (!choose) {
        $("a.add-cart-full").attr("onclick","addCart();");
        return false;
    }
    var lock_button = '<a href="javascript:void(0);" class="btn-add-cart"> <i class="glyphicon glyphicon-shopping-cart"></i> <label>Tiếp tục</label> </a>';
    $("div#lock_button").html(lock_button);
    var pid     = $("form#FormCart input[name=pid]").val();
    var size    = $("form#FormCart input[name=res_size]").val();
    var color   = $("form#FormCart input[name=res_color]").val();
    var use_for = $("form#FormCart input[name=res_use_for]").val();
    var amount = parseInt($("form#FormCart input[name=amount_cart]").val());
    var alias  = $("form#FormCart input[name=alias]").val();
    var name   = $("form#Form input[name=name]").val();
    var brand  = $("form#Form input[name=brand]").val();
    var cate   = $("form#Form input[name=cate]").val();
    var price  = $("form#Form input[name=price]").val();
    var cart   = [],exists=false;
    // check is user change Properties
    if (window.localStorage.getItem(key_cart)!=null) {
        cart = JSON.parse(window.localStorage.getItem(key_cart));
        for (var i=0;i<cart.length;i++) {
            if (cart[i].id == pid && cart[i].size == size && cart[i].color == color && cart[i].use_for == use_for) {
                cart[i].amount+=parseInt(amount);
                exists = true;
                break;
            }
        }
    }

    if (exists == false) {
        var json_cart = {
            "id"    : pid,
            "size"   : size,
            "use_for" : use_for,
            "color"  : color,
            "amount" : amount
        };
        cart.push(json_cart);
    }

    window.localStorage.setItem(key_cart,JSON.stringify(cart));
    // tracking code
    // ga('ec:addCart', {                // Provide product details in a productFieldObject.
    //     'id'      : pid,             // Product ID (string).
    //     'name'    : name,   // Product name (string).
    //     'category': cate,            // Product category (string).
    //     'brand'   : brand,           // Product brand (string).
    //     'variant' : color+'|'+size,       // Product variant (string).
    //     'price'   : price,      // Product price (currency).
    //     'quantity': amount     // Product quantity (number).
    // });


    window.location = base_url+'trang-gio-hang.html';
}


// check amount cart
$(document).on("click","button#order-step_2",function() {
    return true;
    /*
    var cart = null;
    if (window.localStorage.getItem(key_cart)!=null || window.localStorage.getItem(key_cart)!='[]') {
        cart = window.localStorage.getItem(key_cart);
    }
    $.ajax({
        "url"     : base_url+'wap_2/carts/check_amount',
        "type"    : "post",
        "data"    : {"cart":cart},
        "async"   : false,
        "success" : function(response) {
            if (response != "") {

                return false;
            } else {
                return true;
            }
        }
    });
    //return false;
    */
});


function export_data_cart() {
    var cart = null;
    if (window.localStorage.getItem(key_cart)!=null || window.localStorage.getItem(key_cart)!='[]') {
        cart = window.localStorage.getItem(key_cart);
    }
    var result = null;
    if (cart!=null) {
        $.ajax({
            "url"   : base_url+"products/getlistproductorder",
            "type"  : "post",
            "data"  : {order_info: cart},
            "async" : false,
            "dataType" : 'json',
            "success":function(response){
                result = response;
            }
        });
    }
    return result;
}

function check_Empty_Cart() {
    var cart=[];
    if (window.localStorage.getItem(key_cart)!=null || window.localStorage.getItem(key_cart)!='[]') {
        cart = JSON.parse(window.localStorage.getItem(key_cart));
    }
    // IF Empty Cart
    if (cart === null || cart.length === 0) {
        var html_empty = '' +
            '<div class="wrap-finish">' +
                '<img src="'+base_url+'assets/v2_wap/images/empty-cart.png">' +
                '<h2 class="title-empty">Rất tiếc, giỏ hàng của bạn hiện đang trống</h2>' +
                '<p>Hãy nhanh tay tìm kiếm & chọn những sản phẩm yêu thích của bạn</p>' +
                '<a href="'+base_url+'trang-chu.html"><button class="continue" type="button">Tiếp tục mua sắm </button></a>' +
            '</div>';

        $(".main-cart").replaceWith(html_empty);
        // set total amount localStorage
        window.localStorage.setItem("total_cart", 0);
        $(".amount_header_cart").text(0);

        return false;
    }
    $(".main-cart").show();
}

function showPaymentCart(package) {
    var cart=[];
    if (window.localStorage.getItem(key_cart)!=null || window.localStorage.getItem(key_cart)!='[]') {
        cart = JSON.parse(window.localStorage.getItem(key_cart));
    }
    // IF Empty Cart
    check_Empty_Cart();
    if (check_Empty_Cart() == false) {
        return false;
    }

    $('.show-alert').html('');

    var data_cart = export_data_cart();
    var product = data_cart.products;
    if (product.length==0) {
        clear_localStorage();
        return;
    }
    //Bắt đầu duyệt qua giỏ hàng và append vào htm
    var products = {};
    for(var j = 0; j<product.length; j++) {
        products[product[j].product_id] = product[j];
    }

    var arr_package7 = [];

    var discount = 0;

    var list_product = data_cart.products;

    var html = "",total = 0,last_data_cart = null,total_amount=0,is_error=false;
    for (var i=0;i<cart.length;i++) {
        product = products[cart[i].id];
        if (!product) continue;

        // product count == 0
        if (product.product_count <= 0) {
            msg = encodeURI('<a class="info-h" href="/' + product.alias + '-' + product.product_id + '.html"><b>' + product.name + '</b></a>');
            msg = html_error('Sản phẩm: <span>' + product.name + '</span></a> vừa hết hàng. ' +
                '<a href="javascript:void(0)" class="alert_available" data-msg="' + msg + '">' +
                '<span>Thông báo khi có hàng</span></a>, hoặc bạn vui lòng tìm thêm ' +
                '<a href="/"><span>sản phẩm tương tự</span></a>.');
            $('.show-alert').append( msg );
            is_error = true;
        } else if (product.product_count < cart[i].amount && product.product_count != 0) {
            // amount user > product_count && product count != 0
            $('.show-alert').append(html_error(' Sản phẩm: <span>'+product.name+'</span> không đủ số lượng bạn chọn. Bạn vui lòng chọn lại số lượng mua.'));
            is_error = true;
        }

        val_dis7 = 0;

        if(package.package7 == 1){
            var discount7 = Promotion_package(7, cart[i].id, cart[i].price, cart[i].amount, '');
            if (discount7 != "") {
                if (cart[i].id == discount7.product_id) {

                    if ($.isNumeric(discount7.discount)) {

                        if(jQuery.inArray(cart[i].id,arr_package7) == -1){

                            arr_package7.push(cart[i].id)
                            val_dis7+= parseInt(discount7.discount);
                            discount += val_dis7;
                        }

                    }

                }
            }
        }

        html += html_item_payment(product, cart[i], val_dis7);

        last_data_cart = product.name;
        total+=parseInt(cart[i].amount*product.price);
        total_amount+=parseInt(cart[i].amount);
    }
    if (is_error) {
        $('#cartpayment').attr('data-is-submit', 'no');
    }

    // set total amount localStorage
    window.localStorage.setItem("total_cart",total_amount);
    // empty alert coupone
    $("label#coupon_msg").css({"display":"none"});
    $("input#coupon_code").val('');
    $(".products.wrap-content").append(html);

    // update Amount in header
    $(".amount_header_cart").text(total_amount);

    // display data footer total

    // var discount = 0;
    // total-=discount;

    // var total_promotion = 0;
    // if(localStorage.total_promotion)
    //     total_promotion = localStorage.total_promotion;

    // $('#value_discount').text('-'+number_format(total_promotion,0,'.','.')+'đ');

    // $('.total_price').html(number_format(total,0,'.','.')+'đ');
    // $('.discout_price').html(discount+'đ');
    // $('.tmp_total_price').html(number_format(total+discount-total_promotion,0,'.','.')+'đ');

    total-=discount;

    var total_promotion = when_not_enough_gift();

    tmp_total = total-total_promotion;
    saveTotalTmpToSess(tmp_total);

    $('.total_price').html(number_format(total,0,'.','.')+'đ');
    $('#value_discount').html('-'+number_format(total_promotion,0,'.','.')+'đ');
    $('.tmp_total_price').html(number_format(tmp_total,0,'.','.')+'đ');


    // for package 4
    if (data_cart.package4 != null) {
        html = '';
        for (var i=0;i<data_cart.package4.length;i++) {
            tmp = data_cart.package4[i];
            html = get_item_gift_payment(MEDIA_HOST+tmp.image,
                '/'+tmp.alias+'-m'+tmp.product_id+'.html',
                tmp.name.replace("'","-"),
                tmp.amount,
                number_format(tmp.price,0,'.','.')
            );
            $('.gift-for-all').append(html).show();
        }
    }
    // checking package 5
    if (data_cart.package5 != null) {
        var key = Object.keys(data_cart.package5);
        var data_gift, html;
        for (var i=0;i<key.length;i++) {
            data_gift = data_cart.package5[key[i]];
            for (var j=0;j<data_gift.length;j++) {
                html = get_html_gift_product_payment(
                    key[i],
                    MEDIA_HOST + data_gift[j].image,
                    '/' + data_gift[j].alias + '-m' + data_gift[j].product_id + '.html',
                    data_gift[j].name,
                    data_gift[j].price,
                    data_gift[j].amount
                );
                $('div.pid_'+key[i]).first().append(html);
            }
        }
    }
    // checking package6 is ative
    if (data_cart.package6!=null) {
        var key = Object.keys(data_cart.package6);
        var data_gift, html;
        for (var i=0;i<key.length;i++) {
            data_gift = data_cart.package6[key[i]];
            for (var j=0;j<data_gift.length;j++) {
                html = get_html_gift_product_payment(
                    key[i],
                    MEDIA_HOST + data_gift[j].image,
                    '/' + data_gift[j].alias + '-m' + data_gift[j].product_id + '.html',
                    data_gift[j].name,
                    data_gift[j].price,
                    data_gift[j].amount
                );
                $('div.pid_'+key[i]).first().append(html);
            }
        }
    }

    if (data_cart.package9!=null) {
        var html = '';
        tmp = data_cart.package9;
        for (var i=0;i<tmp.length;i++) {
            html = get_item_gift_payment(
                MEDIA_HOST+tmp[i].image,
                '/'+tmp[i].alias+'-m'+tmp[i].product_id+'.html',
                tmp[i].name.replace("'","-"),
                tmp[i].amount,
                number_format(tmp[i].price,0,'.','.')
            );
            $('.gift-for-all').append(html).show();
        }

    }

    if (data_cart.package12 != null) {
        var key = Object.keys(data_cart.package12);
        var data_gift, html;
        for (var i=0;i<key.length;i++) {
            data_gift = data_cart.package12[key[i]];
            for (var j=0;j<data_gift.length;j++) {
                html = get_html_gift_product_payment(
                    data_gift[j].product_id,
                    MEDIA_HOST + data_gift[j].image,
                    '/' + data_gift[j].alias + '-m' + data_gift[j].product_id + '.html',
                    data_gift[j].name,
                    data_gift[j].price,
                    data_gift[j].amount
                );
                $('div.pid_'+key[i]).first().append(html);
            }
        }
    }

    if (data_cart.package13!=null) {
        var html = '';
        tmp = data_cart.package13;
        for (var i=0;i<tmp.length;i++) {
            html = get_item_gift_payment(
                MEDIA_HOST+tmp[i].image,
                '/'+tmp[i].alias+'-m'+tmp[i].product_id+'.html',
                tmp[i].name.replace("'","-"),
                tmp[i].amount,
                number_format(tmp[i].price,0,'.','.')
            );
            $('.gift-for-all').append(html).show();
        }

    }

    // For new Package 14,15
    if (data_cart.promotion!=null) {
        var html = '';
        tmp = data_cart.promotion;
        for (var i=0;i<tmp.length;i++) {
            html = get_item_gift_payment(
                MEDIA_HOST+tmp[i].image,
                '/'+tmp[i].alias+'-m'+tmp[i].product_id+'.html',
                tmp[i].name.replace("'","-"),
                tmp[i].amount,
                number_format(tmp[i].price,0,'.','.')
            );
            $('.gift-for-all').append(html).show();
        }
    }
}
function clear_localStorage () {
    // remove item in cart
    localStorage.removeItem(key_cart);
    check_Empty_Cart();
}
function showCart(package) {
    var cart=[];
    if (window.localStorage.getItem(key_cart)!=null || window.localStorage.getItem(key_cart)!='[]') {
        cart = JSON.parse(window.localStorage.getItem(key_cart));
    }
    // IF Empty Cart
    check_Empty_Cart();
    if (check_Empty_Cart() == false) {
        return false;
    }

    $('.show-alert').html('');
    $('.gift-for-all .list-infor').remove();
    $('.gift-for-all').hide();

    var data_cart = export_data_cart();
    var product = data_cart.products;
    if (product.length==0) {
        clear_localStorage();
        return;
    }
    //Bắt đầu duyệt qua giỏ hàng và append vào htm
    var products = {};
    for(var j = 0; j<product.length; j++) {
        products[product[j].product_id] = product[j];
    }

    var arr_package7 = [];

    var html = "", total = 0, last_data_cart = null, total_amount=0, msg, is_error=false, is_not_enough=false;

    var discount = 0;

    for (var i=0; i<cart.length; i++) {
        product = products[cart[i].id];
        if (!product) continue;

        is_not_enough=false;
        // product count == 0
        if (product.product_count <= 0) {
            msg = encodeURI('<a class="info-h" href="/' + product.alias + '-' + product.product_id + '.html"><b>' + product.name + '</b></a>');
            msg = html_error('Sản phẩm: <span>' + product.name + '</span></a> vừa hết hàng. ' +
                '<a href="javascript:void(0)" class="alert_available" data-msg="' + msg + '">' +
                '<span>Thông báo khi có hàng</span></a>, hoặc bạn vui lòng tìm thêm ' +
                '<a href="/"><span>sản phẩm tương tự</span></a>.');
            $('.show-alert').append( msg );
            is_error = true;
        } else if (product.product_count < cart[i].amount && product.product_count != 0) {
            // amount user > product_count && product count != 0
            $('.show-alert').append(html_error(' Sản phẩm: <span>'+product.name+'</span> không đủ số lượng bạn chọn. Bạn vui lòng chọn lại số lượng mua.'));
            cart[i].amount = 1;
            is_not_enough=true;
        }

        val_dis7 = 0;

        if(package.package7 == 1){
            var discount7 = Promotion_package(7, cart[i].id, cart[i].price, cart[i].amount, '');
            if (discount7 != "") {
                if (cart[i].id == discount7.product_id) {

                    if ($.isNumeric(discount7.discount)) {

                        if(jQuery.inArray(cart[i].id,arr_package7) == -1){

                            arr_package7.push(cart[i].id)
                            val_dis7+= parseInt(discount7.discount);
                            discount += val_dis7;
                        }

                    }

                }
            }
        }

        html += html_item(product, cart[i], is_not_enough, val_dis7);

        last_data_cart      = product.name;

        if(product.alias != ''){
            last_product_link   = '/'+product.alias+'-m'+product.product_id+'.html';
            $('.main-cart a.buy-continue').attr('href',last_product_link);
        }

        total+=parseInt(cart[i].amount*product.price);
        total_amount+=parseInt(cart[i].amount);
    }
    window.localStorage.setItem(key_cart, JSON.stringify(cart));

    if (is_error) {
        $('button.payment').closest('a').attr('href', 'javasciprt:void(0)');
        $('button.payment').closest('a').attr('onclick', "$('.scrollup').trigger('click');");
    }else{
        $('button.payment').closest('a').attr('href', $('button.payment').closest('a').attr('data-href'));
        $('button.payment').closest('a').removeAttr('onclick');
    }

    // tracking
    // view cart
    // ga('send', 'event', { eventCategory: 'Review Cart', eventAction: 'Submit'});
    //ga('send', 'pageview', '<?php echo base_url()."cart/index"; ?>/'+total_amount+'/ Review-cart');
    // ga('send', 'pageview', '/cart/index/'+total_amount+'/Review-cart');

    // set total amount localStorage
    window.localStorage.setItem("total_cart",total_amount);
    // empty alert coupone
    $("label#coupon_msg").css({"display":"none"});
    $("input#coupon_code").val('');
    $(".wrap-product").html(html);

    // update Amount in header
    $(".amount_header_cart").text(total_amount);

    // display last data add to cart in header cart page
    if (last_data_cart) $('.show-alert').prepend(html_error('Sản phẩm: <span>'+last_data_cart+'</span>, vừa được thêm vào giỏ hàng.', 'fa-check'));

    // display data footer total

    total-=discount;

    var total_promotion = when_not_enough_gift();

    tmp_total = total-total_promotion;

    $('.total_price').html(number_format(total,0,'.','.')+'đ');
    $('.discout_price').html('-'+number_format(total_promotion,0,'.','.')+'đ');
    $('.tmp_total_price').html(number_format(tmp_total,0,'.','.')+'đ');

    saveTotalTmpToSess(tmp_total);

    var tmp = data_cart.my_xu;
    $('.accumulate_xu').html(tmp.accumulate_xu);

    // for package 4
    if (data_cart.package4 != null) {
        html = '';
        for (var i=0;i<data_cart.package4.length;i++) {
            tmp = data_cart.package4[i];
            html = get_item_gift(MEDIA_HOST+tmp.image,
                '/'+tmp.alias+'-m'+tmp.product_id+'.html',
                tmp.name.replace("'","-"),
                tmp.amount,
                number_format(tmp.price,0,'.','.')
            );

            $('.gift-for-all').append(html).show();
        }
    }
    // checking package 5
    if (data_cart.package5 != null) {
        var key = Object.keys(data_cart.package5);
        var data_gift, html;
        for (var i=0;i<key.length;i++) {
            data_gift = data_cart.package5[key[i]];
            for (var j=0;j<data_gift.length;j++) {
                html = get_html_gift_product(
                    key[i],
                    MEDIA_HOST + data_gift[j].image,
                    '/' + data_gift[j].alias + '-m' + data_gift[j].product_id + '.html',
                    data_gift[j].name,
                    data_gift[j].price,
                    data_gift[j].amount
                );
                $('div.pid_'+key[i]).first().append(html);
            }
        }
    }
    // checking package6 is ative
    if (data_cart.package6!=null) {
        var key = Object.keys(data_cart.package6);
        var data_gift, html;
        for (var i=0;i<key.length;i++) {
            data_gift = data_cart.package6[key[i]];
            for (var j=0;j<data_gift.length;j++) {
                html = get_html_gift_product(
                    key[i],
                    MEDIA_HOST + data_gift[j].image,
                    '/' + data_gift[j].alias + '-m' + data_gift[j].product_id + '.html',
                    data_gift[j].name,
                    data_gift[j].price,
                    data_gift[j].amount
                );
                $('div.pid_'+key[i]).first().append(html);
            }
        }
    }

    if (data_cart.package9!=null) {
        var html = '';
        tmp = data_cart.package9;
        for (var i=0;i<tmp.length;i++) {
            html = get_item_gift(
                MEDIA_HOST+tmp[i].image,
                '/'+tmp[i].alias+'-m'+tmp[i].product_id+'.html',
                tmp[i].name.replace("'","-"),
                tmp[i].amount,
                number_format(tmp[i].price,0,'.','.')
            );
            $('.gift-for-all').append(html).show();
        }

    }

    if (data_cart.package12 != null) {
        var key = Object.keys(data_cart.package12);
        var data_gift, html;
        for (var i=0;i<key.length;i++) {
            data_gift = data_cart.package12[key[i]];
            for (var j=0;j<data_gift.length;j++) {
                html = get_html_gift_product(
                    data_gift[j].product_id,
                    MEDIA_HOST + data_gift[j].image,
                    '/' + data_gift[j].alias + '-m' + data_gift[j].product_id + '.html',
                    data_gift[j].name,
                    data_gift[j].price,
                    data_gift[j].amount
                );
                $('div.pid_'+key[i]).first().append(html);
            }
        }
    }

    if (data_cart.package13!=null) {
        var html = '';
        tmp = data_cart.package13;
        for (var i=0;i<tmp.length;i++) {
            html = get_item_gift(
                MEDIA_HOST+tmp[i].image,
                '/'+tmp[i].alias+'-m'+tmp[i].product_id+'.html',
                tmp[i].name.replace("'","-"),
                tmp[i].amount,
                number_format(tmp[i].price,0,'.','.')
            );
            $('.gift-for-all').append(html).show();
        }

    }

    // For new Package 14,15
    if (data_cart.promotion!=null) {
        var html = '';
        tmp = data_cart.promotion;
        for (var i=0;i<tmp.length;i++) {
            html = get_item_gift(
                MEDIA_HOST+tmp[i].image,
                '/'+tmp[i].alias+'-m'+tmp[i].product_id+'.html',
                tmp[i].name.replace("'","-"),
                tmp[i].amount,
                number_format(tmp[i].price,0,'.','.')
            );
            $('.gift-for-all').append(html).show();
        }
    }
    getMyXuFromServer();
    promotionXu();
}
function get_html_gift_product_payment(pid, image, link, name, price, amount) {
    return '' +
        '<div class="gift-for-one">' +
        '<i class="fa fa-gift" aria-hidden="true"></i>' +
        '<p class="detail id-text">' + name + '</p>' +
    '</div>';
}
function get_html_gift_product(pid, image, link, name, price, amount) {
    return '' +
        '<div class="gift-for-one">' +
            '<div class="col-sm-2 col-xs-2">' +
                '<div class="wrap-img-gift">' +
                    '<img src="' + image + '" alt="Quà tặng miễn phí đi kèm">' +
                '</div>' +
                '<i class="fa fa-gift" aria-hidden="true"></i>' +
            '</div>' +
            '<div class="col-sm-8 col-xs-8">' +
                '<p class="detail id-text">' + name + '</p>' +
                '<p class="price-gift">' + number_format(price * amount, 0, '.', '.') + 'đ</p>' +
            '</div>' +
            '<div class="col-sm-2 col-xs-2 number">' +
                '<p class="number-gift">' + amount + '</p>' +
            '</div>' +
        '</div>';
}
function get_item_gift_payment(image, link, name, amount, price) {
    return '' +
        '<ul class="list-infor">' +
        '<li class="col-sm-2 col-xs-2">' +
        '<div class="wrap-img">' +
        '<img src="'+image+'">' +
        '</div>' +
        '</li>' +
        '<li class="col-sm-8 col-xs-8">' +
        '<a href="'+link+'" class="descript">'+name+'</a>' +
        '<p class="price-cart">'+price+'đ</p>' +
        '</li>' +
        '<li class="col-sm-2 col-xs-2 wrap-number">' +
        '<div class="number">' +
        '<span>'+amount+'</span>' +
        '</div>' +
        '</li>' +
        '</ul>';
}
function get_item_gift(image, link, name, amount, price) {
    return '' +
        '<ul class="list-infor">' +
            '<li class="col-sm-2 col-xs-2">' +
                '<div class="wrap-img">' +
                    '<img src="'+image+'">' +
                '</div>' +
            '</li>' +
            '<li class="col-sm-7 col-xs-7">' +
                '<a href="'+link+'" class="descript">'+name+'</a>' +
                '<p class="price-cart">'+price+'đ</p>' +
            '</li>' +
            '<li class="col-sm-3 col-xs-3 wrap-number">' +
                '<div class="number">' +
                    '<div class="col-sm-6">'+amount+'</div>' +
                '</div>' +
            '</li>' +
        '</ul>';
}
function html_item_payment(item, cart_item,val_dis7) {
    var attr = '';
    if (cart_item.size!='') {
        attr += '<span>Size: <strong>'+cart_item.size+'</strong></span>';
    } if (cart_item.color!='') {

        if (cart_item.size!='') {
            attr += '<span>, Màu: <strong>'+cart_item.color+'</strong></span>';
        }else{
            attr += '<span>Màu: <strong>'+cart_item.color+'</strong></span>';
        }

    } if (cart_item.use_for!="") {

        if (cart_item.color!='') {

            attr += '<span>, Mục đích sử dụng : <strong>'+cart_item.use_for+'</strong></span>';

        }else{

            attr += '<span>Mục đích sử dụng : <strong>'+cart_item.use_for+'</strong></span>';

        }
    }
    html = '' +
        '<div class="one pid_'+item.product_id+'">' +
            '<ul class="list-infor">' +
                '<li class="col-sm-2 col-xs-2">' +
                    '<div class="wrap-img">' +
                        '<img src="'+MEDIA_HOST+item.image+'">' +
                    '</div>' +
                '</li>' +
                '<li class="col-sm-8 col-xs-8">' +
                    '<a href="'+base_url+item.alias+'-m'+item.product_id+'.html'+'" class="descript">'+item.name+'</a>';
                if( val_dis7 > 0 ){
                    html += '<p class="price-cart">'+number_format(parseInt(item.price*cart_item.amount - val_dis7),0,".",".")+'đ</p>'+
                            '<p class="price-old">'+number_format(parseInt(item.price*cart_item.amount),0,".",".")+'đ</p>'+
                            '<p class="margin-btt-none">Giảm '+number_format(parseInt(val_dis7),0,".",".")+'đ</p>';
                }else{
                    html += '<p class="price-cart">'+number_format(parseInt(item.price*cart_item.amount),0,".",".")+'đ</p>';
                }
                    html += '<p class="attr">'+attr+'</p>' +
                '</li>' +
                '<li class="col-sm-2 col-xs-2 wrap-number">' +
                    '<div class="number">' +
                        '<span>'+cart_item.amount+'</span>' +
                    '</div>' +
                '</li>' +
            '</ul>' +
        '</div>';
    return html;
}

function html_item(item, cart_item, is_not_enough,val_dis7) {
    var attr = '';
    if (cart_item.size!='') {
        attr += '<span>Size: <strong>'+cart_item.size+'</strong></span>';
    } if (cart_item.color!='') {

        if (cart_item.size!='') {
            attr += '<span>, Màu: <strong>'+cart_item.color+'</strong></span>';
        }else{
            attr += '<span>Màu: <strong>'+cart_item.color+'</strong></span>';
        }

    } if (cart_item.use_for!="") {

        if (cart_item.color!='') {

            attr += '<span>, Mục đích sử dụng : <strong>'+cart_item.use_for+'</strong></span>';

        }else{

            attr += '<span>Mục đích sử dụng : <strong>'+cart_item.use_for+'</strong></span>';

        }
    }
    var html = '' +
        '<div class="one pid_'+item.product_id+'">' +
            '<ul class="list-infor">' +
                '<li class="col-sm-2 col-xs-2">' +
                    '<div class="wrap-img">' +
                        '<img src="'+MEDIA_HOST+item.image+'">' +
                    '</div>' +
                '</li>' +
                '<li class="col-sm-7 col-xs-7">' +
                    '<a href="'+base_url+item.alias+'-m'+item.product_id+'.html'+'" class="descript">'+item.name+'</a>';
                if( val_dis7 > 0 ){
                    html += '<p class="price-cart">'+number_format(parseInt(item.price*cart_item.amount - val_dis7),0,".",".")+'đ</p>'+
                            '<p class="price-old">'+number_format(parseInt(item.price*cart_item.amount),0,".",".")+'đ</p>'+
                            '<p class="margin-btt-none">Giảm '+number_format(parseInt(val_dis7),0,".",".")+'đ</p>';
                }else{
                    html += '<p class="price-cart">'+number_format(parseInt(item.price*cart_item.amount),0,".",".")+'đ</p>';
                }
                    html +='<p class="attr">'+attr+'</p>';
        if (item.product_count <= 0) {
            attr = encodeURI('<a class="info-h" href="/' + item.alias + '-' + item.product_id + '.html"><b>' + item.name + '</b></a>');
            html += '<div class="more-infor">' +
                        '<p class="out-of-cart">Sản phẩm đang hết hàng</p>' +
                        '<button type="button" class="note alert_available" data-msg="'+attr+'">Thông báo khi có hàng</button>' +
                    '</div>';
        }
    html += '</li>' +
                '<li class="col-sm-3 col-xs-3 wrap-number">' +
                    '<i class="fa fa-trash" aria-hidden="true"></i>' +
                    '<div class="number">' +
                        '<input name="amout_update" class="amout_update" type="hidden" value="'+cart_item.amount+'"/>' +
                        '<input type="hidden" class="value_update" name="value_update" value="'+item.product_id+'|'+cart_item.size+'|'+cart_item.color+'|'+cart_item.use_for+'" />' +
                        '<div class="col-sm-3 sub">-</div>' +
                        '<div class="col-sm-6"><p>'+cart_item.amount+'</p></div>' +
                        '<div class="col-sm-3 plus">+</div>' +
                    '</div>';

    if (is_not_enough) {
        html += '<div class="tooltip bottom"><div class="tooltip-inner"><i class="fa fa-exclamation-triangle"></i>Còn <b>'+item.product_count+'</b> sản phẩm.</div></div>';
    }

    html +=     '</li>' +
            '</ul>' +
        '</div>';

    return html;
}
function html_error(message, mclass) {
    mclass = mclass || 'fa-exclamation-triangle';
    return '' +
        '<div class="show-error-box">' +
            '<i class="fa '+mclass+'" aria-hidden="true"></i>' +
            '<p class="nomal">'+message+'</p>' +
            '<span class="close"><i class="fa fa-times" aria-hidden="true"></i></span>' +
        '</div>';
}

$(document).on('click', '.alert_available', function(){
    if ($("#modal_alert_available").attr('id') != 'modal_alert_available') {
        var html = '' +
            '<div class="modal fade" id="modal_alert_available" role="dialog">' +
                '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                        '<button type="button" class="close" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i></button>' +
                        '<p class="title">' +
                            '<i class="fa fa-check"></i>Sản phẩm: <span class="msg_product"></span> vừa được thêm vào thông báo khi có hàng.' +
                            '<br>Khi có hàng MyMall sẽ gửi thông báo cho bạn. Cảm ơn bạn đã ủng hộ!</p>' +
                        '<a href="/trang-chu.html"><button type="button" class="send" > Tiếp tục</button></a>' +
                    '</div>' +
                '</div>' +
            '</div>';

        $( ".wrap-content" ).append(html);
    }
    var msg = decodeURI($(this).attr('data-msg'));
    $('#modal_alert_available .msg_product').html( msg );
    $('#modal_alert_available').modal('show');
});
var interval_show_cart = null;
// update Amount Cart
$(document).on("change","input.amout_update",function(){

    var amount      = $(this).val();
    var amount      = $(this).parent().find('input[name=amout_update]').val();
        amount      = check_amout(amount);
    amount = parseInt(amount);
    $(this).parent().find('input[name=amout_update]').val(amount);
    var data_update = $(this).parent().find("input[name=value_update]").val();
        data_update = data_update.split("|");
    var pid = data_update[0],size = data_update[1],color=data_update[2];
    // get data cart in localStorage
    var cart = [];
    if (window.localStorage.getItem(key_cart)!=null || window.localStorage.getItem(key_cart)!='[]') {
        cart = JSON.parse(window.localStorage.getItem(key_cart));
    }
    for (var i=0;i<cart.length;i++) {
        if (cart[i].id == pid && cart[i].size == size && cart[i].color == color) {
            cart[i].amount = amount;
            break;
        }
    }
    window.localStorage.setItem(key_cart,JSON.stringify(cart));

    if (interval_show_cart) clearInterval(interval_show_cart);

    interval_show_cart = setInterval(function(){
        clearInterval(interval_show_cart);
        showCart(package);
    }, 400);
});

// Show data when click change
$(document).on("click","button#change-attr",function() {
    //$("#change-cart").css({"display":"block"});
    var data = $(this).find("input[name=data_need]").val();
        data = data.split('|');
    var id_cart = data[0],pid   = data[1],amount_cart = data[2];
    var size    = data[3],color = data[4],use_for = data[5];
    $("input[name=res_size_option]").val(size);
    $("input[name=res_color_option]").val(color);
    $("input[name=res_use_for_option]").val(use_for);
    // get data
    $.ajax({
        "url"     : base_url+"wap_2/carts/get_data_cart",
        "type"    : "post",
        "data"    : {"pid":pid,"row":true},
        "aysnc"   : false,
        "success" : function(response){
            response    = JSON.parse(response);
            $("ul#attr_color").html('');
            $("ul#attr_size").html('');
            $("ul#attr_use_for").html('');
            $("div#option_item_size").css({"display":"none"});
            $("div#option_item_color").css({"display":"none"});
            $("div#option_item_use_for").css({"display":"none"});
            if (typeof response == 'object') {
                if (!(response.options_color === null) && !(response.options_color.length === 0)) {
                    var color = response.options_color;
                    for (var i=0;i<color.length;i++) {
                        var html_color = "<li id='color_"+color[i].option_id+"'>";
                        var active_class = "";
                        if (color[i].option_name == data[4]) {
                            active_class = 'active_option';
                        }
                        if (color.length-1 == i) {
                            html_color+="<a class='"+active_class+"' data-toggle=\"tooltip_color\" data-placement=\"right\" data-original-title=\"Vui lòng chọn màu sắc !\" onclick='choose_option(\"color\",\""+color[i].option_id+"\",\""+color[i].option_name+"\")' rel='"+color[i].option_name+"' href='javascript:void(0);'>"+color[i].option_name+"</a>";
                        } else {
                            html_color+="<a class='"+active_class+"' onclick='choose_option(\"color\",\""+color[i].option_id+"\",\""+color[i].option_name+"\")' rel='"+color[i].option_name+"' href='javascript:void(0);'>"+color[i].option_name+"</a>";
                        }
                        html_color+="</li>";
                        $("ul#attr_color").append(html_color);
                    }
                    $("div#option_item_color").css({"display":"block"});
                }
                if (!(response.options_size === null) && !(response.options_size.length === 0)) {
                    var size  = response.options_size;
                    for (var i=0;i<size.length;i++) {
                        var active_class= "";
                        if (size[i].option_name == data[3]) {active_class = 'active_option';}
                        var html_size = "<li id='size_"+size[i].option_id+"'>";
                        if (size.length-1 == i) {
                            html_size+="<a class='"+active_class+"' \""+active_class+"\" data-toggle=\"tooltip_size\" data-placement=\"right\" data-original-title=\"Vui lòng chọn kích thước !\" onclick='choose_option(\"size\",\""+size[i].option_id+"\",\""+size[i].option_name+"\")' rel='"+size[i].option_name+"' href='javascript:void(0);'>"+size[i].option_name+"</a>";
                        } else {
                            html_size+="<a class='"+active_class+"' \""+active_class+"\" onclick='choose_option(\"size\",\""+size[i].option_id+"\",\""+size[i].option_name+"\")' rel='"+size[i].option_name+"' href='javascript:void(0);'>"+size[i].option_name+"</a>";
                        }
                        html_size+="</li>";
                        $("ul#attr_size").append(html_size);
                    }
                    $("div#option_item_size").css({"display":"block"});
                }
                 if (!(response.options_use_for === null) && !(response.options_use_for.length === 0)) {
                    var use_for  = response.options_use_for;
                    for (var i=0;i<use_for.length;i++) {
                        var active_class= "";
                        if (use_for[i].option_name == data[5]) {active_class = 'active_option';}
                        var html_use_for = "<li id='use_for_"+use_for[i].option_id+"'>";
                        if (use_for.length-1 == i) {
                            html_use_for+="<a class='"+active_class+"' \""+active_class+"\" data-toggle=\"tooltip_use_for\" data-placement=\"right\" data-original-title=\"Vui lòng chọn mục đích sử dụng!\" onclick='choose_option(\"use_for\",\""+use_for[i].option_id+"\",\""+use_for[i].option_name+"\")' rel='"+use_for[i].option_name+"' href='javascript:void(0);'>"+use_for[i].option_name+"</a>";
                        } else {
                            html_use_for+="<a class='"+active_class+"' \""+active_class+"\" onclick='choose_option(\"use_for\",\""+use_for[i].option_id+"\",\""+use_for[i].option_name+"\")' rel='"+use_for[i].option_name+"' href='javascript:void(0);'>"+use_for[i].option_name+"</a>";
                        }
                        html_use_for+="</li>";
                        $("ul#attr_use_for").append(html_use_for);
                    }
                    $("div#option_item_use_for").css({"display":"block"});
                }
                var p = response.product;
                $("div#option_img").html("<img src='"+MEDIA_HOST+p.image+"' />");
                $("h3#option-title").html(p.name);
                $("input#amount").val(amount_cart);
                $("input[name=new_amount]").val(amount_cart);
                $("span#price_mm").html(number_format(p.price,0,'.','.')+' <sup>đ</sup>');
                $("span#price_notsale").html(number_format(p.site_price,0,'.','.')+' <sup>đ</sup>');
                $("a#change_action").attr("rel",id_cart);
                $("a[href=#change-cart]").click();
            }
        }
    });
});
// Proccess data change
$(document).on("click","a#change_action",function(e){
    e.preventDefault();
    var choose = true;
    if ($("ul#attr_size").find("li").length != 0) {
        if ($("input[name=res_size_option]").val() == '') {
            $('[data-toggle="tooltip_size"]').tooltip("show");
            choose = false;
        }
    }
    if ($("ul#attr_color").find("li").length != 0) {
        if ($("input[name=res_color_option]").val() == '') {
            $('[data-toggle="tooltip_color"]').tooltip("show");
            choose = false;
        }
    }
    if ($("ul#attr_use_for").find("li").length != 0) {
        if ($("input[name=res_use_for_option]").val() == '') {
            $('[data-toggle="tooltip_use_for"]').tooltip("show");
            choose = false;
        }
    }
    if(!choose) {return false;}
    var cart_id    = $(this).attr("rel");
    var size       = $("input[name=res_size_option]").val();
    var color      = $("input[name=res_color_option]").val();
    var use_for    = $("input[name=res_use_for_option]").val();
    var new_amount = parseInt($("input[name=new_amount]").val());
    var cart=[];
    if (window.localStorage.getItem(key_cart)!=null) {
        cart = JSON.parse(window.localStorage.getItem(key_cart));
    }
    if (!(cart === null) && !(cart === 0)) {
        for (var i=0;i<cart.length;i++) {
            if (i == cart_id) {
                cart[i].size  = size;
                cart[i].color = color;
                cart[i].use_for = use_for;
                if (new_amount!="") { cart[i].amount = new_amount; }
                break;
            }
        }
        window.localStorage.setItem(key_cart,JSON.stringify(cart));
        showCart(package);
        $("input[name=res_color_option]").val('');
        $("input[name=res_size_option]").val('');
        $("input[name=res_use_for_option]").val('');
        $("a.btn-close-cart").click();
        //$("a#close-light").click();
    }
});

// Remve Cart
$(document).on("click",".fa.fa-trash",function() {

    var date_remove = $(this).parent().find("input[name=value_update]").val();
        date_remove = date_remove.split("|");
    var pid = date_remove[0],size = date_remove[1],color=date_remove[2];
    var cart = [];
    if (window.localStorage.getItem(key_cart)!=null || window.localStorage.getItem(key_cart)!='[]') {
        cart = JSON.parse(window.localStorage.getItem(key_cart));
    }
    for (var i=0;i<cart.length;i++) {
        if (cart[i].id == pid && cart[i].size == size && color == color) {
            cart.splice(i,1);
            break;
        }
    }
    window.localStorage.setItem(key_cart,JSON.stringify(cart));

    showCart(package);
});

// For Order
$(document).ready(function(){

    if ($('form#info_order').length > 0) {
        $('form#info_order').validate({

            groups: {
                'sltGender': "sltGender"
            },
            errorPlacement: function (error, element) {
                var name = element.prop("name");
                if (name === "sltGender") {
                    error.insertAfter("select#sltGender").css({"display": "block"})
                }
                if (name === "sltCity") {
                    error.insertAfter("select#sltCity").css({"display": "block"})
                }
                if (name === "sltDistrict") {
                    error.insertAfter("select#sltDistrict").css({"display": "block"})
                }
                if (name === "sltWard") {
                    error.insertAfter("select#sltWard").css({"display": "block"})
                } else {
                    error.insertAfter(element);
                }
            },
            "rules": {

                "name": {
                    required: {
                        depends: function () {
                            $(this).val($.trim($(this).val()));
                            return true;
                        }
                    },
                    "maxlength": 50
                },
                "sltGender": "required",

                "email": {
                    required: {
                        depends: function () {
                            $(this).val($.trim($(this).val()));
                            return true;
                        }
                    },
                    "email": true
                },

                "lane": {
                    required: {
                        depends: function () {
                            $(this).val($.trim($(this).val()));
                            return true;
                        }
                    },
                    "maxlength": 10
                },

                "address": {
                    required: {
                        depends: function () {
                            $(this).val($.trim($(this).val()));
                            return true;
                        }
                    },
                    minlength: 2,
                    maxlength: 50
                },

                "sltCity": "required",
                "sltDistrict": "required",
                "sltWard": "required",
                "phone": {
                    required: {
                        depends: function () {
                            $(this).val($.trim($(this).val()));
                            return true;
                        }
                    },
                    "digits": true,
                    "minlength": 10,
                    "maxlength": 11
                }
            },
            "messages": {
                "name": {
                    "required": "Vui lòng nhập họ tên !",
                    "maxlength": "Họ tên tối đa là 50 ký tự !"
                },
                "sltGender": "Vui lòng chọn giớ tính !",
                "email": {
                    "email": "Email không hợp lệ !",
                    "required": "Vui lòng nhập email !"
                },
                "phone": {
                    "required": "Vui lòng nhập điện thoại !",
                    "minlength": "Điện thoại ít nhất là 10 ký tự !",
                    "maxlength": "Điện thoại tối đa là 11 ký tự !",
                    "digits": "Điện thoại phải là số !"
                },
                "lane": {
                    "required": "Vui lòng nhập số nhà !",
                    "maxlength": "số nhà tối đa là 10 ki tự !"
                },
                "address": {
                    "required": "Vui lòng nhập tên đường !",
                    "minlength": "Tên đường tối thiểu là 2 kí tự !",
                    "maxlength": "Tên đường tối đa là 50 kí tự !"
                },
                "sltCity": "Vui lòng chọn tỉnh/thành !",
                "sltDistrict": "Vui lòng chọn quận/huyện !",
                "sltWard": "Vui lòng chọn phường/xã !"
            },
            submitHandler: function (form) {
                $.ajax({
                    url: base_url + 'wap_2/carts/create_order',
                    type: 'post',
                    data: {
                        'cart': window.localStorage.getItem(key_cart),
                        'form_info': $('form#info_order').serialize()
                    },
                    async: false,
                    success: function (response) {
                        var response = jQuery.parseJSON(response);
                        if (typeof response == 'object') {

                            if (typeof response.error_msg !== 'undefined' && response.error_msg !== null) {

                                window.location = '/trang-gio-hang.html?error_msg=' + response.error_msg;
                                return false;
                            }

                            //console.log(response);
                            var html = '<section class="main" role="main">' +
                                '<div class="container order-success">' +
                                '<div class="row">' +
                                '<img src="' + base_url + 'assets/wap_2/images/order-success_64dp.png" alt="Success"/>' +
                                '</div>' +
                                '<div class="row">' +
                                '<h3>Đặt hàng thành công.</h3>' +
                                '<hr/>' +
                                '<p>Mã đơn hàng của bạn: <strong>' + response.order_code + '</strong></p>' +
                                '</div>' +
                                '<div class="row">' +
                                '<div class="col-xs-12 notice">Bộ phận chăm sóc khách hàng MyMall sẽ gọi điện xác nhận thông tin giao hàng, bạn vui lòng chờ máy.</div>' +
                                '<h4>Cảm ơn bạn đã mua hàng tại MyMall.vn</h4>' +
                                '</div>' +
                                '<div class="row share">' +
                                '<a href="https://www.facebook.com/mymall.vn?fref=ts"><img src="' + base_url + 'assets/wap_2/images/Facebook.png" alt="Facebook"/></a>' +
                                '<a href="https://plus.google.com/u/0/b/112479747503681019072/"><img src="' + base_url + 'assets/wap_2/images/google.png" alt="Google+"/></a>' +
                                '</div>' +
                                '<div class="row">' +
                                '<div class="col-xs-12 text-center">' +
                                '<a class="continuous-shopping" href="' + base_url + '">Tiếp tục mua sắm</a>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</section><!--/end CART SUCCESS-->';
                            window.localStorage.clear();
                            /** Tracking **/
                                // ga('require', 'ecommerce', 'ecommerce.js');
                                // ga('ecommerce:addTransaction', {
                                //     'id'         : response.order_code,          // Transaction ID. Required.
                                //     'affiliation': '',// store name. thương hiệu
                                //     'revenue'    : response.total_cart,  // total revenue.
                                //     'shipping'   : response.transport_fee, // Shipping.
                                //     'tax'        : ''        // Tax.
                                // }); // End Tracking code
                                // ga('ecommerce:addItem', {
                                //     'id'      :  response.order_code,    // Transaction ID. Required. Same as in the transaction data.
                                //     'name'    :  response.product_name, // Product name. Required.
                                //     'sku'     : '', // Product SKU.
                                //     'category': '', // Product Category or variation.
                                //     'price'   : '', // Product price.
                                //     'quantity': ''  // Product Quantity.
                                // });
                                // ga('ecommerce:send');
                                // TRACKING FACEBOOK //
                            var _fbq = window._fbq || (window._fbq = []);
                            if (!_fbq.loaded) {
                                var fbds = document.createElement('script');
                                fbds.async = true;
                                fbds.src = '//connect.facebook.net/en_US/fbds.js';
                                var s = document.getElementsByTagName('script')[0];
                                s.parentNode.insertBefore(fbds, s);
                                _fbq.loaded = true;
                            }
                            window._fbq = window._fbq || [];
                            window._fbq.push(['track', '6023776927717', {'value': '0.00', 'currency': 'VND'}]);
                            $('span#SuccessTrackingFb').html('<noscript><img height="1" width="1" alt="" style="display:none" src="https://www.facebook.com/tr?ev=6023776927717&amp;cd[value]=0.00&amp;cd[currency]=VND&amp;noscript=1" /></noscript>');
                            var item_product = response.item_product;
                            // for (var i=0;i<item_product.length;i++) {
                            //     ga('ec:addProduct', {               // Provide product details in an productFieldObject.
                            //         'id'  :  item_product[i].id,                   // Product ID (string).
                            //         'name':  item_product[i].name,                    // Product name (string).
                            //         'category': '',                // Product category (string).
                            //         'brand'   : '',                // Product brand (string).
                            //         'variant' : '',               // Product variant (string).
                            //         'price'   : item_product[i].price,                 // Product price (currency).
                            //         'quantity': item_product[i].amount,                 // Product quantity (number).
                            //     });
                            // }
                            // ga('ec:setAction','checkout', {
                            //     'step'  : 1,
                            //     'option': 'COD'
                            // });
                            // End Tracking code
                            $("div#response_success").html(html);
                        } else {
                            $("div#response_success").html("Có sự cố trong quá trình đặt hàng. Xin vui lòng thử lại.");
                        }
                    }
                });
                return false;
            }
        });
    }

    $.validator.addMethod('selected', function (value) {
        console.log(value);
        return (value && value != '0' && value != '');
    });
});
function init_form_address(efrom) {
    $(efrom).validate({
        rules: {
            name: {
                required: true,
                maxlength: 50
            },
            phone: {
                required: true,
                minlength: 10,
                number: true,
                maxlength:11
            },
            email: {
                required : true
            },
            city: {
                selected : true
            },
            district: {
                selected: true,
            },
            wards: {
                selected: true,
            },
            street: {
                required:true,
            }
        },
        messages: {
            name: {
                required: 'Vui lòng nhập họ tên',
                maxlength:'Vui lòng không nhập quá 50 ký tự'
            },
            phone: {
                required: 'Vui lòng nhập số điện thoại',
                number: 'Số điện thoại phải là số',
                minlength: 'Số điện thoại phải là 10 - 11 số',
                maxlength: 'Số điện thoại phải là 10 - 11 số'
            },
            email: {
                required : 'Vui lòng nhập email',
                email : 'Email sai định dạng'
            },
            city: {
                selected: 'Vui lòng chọn Tỉnh/Thành phố',
            },
            district: {
                selected: 'Vui lòng chọn Quận/Huyện',
            },
            wards: {
                selected: 'Vui lòng chọn Phường/Xã',
            },
            street:{
                required: 'Vui lòng nhập tên đường, số nhà...'
            }
        },
        submitHandler: function(form) {
            $.ajax({
                url: '/cart/ajax_delivery',
                type: 'post',
                data: $(form).serialize(),
                dataType: 'json',
                success: function(response) {
                    if(response.result == 1){
                        localStorage.setItem("delivery_default",response.id);
                        location.reload();
                    }else{
                        alert(response.msg);
                    }
                }
            });
        }
    });
}
// get district by city id
$(document).on("change", ".city_id", function() {

    var city_id = $(this).val();
    var group = $(this).attr('data-group');

    if(!group || (group == -1)){
        $('#district_id').html('<option value="">Chọn Quận/Huyện</option>');
        $('#ward_id').html('<option value="">Chọn Phường/Xã</option>');
    }

    if (city_id!="") {
        $.ajax({
            "url"     : base_url+"wap_2/carts/get_district",
            "type"    : "post",
            "data"    : "city_id="+city_id,
            "aysnc"   : true,
            "success" : function(response){
                if(group && (group != -1)){
                    $('#district_'+group).html(response).val($('#district_'+group).attr('data-value'));
                    $('#district_'+group).trigger('change');
                }else{
                    $('#district_id').html(response);
                }

            }
        });
    }
});

// get ward
// get district by city id
$(document).on("change", ".district_id", function() {
    var district_id = $(this).val();
    var group = $(this).attr('data-group');

    if(!group || (group == -1)){
        $('#ward_id').html('<option value="">Chọn Phường/Xã</option>');
    }

    if (district_id!="") {
        $.ajax({
            "url"     : base_url+"wap_2/carts/get_ward",
            "type"    : "post",
            "data"    : "district_id="+district_id,
            "aysnc"   : true,
            "success" : function(response){

                if(group && (group != -1)){
                    $('#ward_'+group).html(response).val($('#ward_'+group).attr('data-value'));

                }else{
                    $('#ward_id').html(response);
                }

            }
        });
    }
});

$(document).ready(function(){
// For color
    $('.ColorLink').click(function () {
        $('a.ColorLink').parent().removeClass("active");
        $(this).parent().addClass("active");
        $('#cacheColor').val($(this).attr('rel'));
        //$('[data-toggle="tooltip_color"]').tooltip('hide');
        $('.error_color').hide();
        $('[data-toggle="tooltip_color"]').tooltip('disable');
    });
    // For size
    $('.sizeLink').click(function () {
        $('a.sizeLink').parent().removeClass("active");
        $(this).parent().addClass("active");
        $('#cacheSize').val($(this).text());
        //$('[data-toggle="tooltip_size"]').tooltip('hide');
        $('.error_size').hide();
        $('[data-toggle="tooltip_size"]').tooltip('disable');
    });
    // For use_for
    $('.UseForLink').click(function () {
        $('a.UseForLink').parent().removeClass('active');
        $(this).parent().addClass("active");
        $('#cacheUseFor').val($(this).attr('rel'));
        //$('[data-toggle="tooltip_userfor"]').tooltip('hide');
        $('.error_user').hide();
        $('[data-toggle="tooltip_userfor"]').tooltip('disable');
    });
    $('#increase').click(function () {
        var amount = parseInt($('#txtsl').val()) + 1;
        var num = check_amout(amount);
        if (num == 0) num = 1;
        $('#txtsl').val(num);
    });
    $('#txtsl').change(function () {
        var amount = parseInt($('#txtsl').val());
        var num = check_amout(amount);
        if (num == 0) num = 1;
        $('#txtsl').val(num);
    });
    $('#decrease').click(function () {
        var amount = parseInt($('#txtsl').val()) - 1;
        var num = check_amout(amount);
        if (num == 0) num = 1;
        $('#txtsl').val(num);
    });
});
//reply answer=========================
function open_reply(id){
    $('#first-reply_'+id+'').toggle();
}

//pagination load more ajax
$(document).ready(function()
{
    $(document).on('click','.view-more-reply',function(e)
    {
        number_row_r = $(this).parent('div').parent('.commend-detail').find('.subreply-person').length;
        is_busy_r = $(this).parent('div').find('.is_busy_r').val();
        page_r = $(this).parent('div').find('.page_r').val();
        record_per_page_r = $(this).parent('div').find('.record_per_page_r').val();
        stopped_r = $(this).parent('div').find('.stopped_r').val();
        parent_id_r = $(this).parent('div').find('.parent_id').val();
        $element_r = $(this).parent('div').parent('.commend-detail').find('.reply_load_more');
        $button_r = $(this);
        if (is_busy_r == true) {
            return false;
        }
        page_r++;
        $(this).parent('div').find('.page_r').val(page_r);
        $button_r.html('LOADDING ...');
        $.ajax(
            {
                type: 'post',
                dataType: 'json',
                url: '/ajax-load-more-wap',
                data: {page: page_r,id:parent_id_r,comment:'reply',number_row: number_row_r},
                success: function(result)
                {
                    var html = '';
                    if (result.length <= record_per_page)

                    {
                        $.each(result, function (key, obj){
                            var content_comment = JSON.parse(obj.comment);
                            html+= '<div class="subreply-person first-reply">\
                                                        <p class="name-person reply-person ">'+obj.fullname+'</p>\
                                                        <span class="date"> - lúc '+obj.date_created+'</span>\
                                                        <p>'+content_comment.comment+'</p>\
                                                    </div>';

                        });
                        $element_r.append(html);
                        $button_r.remove();

                    }

                    else{
                        $.each(result, function (key, obj){
                            if (key < result.length - 1){
                                var content_comment = JSON.parse(obj.comment);
                                html+= '<div class="subreply-person first-reply">\
                                                        <p class="name-person reply-person ">'+obj.fullname+'</p>\
                                                        <span class="date"> - lúc '+obj.date_created+'</span>\
                                                        <p>'+content_comment.comment+'</p>\
                                                    </div>';
                            }
                        });
                        $element_r.append(html);
                    }
                }
            },'json')
            .always(function()
            {
                $button_r.html('Xem thêm');
                is_busy_r = false;
                $(this).parent('div').find('.is_busy_r').val(is_busy_r);
            });

    });
});

function addFavorite(product_id) {
    if (login) {
        $('.anounce_success').hide();
        $(".fa-heart-o").css({"display": "none"});
        $(".fa-heart").css({"display": "block"});
        try {
            //tracking code Google
            ga('send', 'event', {eventCategory: 'Wish list', eventAction: 'Add'});
        } catch (err) {
            console.log(err);
        }
        $.post('products/addwishlist', {
            ajax: 'yes',
            product_id: encodeURI(product_id)
        }, function (text) {
            $('.anounce_success').html(text).show();
            // $('.btnAddWL').before('<div class="success_mess" style="display:block;">'+text+'</div>');
            setTimeout(function () {
                $('.anounce_success').html('').css({"display": "none"});
            }, '5000');
        });
    } else {
        window.location.href = "/mlogin";
    }
}
function saveTotalTmpToSess(param) {
    $.get(base_url+"my_xu/setSessTmpTotal?currentprice="+param,function(response){
    });
}
function getTotalFee_ajax()
{
    $.post("/cart/getTotalFee_ajax", {
        shoppingcart : $('#shoppingcart').val(),
        user_payment : $('#id_payment').val(),
        id_delivery : $('#id_delivery').val()
    }, function(data) {

        console.log(data);
        var isfree = '';

        if (package1==1) {

            var total_dis = $('input[name=valuedis]').val();

            isfree = IsFreeShipping(total_dis);


        }

        if (isfree!="true") { //if set package doesn't free shipping
            if(data != 'coupon_fee') {
                var tmp_total  = parseInt(data.total_order) + parseInt(data.transport_fee);

                /**
                * Description get value discount MyXu
                * @author wallace.hao
                * @date   20.4.2016
                */
                //tmp_total  = parseInt(tmp_total) - parseInt(my_xu.discountXu);
                console.log(tmp_total);

                if($('#inputXu').val() != '')
                    tmp_total  = parseInt(tmp_total) - parseInt($('#inputXu').val());

                console.log(tmp_total);
                $('#total_fee').html('+' + number_format(data.transport_fee,0,'.','.') + 'đ');

                $('#tmp_total').html(number_format(tmp_total,0,'.','.') + 'đ');
                ga('ec:setAction', 'purchase', {
                    'id': '0',
                    'affiliation': '',
                    'revenue': '',
                    'tax': '',
                    'shipping': number_format(data.transport_fee, ".", ","),
                    'coupon': ''
                });
            }
        } else {
            $.ajax({
                "url"     : "/cart/checkFreeShipping",
                "type"    : "post",
                "data"    : {"isfreeshipping":1},
                "success" : function(response) {
                    if (response == 'done'){
                        $('#total_fee').text('Miễn phí');
                        ga('ec:setAction', 'purchase', {
                            'id': '0',
                            'affiliation': '',
                            'revenue': '',
                            'tax': '',
                            'shipping': 0,
                            'coupon': ''
                        });
                    }
                }
            });
        }

        if(localStorage.deliveryChange){
            $('#coupon_code').val(' ');
            $('.btn-apply-coupon').trigger('click');
        }

    }, 'json');
}
function updateAmountProductInCart(product_id, product_name, size, color,item_element,use_for){
    resetMyXu();
    // Clear coupon
    $.post('/cart/clear_order_info_ajax');
    $('#coupon_discount').html('-0<sup>đ</sup>');
    $('#coupon_code').val('');
    $('#coupon_msg').hide();
    $('#total_fee').html('Chưa có');

    //Lấy số lượng amount sẽ update
    var new_amount = parseInt($('#' + item_element).find('input.amount-enter').val());
    //Xử lý khi người dùng nhập tào lao
    new_amount = CheckAmount(new_amount);
    $('#' + item_element).find('input.amount-enter').val(new_amount);

    //Lưu localstorage trước
    var key_shoppingCart = 'spcart';
    var shoppingcart = [];
    if (localStorage.getItem(key_shoppingCart) != null){
        shoppingcart = JSON.parse(localStorage.getItem(key_shoppingCart));
    }
    var mainProduct = null,discount_product = 0; // use for clear promotion if amount is 0
    for(var i=0;i<shoppingcart.length;i++){
        /**
         * Check exists for gifts
         */
        if (shoppingcart[i].id == product_id
            && undefinedToString(shoppingcart[i].size) == undefinedToString(size)
            && undefinedToString(shoppingcart[i].use_for) == undefinedToString(use_for)
            && undefinedToString(shoppingcart[i].color) == undefinedToString(color)
            && shoppingcart[i].hasOwnProperty('is_gift') == false
        ) {
            // xử lý vé xem phim voi id = x?
            if (new_amount != 0){
                if (!shoppingcart[i].hasOwnProperty('is_gift')) {
                    shoppingcart[i].amount = new_amount;
                    break;
                }
            } else {
                mainProduct = shoppingcart[i];
                //Remove item này nếu số lượng bằng 0
                shoppingcart.splice(i,1);
                break;
            }
        }
    }
    localStorage.setItem(key_shoppingCart, JSON.stringify(shoppingcart));
    showCart(package);
    //ShowShoppingCart();
}

$(document).on('click','.list-type-payment .type',function(){
    getTotalFee_ajax($(this).attr('data-value'));
});
function CheckAmount(num) {
    if (isNaN(num) || num=='0') return 0;

    var result = num;

    if (num=="" || num > 20 || num < 0) result  = 1;

    return result;
}
