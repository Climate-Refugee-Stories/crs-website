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

	// Background color
	$('[data-color]').each(function () {
		$(this).css({
			'background-color': $(this).data('color')
		});
	});

	// Progress bar
	$('[data-progress]').each(function () {
		$(this).css({
			'bottom': $(this).data('progress')
		});
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
const { autocomplete, getAlgoliaResults } = window['@algolia/autocomplete-js'];
window['@algolia/autocomplete-theme-classic'];
const searchClient = algoliasearch(
  'OIYH3FKG8E',
  '823977bb091a6aa8c13d5c52edbb18f8'
);
  
if (document.querySelectorAll('#autocomplete').length > 0) {

  // https://web.archive.org/web/20210507081651/https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/
  // https://web.archive.org/web/20210728231815/https://www.bennet.org/blog/site-search-jamstack-hugo-algolia/ 
  
  autocomplete({
    container: '#autocomplete',
    placeholder: 'Search for stories',
    getSources({ query }) {
      return [
        {
          sourceId: 'products',
          getItems() {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: 'prod_main_Sections',
                  query,
                  params: {
                    hitsPerPage: 5,
                  },
                },
              ],
            });
          },
          templates: {
            item({ item, components, html }) {
              return html`<div class="aa-ItemWrapper">
  			  <a href="${item.url}">
                <div class="aa-ItemContent">
                  <div class="aa-ItemIcon aa-ItemIcon--alignTop">
                    <img
                      src="${item.image}"
                      alt="${item.title}"
                      width="40"
                      height="40"
                    />
                  </div>
                  <div class="aa-ItemContentBody">
                    <div class="aa-ItemContentTitle">
                      ${components.Highlight({
                        hit: item,
                        attribute: 'title',
                      })}
                    </div>
                    <div class="aa-ItemContentDescription">
                      ${components.Snippet({
                        hit: item,
                        attribute: 'description',
                      })}
                    </div>
                  </div>
                  <div class="aa-ItemActions">
                    <button
                      class="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                      type="button"
                      title="Select"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path
                          d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z"
                        />
                      </svg>
                    </button>
                    <button
                      class="aa-ItemActionButton"
                      type="button"
                      title="Add to cart"
                    >
                    </button>
                  </div>
                </div>
  			  </a>
              </div>`;
            },
  		},
  		getItemUrl({ item }) {
            return item.url;
          },
        },
      ];
    },
  });

}

// archive picture slider
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

function vid_slider () {
  const slides = document.querySelectorAll('.vid_slide');
  const btnLeft = document.querySelector('.vid_slides__btn--left');
  const btnRight = document.querySelector('.vid_slides__btn--right');
  const dotContainer = document.querySelector('.vid_dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
   function createDots() {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="vid_dots__dot" data-slide="${i}"></button>`
      );
    });
  };

   function activateDot (slide) {
    document
      .querySelectorAll('.vid_dots__dot')
      .forEach(dot => dot.classList.remove('vid_dots__dot--active'));

    document
      .querySelector(`.vid_dots__dot[data-slide="${slide}"]`)
      .classList.add('vid_dots__dot--active');
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
    if (e.target.classList.contains('vid_dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
vid_slider();
