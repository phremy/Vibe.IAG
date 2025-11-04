// API Deezer - Base URL
const DEEZER_API_BASE = 'https://api.deezer.com';

// État de l'application
let state = {
  tracks: [],
  currentTrack: null,
  isPlaying: false,
  audioPlayer: null,
  searchTimeout: null
};

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const audioPlayer = document.getElementById('audioPlayer');
  
  state.audioPlayer = audioPlayer;

  // Gestion de la recherche
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSearch(searchInput.value);
  });

  // Recherche en temps réel avec debounce
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    
    // Clear previous timeout
    if (state.searchTimeout) {
      clearTimeout(state.searchTimeout);
    }

    if (!query) {
      showEmptyState();
      return;
    }

    // Debounce: attendre 500ms après la dernière frappe
    state.searchTimeout = setTimeout(() => {
      handleSearch(query);
    }, 500);
  });

  // Gestion du lecteur audio
  audioPlayer.addEventListener('play', () => {
    state.isPlaying = true;
    updatePlayPauseButton();
  });

  audioPlayer.addEventListener('pause', () => {
    state.isPlaying = false;
    updatePlayPauseButton();
  });

  audioPlayer.addEventListener('ended', () => {
    state.isPlaying = false;
    updatePlayPauseButton();
  });

  // Bouton play/pause du player
  const playPauseButton = document.getElementById('playPauseButton');
  playPauseButton.addEventListener('click', () => {
    togglePlayPause();
  });
});

// Fonction de recherche
async function handleSearch(query) {
  if (!query.trim()) {
    showEmptyState();
    return;
  }

  showLoading();
  hideError();

  try {
    const tracks = await searchTracks(query);
    state.tracks = tracks;
    
    if (tracks.length === 0) {
      showNoResults();
    } else {
      displayTracks(tracks);
    }
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    showError('Erreur lors de la recherche. Veuillez réessayer.');
  } finally {
    hideLoading();
  }
}

// Recherche de pistes via l'API Deezer
async function searchTracks(query) {
  try {
    const response = await fetch(`${DEEZER_API_BASE}/search?q=${encodeURIComponent(query)}&limit=25`);
    
    if (!response.ok) {
      throw new Error('Erreur de réseau');
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    throw new Error('Impossible de récupérer les résultats');
  }
}

// Afficher les pistes
function displayTracks(tracks) {
  const container = document.getElementById('tracksContainer');
  container.innerHTML = '';

  const grid = document.createElement('div');
  grid.className = 'tracks-grid';

  tracks.forEach(track => {
    const card = createTrackCard(track);
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

// Créer une carte de piste
function createTrackCard(track) {
  const card = document.createElement('div');
  card.className = 'music-card';
  card.dataset.trackId = track.id;
  
  if (state.currentTrack && state.currentTrack.id === track.id && state.isPlaying) {
    card.classList.add('playing');
  }

  const imageContainer = document.createElement('div');
  imageContainer.className = 'card-image-container';

  const img = document.createElement('img');
  img.src = track.album.cover_medium || track.album.cover || '';
  img.alt = track.album.title;
  img.className = 'card-image';

  const overlay = document.createElement('div');
  overlay.className = 'card-overlay';

  const playButton = document.createElement('button');
  playButton.className = `play-button ${state.currentTrack?.id === track.id && state.isPlaying ? 'playing' : ''}`;
  playButton.setAttribute('aria-label', 'Play');
  
  const playIcon = document.createElement('span');
  playIcon.className = 'play-icon';
  playIcon.textContent = state.currentTrack?.id === track.id && state.isPlaying ? '⏸' : '▶';
  playButton.appendChild(playIcon);

  playButton.addEventListener('click', (e) => {
    e.stopPropagation();
    handlePlayTrack(track);
  });

  overlay.appendChild(playButton);
  imageContainer.appendChild(img);
  imageContainer.appendChild(overlay);

  const content = document.createElement('div');
  content.className = 'card-content';

  const title = document.createElement('h3');
  title.className = 'card-title';
  title.textContent = track.title;
  title.setAttribute('title', track.title);

  const artist = document.createElement('p');
  artist.className = 'card-artist';
  artist.textContent = track.artist.name;
  artist.setAttribute('title', track.artist.name);

  const meta = document.createElement('div');
  meta.className = 'card-meta';

  const album = document.createElement('span');
  album.className = 'card-album';
  album.textContent = track.album.title;
  album.setAttribute('title', track.album.title);

  const duration = document.createElement('span');
  duration.className = 'card-duration';
  duration.textContent = formatDuration(track.duration);

  meta.appendChild(album);
  meta.appendChild(duration);

  content.appendChild(title);
  content.appendChild(artist);
  content.appendChild(meta);

  card.appendChild(imageContainer);
  card.appendChild(content);

  card.addEventListener('click', () => {
    handlePlayTrack(track);
  });

  return card;
}

// Jouer une piste
function handlePlayTrack(track) {
  // Si c'est la même piste, toggle play/pause
  if (state.currentTrack && state.currentTrack.id === track.id) {
    togglePlayPause();
    return;
  }

  // Nouvelle piste
  state.currentTrack = track;
  state.audioPlayer.src = track.preview || '';
  
  // Mettre à jour le player
  updatePlayer();
  
  // Jouer
  state.audioPlayer.play().catch(error => {
    console.error('Erreur de lecture:', error);
    showError('Impossible de lire cette piste. Aucun aperçu disponible.');
  });

  // Mettre à jour l'affichage
  updateTrackCards();
}

// Toggle play/pause
function togglePlayPause() {
  if (!state.currentTrack) return;

  if (state.isPlaying) {
    state.audioPlayer.pause();
  } else {
    state.audioPlayer.play().catch(error => {
      console.error('Erreur de lecture:', error);
      showError('Impossible de lire cette piste.');
    });
  }
}

// Mettre à jour le player
function updatePlayer() {
  const player = document.getElementById('player');
  const playerImage = document.getElementById('playerImage');
  const playerTitle = document.getElementById('playerTitle');
  const playerArtist = document.getElementById('playerArtist');

  if (state.currentTrack) {
    player.style.display = 'block';
    playerImage.src = state.currentTrack.album.cover_medium || state.currentTrack.album.cover || '';
    playerTitle.textContent = state.currentTrack.title;
    playerArtist.textContent = state.currentTrack.artist.name;
    updatePlayPauseButton();
  } else {
    player.style.display = 'none';
  }
}

// Mettre à jour le bouton play/pause
function updatePlayPauseButton() {
  const playPauseIcon = document.getElementById('playPauseIcon');
  const playPauseButton = document.getElementById('playPauseButton');
  
  if (state.isPlaying) {
    playPauseIcon.textContent = '⏸';
    playPauseButton.classList.add('playing');
  } else {
    playPauseIcon.textContent = '▶';
    playPauseButton.classList.remove('playing');
  }

  // Mettre à jour les cartes
  updateTrackCards();
}

// Mettre à jour les cartes de pistes
function updateTrackCards() {
  const cards = document.querySelectorAll('.music-card');
  cards.forEach(card => {
    const playButton = card.querySelector('.play-button');
    const playIcon = card.querySelector('.play-icon');
    
    if (!playButton || !playIcon) return;

    const trackId = parseInt(card.dataset.trackId);
    
    if (state.currentTrack && state.currentTrack.id === trackId) {
      card.classList.toggle('playing', state.isPlaying);
      playButton.classList.toggle('playing', state.isPlaying);
      playIcon.textContent = state.isPlaying ? '⏸' : '▶';
    } else {
      card.classList.remove('playing');
      playButton.classList.remove('playing');
      playIcon.textContent = '▶';
    }
  });
}

// Formater la durée
function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Afficher l'état de chargement
function showLoading() {
  const container = document.getElementById('tracksContainer');
  container.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>Recherche en cours...</p>
    </div>
  `;
  
  const searchLoading = document.getElementById('searchLoading');
  if (searchLoading) {
    searchLoading.style.display = 'block';
  }
}

// Masquer l'état de chargement
function hideLoading() {
  const searchLoading = document.getElementById('searchLoading');
  if (searchLoading) {
    searchLoading.style.display = 'none';
  }
}

// Afficher l'état vide
function showEmptyState() {
  const container = document.getElementById('tracksContainer');
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">🎧</div>
      <h2>Commencez votre recherche</h2>
      <p>Tapez le nom d'une chanson, d'un artiste ou d'un album</p>
    </div>
  `;
}

// Afficher aucun résultat
function showNoResults() {
  const container = document.getElementById('tracksContainer');
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">🔍</div>
      <h2>Aucun résultat trouvé</h2>
      <p>Essayez avec d'autres mots-clés</p>
    </div>
  `;
}

// Afficher une erreur
function showError(message) {
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
}

// Masquer l'erreur
function hideError() {
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.style.display = 'none';
}

