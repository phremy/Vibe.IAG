# 🎵 Vibe Music Player

Une application de lecteur de musique moderne et élégante utilisant l'API Deezer, construite avec HTML, CSS et JavaScript vanilla.

## 📋 Description

Vibe Music Player est une application web qui permet de rechercher, découvrir et écouter de la musique grâce à l'API Deezer. L'interface utilisateur est moderne, responsive et offre une expérience utilisateur fluide.

## ✨ Fonctionnalités

- 🔍 **Recherche en temps réel** : Recherchez des chansons, artistes ou albums avec debounce automatique
- 🎧 **Lecteur audio intégré** : Écoutez des aperçus de 30 secondes des pistes
- 📱 **Design responsive** : Interface adaptée pour mobile, tablette et desktop
- 🎨 **Interface moderne** : Design épuré avec animations fluides
- ⚡ **Performance optimisée** : Chargement rapide sans framework lourd

## 🚀 Installation

### Prérequis

- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Une connexion internet (pour accéder à l'API Deezer)

### Étapes d'installation

1. Clonez ou téléchargez ce dépôt :
```bash
git clone https://github.com/votre-username/vibe-music-player.git
cd vibe-music-player
```

2. Ouvrez le fichier `index.html` dans votre navigateur web, ou utilisez un serveur local :

```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server

# Avec PHP
php -S localhost:8000
```

3. Accédez à l'application dans votre navigateur à l'adresse `http://localhost:8000`

## 📁 Structure du projet

```
vibe-music-player/
│
├── index.html          # Structure HTML principale
├── styles.css          # Tous les styles CSS
├── script.js           # Logique JavaScript de l'application
└── README.md           # Documentation du projet
```

## 🎯 Utilisation

1. **Recherche** : Tapez le nom d'une chanson, d'un artiste ou d'un album dans la barre de recherche
2. **Sélection** : Cliquez sur une carte de musique pour l'écouter
3. **Contrôle** : Utilisez le lecteur en bas de l'écran pour mettre en pause/reprendre la lecture

## 🔌 API Utilisée

Cette application utilise l'API publique de **Deezer** :
- URL de base : `https://api.deezer.com`
- Endpoint de recherche : `/search?q={query}&limit=25`
- Documentation : [Deezer API](https://developers.deezer.com/api)

**Note** : L'API Deezer est gratuite et ne nécessite pas d'authentification pour les recherches de base.

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes avec variables CSS, Flexbox, Grid
- **JavaScript (ES6+)** : Logique de l'application, Fetch API, gestion d'événements
- **API Deezer** : Source de données musicales

## 📱 Compatibilité

- ✅ Chrome (dernière version)
- ✅ Firefox (dernière version)
- ✅ Safari (dernière version)
- ✅ Edge (dernière version)
- ✅ Navigateurs mobiles (iOS Safari, Chrome Mobile)

## 🎨 Caractéristiques du design

- **Couleurs** : Palette sombre moderne avec accents colorés
- **Typography** : Police Inter de Google Fonts
- **Animations** : Transitions fluides et effets hover
- **Responsive** : Grille adaptative pour différentes tailles d'écran

## 🔧 Personnalisation

Vous pouvez personnaliser l'apparence en modifiant les variables CSS dans `styles.css` :

```css
:root {
  --primary-color: #ff6b6b;
  --secondary-color: #4ecdc4;
  --dark-bg: #1a1a2e;
  --darker-bg: #16213e;
  --card-bg: #0f3460;
  --text-primary: #ffffff;
  --text-secondary: #b8b8b8;
  --accent: #ffd93d;
}
```

## 📝 Limitations

- Les aperçus audio sont limités à 30 secondes (limitation de l'API Deezer)
- Certaines pistes peuvent ne pas avoir d'aperçu disponible
- L'application nécessite une connexion internet active

## 🚀 Améliorations futures possibles

- [ ] Ajout de favoris locaux (localStorage)
- [ ] Historique de recherche
- [ ] Partage de pistes
- [ ] Mode sombre/clair
- [ ] Lecture de playlist
- [ ] Affichage des paroles

## 📄 Licence

Ce projet est open source et disponible sous licence MIT.

## 👤 Auteur

Développé dans le cadre d'un projet d'apprentissage avec les outils IA.

## 🙏 Remerciements

- [Deezer](https://www.deezer.com) pour l'API musicale
- [Google Fonts](https://fonts.google.com) pour la typographie

---

**Note** : Cette application est à des fins éducatives et utilise l'API publique de Deezer. Respectez les conditions d'utilisation de l'API Deezer pour tout usage commercial.

