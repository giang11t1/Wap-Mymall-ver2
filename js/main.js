$(document).ready(function() {
	if($('#menu_fixed').length > 0){
		var eTop = $('#menu_fixed').offset().top; //get the offset top of the element
		  $(window).scroll(function() { //when window is scrolled
		    if ($(this).scrollTop() > (eTop+500)) {
		        $('#title-recommend').addClass("position-menu");
		    } else {
		        $('#title-recommend').removeClass("position-menu");
		    }
		  });
	}
	  

	  if($('#scroll-menu').length > 0){
	  	var eTop1 = $('#scroll-menu').offset().top; //get the offset top of the element
	      $(window).scroll(function() { //when window is scrolled
	        if ($(this).scrollTop() > (eTop1)) {
	            $('#scroll-menu').addClass("position-menu-categoy");
	        } else {
	            $('#scroll-menu').removeClass("position-menu-categoy");
	        }
	      });
	  }

	
  $("#owl-demo").owlCarousel({
    autoPlay: 4000,
    navigation : true, // Show next and prev buttons
    slideSpeed : 300,
    paginationSpeed : 400,
    singleItem:true
  });
  $("#owl-top").owlCarousel({
     
      itemsCustom : [
        [320,1],
        [360, 2],
        [375, 2],
        [414, 2],
        [568, 3],
        [600, 3],
        [900,3],
        [1024, 3],
      ],
      navigation : true
  });
$("#owl-brand").owlCarousel({
     
      itemsCustom : [
        [320,1],
        [360, 2],
        [375, 2],
        [414, 2],
        [568, 2],
        [600, 2],
        [900,2],
        [1024, 3],
      ],
      navigation : true
  });
$("#owl-category").owlCarousel({
     
      itemsCustom : [
        [320,2],
        [360, 2],
        [375, 2],
        [414, 2],
        [568, 3],
        [600, 3],
        [768, 4],
        [900,4],
        [1024, 4],
      ],
      navigation : true
  });

  $("#only").owlCarousel({
      itemsCustom : [
        [320,1],
        [360, 2],
        [375, 2],
        [414, 2],
        [568, 2],
        [600, 2],
        [900,2],
        [1024, 2],
      ],
      navigation : true
  });
  
(function (e) {
	  e.fn.countdown = function (t, n) {
	  function i() {
	    eventDate = Date.parse(r.date) / 1e3;
	    currentDate = Math.floor(e.now() / 1e3);
	    if (eventDate <= currentDate) {
	      // n.call(this);
	      // clearInterval(interval)
	    }
	    seconds = eventDate - currentDate;
	    days = Math.floor(seconds / 86400);
	    seconds -= days * 60 * 60 * 24;
	    hours = Math.floor(seconds / 3600);
	    seconds -= hours * 60 * 60;
	    minutes = Math.floor(seconds / 60);
	    seconds -= minutes * 60;
	    days == 1 ? thisEl.find(".timeRefDays").text("day") : thisEl.find(".timeRefDays").text("days");
	    hours == 1 ? thisEl.find(".timeRefHours").text("hour") : thisEl.find(".timeRefHours").text("hours");
	    minutes == 1 ? thisEl.find(".timeRefMinutes").text("minute") : thisEl.find(".timeRefMinutes").text("minutes");
	    seconds == 1 ? thisEl.find(".timeRefSeconds").text("second") : thisEl.find(".timeRefSeconds").text("seconds");
	    if (r["format"] == "on") {
	      days = String(days).length >= 2 ? days : "0" + days;
	      hours = String(hours).length >= 2 ? hours : "0" + hours;
	      minutes = String(minutes).length >= 2 ? minutes : "0" + minutes;
	      seconds = String(seconds).length >= 2 ? seconds : "0" + seconds
	    }
	    if (!isNaN(eventDate)) {
	      thisEl.find(".days").text(days);
	      thisEl.find(".hours").text(hours);
	      thisEl.find(".minutes").text(minutes);
	      thisEl.find(".seconds").text(seconds)
	    } else {
	      alert("Invalid date. Example: 30 Tuesday 2013 15:50:00");
	      clearInterval(interval)
	    }
	  }
	  var thisEl = e(this);
	  var r = {
	    date: null,
	    format: null
	  };
	  t && e.extend(r, t);
	  i();
	  interval = setInterval(i, 1e3)
	  }
	  })(jQuery);
	  $(document).ready(function () {
	  function e() {
	    var e = new Date;
	    e.setDate(e.getDate() + 60);
	    dd = e.getDate();
	    mm = e.getMonth() + 1;
	    y = e.getFullYear();
	    futureFormattedDate = mm + "/" + dd + "/" + y;
	    return futureFormattedDate
	  }
	  $("#countdown1,#countdown2,#countdown3,#countdown4").countdown({
	    date: "2 December 2016 02:00:00", // Change this to your desired date to countdown to
	    format: "on"
	  });
	});
});


/*$(function() {
  var eTop = $('.banner-middle').offset().top; //get the offset top of the element
  $(window).scroll(function() { //when window is scrolled
    if ($(this).scrollTop() > (eTop)) {
        $('#title-recommend').addClass("position-menu");
    } else {
        $('#title-recommend').removeClass("position-menu");
    }
  });
});*/

$(function(){

	$(".scroll-bar").mCustomScrollbar();
	 if($('.menu-slick').length > 0){
	 	$('.menu-slick').dragOn();
	 }
  	
	$(window).resize(function(){
		if(window.innerWidth > 767) {
			var $innerWidth = $(".col-menu").innerWidth() - 30;
		 	$(".menu-left").innerWidth($innerWidth);
		 } else {
		 	$(".menu-left").css("width","100%");
		 }
	});
});
$(window).scroll(function() {

    if ($(this).scrollTop()>50)
     {
        $('#btn-search').show();
     }
    else
     {
      $('#btn-search').hide();
      $('#ip-search').hide();
      $(".title-page").show();
  	  $("p.hotline").show();
  	  $('#btn-search').removeClass("none-display");
     }
 });
$(document).ready(function() {
	// search click==
  $("#btn-search").click(function(){
  	$(this).addClass("none-display");
  	$(".title-page").hide();
  	$("p.hotline").hide();
  	$("#ip-search").css("display","inline-block");
  });
  $("#close-search").click(function(){
  	$(this).hide;
  	$(".title-page").show();
  	$("p.hotline").show();
  	$("#ip-search").hide();
    $('#btn-search').removeClass("none-display");
  });
  // main menu
  $("#main-menu .modal-dialog ul li:nth-child(2)").click(function(){
  	$(this).children().find('i.icon').removeClass("icon-tasua");
  	$(this).children().find('i.icon').addClass("icon-tasua-hover");
  	$(this).find('a').css({"color":"#ff9000","background":"#f1fbfe"});
  	$("#main-menu .modal-dialog ul li:nth-child(3) a i.icon").removeClass("icon-dt-hover");$("#main-menu .modal-dialog ul li:nth-child(3) a i.icon").addClass("icon-t");
  	$("#main-menu .modal-dialog ul li:nth-child(4) a i.icon").removeClass("icon-me-va-pe-hover");$("#main-menu .modal-dialog ul li:nth-child(4) a i.icon").addClass("icon-me-va-pe");
  	$("#main-menu .modal-dialog ul li:nth-child(5) a i.icon").removeClass("icon-thiet-bi-gd-hover");$("#main-menu .modal-dialog ul li:nth-child(5) a i.icon").addClass("icon-thiet-bi-gd");
  	$("#main-menu .modal-dialog ul li:nth-child(6) a i.icon").removeClass("icon-the-thao-hover");$("#main-menu .modal-dialog ul li:nth-child(6) a i.icon").addClass("icon-the-thao");
  	$("#main-menu .modal-dialog ul li:nth-child(7) a i.icon").removeClass("icon-dien-tu-hover");$("#main-menu .modal-dialog ul li:nth-child(7) a i.icon").addClass("icon-dien-tu");
  	$("#main-menu .modal-dialog ul li:nth-child(8) a i.icon").removeClass("icon-thoi-trang-hover");$("#main-menu .modal-dialog ul li:nth-child(8) a i.icon").addClass("icon-thoi-trang");
  	$("#main-menu .modal-dialog ul li:nth-child(9) a i.icon").removeClass("icon-sach-hover");$("#main-menu .modal-dialog ul li:nth-child(9) a i.icon").addClass("icon-sach");
  	$("#main-menu .modal-dialog ul li:nth-child(10) a i.icon").removeClass("icon-thuc-pham-hover");$("#main-menu .modal-dialog ul li:nth-child(10) a i.icon").addClass("icon-thuc-pham");
  	$("#main-menu .modal-dialog ul li:nth-child(11) a i.icon").removeClass("icon-suc-khoe-hover");$("#main-menu .modal-dialog ul li:nth-child(11) a i.icon").addClass("icon-suc-khoe");
  	$("#main-menu .modal-dialog ul li:nth-child(12) a i.icon").removeClass("icon-my-pham-hover");$("#main-menu .modal-dialog ul li:nth-child(12) a i.icon").addClass("icon-my-pham");
  	$("#main-menu .modal-dialog ul li:nth-child(3) a, #main-menu .modal-dialog ul li:nth-child(4) a, #main-menu .modal-dialog ul li:nth-child(5) a, #main-menu .modal-dialog ul li:nth-child(6) a,#main-menu .modal-dialog ul li:nth-child(7) a,#main-menu .modal-dialog ul li:nth-child(8) a,#main-menu .modal-dialog ul li:nth-child(9) a,#main-menu .modal-dialog ul li:nth-child(10) a,#main-menu .modal-dialog ul li:nth-child(11) a,#main-menu .modal-dialog ul li:nth-child(12) a").css({"color":"#252525","background":"#fff"});
  });

   $("#main-menu .modal-dialog ul li:nth-child(3)").click(function(){
	  	$(this).children().find('i.icon').removeClass("icon-t");
	  	$(this).children().find('i.icon').addClass("icon-dt-hover");
	  	$(this).find('a').css({"color":"#ff9000","background":"#f1fbfe"});
	  	$("#main-menu .modal-dialog ul li:nth-child(2) a i.icon").removeClass("icon-tasua-hover");$("#main-menu .modal-dialog ul li:nth-child(2) a i.icon").addClass("icon-tasua");
	  	$("#main-menu .modal-dialog ul li:nth-child(4) a i.icon").removeClass("icon-me-va-pe-hover");$("#main-menu .modal-dialog ul li:nth-child(4) a i.icon").addClass("icon-me-va-pe");
	  	$("#main-menu .modal-dialog ul li:nth-child(5) a i.icon").removeClass("icon-thiet-bi-gd-hover");$("#main-menu .modal-dialog ul li:nth-child(5) a i.icon").addClass("icon-thiet-bi-gd");
	  	$("#main-menu .modal-dialog ul li:nth-child(6) a i.icon").removeClass("icon-the-thao-hover");$("#main-menu .modal-dialog ul li:nth-child(6) a i.icon").addClass("icon-the-thao");
	  	$("#main-menu .modal-dialog ul li:nth-child(7) a i.icon").removeClass("icon-dien-tu-hover");$("#main-menu .modal-dialog ul li:nth-child(7) a i.icon").addClass("icon-dien-tu");
	  	$("#main-menu .modal-dialog ul li:nth-child(8) a i.icon").removeClass("icon-thoi-trang-hover");$("#main-menu .modal-dialog ul li:nth-child(8) a i.icon").addClass("icon-thoi-trang");
	  	$("#main-menu .modal-dialog ul li:nth-child(9) a i.icon").removeClass("icon-sach-hover");$("#main-menu .modal-dialog ul li:nth-child(9) a i.icon").addClass("icon-sach");
	  	$("#main-menu .modal-dialog ul li:nth-child(10) a i.icon").removeClass("icon-thuc-pham-hover");$("#main-menu .modal-dialog ul li:nth-child(10) a i.icon").addClass("icon-thuc-pham");
	  	$("#main-menu .modal-dialog ul li:nth-child(11) a i.icon").removeClass("icon-suc-khoe-hover");$("#main-menu .modal-dialog ul li:nth-child(11) a i.icon").addClass("icon-suc-khoe");
	  	$("#main-menu .modal-dialog ul li:nth-child(12) a i.icon").removeClass("icon-my-pham-hover");$("#main-menu .modal-dialog ul li:nth-child(12) a i.icon").addClass("icon-my-pham");
	  	$("#main-menu .modal-dialog ul li:nth-child(2) a, #main-menu .modal-dialog ul li:nth-child(4) a, #main-menu .modal-dialog ul li:nth-child(5) a, #main-menu .modal-dialog ul li:nth-child(6) a,#main-menu .modal-dialog ul li:nth-child(7) a,#main-menu .modal-dialog ul li:nth-child(8) a,#main-menu .modal-dialog ul li:nth-child(9) a,#main-menu .modal-dialog ul li:nth-child(10) a,#main-menu .modal-dialog ul li:nth-child(11) a,#main-menu .modal-dialog ul li:nth-child(12) a").css({"color":"#252525","background":"#fff"});

	  });
    $("#main-menu .modal-dialog ul li:nth-child(4)").click(function(){
	  	$(this).children().find('i.icon').removeClass("icon-me-va-pe");
	  	$(this).children().find('i.icon').addClass("icon-me-va-pe-hover");
	  	$(this).find('a').css({"color":"#ff9000","background":"#f1fbfe"});
	  	$("#main-menu .modal-dialog ul li:nth-child(2) a i.icon").removeClass("icon-tasua-hover");$("#main-menu .modal-dialog ul li:nth-child(2) a i.icon").addClass("icon-tasua");
	  	$("#main-menu .modal-dialog ul li:nth-child(3) a i.icon").removeClass("icon-dt-hover");$("#main-menu .modal-dialog ul li:nth-child(3) a i.icon").addClass("icon-t");
	  	$("#main-menu .modal-dialog ul li:nth-child(5) a i.icon").removeClass("icon-thiet-bi-gd-hover");$("#main-menu .modal-dialog ul li:nth-child(5) a i.icon").addClass("icon-thiet-bi-gd");
	  	$("#main-menu .modal-dialog ul li:nth-child(6) a i.icon").removeClass("icon-the-thao-hover");$("#main-menu .modal-dialog ul li:nth-child(6) a i.icon").addClass("icon-the-thao");
	  	$("#main-menu .modal-dialog ul li:nth-child(7) a i.icon").removeClass("icon-dien-tu-hover");$("#main-menu .modal-dialog ul li:nth-child(7) a i.icon").addClass("icon-dien-tu");
	  	$("#main-menu .modal-dialog ul li:nth-child(8) a i.icon").removeClass("icon-thoi-trang-hover");$("#main-menu .modal-dialog ul li:nth-child(8) a i.icon").addClass("icon-thoi-trang");
	  	$("#main-menu .modal-dialog ul li:nth-child(9) a i.icon").removeClass("icon-sach-hover");$("#main-menu .modal-dialog ul li:nth-child(9) a i.icon").addClass("icon-sach");
	  	$("#main-menu .modal-dialog ul li:nth-child(10) a i.icon").removeClass("icon-thuc-pham-hover");$("#main-menu .modal-dialog ul li:nth-child(10) a i.icon").addClass("icon-thuc-pham");
	  	$("#main-menu .modal-dialog ul li:nth-child(11) a i.icon").removeClass("icon-suc-khoe-hover");$("#main-menu .modal-dialog ul li:nth-child(11) a i.icon").addClass("icon-suc-khoe");
	  	$("#main-menu .modal-dialog ul li:nth-child(12) a i.icon").removeClass("icon-my-pham-hover");$("#main-menu .modal-dialog ul li:nth-child(12) a i.icon").addClass("icon-my-pham");
	  	$("#main-menu .modal-dialog ul li:nth-child(2) a, #main-menu .modal-dialog ul li:nth-child(3) a, #main-menu .modal-dialog ul li:nth-child(5) a, #main-menu .modal-dialog ul li:nth-child(6) a,#main-menu .modal-dialog ul li:nth-child(7) a,#main-menu .modal-dialog ul li:nth-child(8) a,#main-menu .modal-dialog ul li:nth-child(9) a,#main-menu .modal-dialog ul li:nth-child(10) a,#main-menu .modal-dialog ul li:nth-child(11) a,#main-menu .modal-dialog ul li:nth-child(12) a").css({"color":"#252525","background":"#fff"});

	  });
    $("#main-menu .modal-dialog ul li:nth-child(5)").click(function(){
	  	$(this).children().find('i.icon').removeClass("icon-thiet-bi-gd");
	  	$(this).children().find('i.icon').addClass("icon-thiet-bi-gd-hover");
	  	$(this).find('a').css({"color":"#ff9000","background":"#f1fbfe"});
	  	$("#main-menu .modal-dialog ul li:nth-child(2) a i.icon").removeClass("icon-tasua-hover");$("#main-menu .modal-dialog ul li:nth-child(2) a i.icon").addClass("icon-tasua");
	  	$("#main-menu .modal-dialog ul li:nth-child(3) a i.icon").removeClass("icon-dt-hover");$("#main-menu .modal-dialog ul li:nth-child(3) a i.icon").addClass("icon-t");
	  	$("#main-menu .modal-dialog ul li:nth-child(4) a i.icon").removeClass("icon-me-va-pe-hover");$("#main-menu .modal-dialog ul li:nth-child(4) a i.icon").addClass("icon-me-va-pe");
	  	$("#main-menu .modal-dialog ul li:nth-child(6) a i.icon").removeClass("icon-the-thao-hover");$("#main-menu .modal-dialog ul li:nth-child(6) a i.icon").addClass("icon-the-thao");
	  	$("#main-menu .modal-dialog ul li:nth-child(7) a i.icon").removeClass("icon-dien-tu-hover");$("#main-menu .modal-dialog ul li:nth-child(7) a i.icon").addClass("icon-dien-tu");
	  	$("#main-menu .modal-dialog ul li:nth-child(8) a i.icon").removeClass("icon-thoi-trang-hover");$("#main-menu .modal-dialog ul li:nth-child(8) a i.icon").addClass("icon-thoi-trang");
	  	$("#main-menu .modal-dialog ul li:nth-child(9) a i.icon").removeClass("icon-sach-hover");$("#main-menu .modal-dialog ul li:nth-child(9) a i.icon").addClass("icon-sach");
	  	$("#main-menu .modal-dialog ul li:nth-child(10) a i.icon").removeClass("icon-thuc-pham-hover");$("#main-menu .modal-dialog ul li:nth-child(10) a i.icon").addClass("icon-thuc-pham");
	  	$("#main-menu .modal-dialog ul li:nth-child(11) a i.icon").removeClass("icon-suc-khoe-hover");$("#main-menu .modal-dialog ul li:nth-child(11) a i.icon").addClass("icon-suc-khoe");
	  	$("#main-menu .modal-dialog ul li:nth-child(12) a i.icon").removeClass("icon-my-pham-hover");$("#main-menu .modal-dialog ul li:nth-child(12) a i.icon").addClass("icon-my-pham");
	  	$("#main-menu .modal-dialog ul li:nth-child(2) a, #main-menu .modal-dialog ul li:nth-child(3) a, #main-menu .modal-dialog ul li:nth-child(4) a, #main-menu .modal-dialog ul li:nth-child(6) a,#main-menu .modal-dialog ul li:nth-child(7) a,#main-menu .modal-dialog ul li:nth-child(8) a,#main-menu .modal-dialog ul li:nth-child(9) a,#main-menu .modal-dialog ul li:nth-child(10) a,#main-menu .modal-dialog ul li:nth-child(11) a,#main-menu .modal-dialog ul li:nth-child(12) a").css({"color":"#252525","background":"#fff"});

	  });
    $("#main-menu .modal-dialog ul li:nth-child(6)").click(function(){
	  	$(this).children().find('i.icon').removeClass("icon-the-thao");
	  	$(this).children().find('i.icon').addClass("icon-the-thao-hover");
	  	$(this).find('a').css({"color":"#ff9000","background":"#f1fbfe"});
	  	$("#main-menu .modal-dialog ul li:nth-child(2) a i.icon").removeClass("icon-tasua-hover");$("#main-menu .modal-dialog ul li:nth-child(2) a i.icon").addClass("icon-tasua");
	  	$("#main-menu .modal-dialog ul li:nth-child(3) a i.icon").removeClass("icon-dt-hover");$("#main-menu .modal-dialog ul li:nth-child(3) a i.icon").addClass("icon-t");
	  	$("#main-menu .modal-dialog ul li:nth-child(4) a i.icon").removeClass("icon-me-va-pe-hover");$("#main-menu .modal-dialog ul li:nth-child(4) a i.icon").addClass("icon-me-va-pe");
	  	$("#main-menu .modal-dialog ul li:nth-child(5) a i.icon").removeClass("icon-thiet-bi-gd-hover");$("#main-menu .modal-dialog ul li:nth-child(5) a i.icon").addClass("icon-thiet-bi-gd");
	  	$("#main-menu .modal-dialog ul li:nth-child(7) a i.icon").removeClass("icon-dien-tu-hover");$("#main-menu .modal-dialog ul li:nth-child(7) a i.icon").addClass("icon-dien-tu");
	  	$("#main-menu .modal-dialog ul li:nth-child(8) a i.icon").removeClass("icon-thoi-trang-hover");$("#main-menu .modal-dialog ul li:nth-child(8) a i.icon").addClass("icon-thoi-trang");
	  	$("#main-menu .modal-dialog ul li:nth-child(9) a i.icon").removeClass("icon-sach-hover");$("#main-menu .modal-dialog ul li:nth-child(9) a i.icon").addClass("icon-sach");
	  	$("#main-menu .modal-dialog ul li:nth-child(10) a i.icon").removeClass("icon-thuc-pham-hover");$("#main-menu .modal-dialog ul li:nth-child(10) a i.icon").addClass("icon-thuc-pham");
	  	$("#main-menu .modal-dialog ul li:nth-child(11) a i.icon").removeClass("icon-suc-khoe-hover");$("#main-menu .modal-dialog ul li:nth-child(11) a i.icon").addClass("icon-suc-khoe");
	  	$("#main-menu .modal-dialog ul li:nth-child(12) a i.icon").removeClass("icon-my-pham-hover");$("#main-menu .modal-dialog ul li:nth-child(12) a i.icon").addClass("icon-my-pham");
	  	$("#main-menu .modal-dialog ul li:nth-child(2) a, #main-menu .modal-dialog ul li:nth-child(3) a, #main-menu .modal-dialog ul li:nth-child(4) a, #main-menu .modal-dialog ul li:nth-child(5) a,#main-menu .modal-dialog ul li:nth-child(7) a,#main-menu .modal-dialog ul li:nth-child(8) a,#main-menu .modal-dialog ul li:nth-child(9) a,#main-menu .modal-dialog ul li:nth-child(10) a,#main-menu .modal-dialog ul li:nth-child(11) a,#main-menu .modal-dialog ul li:nth-child(12) a").css({"color":"#252525","background":"#fff"});

	  });
    $("#main-menu .modal-dialog ul li:nth-child(7)").click(function(){
	  	$(this).children().find('i.icon').removeClass("icon-dien-tu");
	  	$(this).children().find('i.icon').addClass("icon-dien-tu-hover");
	  	$(this).find('a').css({"color":"#ff9000","background":"#f1fbfe"});
	  	$("#main-menu .modal-dialog ul li:nth-child(2) a i.icon").removeClass("icon-tasua-hover");$("#main-menu .modal-dialog ul li:nth-child(2) a i.icon").addClass("icon-tasua");
	  	$("#main-menu .modal-dialog ul li:nth-child(3) a i.icon").removeClass("icon-dt-hover");$("#main-menu .modal-dialog ul li:nth-child(3) a i.icon").addClass("icon-t");
	  	$("#main-menu .modal-dialog ul li:nth-child(4) a i.icon").removeClass("icon-me-va-pe-hover");$("#main-menu .modal-dialog ul li:nth-child(4) a i.icon").addClass("icon-me-va-pe");
	  	$("#main-menu .modal-dialog ul li:nth-child(5) a i.icon").removeClass("icon-thiet-bi-gd-hover");$("#main-menu .modal-dialog ul li:nth-child(5) a i.icon").addClass("icon-thiet-bi-gd");
	  	$("#main-menu .modal-dialog ul li:nth-child(6) a i.icon").removeClass("icon-the-thao-hover");$("#main-menu .modal-dialog ul li:nth-child(6) a i.icon").addClass("icon-the-thao");
	  	$("#main-menu .modal-dialog ul li:nth-child(8) a i.icon").removeClass("icon-thoi-trang-hover");$("#main-menu .modal-dialog ul li:nth-child(8) a i.icon").addClass("icon-thoi-trang");
	  	$("#main-menu .modal-dialog ul li:nth-child(9) a i.icon").removeClass("icon-sach-hover");$("#main-menu .modal-dialog ul li:nth-child(9) a i.icon").addClass("icon-sach");
	  	$("#main-menu .modal-dialog ul li:nth-child(10) a i.icon").removeClass("icon-thuc-pham-hover");$("#main-menu .modal-dialog ul li:nth-child(10) a i.icon").addClass("icon-thuc-pham");
	  	$("#main-menu .modal-dialog ul li:nth-child(11) a i.icon").removeClass("icon-suc-khoe-hover");$("#main-menu .modal-dialog ul li:nth-child(11) a i.icon").addClass("icon-suc-khoe");
	  	$("#main-menu .modal-dialog ul li:nth-child(12) a i.icon").removeClass("icon-my-pham-hover");$("#main-menu .modal-dialog ul li:nth-child(12) a i.icon").addClass("icon-my-pham");
	  	$("#main-menu .modal-dialog ul li:nth-child(2) a, #main-menu .modal-dialog ul li:nth-child(3) a, #main-menu .modal-dialog ul li:nth-child(4) a, #main-menu .modal-dialog ul li:nth-child(5) a,#main-menu .modal-dialog ul li:nth-child(6) a,#main-menu .modal-dialog ul li:nth-child(8) a,#main-menu .modal-dialog ul li:nth-child(9) a,#main-menu .modal-dialog ul li:nth-child(10) a,#main-menu .modal-dialog ul li:nth-child(11) a,#main-menu .modal-dialog ul li:nth-child(12) a").css({"color":"#252525","background":"#fff"});

	  });
    $("#main-menu .modal-dialog ul li:nth-child(8)").click(function(){
	  	$(this).children().find('i.icon').removeClass("icon-thoi-trang");
	  	$(this).children().find('i.icon').addClass("icon-thoi-trang-hover");
	  	$(this).find('a').css({"color":"#ff9000","background":"#f1fbfe"});
	  	$("#main-menu .modal-dialog ul li:nth-child(2) a i.icon").removeClass("icon-tasua-hover");$("#main-menu .modal-dialog ul li:nth-child(2) a i.icon").addClass("icon-tasua");
	  	$("#main-menu .modal-dialog ul li:nth-child(3) a i.icon").removeClass("icon-dt-hover");$("#main-menu .modal-dialog ul li:nth-child(3) a i.icon").addClass("icon-t");
	  	$("#main-menu .modal-dialog ul li:nth-child(4) a i.icon").removeClass("icon-me-va-pe-hover");$("#main-menu .modal-dialog ul li:nth-child(4) a i.icon").addClass("icon-me-va-pe");
	  	$("#main-menu .modal-dialog ul li:nth-child(5) a i.icon").removeClass("icon-thiet-bi-gd-hover");$("#main-menu .modal-dialog ul li:nth-child(5) a i.icon").addClass("icon-thiet-bi-gd");
	  	$("#main-menu .modal-dialog ul li:nth-child(6) a i.icon").removeClass("icon-the-thao-hover");$("#main-menu .modal-dialog ul li:nth-child(6) a i.icon").addClass("icon-the-thao");
	  	$("#main-menu .modal-dialog ul li:nth-child(7) a i.icon").removeClass("icon-dien-tu-hover");$("#main-menu .modal-dialog ul li:nth-child(7) a i.icon").addClass("icon-dien-tu");
	  	$("#main-menu .modal-dialog ul li:nth-child(9) a i.icon").removeClass("icon-sach-hover");$("#main-menu .modal-dialog ul li:nth-child(9) a i.icon").addClass("icon-sach");
	  	$("#main-menu .modal-dialog ul li:nth-child(10) a i.icon").removeClass("icon-thuc-pham-hover");$("#main-menu .modal-dialog ul li:nth-child(10) a i.icon").addClass("icon-thuc-pham");
	  	$("#main-menu .modal-dialog ul li:nth-child(11) a i.icon").removeClass("icon-suc-khoe-hover");$("#main-menu .modal-dialog ul li:nth-child(11) a i.icon").addClass("icon-suc-khoe");
	  	$("#main-menu .modal-dialog ul li:nth-child(12) a i.icon").removeClass("icon-my-pham-hover");$("#main-menu .modal-dialog ul li:nth-child(12) a i.icon").addClass("icon-my-pham");
	  	$("#main-menu .modal-dialog ul li:nth-child(2) a, #main-menu .modal-dialog ul li:nth-child(3) a, #main-menu .modal-dialog ul li:nth-child(4) a, #main-menu .modal-dialog ul li:nth-child(5) a,#main-menu .modal-dialog ul li:nth-child(6) a,#main-menu .modal-dialog ul li:nth-child(7) a,#main-menu .modal-dialog ul li:nth-child(9) a,#main-menu .modal-dialog ul li:nth-child(10) a,#main-menu .modal-dialog ul li:nth-child(11) a,#main-menu .modal-dialog ul li:nth-child(12) a").css({"color":"#252525","background":"#fff"});

	  });
    $("#main-menu .modal-dialog ul li:nth-child(9)").click(function(){
	  	$(this).children().find('i.icon').removeClass("icon-sach");
	  	$(this).children().find('i.icon').addClass("icon-sach-hover");
	  	$(this).find('a').css({"color":"#ff9000","background":"#f1fbfe"});
	  	$("#main-menu .modal-dialog ul li:nth-child(2) a i.icon").removeClass("icon-tasua-hover");$("#main-menu .modal-dialog ul li:nth-child(2) a i.icon").addClass("icon-tasua");
	  	$("#main-menu .modal-dialog ul li:nth-child(3) a i.icon").removeClass("icon-dt-hover");$("#main-menu .modal-dialog ul li:nth-child(3) a i.icon").addClass("icon-t");
	  	$("#main-menu .modal-dialog ul li:nth-child(4) a i.icon").removeClass("icon-me-va-pe-hover");$("#main-menu .modal-dialog ul li:nth-child(4) a i.icon").addClass("icon-me-va-pe");
	  	$("#main-menu .modal-dialog ul li:nth-child(5) a i.icon").removeClass("icon-thiet-bi-gd-hover");$("#main-menu .modal-dialog ul li:nth-child(5) a i.icon").addClass("icon-thiet-bi-gd");
	  	$("#main-menu .modal-dialog ul li:nth-child(6) a i.icon").removeClass("icon-the-thao-hover");$("#main-menu .modal-dialog ul li:nth-child(6) a i.icon").addClass("icon-the-thao");
	  	$("#main-menu .modal-dialog ul li:nth-child(7) a i.icon").removeClass("icon-dien-tu-hover");$("#main-menu .modal-dialog ul li:nth-child(7) a i.icon").addClass("icon-dien-tu");
	  	$("#main-menu .modal-dialog ul li:nth-child(8) a i.icon").removeClass("icon-thoi-trang-hover");$("#main-menu .modal-dialog ul li:nth-child(8) a i.icon").addClass("icon-thoi-trang");
	  	$("#main-menu .modal-dialog ul li:nth-child(10) a i.icon").removeClass("icon-thuc-pham-hover");$("#main-menu .modal-dialog ul li:nth-child(10) a i.icon").addClass("icon-thuc-pham");
	  	$("#main-menu .modal-dialog ul li:nth-child(11) a i.icon").removeClass("icon-suc-khoe-hover");$("#main-menu .modal-dialog ul li:nth-child(11) a i.icon").addClass("icon-suc-khoe");
	  	$("#main-menu .modal-dialog ul li:nth-child(12) a i.icon").removeClass("icon-my-pham-hover");$("#main-menu .modal-dialog ul li:nth-child(12) a i.icon").addClass("icon-my-pham");
	  	$("#main-menu .modal-dialog ul li:nth-child(2) a, #main-menu .modal-dialog ul li:nth-child(3) a, #main-menu .modal-dialog ul li:nth-child(4) a, #main-menu .modal-dialog ul li:nth-child(5) a,#main-menu .modal-dialog ul li:nth-child(6) a,#main-menu .modal-dialog ul li:nth-child(7) a,#main-menu .modal-dialog ul li:nth-child(8) a,#main-menu .modal-dialog ul li:nth-child(10) a,#main-menu .modal-dialog ul li:nth-child(11) a,#main-menu .modal-dialog ul li:nth-child(12) a").css({"color":"#252525","background":"#fff"});

	  });
    $("#main-menu .modal-dialog ul li:nth-child(10)").click(function(){
	  	$(this).children().find('i.icon').removeClass("icon-thuc-pham");
	  	$(this).children().find('i.icon').addClass("icon-thuc-pham-hover");
	  	$(this).find('a').css({"color":"#ff9000","background":"#f1fbfe"});
	  	$("#main-menu .modal-dialog ul li:nth-child(2) a i.icon").removeClass("icon-tasua-hover");$("#main-menu .modal-dialog ul li:nth-child(2) a i.icon").addClass("icon-tasua");
	  	$("#main-menu .modal-dialog ul li:nth-child(3) a i.icon").removeClass("icon-dt-hover");$("#main-menu .modal-dialog ul li:nth-child(3) a i.icon").addClass("icon-t");
	  	$("#main-menu .modal-dialog ul li:nth-child(4) a i.icon").removeClass("icon-me-va-pe-hover");$("#main-menu .modal-dialog ul li:nth-child(4) a i.icon").addClass("icon-me-va-pe");
	  	$("#main-menu .modal-dialog ul li:nth-child(5) a i.icon").removeClass("icon-thiet-bi-gd-hover");$("#main-menu .modal-dialog ul li:nth-child(5) a i.icon").addClass("icon-thiet-bi-gd");
	  	$("#main-menu .modal-dialog ul li:nth-child(6) a i.icon").removeClass("icon-the-thao-hover");$("#main-menu .modal-dialog ul li:nth-child(6) a i.icon").addClass("icon-the-thao");
	  	$("#main-menu .modal-dialog ul li:nth-child(7) a i.icon").removeClass("icon-dien-tu-hover");$("#main-menu .modal-dialog ul li:nth-child(7) a i.icon").addClass("icon-dien-tu");
	  	$("#main-menu .modal-dialog ul li:nth-child(8) a i.icon").removeClass("icon-thoi-trang-hover");$("#main-menu .modal-dialog ul li:nth-child(8) a i.icon").addClass("icon-thoi-trang");
	  	$("#main-menu .modal-dialog ul li:nth-child(9) a i.icon").removeClass("icon-sach-hover");$("#main-menu .modal-dialog ul li:nth-child(9) a i.icon").addClass("icon-sach");
	  	$("#main-menu .modal-dialog ul li:nth-child(11) a i.icon").removeClass("icon-suc-khoe-hover");$("#main-menu .modal-dialog ul li:nth-child(11) a i.icon").addClass("icon-suc-khoe");
	  	$("#main-menu .modal-dialog ul li:nth-child(12) a i.icon").removeClass("icon-my-pham-hover");$("#main-menu .modal-dialog ul li:nth-child(12) a i.icon").addClass("icon-my-pham");
	  	$("#main-menu .modal-dialog ul li:nth-child(2) a, #main-menu .modal-dialog ul li:nth-child(3) a, #main-menu .modal-dialog ul li:nth-child(4) a, #main-menu .modal-dialog ul li:nth-child(5) a,#main-menu .modal-dialog ul li:nth-child(6) a,#main-menu .modal-dialog ul li:nth-child(7) a,#main-menu .modal-dialog ul li:nth-child(8) a,#main-menu .modal-dialog ul li:nth-child(9) a,#main-menu .modal-dialog ul li:nth-child(11) a,#main-menu .modal-dialog ul li:nth-child(12) a").css({"color":"#252525","background":"#fff"});

	  });
     $("#main-menu .modal-dialog ul li:nth-child(11)").click(function(){
	  	$(this).children().find('i.icon').removeClass("icon-suc-khoe");
	  	$(this).children().find('i.icon').addClass("icon-suc-khoe-hover");
	  	$(this).find('a').css({"color":"#ff9000","background":"#f1fbfe"});
	  	$("#main-menu .modal-dialog ul li:nth-child(2) a i.icon").removeClass("icon-tasua-hover");$("#main-menu .modal-dialog ul li:nth-child(2) a i.icon").addClass("icon-tasua");
	  	$("#main-menu .modal-dialog ul li:nth-child(3) a i.icon").removeClass("icon-dt-hover");$("#main-menu .modal-dialog ul li:nth-child(3) a i.icon").addClass("icon-t");
	  	$("#main-menu .modal-dialog ul li:nth-child(4) a i.icon").removeClass("icon-me-va-pe-hover");$("#main-menu .modal-dialog ul li:nth-child(4) a i.icon").addClass("icon-me-va-pe");
	  	$("#main-menu .modal-dialog ul li:nth-child(5) a i.icon").removeClass("icon-thiet-bi-gd-hover");$("#main-menu .modal-dialog ul li:nth-child(5) a i.icon").addClass("icon-thiet-bi-gd");
	  	$("#main-menu .modal-dialog ul li:nth-child(6) a i.icon").removeClass("icon-the-thao-hover");$("#main-menu .modal-dialog ul li:nth-child(6) a i.icon").addClass("icon-the-thao");
	  	$("#main-menu .modal-dialog ul li:nth-child(7) a i.icon").removeClass("icon-dien-tu-hover");$("#main-menu .modal-dialog ul li:nth-child(7) a i.icon").addClass("icon-dien-tu");
	  	$("#main-menu .modal-dialog ul li:nth-child(8) a i.icon").removeClass("icon-thoi-trang-hover");$("#main-menu .modal-dialog ul li:nth-child(8) a i.icon").addClass("icon-thoi-trang");
	  	$("#main-menu .modal-dialog ul li:nth-child(9) a i.icon").removeClass("icon-sach-hover");$("#main-menu .modal-dialog ul li:nth-child(9) a i.icon").addClass("icon-sach");
	  	$("#main-menu .modal-dialog ul li:nth-child(10) a i.icon").removeClass("icon-thuc-pham-hover");$("#main-menu .modal-dialog ul li:nth-child(10) a i.icon").addClass("icon-thuc-pham");
	  	$("#main-menu .modal-dialog ul li:nth-child(12) a i.icon").removeClass("icon-my-pham-hover");$("#main-menu .modal-dialog ul li:nth-child(12) a i.icon").addClass("icon-my-pham");
	  	$("#main-menu .modal-dialog ul li:nth-child(2) a, #main-menu .modal-dialog ul li:nth-child(3) a, #main-menu .modal-dialog ul li:nth-child(4) a, #main-menu .modal-dialog ul li:nth-child(5) a,#main-menu .modal-dialog ul li:nth-child(6) a,#main-menu .modal-dialog ul li:nth-child(7) a,#main-menu .modal-dialog ul li:nth-child(8) a,#main-menu .modal-dialog ul li:nth-child(9) a,#main-menu .modal-dialog ul li:nth-child(10) a,#main-menu .modal-dialog ul li:nth-child(12) a").css({"color":"#252525","background":"#fff"});

	  });
     $("#main-menu .modal-dialog ul li:nth-child(12)").click(function(){
	  	$(this).children().find('i.icon').removeClass("icon-my-pham");
	  	$(this).children().find('i.icon').addClass("icon-my-pham-hover");
	  	$(this).find('a').css({"color":"#ff9000","background":"#f1fbfe"});
	  	$("#main-menu .modal-dialog ul li:nth-child(2) a i.icon").removeClass("icon-tasua-hover");$("#main-menu .modal-dialog ul li:nth-child(2) a i.icon").addClass("icon-tasua");
	  	$("#main-menu .modal-dialog ul li:nth-child(3) a i.icon").removeClass("icon-dt-hover");$("#main-menu .modal-dialog ul li:nth-child(3) a i.icon").addClass("icon-t");
	  	$("#main-menu .modal-dialog ul li:nth-child(4) a i.icon").removeClass("icon-me-va-pe-hover");$("#main-menu .modal-dialog ul li:nth-child(4) a i.icon").addClass("icon-me-va-pe");
	  	$("#main-menu .modal-dialog ul li:nth-child(5) a i.icon").removeClass("icon-thiet-bi-gd-hover");$("#main-menu .modal-dialog ul li:nth-child(5) a i.icon").addClass("icon-thiet-bi-gd");
	  	$("#main-menu .modal-dialog ul li:nth-child(6) a i.icon").removeClass("icon-the-thao-hover");$("#main-menu .modal-dialog ul li:nth-child(6) a i.icon").addClass("icon-the-thao");
	  	$("#main-menu .modal-dialog ul li:nth-child(7) a i.icon").removeClass("icon-dien-tu-hover");$("#main-menu .modal-dialog ul li:nth-child(7) a i.icon").addClass("icon-dien-tu");
	  	$("#main-menu .modal-dialog ul li:nth-child(8) a i.icon").removeClass("icon-thoi-trang-hover");$("#main-menu .modal-dialog ul li:nth-child(8) a i.icon").addClass("icon-thoi-trang");
	  	$("#main-menu .modal-dialog ul li:nth-child(9) a i.icon").removeClass("icon-sach-hover");$("#main-menu .modal-dialog ul li:nth-child(9) a i.icon").addClass("icon-sach");
	  	$("#main-menu .modal-dialog ul li:nth-child(10) a i.icon").removeClass("icon-thuc-pham-hover");$("#main-menu .modal-dialog ul li:nth-child(10) a i.icon").addClass("icon-thuc-pham");
	  	$("#main-menu .modal-dialog ul li:nth-child(11) a i.icon").removeClass("icon-suc-khoe-hover");$("#main-menu .modal-dialog ul li:nth-child(11) a i.icon").addClass("icon-suc-khoe");
	  	$("#main-menu .modal-dialog ul li:nth-child(2) a, #main-menu .modal-dialog ul li:nth-child(3) a, #main-menu .modal-dialog ul li:nth-child(4) a, #main-menu .modal-dialog ul li:nth-child(5) a,#main-menu .modal-dialog ul li:nth-child(6) a,#main-menu .modal-dialog ul li:nth-child(7) a,#main-menu .modal-dialog ul li:nth-child(8) a,#main-menu .modal-dialog ul li:nth-child(9) a,#main-menu .modal-dialog ul li:nth-child(10) a,#main-menu .modal-dialog ul li:nth-child(11) a").css({"color":"#252525","background":"#fff"});

	  });

     $(".btn-cat").click(function(){
     	$('.modal').animate({"left":"-1px"}, "slow");
     	$(".modal-backdrop").css("display","block");
     });
     $("#btn-close").click(function(){
     	$('.modal#main-menu').animate({"left":"-290px"}, "slow");
     	$(".modal-backdrop").css("display","none");
     });
     $(".container-header i.icon-hotline").click(function(){
     	$("p.show-hotline").slideToggle("fast");
     });
     // category========

     $("#category .item .half-item .wrap-img a").click(function(){
     	$('#category .item .half-item .wrap-img a').removeClass('active-menu');
     	$('#category .item .half-item .wrap-img a').parent().next().closest('a').removeClass('active-menu1');
     	$(this).addClass('active-menu');
     	$(this).parent().next().closest('a').addClass('active-menu1');
     });

     $(".category-h3 .menu-slick .nav-tabs li.item-menu a.title-menu").click(function(){
     	$(".category-h3 .menu-slick .nav-tabs li.item-menu .sub-menu ").css("display","none");
     	$(this).next().closest('.sub-menu').slideToggle("fast");
     	$(".category-h3 .menu-slick .nav-tabs").addClass("height-menu");
     });

     $("ul.sub-menu li a").click(function(){
     	$("ul.sub-menu li a").removeClass("active-sub-menu");
     	$(this).addClass("active-sub-menu");
     });
// detail=======
     $("#increase").click(function(){
	  var number = $("#number").val();
	  number++;
	  $("#number").val(number);
	});
	$("#decrease").click(function(){
	  var number = $("#number").val();
	  number--;
	  $("#number").val(number);
	});

	// resize selection option==============
	  $('#resizing_select').change(function(){
	    $("#width_tmp_option").html($('#resizing_select option:selected').text()); 
	    $(this).width($("#width_tmp_select").width());  
	  });
	  $('.total-btn li').on('click', function (e) {
	    e.preventDefault();
	    e.stopPropagation();
	    // only do the following if the clicked link isn't already active
	    if(!$(this).closest('li').hasClass('active_')) {
	      $(this).closest('ul').find('.active_').removeClass('active_');
	      // $(this).css("border","none");
	      $(this).closest('li').addClass('active_');
	      $(".total-btn li a div").css("border","none");
	      $(this).unbind("mouseenter mouseleave");
	    }
	});

	$('.total-btn2 li').on('click', function (e) {
	  e.preventDefault();
	  e.stopPropagation();
	  // only do the following if the clicked link isn't already active
	  if(!$(this).closest('li').hasClass('active_')) {
	    $(this).closest('ul').find('.active_').removeClass('active_');
	    $(this).closest('li').addClass('active_');
	    $(".total-btn li a div").css("border","none");
	    $(this).unbind("mouseenter mouseleave");
	  }
	});

	 $("#styled").on('change keyup paste', function(){
	    var length = $(this).val().length;
	    if(length > 0) {
	      $(".text-area").css("display", "none");
	    }
	    else{
	      $(".text-area").css("display","block");
	    }
	  });

	 $(".list-option .item-option i.fa-heart-o").click(function(){
	 	$(this).hide();
	 	$(".list-option .item-option i.fa-heart").show();
	 });

	 $(".tabcontent .btn-show-commend").click(function(){
	 	$(this).hide();
	 	$(".wrap-commend").slideDown( "slow" );
	 });

	 // $(".wrap-commend .send").click(function(){
	 // 	$(".wrap-commend").slideUp( "fast" );
	 // 	$(".tabcontent .btn-show-commend").show();
	 // });

	 // reply answer=========================
	  $("#first-click").click(function(){
	    $("#first-reply").toggle();
	  });

	   $("#second-click").click(function(){
	    $("#second-reply").toggle();
	  });

	    $("#third-click").click(function(){
	    $("#third-reply").toggle();
	  });
	    $(".first-cancel").click(function(){
	      $("#first-reply").slideUp( "slow" );
	    });
	    $(".second-cancel").click(function(){
	      $("#second-reply").slideUp( "slow" );
	    });
	    $(".third-cancel").click(function(){
	      $("#third-reply").slideUp( "slow" );
	    });

	  $("ul.tab li a").click(function(){
	  	$("ul.tab li a").removeClass("active-tab");
	  	$(this).addClass("active-tab");
	  });
	  // cart =======
	  // click input number ===============================
    $(document).on("click", ".plus", function(){
	  var number = parseInt($(this).prev('.col-sm-6').find('p').text(),10);
		number = check_amout(number+1);
	  $(this).prev('.col-sm-6').find('p').text(number);
        $(this).parent().find('input.amout_update').val(number).trigger('change');
	});
	$(document).on("click", ".sub", function(){
	  var number = parseInt($(this).next('.col-sm-6').find('p').text(),10);
		number = check_amout(number-1);
	  $(this).next('.col-sm-6').find('p').text(number);
        if (number != $(this).parent().find('input.amout_update').val()) {
            $(this).parent().find('input.amout_update').val(number).trigger('change');
        }
	});
	$(".show-error-box .close").click(function(){
		$(this).parent(".show-error-box").hide();
	});

	//payment=========
	$("#edit").click(function(){
		$(this).hide();
	    $("#edit-form").slideDown("slow");
	});

	$("#cancel").click(function(){
	  $("#edit-form").slideUp("fast");
	  $("#edit").show();
	});

	$("#click-add").click(function(){
		$(this).hide();
	    $(".wrap-form-no").slideDown("slow");
	});
	$("#cancel1").click(function(){
	  $(".wrap-form-no").slideUp("fast");
	  $("#click-add").show();
	});

	$(".list-type-payment .type").click(function(){
		$(".list-type-payment .type").removeClass("active");
		$(this).addClass("active");
		$('#id_payment').val( $(this).attr('data-value') );
	});

	function truncateText(selector, maxLength) {
	    var element = document.querySelector(selector),
	      truncated = element.innerText;
	    if (truncated.length > maxLength) {
	      truncated = truncated.substr(0,maxLength) + '...';
	    }
	    return truncated;
	  }
	    if($('.id-text').length > 0){
	        document.querySelector('.id-text').innerText = truncateText('.id-text', 60);
	    }
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.scrollup').fadeIn();
    } else {
        $('.scrollup').fadeOut();
    }
    
});

$('.scrollup').click(function () {
    $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
});

$(document).ready(function(){
	// scrooll animate top ====
    $(".sc_animate").click(function() {
        
        if(base_url == location.href){
          var element = $(this).attr('data-id');
          if ('#'+$(element).attr('id') != element) {
              console.log('not found '+element)
              return;
          }
          var h = (!$('#collapseExample').hasClass('collapse') || $('#collapseExample').hasClass('in')) ? 200 : 100;
            $('html, body').animate({
              scrollTop: $(element).offset().top - h
          }, 1000);
        }else{
          localStorage.scroollPage = $(this).attr('data-id');
          location = base_url;
        }        
        
    });
})
    
