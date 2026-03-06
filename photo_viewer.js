// Photo container

const AUTO_PLAY_DELAY = 5000;

const photos = [
  'assets/photos/01_scarface.jpg',
  'assets/photos/02_turn_off.jpg',
  'assets/photos/03_les_revolvers.jpg',
  'assets/photos/04_village.jpg',
  'assets/photos/05_scarface.jpg',
  'assets/photos/06_turn_off.jpg',
  'assets/photos/07_les_revolvers.jpg',
  'assets/photos/08_scarface.jpg',
  'assets/photos/09_turn_off.jpg',
  'assets/photos/10_les_revolvers.jpg',
  'assets/photos/11_scarface.jpg',
  'assets/photos/12_turn_off.jpg',
  'assets/photos/13_les_revolvers.jpg',
  'assets/photos/14_scarface.jpg',
  'assets/photos/15_turn_off.jpg',
  'assets/photos/16_les_revolvers.jpg',
];

// State
let currentIndex = 0;
let autoPlayInterval = null;
let isPlaying = true;

// Éléments DOM
const photoContainer = document.getElementById('photoContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const controlBtn = document.getElementById('controlBtn');
const photoCounter = document.getElementById('photoCounter');
const indicatorsContainer = document.getElementById('indicators');

function init() {
  // Créer les images
  photos.forEach((photoUrl, index) => {
    const img = document.createElement('img');
    img.src = photoUrl;
    img.alt = `Photo ${index + 1}`;
    img.classList.add('photo-viewer__photo');
    if (index === 0) {
      img.classList.add('photo-viewer__photo--active');
    }
    photoContainer.appendChild(img);
  });

  // Créer les indicateurs
  photos.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('photo-viewer__indicator');
    if (index === 0) {
      indicator.classList.add('photo-viewer__indicator--active');
    }
    indicator.addEventListener('click', () => goToPhoto(index));
    indicatorsContainer.appendChild(indicator);
  });

  // Démarrer le défilement automatique
  startAutoPlay();
}

// Afficher une photo spécifique
function showPhoto(index) {
  const allPhotos = document.querySelectorAll('.photo-viewer__photo');
  const allIndicators = document.querySelectorAll('.photo-viewer__indicator');

  allPhotos.forEach(photo => photo.classList.remove('photo-viewer__photo--active'));
  allIndicators.forEach(indicator => indicator.classList.remove('photo-viewer__indicator--active'));

  allPhotos[index].classList.add('photo-viewer__photo--active');
  allIndicators[index].classList.add('photo-viewer__indicator--active');
}

// Photo suivante
function nextPhoto() {
  currentIndex = (currentIndex + 1) % photos.length;
  showPhoto(currentIndex);
}

// Photo précédente
function prevPhoto() {
  currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  showPhoto(currentIndex);
}

// Aller à une photo spécifique
function goToPhoto(index) {
  currentIndex = index;
  showPhoto(currentIndex);
  // Redémarrer le timer auto-play
  if (isPlaying) {
    stopAutoPlay();
    startAutoPlay();
  }
}

// Démarrer le défilement automatique
function startAutoPlay() {
  autoPlayInterval = setInterval(nextPhoto, AUTO_PLAY_DELAY);
  isPlaying = true;
  controlBtn.textContent = '⏸';
}

// Arrêter le défilement automatique
function stopAutoPlay() {
  clearInterval(autoPlayInterval);
  isPlaying = false;
  controlBtn.textContent = '▶';
}

// Basculer pause/play
function toggleAutoPlay() {
  if (isPlaying) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
}

// Event listeners
prevBtn.addEventListener('click', () => {
  prevPhoto();
  // Redémarrer le timer auto-play
  if (isPlaying) {
    stopAutoPlay();
    startAutoPlay();
  }
});

nextBtn.addEventListener('click', () => {
  nextPhoto();
  // Redémarrer le timer auto-play
  if (isPlaying) {
    stopAutoPlay();
    startAutoPlay();
  }
});

controlBtn.addEventListener('click', toggleAutoPlay);

// Navigation au clavier
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevPhoto();
    if (isPlaying) {
      stopAutoPlay();
      startAutoPlay();
    }
  } else if (e.key === 'ArrowRight') {
    nextPhoto();
    if (isPlaying) {
      stopAutoPlay();
      startAutoPlay();
    }
  } else if (e.key === ' ') {
    e.preventDefault();
    toggleAutoPlay();
  }
});

// Démarrer l'application
init();

