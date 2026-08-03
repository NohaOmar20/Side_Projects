AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });

/* -------------------- MEMORY DATA -------------------- */
/*  */
const memories = [
  {
    date: "Oct 3, 2016",
    title: "The Day We Met",
    caption: "Two strangers in the same room, an accidental conversation, and somehow the start of everything, our beautiful crazy warm friendship  .",
    img: "./Reem/1.jpg"
  },
  {
    date: "April 15, 2023",
    title: "These Summer gathering ",
    caption: "Even after years we always meet ar Random schedule with warm hugs, and the kind of laughter that makes our stomach hurt.",
    img: "./Reem/2.jpg"
  },
  {
    date: "Jun 20, 2023",
    title: "Your 21's Birthday",
    caption: "We're so cool here 😂 But Just you choose to spend your Birthday with us.. the way you implisity said I want to share this special day with you with the craziest and funnier birthcake-watermelon will always be the best.",
    img: "./Reem/3.jpg"
  },
  {
    date: "February 5, 2025",
    title: "Our Graduation",
    caption: "The way you traveled and showed up with flowers in every special day before I even asked. That's just who you are",
    img: "./Reem/5.jpg"
  },
  {
    date: "July 7, 2025",
    title: "These special dates",
    caption: "Our late night walks till we couldn't feel our feets. Talking about all our past memories and how we imagine ourselves in the future with cup of tea. It is everything to me",
    img: "./Reem/4.jpg"
  },
  {
    date: "Today",
    title: "Right Here, Right Now",
    caption: "Another year, another chapter  and I wouldn't want to write it with anyone else.",
    img: "./Reem/6.jpg"
  }
];

/* -------------------- TIMELINE / RIBBON SLIDER -------------------- */
const slider = document.getElementById('memorySlider');
const imgEl = document.getElementById('memoryImg');
const dateEl = document.getElementById('memoryDate');
const titleEl = document.getElementById('memoryTitle');
const capEl = document.getElementById('memoryCaption');
const frameEl = document.getElementById('memoryPhotoFrame');
const textEl = document.getElementById('memoryText');
const dotsWrap = document.getElementById('timelineDots');

slider.max = memories.length - 1;

memories.forEach((m, i) => {
  const dot = document.createElement('span');
  dot.textContent = m.date;
  dot.dataset.index = i;
  dot.addEventListener('click', () => { slider.value = i; renderMemory(i); });
  dotsWrap.appendChild(dot);
});

function renderMemory(index){
  const m = memories[index];

  frameEl.style.opacity = 0;
  textEl.style.opacity = 0;

  setTimeout(() => {
    imgEl.src = m.img;
    dateEl.textContent = m.date;
    titleEl.textContent = m.title;
    capEl.textContent = m.caption;

    frameEl.style.opacity = 1;
    textEl.style.opacity = 1;
    frameEl.classList.remove('fade-swap');
    textEl.classList.remove('fade-swap');
    void frameEl.offsetWidth;
    frameEl.classList.add('fade-swap');
    textEl.classList.add('fade-swap');

    // update fill + active dot
    const pct = (index / (memories.length - 1)) * 100;
    slider.style.setProperty('--fill', pct + '%');
    [...dotsWrap.children].forEach((d,i2) => d.classList.toggle('active', i2 === index));
  }, 180);
}

slider.addEventListener('input', () => renderMemory(parseInt(slider.value, 10)));
renderMemory(0);

/* -------------------- MEMORY CARDS GRID -------------------- */
/* -------------------- MEMORY CARDS GRID -------------------- */
// Structuring gallery items as objects matching your memory dataset
const galleryImages = [
  { img: "Reem/g-1.jpg",  },
  { img: "Reem/g-2.jpg", },
  { img: "Reem/g-3.jpg",  },
  { img: "Reem/g-4.jpg",  },
  { img: "Reem/g-5.jpg", },
  { img: "Reem/g-6.jpg", }
];

const grid = document.getElementById('cardsGrid');

// Iterating directly over galleryImages and using fallback to memories array if needed
galleryImages.forEach((item, i) => {
  // If a property isn't defined in galleryImages, fall back to the memories array item
  const memoryFallback = memories[i] || {};
  const imageSrc = item.img || memoryFallback.img;
  const dateText = item.date || memoryFallback.date || "";
  const titleText = item.title || memoryFallback.title || "";
  const captionText = item.caption || memoryFallback.caption || "";

  const col = document.createElement('div');
  col.className = 'col-12 col-md-6 col-lg-4';
  col.setAttribute('data-aos', 'fade-up');
  col.setAttribute('data-aos-delay', (i % 3) * 100);
  col.innerHTML = `
    <div class="memory-card">
      <img src="${imageSrc}" alt="${titleText}">
      
    </div>
  `;
  grid.appendChild(col);
});

/* -------------------- HERO TYPING ANIMATION -------------------- */
const phrases = [
  "Today we celebrate you.",
  "Here's to more stories together.",
  "My favorite person, one year older."
];
const typedEl = document.getElementById('typedSub');
let pIndex = 0, cIndex = 0, deleting = false;

function typeLoop(){
  const current = phrases[pIndex];
  if(!deleting){
    cIndex++;
    typedEl.innerHTML = current.slice(0, cIndex) + '<span class="type-cursor">&nbsp;</span>';
    if(cIndex === current.length){ deleting = true; setTimeout(typeLoop, 1500); return; }
  } else {
    cIndex--;
    typedEl.innerHTML = current.slice(0, cIndex) + '<span class="type-cursor">&nbsp;</span>';
    if(cIndex === 0){ deleting = false; pIndex = (pIndex + 1) % phrases.length; }
  }
  setTimeout(typeLoop, deleting ? 35 : 60);
}
typeLoop();

/* -------------------- FLOATING HEARTS IN HERO -------------------- */
const heroHearts = document.getElementById('hero-hearts');
for(let i = 0; i < 10; i++){
  const h = document.createElement('i');
  h.className = 'fa-solid fa-heart floating-heart';
  h.style.left = Math.random() * 100 + '%';
  h.style.fontSize = (12 + Math.random() * 18) + 'px';
  h.style.animationDuration = (8 + Math.random() * 8) + 's';
  h.style.animationDelay = (Math.random() * 8) + 's';
  heroHearts.appendChild(h);
}

/* -------------------- WISH BUTTON HEART BURST -------------------- */
const wishBtn = document.getElementById('wishBtn');
const burstWrap = document.getElementById('heart-burst');
wishBtn.addEventListener('click', () => {
  for(let i = 0; i < 24; i++){
    const h = document.createElement('i');
    h.className = 'fa-solid fa-heart burst-heart';
    h.style.left = (10 + Math.random() * 80) + '%';
    h.style.bottom = '0px';
    h.style.fontSize = (14 + Math.random() * 20) + 'px';
    h.style.animationDelay = (Math.random() * .5) + 's';
    h.style.opacity = (0.5 + Math.random() * 0.5).toString();
    burstWrap.appendChild(h);
    setTimeout(() => h.remove(), 3200);
  }
});
