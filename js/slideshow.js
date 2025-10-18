const wrapper = document.querySelector(".wrapper");
let slides = document.querySelectorAll(".slide");
let index = 0;

wrapper.innerHTML += wrapper.innerHTML;
slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

function getSlideWidth() {
  return document.querySelector(".slideshow").offsetWidth;
}

function imageSlider() {
  const slideWidth = getSlideWidth();
  index++;
  wrapper.style.transition = "transform 1s ease-in-out";
  wrapper.style.transform = `translateX(${-index * slideWidth}px)`;


  if (index >= totalSlides / 2) {
    setTimeout(() => {
      wrapper.style.transition = "none";
      index = 0;
      wrapper.style.transform = `translateX(0)`;
      setTimeout(() => {
        wrapper.style.transition = "transform 1s ease-in-out";
      }, 20);
    }, 1000);
  }
}

setInterval(imageSlider, 6500);

window.addEventListener("resize", () => {
  const slideWidth = getSlideWidth();
  wrapper.style.transform = `translateX(${-index * slideWidth}px)`;
});

