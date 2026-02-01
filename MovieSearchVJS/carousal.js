const carouselTrack = document.querySelector('.carousel-track');
const slides = Array.from(carouselTrack.children);
const nextButton = document.querySelector('.button-right');
const prevButton = document.querySelector('.button-left');
const dotsContainer = document.querySelector('.carousel-nav');
const dots = Array.from(dotsContainer.children);

// Get width of oneslide
const slideWidth = slides[0].getBoundingClientRect().width;
console.log('~slideWidth',slideWidth);

slides.forEach((slide, idx) => {
  slide.style.left = slideWidth * idx + 'px';
});

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

nextButton.addEventListener('click', (e) => {
  const currentSlide = carouselTrack.querySelector('.current-slide');
  const targetSlide = currentSlide.nextElementSibling || slides[0];

  moveToSlide(carouselTrack, currentSlide, targetSlide);
});

prevButton.addEventListener('click', (e) => {
  const currentSlide = carouselTrack.querySelector('.current-slide');
  const targetSlide = currentSlide.previousElementSibling || slides[slides.length - 1];

  moveToSlide(carouselTrack, currentSlide, targetSlide);
});

dotsContainer.addEventListener('click', (e) => {
  const targetDot = e.target.closest('button');
  console.log('~ targetDot',targetDot.closest('button'));

  if (!targetDot) return;

  const currentSlide = document.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot)
  const targetSlide = slides[targetIndex];

  moveToSlide(carouselTrack, currentSlide, targetSlide);

});