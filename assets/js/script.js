// Preloader js    
$(window).on('load', function () {
	$('.preloader').fadeOut(100);
});


(function ($) {
	'use strict';

	// Sticky Menu
	$(window).scroll(function () {
		$('.navigation').addClass('nav-bg');
	});

	// Background-images
	$('[data-background]').each(function () {
		$(this).css({
			'background-image': 'url(' + $(this).data('background') + ')'
		});
	});

	// background color
	$('[data-color]').each(function () {
		$(this).css({
			'background-color': $(this).data('color')
		});
	});

	// progress bar
	$('[data-progress]').each(function () {
		$(this).css({
			'bottom': $(this).data('progress')
		});
	});


	/* ########################################### hero parallax ############################################## */
	window.onload = function () {

		var parallaxBox = document.getElementById('parallax');
		/*
		 Fix js error, occurred at pages other than the home page. 
		 When there're no parallax, just ignore the below
		 other operations, as below elements are bingding to the parallax.
		*/
		if (!parallaxBox) {
			return;
		}

		var
			/* c1left = document.getElementById('l1').offsetLeft,
			c1top = document.getElementById('l1').offsetTop, */
			c2left = document.getElementById('l2').offsetLeft,
			c2top = document.getElementById('l2').offsetTop,
			c3left = document.getElementById('l3').offsetLeft,
			c3top = document.getElementById('l3').offsetTop,
			c4left = document.getElementById('l4').offsetLeft,
			c4top = document.getElementById('l4').offsetTop,
			c5left = document.getElementById('l5').offsetLeft,
			c5top = document.getElementById('l5').offsetTop,
			c6left = document.getElementById('l6').offsetLeft,
			c6top = document.getElementById('l6').offsetTop,
			c7left = document.getElementById('l7').offsetLeft,
			c7top = document.getElementById('l7').offsetTop,
			c8left = document.getElementById('l8').offsetLeft,
			c8top = document.getElementById('l8').offsetTop,
			c9left = document.getElementById('l9').offsetLeft,
			c9top = document.getElementById('l9').offsetTop;

		parallaxBox.onmousemove = function (event) {
			event = event || window.event;
			var x = event.clientX - parallaxBox.offsetLeft,
				y = event.clientY - parallaxBox.offsetTop;

			/*  mouseParallax('l1', c1left, c1top, x, y, 5); */
			mouseParallax('l2', c2left, c2top, x, y, 25);
			mouseParallax('l3', c3left, c3top, x, y, 20);
			mouseParallax('l4', c4left, c4top, x, y, 35);
			mouseParallax('l5', c5left, c5top, x, y, 30);
			mouseParallax('l6', c6left, c6top, x, y, 45);
			mouseParallax('l7', c7left, c7top, x, y, 30);
			mouseParallax('l8', c8left, c8top, x, y, 25);
			mouseParallax('l9', c9left, c9top, x, y, 40);
		};

	};

	function mouseParallax(id, left, top, mouseX, mouseY, speed) {
		var obj = document.getElementById(id);
		var parentObj = obj.parentNode,
			containerWidth = parseInt(parentObj.offsetWidth),
			containerHeight = parseInt(parentObj.offsetHeight);
		obj.style.left = left - (((mouseX - (parseInt(obj.offsetWidth) / 2 + left)) / containerWidth) * speed) + 'px';
		obj.style.top = top - (((mouseY - (parseInt(obj.offsetHeight) / 2 + top)) / containerHeight) * speed) + 'px';
	}
	/* ########################################### /hero parallax ############################################## */

	// testimonial-slider
	$('.testimonial-slider').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		arrows: false,
		adaptiveHeight: true
	});


	// clients logo slider
	$('.client-logo-slider').slick({
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: true,
		dots: false,
		arrows: false,
		responsive: [{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 400,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	// Shuffle js filter and masonry
	var containerEl = document.querySelector('.shuffle-wrapper');
	// array used for filtering results
	let evtInputArray = [];
	if (containerEl) {
		var Shuffle = window.Shuffle;
		var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
			itemSelector: '.shuffle-item',
			buffer: 1
		});

		jQuery('input[name="shuffle-filter"]').on('change', function (evt) {
			
			// assign event to variable
			var input = evt.currentTarget;

			if (input.value === "all") {
				
				// if they select all, then make empty so it returns all
				evtInputArray = [];
				// uncheck every other button as well (helps visually understand nothing else is selected)
				document.querySelectorAll('input[name="shuffle-filter"]').forEach(toggle);

			} else if (input.checked) {

				// once user has selected another item ensure the all checkbox isn't "checked"
				if (document.querySelector('input[name="shuffle-filter"]').checked){
					document.querySelector('input[name="shuffle-filter"]').click();
				}

				// add to array so it will be retuned in filter results
				evtInputArray.push(input.value);

			} else if (input.checked === false) {

				// if checked is false then remove value from array
				evtInputArray.pop(input.value);

			}

			// what actually display results based on array
			myShuffle.filter(evtInputArray);
		});
	}



})(jQuery);

function toggle(elChecked) {
	if (elChecked.checked && elChecked.value !== "all") {
		elChecked.click();
	}
}

// slider
// inspired by: https://github.com/jonasschmedtmann/complete-javascript-course/blob/8201b01f2fcd274fb276c1c8e11e55847c6d451e/13-Advanced-DOM-Bankist/final/script.js#L207-L291
function slider () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slides__btn--left');
  const btnRight = document.querySelector('.slides__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
   function createDots() {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

   function activateDot (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

   function goToSlide (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
   function nextSlide () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

   function prevSlide () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

   function init () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// Lightbox
// inspired by: https://github.com/jonasschmedtmann/complete-javascript-course/blob/8201b01f2fcd274fb276c1c8e11e55847c6d451e/13-Advanced-DOM-Bankist/final/script.js#L207-L291
// & https://www.w3schools.com/howto/howto_js_lightbox.asp
function lightbox () {
  const slides = document.querySelectorAll('.modal__slide');
  const btnLeft = document.querySelector('.modal__btn--left');
  const btnRight = document.querySelector('.modal__btn--right');
  const allImgs = document.querySelectorAll('.archive_gallery_figure')

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions

   function goToSlide (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
   function nextSlide () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
  };

   function prevSlide () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  // data-picture set by hugo on build
  allImgs.forEach(function (imgObj, imgIndex) {
    imgObj.addEventListener('click', function(e) {
      curSlide = e.target.dataset.picture;
      goToSlide(e.target.dataset.picture);
    });
  })
  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

};
lightbox();
