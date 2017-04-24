$(document).ready(function(){
	$('.apartments').lightSlider({
	gallery:true,
	item:1,
	loop:true,
	thumbItem:4,
	slideMargin:0,
	enableDrag: false,
	currentPagerPosition:'left',
	controls: false,
		onSliderLoad: function(el) {
			el.lightGallery({
				selector: '.apartments .lslide'
			});
		}   
	}); 
});
