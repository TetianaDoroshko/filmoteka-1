function e(e,t,i,s){Object.defineProperty(e,t,{get:i,set:s,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s={},n={},a=i.parcelRequired76b;function r(){return{headerRef:{},homeRef:{},libraryRef:{},paginationRef:{container:document.querySelector(".pagination"),items:document.querySelectorAll(".pagination__item"),paginationList:document.querySelector(".pagination__list"),pages:document.querySelectorAll(".js-page"),link:document.querySelectorAll(".pagitation__link"),prev:document.querySelector(".prev-js"),next:document.querySelector(".next-js"),first:document.querySelector(".first-js"),last:document.querySelector(".last-js"),prevMore:document.querySelector(".prevMore-js"),nextMore:document.querySelector(".nextMore-js")},modalTeamRef:{},libraryRef:{},galleryRef:{},filmDetailsRef:{},footerRef:{}}}null==a&&((a=function(e){if(e in s)return s[e].exports;if(e in n){var t=n[e];delete n[e];var i={id:e,exports:{}};return s[e]=i,t.call(i.exports,i,i.exports),i.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},i.parcelRequired76b=a),a.register("kyEFX",(function(t,i){var s,n;e(t.exports,"register",(function(){return s}),(function(e){return s=e})),e(t.exports,"resolve",(function(){return n}),(function(e){return n=e}));var a={};s=function(e){for(var t=Object.keys(e),i=0;i<t.length;i++)a[t[i]]=e[t[i]]},n=function(e){var t=a[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),a("kyEFX").register(JSON.parse('{"5ZPII":"index.9c895af7.js","lp5u4":"sprite.14857d77.svg"}'));var o;function l(e){let i="";const s=e>9?"":"is-hidden";for(let t=1;t<=e&&!(window.matchMedia("(max-width: 767px)").matches&&e>9&&6===t)&&!(e>9&&10===t);t+=1)i+=`<li class="pagination__item js-page" data-num='${t}'><a class="pagination__link" href="#">${t}</a></li>`;return`\n  <ul class="pagination__list">\n      <li class="button prev-js pagination__item"><svg class="button__icon" width="16" height ="16">\n          <use href="${t(o)}#arrow-right"></use>\n        </svg></li>\n      <li class="pagination__item first-js is-hidden hidden"><a class="pagination__link" href="#">1</a></li>\n      <li class="pagination__item prevMore-js is-hidden hidden"><a class="pagination__link" href="#">...</a></li>\n      ${i}\n      <li class="pagination__item ${s} nextMore-js hidden"><a class="pagination__link" href="#">...</a></li>\n      <li class="pagination__item ${s} last-js hidden"><a class="pagination__link" href="#">${e}</a></li>\n      <li class="button next-js pagination__item"><svg class="button__icon" width="16" height="16">\n          <use href="${t(o)}#arrow-left"></use>\n        </svg></li>\n\n    </ul>`}o=new URL(a("kyEFX").resolve("lp5u4"),import.meta.url).toString();const{paginationRef:d}=r();function c(e){const t=l(e);d.container.innerHTML=t}var u={API_KEY:"06cf6ee022a0922eb5200ae030143d7b",API_BASE_URL:"https://api.themoviedb.org/3/",TRENDING_PATH_PARAMS:"trending/all/day",SEARCH_PATH_PARAMS:"search/movie",DETAILS_PATH_PARAMS:"movie/",IMAGE_BASE_URL:"https://image.tmdb.org/t/p/w1280",GENRES_PATH_PARAMS:"genre/movie/list"};const{API_KEY:p,API_BASE_URL:g,TRENDING_PATH_PARAMS:f}=u;let m,_,h=1;function v(e){e.preventDefault(),e.target.classList.contains("pagination__item")&&(e.target.classList.contains("js-page")&&(h=Number(e.target.dataset.num)),e.target.classList.contains("prev-js")&&h>1&&(h-=1),e.target.classList.contains("next-js")&&h<_&&(h+=1),e.target.classList.contains("first-js")&&(h=1,R()),e.target.classList.contains("last-js")&&(h=_,R()),e.target.classList.contains("prevMore-js")&&(h=+m.pages[1].dataset.num,R()),e.target.classList.contains("nextMore-js")&&(h=+m.pages[m.pages.length-2].dataset.num,R()),L(),A(),b())}function L(){m.items.forEach((e=>{e.classList.remove("active"),+e.dataset.num===h&&e.classList.add("active")}))}function A(){window.matchMedia("(min-width: 768px)").matches?_>9&&(h<=5?(m.first.classList.add("is-hidden"),m.prevMore.classList.add("is-hidden"),m.pages[0].classList.remove("is-hidden"),m.pages[1].classList.remove("is-hidden")):(m.first.classList.remove("is-hidden"),m.prevMore.classList.remove("is-hidden"),m.pages[0].classList.add("is-hidden"),m.pages[1].classList.add("is-hidden")),function(){const e=m.pages.length-1;h>=_-4?(m.last.classList.add("is-hidden"),m.nextMore.classList.add("is-hidden"),m.pages[e-1].classList.remove("is-hidden"),m.pages[e].classList.remove("is-hidden")):(m.last.classList.remove("is-hidden"),m.nextMore.classList.remove("is-hidden"),m.pages[e-1].classList.add("is-hidden"),m.pages[e].classList.add("is-hidden"))}(),h>=4&&h<=_-2&&R(),L()):(h>=2&&h<=_-1&&R(),L())}function R(){let e=h-4;h<=1?e=h:h<=3?e=h-2:h<=4&&(e=h-3),h>=_?e=h-8:h>=_-2?e=h-6:h>=_-3&&(e=h-5),window.matchMedia("(max-width: 768px)").matches&&(e=h-2,h<=2&&(e=h-1),h<=1&&(e=h),h>=_-1&&(e=h-3));for(let t=e,i=0;i<m.pages.length;t+=1,i+=1)m.pages[i].firstElementChild.textContent=t,m.pages[i].dataset.num=t}function b(){h<=1?m.prev.classList.add("disabled"):m.prev.classList.remove("disabled"),h>=_?m.next.classList.add("disabled"):m.next.classList.remove("disabled")}!function(e){if(_=e,e<=1)return;c(e),m=r().paginationRef,L(),A(),b(),m.paginationList.addEventListener("click",v)}(20);
//# sourceMappingURL=index.9c895af7.js.map