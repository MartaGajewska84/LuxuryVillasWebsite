const list = document.querySelector('.gallery-carousel__img-container--list');
const imgs = Array.from(list.children);
const nextBtn = document.querySelector('.gallery-carousel__btn--right');
const previousBtn = document.querySelector('.gallery-carousel__btn--left');
const carouselNav = document.querySelector('.gallery-carousel__nav');
const dots = Array.from(carouselNav.children);

const imgWidth = imgs[0].getBoundingClientRect().width;

// functions

const setImgPosition = (img, index) => {
  img.style.left = imgWidth * index + 'px';
};

imgs.forEach(setImgPosition);

const moveToImg = (currentImg, targetImg) => {
  list.style.transform = `translateX(-${targetImg.style.left})`;
  currentImg.classList.remove('current--img');
  targetImg.classList.add('current--img');
  
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current--img');
  targetDot.classList.add('current--img');
};

const hideShowArrows = (imgs, previousBtn, nextBtn, targetIndex) => {
  if (targetIndex === 0) {
    previousBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');
  } else if (targetIndex === imgs.length - 1) {
    previousBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
  } else {
    previousBtn.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
  }
};

// events

nextBtn.addEventListener('click', (e) => {
  const currentImg = list.querySelector('.current--img');
  const nextImg = currentImg.nextElementSibling;
  const currentDot = carouselNav.querySelector('.current--img');
  const nextDot = currentDot.nextElementSibling;

  moveToImg(currentImg, nextImg);
  updateDots(currentDot, nextDot);

  const nextIndex = imgs.findIndex((img) => img === nextImg);
  hideShowArrows(imgs, previousBtn, nextBtn, nextIndex);
});

previousBtn.addEventListener('click', (e) => {
  const currentImg = list.querySelector('.current--img');
  const prevImg = currentImg.previousElementSibling;
  const currentDot = carouselNav.querySelector('.current--img');
  const prevDot = currentDot.previousElementSibling;
  moveToImg(currentImg, prevImg);
  updateDots(currentDot, prevDot);

  const prevIndex = imgs.findIndex((img) => img === prevImg);
  hideShowArrows(imgs, previousBtn, nextBtn, prevIndex);
});

carouselNav.addEventListener('click', (e) => {
  const targetDot = e.target.closest('button');
  if (!targetDot) return;

  const currentImg = list.querySelector('.current--img');
  const currentDot = carouselNav.querySelector('.current--img');

  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetImg = imgs[targetIndex];
  
  moveToImg(currentImg, targetImg);
  updateDots(currentDot, targetDot);
  hideShowArrows(imgs, previousBtn, nextBtn, targetIndex);
});
