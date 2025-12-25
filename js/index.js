const bananaCursor = document.getElementById('banana-cursor');
document.addEventListener('mousemove', e => {
    bananaCursor.style.left = (e.pageX - 42) + 'px';
    bananaCursor.style.top = (e.pageY - 5) + 'px';
});

const introScreen = document.getElementById('intro-screen');
const musique = document.getElementById('musique');
let onBoard = false;

function enterSite() {
    introScreen.classList.add('hidden');
    musique.play().catch(err => console.warn('Impossible de lire la musique :', err));
    onBoard = true;
}

document.addEventListener('click', event => {
    if (onBoard) {
        explosionDeConfettis();
    }
    bananaCursor.style.scale = '0.9';
    bananaCursor.style.transition = 'scale 0.1s';
    setTimeout(() => {
        bananaCursor.style.scale = '1';
        bananaCursor.style.transition = 'scale 0.1s';
    }, 100);
});

function explosionDeConfettis() {
    const colors = ['#f94144', '#f3722c', '#f9c74f', '#90be6d', '#43aa8b', '#577590'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.width = confetti.style.height = (Math.random() * 10 + 5) + 'px';
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
    }
}

let stars = [];
for (let i = 0; i < 30; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.animationDuration = (1 + Math.random() * 2) + 's';
    document.body.appendChild(star);
    stars.push(star);
}

let raveInterval = null;
let raveOn = false;
const body = document.body;
const texte = document.getElementById('texte-bienvenue');
let particulesRave = [];

function toggleRaveMode() {
    if (!raveOn) {
        raveOn = true;
        texte.classList.remove('bounce-normal');
        texte.classList.add('bounce-rainbow');

        stars.forEach(star => star.style.display = 'none');

        const couleurs = ['#ff6ec7', '#33ccff', '#ffff66', '#ff9966', '#cc66ff', '#66ff99'];
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 15 + 10;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            particle.style.backgroundColor = couleurs[Math.floor(Math.random() * couleurs.length)];
            particle.style.animationDuration = (5 + Math.random() * 10) + 's';
            document.body.appendChild(particle);
            particulesRave.push(particle);
        }

        raveInterval = setInterval(() => {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            body.style.background = `rgb(${r}, ${g}, ${b})`;

            document.querySelectorAll("button").forEach(btn => {
            btn.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.6)`;
            });

        }, 200);
    } else {
        raveOn = false;
        clearInterval(raveInterval);
        texte.classList.remove('bounce-rainbow');
        texte.classList.add('bounce-normal');
        texte.style.color = '';
        body.style.background = '';

        document.querySelectorAll("button").forEach(btn => {
            btn.style.backgroundColor = '';
        });

        particulesRave.forEach(p => p.remove());
        particulesRave = [];

        stars.forEach(star => star.style.display = 'block');
    }
}