$(document).ready(function() {
	
	var $ = jQuery.noConflict();
	jQuery(window).trigger('resize').trigger('scroll');
	
	// Open Page With Popup
	
	$('.popup-page').fancybox({
		maxWidth : 800,
		maxHeight : 800,
		width : '100%',
		height: '75%',
		fitToView	: false,
		autoSize	: false,
		closeBtn : false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		scrolling : 'auto'
	});
	
	// Parallax effect
	
	$('.parallax-window').parallax();
	
	// Animate top to bottom page
	
	$('.nav-menu__item a[href^="#"]').on('click', function(){
		var that = this;
		$('html, body').animate({
		scrollTop:	$($(that).attr('href')).offset().top}, 1000);
	});
	
	// Show social icon
	
	$('.i-share').on('click', function() {
		$('.social-network').toggleClass('social-show')
	});
	
	// Animate block
	
	$('.animate-block').addClass('hide-block').viewportChecker({
		classToAdd: 'show-block animated fadeIn', offset: 100
	});
	
	// Google Maps
	
	$('.g-map').fancybox({
		fitToView	: false,
		width		: '100%',
		height		: '100%',
		autoSize	: true,
		closeBtn : true,
		closeClick	: true,
		openEffect	: 'none',
		closeEffect	: 'none'
	});
	
	// List item timeout
  
  $('.logo__list_left li').each(function (index) {
  var item = $(this);  
  setTimeout(function () {
    item.addClass('flipInY');
  }, index * 1000);
  });
	
  var itemsCount = $('.logo__list_right li').length;
  $('.logo__list_right li').each(function (index) {
  var item = $(this);
  setTimeout(function () {
    item.addClass('flipInY');
  }, (itemsCount - index - 1) * 1000);
  });
	
	// Animate Scroll Page
	
	$('.nav-menu__item a[href^="#"]').on('click', function(){
		var that = this;
		$('html, body').animate({
			scrollTop: $($(that).attr('href')).offset().top}, 1000);
		});
	
	// Lightslider 
	
	$('.a-slider').lightSlider({
		speed: 1000, 
		auto: true,
		pauseOnHover: true,
		loop: true,
		slideEndAnimation: true,
		pause: 2000,
		item: 1,
		slideMove: 1,
		easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
		responsive : [
			{
				breakpoint:769,
				settings: {
						item: 1,
						slideMove: 1,
					}
			},
			{
				breakpoint:480,
				settings: {
					item: 1,
					slideMove: 1
				}
			}
		]
	});
	

	// Forms Validation

	$('[type="submit"]').click(function(){
	});
	var app = {
		initialize : function() {			
			this.modules();
			this.setUpListeners();
		},
		modules: function () {
		},
		setUpListeners: function() {
			$('form').on('submit', app.submitForm);
			$('form input, form textarea').on('blur', app.validateForm);
		},
 
		submitForm: function(e) {
			e.preventDefault();
			var form = $(this);
				submitBtn = form.find('[type="submit"]');
			if ( app.validateForm(form) === false ) {
				return false;
			}
			submitBtn.attr('disabled');
			
			// Ajax 
			
			var str = form.serialize();
				$.ajax({
					url: '../php/contact_process.php',
					type: 'POST',
					data: str
				})
				.done(function(msg) {
					if(msg === "OK"){
						
					}else{
							form.html(msg);
					}
				})
				.always(function() {
					submitBtn.removeAttr('disabled');
				});
		},		
		validateForm: function(form) {
			if (this.tagName != 'form') {
				form = $(this).parents('form');
			}
			var inputs = form.find('input');
				var valid = true;
			$.each(inputs, function(index, val) {
				var input = $(val),
						val = input.val(),
						formGroup = input.parents('.form-group');
						label = formGroup.find('label').text().toLocaleLowerCase()
				if(val.length === 0) {
					formGroup.addClass('has-error').removeClass('has-success');
					valid = false;
				} else {
					formGroup.addClass('has-success').removeClass('has-error');
				}
			});
			return valid;
		} 
	}
	app.initialize();
}());


