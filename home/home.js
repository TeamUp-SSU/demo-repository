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

// 버튼 스크롤
if (track && leftBtn && rightBtn) {
  leftBtn.addEventListener('click', () => {
    track.scrollBy({ left: -300, behavior: 'smooth' });
  });

  rightBtn.addEventListener('click', () => {
    track.scrollBy({ left: 300, behavior: 'smooth' });
  });
}

// --- 마우스 드래그 스크롤 기능 ---
let isDown = false;
let startX;
let scrollLeft;

if (track) {
  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('active');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.classList.remove('active');
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('active');
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2; // 드래그 민감도 (조절 가능)
    track.scrollLeft = scrollLeft - walk;
  });
}
