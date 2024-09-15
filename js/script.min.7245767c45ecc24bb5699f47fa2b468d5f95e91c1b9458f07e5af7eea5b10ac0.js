(()=>{$(window).on("load",function(){$(".preloader").fadeOut(100)}),function(e){"use strict";e(window).scroll(function(){e(".navigation").addClass("nav-bg")}),e("[data-background]").each(function(){e(this).css({"background-image":"url("+e(this).data("background")+")"})}),e("[data-color]").each(function(){e(this).css({"background-color":e(this).data("color")})}),e("[data-progress]").each(function(){e(this).css({bottom:e(this).data("progress")})}),s=document.querySelector(".shuffle-wrapper");let n=[];if(s){var s,o=window.Shuffle,i=new o(document.querySelector(".shuffle-wrapper"),{itemSelector:".shuffle-item",buffer:1});jQuery('input[name="shuffle-filter"]').on("change",function(e){var s=e.currentTarget;s.value==="all"?(n=[],document.querySelectorAll('input[name="shuffle-filter"]').forEach(t)):s.checked?(document.querySelector('input[name="shuffle-filter"]').checked&&document.querySelector('input[name="shuffle-filter"]').click(),n.push(s.value)):s.checked===!1&&n.pop(s.value),i.filter(n)})}}(jQuery);function t(e){e.checked&&e.value!=="all"&&e.click()}var{autocomplete:n,getAlgoliaResults:s}=window["@algolia/autocomplete-js"],e;window["@algolia/autocomplete-theme-classic"],e=algoliasearch("OIYH3FKG8E","823977bb091a6aa8c13d5c52edbb18f8"),document.querySelectorAll("#autocomplete").length>0&&n({container:"#autocomplete",placeholder:"Search for stories",getSources({query:t}){return[{sourceId:"products",getItems(){return s({searchClient:e,queries:[{indexName:"prod_main_Sections",query:t,params:{hitsPerPage:5}}]})},templates:{item({item:e,components:t,html:n}){return n`<div class="aa-ItemWrapper">
  			  <a href="${e.url}">
                <div class="aa-ItemContent">
                  <div class="aa-ItemIcon aa-ItemIcon--alignTop">
                    <img
                      src="${e.image}"
                      alt="${e.title}"
                      width="40"
                      height="40"
                    />
                  </div>
                  <div class="aa-ItemContentBody">
                    <div class="aa-ItemContentTitle">
                      ${t.Highlight({hit:e,attribute:"title"})}
                    </div>
                    <div class="aa-ItemContentDescription">
                      ${t.Snippet({hit:e,attribute:"description"})}
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
              </div>`}},getItemUrl({item:e}){return e.url}}]}});function o(){let s=document.querySelectorAll(".slide"),c=document.querySelector(".slides__btn--left"),l=document.querySelector(".slides__btn--right"),o=document.querySelector(".dots"),e=0,i=s.length;function d(){s.forEach(function(e,t){o.insertAdjacentHTML("beforeend",`<button class="dots__dot" data-slide="${t}"></button>`)})}function t(e){document.querySelectorAll(".dots__dot").forEach(e=>e.classList.remove("dots__dot--active")),document.querySelector(`.dots__dot[data-slide="${e}"]`).classList.add("dots__dot--active")}function n(e){s.forEach((t,n)=>t.style.transform=`translateX(${100*(n-e)}%)`)}function a(){e===i-1?e=0:e++,n(e),t(e)}function r(){e===0?e=i-1:e--,n(e),t(e)}function u(){n(0),d(),t(0)}u(),l.addEventListener("click",a),c.addEventListener("click",r),document.addEventListener("keydown",function(e){e.key==="ArrowLeft"&&r(),e.key==="ArrowRight"&&a()}),o.addEventListener("click",function(e){if(e.target.classList.contains("dots__dot")){let{slide:s}=e.target.dataset;n(s),t(s)}})}o();function i(){let n=document.querySelectorAll(".modal__slide"),o=document.querySelector(".modal__btn--left"),i=document.querySelector(".modal__btn--right"),a=document.querySelectorAll(".archive_gallery_figure"),e=0,s=n.length;function t(e){n.forEach((t,n)=>t.style.transform=`translateX(${100*(n-e)}%)`)}function r(){e===s-1?e=0:e++,t(e)}function c(){e===0?e=s-1:e--,t(e)}a.forEach(function(n){n.addEventListener("click",function(n){e=n.target.dataset.picture,t(n.target.dataset.picture)})}),i.addEventListener("click",r),o.addEventListener("click",c)}i();function a(){let s=document.querySelectorAll(".vid_slide"),c=document.querySelector(".vid_slides__btn--left"),l=document.querySelector(".vid_slides__btn--right"),o=document.querySelector(".vid_dots"),e=0,i=s.length;function d(){s.forEach(function(e,t){o.insertAdjacentHTML("beforeend",`<button class="vid_dots__dot" data-slide="${t}"></button>`)})}function t(e){document.querySelectorAll(".vid_dots__dot").forEach(e=>e.classList.remove("vid_dots__dot--active")),document.querySelector(`.vid_dots__dot[data-slide="${e}"]`).classList.add("vid_dots__dot--active")}function n(e){s.forEach((t,n)=>t.style.transform=`translateX(${100*(n-e)}%)`)}function a(){e===i-1?e=0:e++,n(e),t(e)}function r(){e===0?e=i-1:e--,n(e),t(e)}function u(){n(0),d(),t(0)}u(),l.addEventListener("click",a),c.addEventListener("click",r),document.addEventListener("keydown",function(e){e.key==="ArrowLeft"&&r(),e.key==="ArrowRight"&&a()}),o.addEventListener("click",function(e){if(e.target.classList.contains("vid_dots__dot")){let{slide:s}=e.target.dataset;n(s),t(s)}})}a()})()