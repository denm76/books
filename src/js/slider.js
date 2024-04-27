'use strict';

let images = [{
    url: "../images/banner.png",
    title: "Rostov-on-Don\n" +
        "LCD admiral",
    anchor: "rostov-on-don,admiral",
    apartmentArea: "81 m2",
    repairTime: "3.5 months",
    repairCost: "Upon request"
}, {
    url: "../images/banner.png",
    title: "Sochi\n" +
        "Thieves",
    anchor: "sochi thieves",
    apartmentArea: "105 m2",
    repairTime: "4 months",
    repairCost: "Upon request"
}, {
    url: "../images/banner.png",
    title: "Rostov-on-Don\n" +
        "Patriotic",
    anchor: "rostov-on-don,patriotic",
    apartmentArea: "93 m2",
    repairTime: "3 months",
    repairCost: "Upon request"
}];




function initSlider(options) {
    if (!images || !images.length) return;

    options = options || {
        dots: true,
        autoplay: false
    };

    let sliderImages = document.querySelector(".slider__images");
    let sliderArrows = document.querySelector(".slider__navigation");
    let sliderDots = document.querySelector(".slider__dots");
    let sliderAnchors = document.querySelector(".menu__list");
    let hotelName = document.querySelector(".variant__city-descr");
    let areaDescription = document.querySelector(".variant__area-descr");
    let repairTimeDescription = document.querySelector(".variant__repairtime-descr");
    let repairCostDescription = document.querySelector(".variant__repaircost-descr");

    initImages();
    addAnchors();
    initArrows();
    initAnchors();

    if (options.dots) {
        initDots();
    }

    if (options.autoplay) {
        initAutoplay();
    }

    function fillSliderOptions(num) {
        hotelName.innerText = images[num].title;
        areaDescription.innerText = images[num].apartmentArea;
        repairTimeDescription.innerText = images[num].repairTime;
        repairCostDescription.innerText = images[num].repairCost;
    }

    function initImages() {
        images.forEach((image, index) => {
            let imageDiv = `<div class="image n${index} ${index === 0 ? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
            sliderImages.innerHTML += imageDiv;
        });
    }

    function addAnchors() {
        images.forEach((item, index) => {
            let anchor = `<li class="menu__item"><a href=""
            class="menu__link n${index} ${index === 0 ? "active" : ""}" data-index="${index}">${item.anchor}</a></li>`;
            sliderAnchors.innerHTML += anchor;
        })
    }

    function initArrows() {
        sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
            arrow.addEventListener("click", function () {
                let curNumber = +sliderImages.querySelector(".active").dataset.index;
                let nextNumber;
                if (arrow.classList.contains("left")) {
                    nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
                } else {
                    nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
                }
                moveSlider(nextNumber);
                fillSliderOptions(nextNumber);
            });
        });
    }

    function initAnchors() {
        sliderAnchors.querySelectorAll(".menu__link").forEach((anchor, index) => {
            anchor.addEventListener("click", function (e) {
                e.preventDefault();
                moveSlider(index);
                fillSliderOptions(index);
            });
        });

    }

    function initDots() {
        images.forEach((image, index) => {
            let dot = `<div class="slider__dots-item n${index} ${index === 0 ? "active" : ""}" data-index="${index}"></div>`;
            sliderDots.innerHTML += dot;
        });
        sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
            dot.addEventListener("click", function () {
                moveSlider(this.dataset.index);
                fillSliderOptions(this.dataset.index);
            })
        })
    }

    function moveSlider(num) {
        sliderAnchors.querySelector(".active").classList.remove("active");
        sliderAnchors.querySelector(".n" + num).classList.add("active");
        sliderImages.querySelector(".active").classList.remove("active");
        sliderImages.querySelector(".n" + num).classList.add("active");
        sliderDots.querySelector(".active").classList.remove("active");
        sliderDots.querySelector(".n" + num).classList.add("active");

    }

    function initAutoplay() {
        setInterval(() => {
            let curNumber = +sliderImages.querySelector(".active").dataset.index;
            let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
            moveSlider(nextNumber);
            fillSliderOptions(nextNumber);
        }, options.autoplayInterval);
    }
}

let sliderOptions = {
    dots: true,
    autoplay: true,
    autoplayInterval: 7000
};

document.addEventListener("DOMContentLoaded", function () {
    initSlider(sliderOptions);
});

