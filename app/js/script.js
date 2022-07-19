console.log("hello from script.js");

// Header open and close hamburgur menu
const btnHamburgur = document.querySelector('#jsbtnHamburgur')
const header = document.querySelector('.header')
const fadeElems = document.querySelectorAll('.has-fade')
const body = document.querySelector('body')
const logo = document.querySelector('.header__logo')

btnHamburgur.addEventListener('click', function(){ 
    console.log(fadeElems)
    
    if(header.classList.contains('open')){ // Close hamburgur menu
        body.classList.remove('noscroll')
        header.classList.remove('open')
        logo.classList.remove('visually-hidden')
        fadeElems.forEach(function(element){
            element.classList.remove('fade-in')
            element.classList.add('fade-out')
        });
    } 
    else { // Open hamburgur menu
        body.classList.add('noscroll')
        header.classList.add('open') 
        logo.classList.add('visually-hidden')
        fadeElems.forEach(function(element){
            element.classList.remove('fade-out')
            element.classList.add('fade-in')
            
        });
    } 
})

// Owl Carousel
jQuery(document).ready(function($) {
    $('.owl-carousel').owlCarousel({
        loop:true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            }
        },
        dots:false,
        navText: ["<img src='images/icon-angle-left.svg'>","<img src='images/icon-angle-right.svg'>"],
        smartSpeed: 1000,

    });
});
