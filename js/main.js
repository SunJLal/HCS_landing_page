jQuery(document).ready(function($){
	var animating = false;
	setSlider();
	$(window).on('scroll resize', function(){
		(!window.requestAnimationFrame) ? setSlider() : window.requestAnimationFrame(setSlider);
	});
    $('.vertical-nav .prev').on('click', function(){
    	prevSection();
    });
    $('.vertical-nav .next').on('click', function(){
    	nextSection();
    });
    $(document).keydown(function(event){
		if( event.which=='38' ) {
			prevSection();
			event.preventDefault();
		} else if( event.which=='40' ) {
			nextSection();
			event.preventDefault();
		}
	});
	function nextSection() {
		if (!animating) {
			if ($('.is-visible[data-type="slider-item"]').next().length > 0) smoothScroll($('.is-visible[data-type="slider-item"]').next());
		}
	}
	function prevSection() {
		if (!animating) {
			var prevSection = $('.is-visible[data-type="slider-item"]');
			if(prevSection.length > 0 && $(window).scrollTop() != prevSection.offset().top) {
				smoothScroll(prevSection);
			} else if(prevSection.prev().length > 0 && $(window).scrollTop() == prevSection.offset().top) {
				smoothScroll(prevSection.prev('[data-type="slider-item"]'));
			}
		}
	}
	function setSlider() {
		checkNavigation();
		checkVisibleSection();
	}
	function checkNavigation() {
		( $(window).scrollTop() < $(window).height()/2 ) ? $('.vertical-nav .prev').addClass('inactive') : $('.vertical-nav .prev').removeClass('inactive');
		( $(window).scrollTop() > $(document).height() - 3*$(window).height()/2 ) ? $('.vertical-nav .next').addClass('inactive') : $('.vertical-nav .next').removeClass('inactive');
	}
	function checkVisibleSection() {
		var scrollTop = $(window).scrollTop(),
			windowHeight = $(window).height();

		$('[data-type="slider-item"]').each(function(){
			var actualBlock = $(this),
				offset = scrollTop - actualBlock.offset().top;
			//add/remove .is-visible class if the section is in the viewport - it is used to navigate through the sections
			( offset >= 0 && offset < windowHeight ) ? actualBlock.addClass('is-visible') : actualBlock.removeClass('is-visible');
		});
	}
	function smoothScroll(target) {
		animating = true;
        $('body,html').animate({'scrollTop': target.offset().top}, 500, function(){ animating = false; });
	}
});