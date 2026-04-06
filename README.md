# Paul Chauvière - CV en Ligne

Un site CV moderne et interactif avec chatbot IA, conçu pour être déployé sur Vercel.

## Caractéristiques

- ✅ Design responsive (mobile, tablet, desktop)
- ✅ Colonne gauche bleu foncé avec informations personnelles
- ✅ Colonne droite blanche avec expériences et formations
- ✅ Chatbot IA interactif avec Google Gemini
- ✅ Déploiement simple sur Vercel
- ✅ Aucune dépendance backend complexe

## Installation locale

### Prérequis
- Node.js 16+ et npm

### Étapes

1. **Cloner le dépôt**
```bash
git clone https://github.com/RGPaulo/Paul-CV.git
cd Paul-CV
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env.local
```

Puis éditez `.env.local` et ajoutez votre clé Gemini API.

4. **Démarrer le serveur de développement**
```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

## Configuration du Chatbot IA

### Obtenir une clé Gemini API gratuite

1. Allez sur [Google AI Studio](https://aistudio.google.com/app/apikeys)
2. Cliquez sur "Create API Key"
3. Sélectionnez "Create API key in new project"
4. Copiez votre clé API

### Variables d'environnement

- **Développement** : Créez un fichier `.env.local` avec votre clé
- **Production (Vercel)** : Ajoutez `GEMINI_API_KEY` dans les settings d'environnement de Vercel

## Déploiement sur Vercel

### Étapes

1. **Pousser le code sur GitHub**
```bash
git push origin main
```

2. **Importer sur Vercel**
   - Allez sur [vercel.com/new](https://vercel.com/new)
   - Sélectionnez votre dépôt GitHub
   - Cliquez sur "Import"

3. **Ajouter les variables d'environnement**
   - Dans les settings du projet Vercel
   - Ajoutez `GEMINI_API_KEY` avec votre clé API

4. **Déployer**
   - Cliquez sur "Deploy"
   - Attendez que le build soit terminé

Votre site sera alors accessible sur `https://[votre-projet].vercel.app`

## Structure du projet

```
paul-cv-static/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx      # Colonne gauche
│   │   ├── Main.jsx         # Colonne droite
│   │   └── ChatBot.jsx      # Widget chatbot
│   ├── App.jsx              # Composant principal
│   ├── data.js              # Données du CV
│   ├── main.jsx             # Point d'entrée React
│   └── index.css            # Styles globaux
├── api/
│   └── chat.js              # Fonction Vercel API pour le chatbot
├── index.html               # HTML principal
├── vite.config.js           # Configuration Vite
├── tailwind.config.js       # Configuration Tailwind CSS
└── vercel.json              # Configuration Vercel
```

## Technologies utilisées

- **Frontend** : React 19, Vite, Tailwind CSS 4
- **Backend** : Vercel Functions (serverless)
- **IA** : Google Gemini API
- **Icônes** : Lucide React

## Personnalisation

### Modifier les données du CV

Éditez `src/data.js` pour mettre à jour :
- Nom, titre, photo
- Coordonnées
- Compétences
- Expériences
- Formations
- Projets

### Modifier les couleurs

Éditez `tailwind.config.js` pour changer les couleurs primaires :
```js
colors: {
  'cv-blue': '#003D7A',      // Bleu principal
  'cv-dark-blue': '#001F4D', // Bleu foncé
}
```

### Modifier les styles

Éditez `src/index.css` pour personnaliser les styles globaux.

## Dépannage

### Le chatbot ne répond pas
- Vérifiez que `GEMINI_API_KEY` est configurée
- Vérifiez que votre clé API est valide
- Consultez les logs Vercel pour les erreurs

### Le build échoue
- Assurez-vous que Node.js 16+ est installé
- Supprimez `node_modules` et `package-lock.json`, puis réinstallez
- Vérifiez que tous les fichiers sont présents

## Support

Pour toute question ou problème, consultez :
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Google Gemini](https://ai.google.dev/docs)
- [Documentation Vite](https://vitejs.dev/)

## Licence

MIT

## Auteur

Paul Chauvière
