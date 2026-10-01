const pagesEl = document.getElementById('pagesEl');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const status  = document.getElementById('status');

const pages = Array.from(pagesEl.querySelectorAll('.page'));
let currentIndex = 0;

function render(){
  pages.forEach((el, i)=>{
    const flipped = i < currentIndex;
    el.classList.toggle('flipped', flipped);
    el.style.zIndex = flipped ? i : (pages.length - i);
  });
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= pages.length;
  if(currentIndex === 0) status.textContent = 'Closed';
  else if(currentIndex >= pages.length) status.textContent = 'Back cover';
  else status.textContent = `Page ${currentIndex} of ${pages.length - 1}`;
}

function next(){ if(currentIndex < pages.length){ currentIndex++; render(); } }
function prev(){ if(currentIndex > 0){ currentIndex--; render(); } }

pages.forEach((el, i)=>{
  el.addEventListener('click', ()=>{
    if(i === currentIndex) next();
    else if(i === currentIndex - 1) prev();
  });
});

render();

prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

document.addEventListener('keydown', (e)=>{
  if(e.key === 'ArrowRight') next();
  if(e.key === 'ArrowLeft') prev();
});

// Lightbox
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImage = document.getElementById('lightboxImage');

function openLightbox(src){
  lightboxImage.src = src;
  lightboxOverlay.classList.add('show');
}

function closeLightbox(){
  lightboxOverlay.classList.remove('show');
}

lightboxImage.addEventListener('click', (e)=> e.stopPropagation());
