# 📋 Spécification du Projet - Vibe Music Player

## Vue d'ensemble

**Nom du projet** : Vibe Music Player  
**Type** : Application Web (HTML/CSS/JavaScript)  
**Objectif** : Créer un lecteur de musique moderne utilisant l'API Deezer  
**Date** : 2024

## Objectifs du projet

Développer une application web fonctionnelle permettant aux utilisateurs de :
- Rechercher de la musique via l'API Deezer
- Visualiser les résultats sous forme de cartes
- Écouter des aperçus audio des pistes
- Contrôler la lecture via une interface intuitive

## Spécifications techniques

### Stack technologique
- **Frontend** : HTML5, CSS3, JavaScript (ES6+)
- **API externe** : Deezer API (https://api.deezer.com)
- **Aucun framework** : Code vanilla pour des performances optimales

### Architecture

```
Application
├── Interface utilisateur (HTML/CSS)
│   ├── Header avec titre et sous-titre
│   ├── Barre de recherche avec debounce
│   ├── Grille de cartes de musique
│   └── Lecteur audio fixe en bas
│
├── Logique métier (JavaScript)
│   ├── Gestion de la recherche
│   ├── Communication avec l'API Deezer
│   ├── Gestion du lecteur audio
│   └── Mise à jour de l'interface
│
└── API Deezer
    └── Endpoint de recherche de pistes
```

### Fonctionnalités principales

#### 1. Recherche de musique
- **Input** : Champ de recherche textuel
- **Traitement** : Debounce de 500ms pour optimiser les requêtes
- **API** : GET `/search?q={query}&limit=25`
- **Affichage** : Grille responsive de cartes

#### 2. Affichage des résultats
- **Format** : Cartes avec image d'album, titre, artiste, album, durée
- **Layout** : Grille CSS Grid adaptative (min 280px par carte)
- **États** : Vide, chargement, résultats, erreur

#### 3. Lecteur audio
- **Fonctionnalités** : Play/Pause, affichage de la piste courante
- **Source** : Aperçus de 30 secondes via API Deezer
- **Contrôle** : Bouton play/pause dans le lecteur fixe

#### 4. Interactions utilisateur
- **Clic sur carte** : Lance la lecture
- **Hover sur carte** : Affiche le bouton play
- **Bouton play/pause** : Contrôle la lecture
- **État visuel** : Mise en évidence de la piste en cours

## Structure des fichiers

```
vibe-music-player/
├── index.html       # Structure HTML (1 page)
├── styles.css       # Tous les styles (variables CSS, responsive)
├── script.js        # Logique JavaScript (modulaire)
├── README.md        # Documentation utilisateur
└── SPECIFICATION.md # Ce fichier
```

## Design et UX

### Palette de couleurs
- **Primaire** : #ff6b6b (Rouge corail)
- **Secondaire** : #4ecdc4 (Turquoise)
- **Fond sombre** : #1a1a2e, #16213e
- **Cartes** : #0f3460
- **Accent** : #ffd93d (Jaune)

### Typographie
- **Police** : Inter (Google Fonts)
- **Tailles** : Responsive (1rem - 3rem)
- **Poids** : 300, 400, 500, 600, 700

### Responsive Design
- **Desktop** : Grille multi-colonnes
- **Tablette** : 2-3 colonnes
- **Mobile** : 1 colonne, padding réduit

## Gestion d'état

L'application gère un état global simple :
```javascript
{
  tracks: [],           // Liste des pistes trouvées
  currentTrack: null,   // Piste actuellement jouée
  isPlaying: false,     // État de lecture
  audioPlayer: null,    // Référence à l'élément audio
  searchTimeout: null   // Timeout pour debounce
}
```

## API Deezer

### Endpoint utilisé
- **URL** : `https://api.deezer.com/search`
- **Méthode** : GET
- **Paramètres** :
  - `q` : Requête de recherche (string)
  - `limit` : Nombre de résultats (number, défaut: 25)

### Réponse attendue
```json
{
  "data": [
    {
      "id": number,
      "title": string,
      "artist": { "name": string },
      "album": { "title": string, "cover": string, "cover_medium": string },
      "duration": number,
      "preview": string
    }
  ]
}
```

## Gestion des erreurs

- **Erreur réseau** : Message d'erreur affiché à l'utilisateur
- **Pas de résultats** : Message informatif
- **Aperçu indisponible** : Message d'erreur si preview manquant
- **Erreur de lecture** : Gestion silencieuse avec fallback

## Performance

- **Debounce** : Réduit les requêtes API inutiles
- **Lazy loading** : Images chargées à la demande
- **CSS optimisé** : Variables CSS pour cohérence
- **JavaScript modulaire** : Fonctions réutilisables

## Limitations connues

1. **Aperçus audio** : Limités à 30 secondes (API Deezer)
2. **Disponibilité** : Certaines pistes n'ont pas d'aperçu
3. **Connexion** : Nécessite une connexion internet
4. **Pas de persistance** : Pas de sauvegarde locale des favoris

## Tests et validation

### Tests manuels recommandés
- [ ] Recherche avec différents termes
- [ ] Affichage des résultats
- [ ] Lecture/pause des pistes
- [ ] Responsive sur différents appareils
- [ ] Gestion des erreurs (pas de connexion, pas de résultats)

### Compatibilité navigateurs
- Chrome (dernière version) ✅
- Firefox (dernière version) ✅
- Safari (dernière version) ✅
- Edge (dernière version) ✅

## Déploiement

### Options de déploiement
1. **GitHub Pages** : Hébergement statique gratuit
2. **Netlify** : Déploiement automatique
3. **Vercel** : Déploiement rapide
4. **Serveur web classique** : Apache, Nginx

### Prérequis
- Aucun build nécessaire (fichiers statiques)
- Serveur web basique ou service d'hébergement statique

## Évolutions futures possibles

1. **Fonctionnalités**
   - Favoris locaux (localStorage)
   - Historique de recherche
   - Playlists personnalisées
   - Partage social

2. **Améliorations techniques**
   - Service Worker pour mode hors-ligne
   - PWA (Progressive Web App)
   - Cache des résultats
   - Optimisation des images

3. **UX/UI**
   - Mode sombre/clair
   - Animations avancées
   - Transitions de page
   - Thèmes personnalisables

## Conclusion

Cette application démontre l'utilisation de technologies web modernes (HTML5, CSS3, ES6+) pour créer une expérience utilisateur fluide sans dépendre de frameworks lourds. Elle met en pratique les concepts de :
- Communication avec API REST
- Gestion d'état côté client
- Design responsive
- Performance et optimisation
- UX moderne

---

**Version** : 1.0.0  
**Dernière mise à jour** : 2024

