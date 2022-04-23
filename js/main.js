(() => {
  // <stdin>
  $(window).on("load", function() {
    $(".preloader").fadeOut(100);
  });
  (function($2) {
    "use strict";
    $2(window).scroll(function() {
      $2(".navigation").addClass("nav-bg");
    });
    $2("[data-background]").each(function() {
      $2(this).css({
        "background-image": "url(" + $2(this).data("background") + ")"
      });
    });
    $2("[data-color]").each(function() {
      $2(this).css({
        "background-color": $2(this).data("color")
      });
    });
    $2("[data-progress]").each(function() {
      $2(this).css({
        "bottom": $2(this).data("progress")
      });
    });
    window.onload = function() {
      var parallaxBox = document.getElementById("parallax");
      if (!parallaxBox) {
        return;
      }
      var c2left = document.getElementById("l2").offsetLeft, c2top = document.getElementById("l2").offsetTop, c3left = document.getElementById("l3").offsetLeft, c3top = document.getElementById("l3").offsetTop, c4left = document.getElementById("l4").offsetLeft, c4top = document.getElementById("l4").offsetTop, c5left = document.getElementById("l5").offsetLeft, c5top = document.getElementById("l5").offsetTop, c6left = document.getElementById("l6").offsetLeft, c6top = document.getElementById("l6").offsetTop, c7left = document.getElementById("l7").offsetLeft, c7top = document.getElementById("l7").offsetTop, c8left = document.getElementById("l8").offsetLeft, c8top = document.getElementById("l8").offsetTop, c9left = document.getElementById("l9").offsetLeft, c9top = document.getElementById("l9").offsetTop;
      parallaxBox.onmousemove = function(event) {
        event = event || window.event;
        var x = event.clientX - parallaxBox.offsetLeft, y = event.clientY - parallaxBox.offsetTop;
        mouseParallax("l2", c2left, c2top, x, y, 25);
        mouseParallax("l3", c3left, c3top, x, y, 20);
        mouseParallax("l4", c4left, c4top, x, y, 35);
        mouseParallax("l5", c5left, c5top, x, y, 30);
        mouseParallax("l6", c6left, c6top, x, y, 45);
        mouseParallax("l7", c7left, c7top, x, y, 30);
        mouseParallax("l8", c8left, c8top, x, y, 25);
        mouseParallax("l9", c9left, c9top, x, y, 40);
      };
    };
    function mouseParallax(id, left, top, mouseX, mouseY, speed) {
      var obj = document.getElementById(id);
      var parentObj = obj.parentNode, containerWidth = parseInt(parentObj.offsetWidth), containerHeight = parseInt(parentObj.offsetHeight);
      obj.style.left = left - (mouseX - (parseInt(obj.offsetWidth) / 2 + left)) / containerWidth * speed + "px";
      obj.style.top = top - (mouseY - (parseInt(obj.offsetHeight) / 2 + top)) / containerHeight * speed + "px";
    }
    $2(".testimonial-slider").slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      arrows: false,
      adaptiveHeight: true
    });
    $2(".client-logo-slider").slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      dots: false,
      arrows: false,
      responsive: [
        {
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
    var containerEl = document.querySelector(".shuffle-wrapper");
    let evtInputArray = [];
    if (containerEl) {
      var Shuffle = window.Shuffle;
      var myShuffle = new Shuffle(document.querySelector(".shuffle-wrapper"), {
        itemSelector: ".shuffle-item",
        buffer: 1
      });
      jQuery('input[name="shuffle-filter"]').on("change", function(evt) {
        var input = evt.currentTarget;
        if (input.value === "all") {
          evtInputArray = [];
          document.querySelectorAll('input[name="shuffle-filter"]').forEach(toggle);
        } else if (input.checked) {
          if (document.querySelector('input[name="shuffle-filter"]').checked) {
            document.querySelector('input[name="shuffle-filter"]').click();
          }
          evtInputArray.push(input.value);
        } else if (input.checked === false) {
          evtInputArray.pop(input.value);
        }
        myShuffle.filter(evtInputArray);
      });
    }
  })(jQuery);
  function toggle(elChecked) {
    if (elChecked.checked && elChecked.value !== "all") {
      elChecked.click();
    }
  }
  var { autocomplete, getAlgoliaResults } = window["@algolia/autocomplete-js"];
  window["@algolia/autocomplete-theme-classic"];
  var searchClient = algoliasearch("OIYH3FKG8E", "823977bb091a6aa8c13d5c52edbb18f8");
  if (document.querySelectorAll("#autocomplete").length > 0) {
    autocomplete({
      container: "#autocomplete",
      placeholder: "Search for stories",
      getSources({ query }) {
        return [
          {
            sourceId: "products",
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: "prod_main_Sections",
                    query,
                    params: {
                      hitsPerPage: 5
                    }
                  }
                ]
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
                  attribute: "title"
                })}
                    </div>
                    <div class="aa-ItemContentDescription">
                      ${components.Snippet({
                  hit: item,
                  attribute: "description"
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
              }
            },
            getItemUrl({ item }) {
              return item.url;
            }
          }
        ];
      }
    });
  }
  function slider() {
    const slides = document.querySelectorAll(".slide");
    const btnLeft = document.querySelector(".slides__btn--left");
    const btnRight = document.querySelector(".slides__btn--right");
    const dotContainer = document.querySelector(".dots");
    let curSlide = 0;
    const maxSlide = slides.length;
    function createDots() {
      slides.forEach(function(_, i) {
        dotContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${i}"></button>`);
      });
    }
    ;
    function activateDot(slide) {
      document.querySelectorAll(".dots__dot").forEach((dot) => dot.classList.remove("dots__dot--active"));
      document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
    }
    ;
    function goToSlide(slide) {
      slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
    }
    ;
    function nextSlide() {
      if (curSlide === maxSlide - 1) {
        curSlide = 0;
      } else {
        curSlide++;
      }
      goToSlide(curSlide);
      activateDot(curSlide);
    }
    ;
    function prevSlide() {
      if (curSlide === 0) {
        curSlide = maxSlide - 1;
      } else {
        curSlide--;
      }
      goToSlide(curSlide);
      activateDot(curSlide);
    }
    ;
    function init() {
      goToSlide(0);
      createDots();
      activateDot(0);
    }
    ;
    init();
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);
    document.addEventListener("keydown", function(e) {
      if (e.key === "ArrowLeft")
        prevSlide();
      e.key === "ArrowRight" && nextSlide();
    });
    dotContainer.addEventListener("click", function(e) {
      if (e.target.classList.contains("dots__dot")) {
        const { slide } = e.target.dataset;
        goToSlide(slide);
        activateDot(slide);
      }
    });
  }
  slider();
  function lightbox() {
    const slides = document.querySelectorAll(".modal__slide");
    const btnLeft = document.querySelector(".modal__btn--left");
    const btnRight = document.querySelector(".modal__btn--right");
    const allImgs = document.querySelectorAll(".archive_gallery_figure");
    let curSlide = 0;
    const maxSlide = slides.length;
    function goToSlide(slide) {
      slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
    }
    ;
    function nextSlide() {
      if (curSlide === maxSlide - 1) {
        curSlide = 0;
      } else {
        curSlide++;
      }
      goToSlide(curSlide);
    }
    ;
    function prevSlide() {
      if (curSlide === 0) {
        curSlide = maxSlide - 1;
      } else {
        curSlide--;
      }
      goToSlide(curSlide);
    }
    ;
    allImgs.forEach(function(imgObj, imgIndex) {
      imgObj.addEventListener("click", function(e) {
        curSlide = e.target.dataset.picture;
        goToSlide(e.target.dataset.picture);
      });
    });
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);
  }
  lightbox();
  function vid_slider() {
    const slides = document.querySelectorAll(".vid_slide");
    const btnLeft = document.querySelector(".vid_slides__btn--left");
    const btnRight = document.querySelector(".vid_slides__btn--right");
    const dotContainer = document.querySelector(".vid_dots");
    let curSlide = 0;
    const maxSlide = slides.length;
    function createDots() {
      slides.forEach(function(_, i) {
        dotContainer.insertAdjacentHTML("beforeend", `<button class="vid_dots__dot" data-slide="${i}"></button>`);
      });
    }
    ;
    function activateDot(slide) {
      document.querySelectorAll(".vid_dots__dot").forEach((dot) => dot.classList.remove("vid_dots__dot--active"));
      document.querySelector(`.vid_dots__dot[data-slide="${slide}"]`).classList.add("vid_dots__dot--active");
    }
    ;
    function goToSlide(slide) {
      slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
    }
    ;
    function nextSlide() {
      if (curSlide === maxSlide - 1) {
        curSlide = 0;
      } else {
        curSlide++;
      }
      goToSlide(curSlide);
      activateDot(curSlide);
    }
    ;
    function prevSlide() {
      if (curSlide === 0) {
        curSlide = maxSlide - 1;
      } else {
        curSlide--;
      }
      goToSlide(curSlide);
      activateDot(curSlide);
    }
    ;
    function init() {
      goToSlide(0);
      createDots();
      activateDot(0);
    }
    ;
    init();
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);
    document.addEventListener("keydown", function(e) {
      if (e.key === "ArrowLeft")
        prevSlide();
      e.key === "ArrowRight" && nextSlide();
    });
    dotContainer.addEventListener("click", function(e) {
      if (e.target.classList.contains("vid_dots__dot")) {
        const { slide } = e.target.dataset;
        goToSlide(slide);
        activateDot(slide);
      }
    });
  }
  vid_slider();
})();
