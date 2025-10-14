const scrollElements = document.querySelectorAll('[data-scroll]');

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(observerCallback, options);

scrollElements.forEach((element) => {
  observer.observe(element);
});

// --- 지금 뜨는 팀매칭 스크롤 부분 ---
const track = document.querySelector('.trending-track');
const leftBtn = document.querySelector('.arrow-btn.left');
const rightBtn = document.querySelector('.arrow-btn.right');

if (track && leftBtn && rightBtn) {
  leftBtn.addEventListener('click', () => {
    track.scrollBy({ left: -300, behavior: 'smooth' });
  });

  rightBtn.addEventListener('click', () => {
    track.scrollBy({ left: 300, behavior: 'smooth' });
  });
}
