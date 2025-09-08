---

# Loire & Nature Conciergerie - Site Web

Site web responsive pour **Loire & Nature Conciergerie**, développé avec **React Router 7**, **Bootstrap 5** et une **charte graphique personnalisée**.

---

## 🚀 Installation

### Prérequis

* **Node.js** (version 20 ou supérieure)
* **npm** ou **yarn**

### Installation des dépendances

1. Naviguez vers le dossier du projet :

```bash
cd frontend
```

2. Installez les dépendances :

```bash
npm install
```

---

## 🔧 Développement

### Démarrer le serveur de développement

```bash
npm run dev
```

Le site sera accessible à l'adresse : `http://localhost:5173`

### Scripts disponibles

* `npm run dev` - Démarre le serveur de développement
* `npm run build` - Compile le projet pour la production
* `npm run preview` - Prévisualise le build de production

---

## 🎨 Charte Graphique

### Couleurs Officielles

| Couleur           | Code Hex  | Usage                                      |
| ----------------- | --------- | ------------------------------------------ |
| Vert nature doux  | `#6E8C4B` | Feuilles, éléments naturels, boutons verts |
| Bleu Loire clair  | `#5D90B3` | Fond, éléments aquatiques, titres légers   |
| Rose              | `#D8CBB5` | Arrière-plan, zones neutres, encadrés      |
| Gris ardoise doux | `#404040` | Texte principal, picots, contours discrets |
| Blanc pur         | `#FFFFFF` | Fonds, espaces de respirations             |

### Classes CSS Personnalisées

* `.text-primary-custom` → Couleur vert nature
* `.text-secondary-custom` → Couleur bleu Loire
* `.bg-primary-custom` → Fond vert nature
* `.bg-secondary-custom` → Fond bleu Loire
* `.bg-rose-custom` → Fond rose

---

## 📱 Structure Responsive

Le site est entièrement responsive avec :

* **Header** avec menu hamburger sur mobile
* **Footer adaptatif**
* **Grille Bootstrap 5** pour la mise en page
* **Animations fluides** optimisées pour tous les écrans

---

## 🏗️ Structure du Projet

```
frontend/
├── public/                 # Fichiers statiques (index.html, favicon, etc.)
├── src/
│   ├── components/         # Composants réutilisables
│   │   ├── Header.jsx      # Header universel
│   │   ├── Footer.jsx      # Footer universel
│   │   └── Layout.jsx      # Layout principal (AppLayout)
│   ├── pages/              # Pages du site
│   │   ├── Home.jsx        # Page d'accueil
│   │   ├── About.jsx       # Page À propos
│   │   └── Services.jsx    # Page Services
│   ├── App.jsx             # Composant racine avec les routes
│   ├── main.jsx            # Point d'entrée React
│   └── styles/             # Fichiers CSS personnalisés
│       └── app.css
└── package.json
```

---

## ✨ Fonctionnalités

### Page d'Accueil

* **Hero Section** avec bannière d'accueil
* **Section Services** : cartes interactives
* **Charte Qualité** : valeurs de l’entreprise
* **Call-to-Action** : incitation au contact

### Pages internes

* **À Propos** : histoire, valeurs, mission
* **Services** : présentation détaillée des services (icônes + listes)

### Header & Footer Universels

* Navigation responsive
* Liens faciles à personnaliser
* Footer complet avec zones personnalisables

---

## 🔧 Ajout de Nouvelles Pages

1. Créez un fichier dans `src/pages/` :

```jsx
// src/pages/Contact.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Contact() {
  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h1>Contact</h1>
          <p>Contenu de la page contact...</p>
        </Col>
      </Row>
    </Container>
  );
}
```

2. Ajoutez la route dans `App.jsx` :

```jsx
import Contact from "./pages/Contact";

<Route path="/contact" element={<Contact />} />
```

3. (Optionnel) Ajoutez un lien dans le `Header.jsx`.

---

## 🚀 Déploiement

### Build de Production

```bash
npm run build
```

---

## 📚 Technologies Utilisées

* **React 18**
* **React Router DOM 7** (routing)
* **Bootstrap 5.3.2** (framework CSS)
* **React Bootstrap 2.9.2** (composants React)
* **Vite** (build tool et serveur de développement)

---

## 🐛 Support et Maintenance

Pour tout problème technique ou demande d'évolution, contactez l'équipe de développement.

---

## 📄 Licence

Ce projet est la propriété exclusive de **Loire & Nature Conciergerie**.

---
