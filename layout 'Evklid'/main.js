let swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
});


document.querySelectorAll('.how__btn').forEach(function(tabsBtn) {
    tabsBtn.addEventListener('click', function(e) {
        const path = e.currentTarget.dataset.path;
    
        document.querySelectorAll('.how__btn').forEach(function(btn) {
            btn.classList.remove('how__btn_active')
        })
        e.currentTarget.classList.add('how__btn_active');

        document.querySelectorAll('.how__content').forEach(function(tabsBtn){
            tabsBtn.classList.remove('how__content-active')
        })
        document.querySelector(`[data-target="${path}"]`).classList.add('how__content-active');
    })
});


new Accordion('.accordion-list', {
    elementClass: 'accordion',
    triggerClass: 'accordion__control',
    panelClass: 'accordion__content',
    activeClass: 'accordion--active'
});



let burger = document.querySelector('.burger');
let menu = document.querySelector('.header__nav');
let menuLinks = menu.querySelectorAll('.header__link');

burger.addEventListener('click', function() {
    burger.classList.toggle('burger--active');
    menu.classList.toggle('header__nav--active');
    
    document.body.classList.toggle('stop-scroll');
})

menuLinks.forEach(function(el){
    el.addEventListener('click', function() {
        burger.classList.remove('burger--active');
        menu.classList.remove('header__nav--active');
        document.body.classList.remove('stop-scroll');
    })
})

let searchBtn = document.querySelector('.header__search');
let searchForm = document.querySelector('.header__form');
let closeSearch = document.querySelector('.header__form-close'); 

searchBtn.addEventListener('click', function() {
    searchForm.classList.add('header__form--active')
})

closeSearch.addEventListener('click', function() {
    searchForm.classList.remove('header__form--active')
})
