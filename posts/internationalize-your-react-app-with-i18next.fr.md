---
title: 'Internationalisation de votre application React avec i18next'
pageTitle: 'Comment internationaliser votre application React avec i18next'
date: '2024-09-09'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/internationalize-your-react-app-with-i18next-illustration-fr.webp'
excerpt: 'Apprenez à internationaliser votre application React en utilisant i18next avec ce guide complet.'
tags: ['typescript', 'react']
related: ['10-typescript-tips-for-beginner-developers', 'how-to-test-react-hooks']
---

L'internationalisation (abrégé i18n) est le processus de conception et de développement d'une application de manière à faciliter sa localisation dans différentes langues et cultures.

Cela implique non seulement la traduction du texte, mais aussi l'adaptation des formats de date, d'heure, des nombres, et bien d'autres aspects culturels.

Une application bien internationalisée peut être facilement localisée, ce qui signifie qu'elle peut être traduite et ajustée pour répondre aux spécificités d'un marché cible sans nécessiter de modifications majeures du code source.

J’ai uniquement travaillé sur des projets utilisant des langues avec des systèmes d’écritures LTR (Left to Right). Cet article couvre donc uniquement les aspects i18n commun à ces langues.

### Présentation d'i18next et de ses avantages pour React

i18next est une bibliothèque de traduction puissante et facile à utiliser pour les applications TypeScript. Elle offre une gamme complète de fonctionnalités pour gérer les traductions, les pluralisations, les interpolations, et bien plus encore.

Lorsqu'il s'agit de React, i18next s'intègre parfaitement grâce à `react-i18next`, un complément qui permet d'utiliser ses fonctionnalités avec les composants React de manière fluide.

Les principaux avantages d'utiliser i18next avec React sont :

- **Intégration simple** : `react-i18next` simplifie l'intégration d'i18next dans une application React, avec des hooks et des composants dédiés pour la gestion des traductions.
- **Modularité** : i18next permet de structurer les traductions de manière modulaire, facilitant la gestion et la maintenance.
- **Support complet** : La bibliothèque prend en charge toutes les fonctionnalités nécessaires pour une internationalisation complète, y compris les pluralisations, les contextes, et les interpolations complexes.
- **Performance** : Avec des techniques comme le lazy loading des traductions, i18next assure une performance optimale même dans des applications de grande envergure.

## Installation et Configuration de base

Avant de commencer, assurez vous d’avoir la configuration minimale pour créer une application React.

On démarre avec la création d’une appli React basique

```bash
yarn create vite i18n-react --template react-ts
cd i18n-react
yarn
```

### Installation d'i18next et des dépendances nécessaires

```bash
yarn add i18next react-i18next i18next-browser-languagedetector i18next-intervalplural-postprocessor
```

- **i18next** : La bibliothèque principale pour la gestion des traductions.
- **react-i18next** : Un complément qui fournit des hooks et des composants pour intégrer i18next dans React.
- **i18next-browser-languagedetector** : Un module pour détecter automatiquement la langue du navigateur de l'utilisateur.
- **i18next-intervalplural-postprocessor** : Un module pour gérer des traductions différentes par intervalle.

### Configuration initiale d'i18next dans un projet React

Une fois les packages installés, la prochaine étape consiste à configurer i18next. Créez un fichier `i18n.ts` à la racine de votre projet pour centraliser la configuration.

```tsx
import i18n from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import commonEn from './locales/en/common.json';
import commonFr from './locales/fr/common.json';
import commonEs from './locales/es/common.json';
import commonDe from './locales/de/common.json';

const RESOURCES = {
  en: { common: commonEn },
  fr: { common: commonFr },
  es: { common: commonEs },
  de: { common: commonDe },
};

const DETECTION_OPTIONS = {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage'],
};

export const defaultNS = 'common';

i18n
  .use(LanguageDetector)
  .use(intervalPlural)
  .use(initReactI18next)
  .init({
    detection: DETECTION_OPTIONS,
    resources: RESOURCES,
    defaultNS,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
```

Dans ce fichier, nous initialisons i18next avec les plugins nécessaires.

- **LanguageDetector** : Détecte automatiquement la langue préférée de l'utilisateur.
- **intervalPlural** : Gère les intervalles de valeurs
- **initReactI18next** : Intègre i18next avec React.

Voici le détail des configurations utilisées.

- **detection.order** : On détecte d’abord la langue depuis le localStorage, puis la valeur renvoyée par le navigateur
- **detection.cache** : On met la langue détectée en cache dans le localStorage
- **defaultNS** : permet d’avoir un espace de noms par défaut.
- **fallbackLng** : La langue par défaut à utiliser si la langue préférée n'est pas disponible.
- **interpolation.escapeValue** : Désactiver l'échappement des valeurs car React gère déjà la sécurité contre les attaques XSS.

Chaque fichier ajouté dans `resources` contient les traductions de notre application. Il est ajouté face à la clé qui indique son espace de noms.

Vous devez donc maintenant créer les fichiers JSON associés aux langues que vous voulez supporter.

Ensuite, vous devez intégrer cette configuration dans votre application React. Ouvrez le fichier `main.tsx` et importez `i18n.ts`.

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import './i18n.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

On va maintenant créer un composant `Welcome` et y ajouter le hook de traduction.

```tsx
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

const Welcome: FunctionComponent = () => {
  const { t } = useTranslation();

  return <h1>{t('welcome')}</h1>;
};

export default Welcome;
```

Remplacez `<h1>Vite + React</h1>` dans le composant principal `App` par le composant `Welcome`. Créez la clé `welcome` dans vos fichiers de traduction, et ce dans toutes les langues que vous souhaitez supporter.

Votre fichier JSON pour l’anglais doit ressembler à ça :

```json
{
  "welcome": "Welcome"
}
```

Vous devriez avoir maintenant la traduction qui apparait sur votre page.

## Structure des fichiers de traduction

A terme, vos fichiers de traduction contiendront un grand nombre d’éléments. Il est important de bien les organiser. Cela facilite leur gestion, leur mise à jour et leur extension à d'autres langues.

### Organisation des fichiers de traduction

Comme souvent avec les projets React, il n’y a pas de cadre et de règles prédéfinis. L’important est que l’emplacement soit logique pour votre projet. Je vous conseille quand même d’utiliser les standards de l’industrie logicielle.

Par exemple utiliser un dossier locales placé à la racine du projet. Chaque langue a son propre sous-dossier contenant les fichiers de traduction en format JSON. Voici un exemple de structure de dossiers.

```bash
/src
└── /locales
    ├── /de
    │   ├── common.json
    │   └── account.json
    ├── /en
    │   ├── common.json
    │   └── account.json
    ├── /es
    │   ├── common.json
    │   └── account.json
    └── /fr
        ├── common.json
        └── account.json
```

Dans cet exemple, chaque sous-dossier (`en`, `fr`, `es`,`de`) correspond à une langue, et les fichiers `common.json` et `account.json` contiennent les traductions spécifiques à cette langue pour un espace de noms particulier.

### Exemples de fichiers de traductions

### Fichier de traduction en anglais (en/common.json)

```json
{
  "welcome": "Welcome to our application!",
  "navbar": {
    "home": "Home",
    "about": "About",
    "contact": "Contact"
  },
  "footer": {
    "copyright": "© 2024 Your Company. All rights reserved.",
    "privacyPolicy": "Privacy Policy",
    "termsOfService": "Terms of Service"
  }
}
```

### Fichier de traduction en français (fr/common.json)

```json
{
  "welcome": "Bienvenue dans notre application !",
  "navbar": {
    "home": "Accueil",
    "about": "À propos",
    "contact": "Contact"
  },
  "footer": {
    "copyright": "© 2024 Votre Entreprise. Tous droits réservés.",
    "privacyPolicy": "Politique de confidentialité",
    "termsOfService": "Conditions d'utilisation"
  }
}
```

## Implémentation dans une application React

En suivant les étapes ci dessus, vous pouvez déjà ajouter le fichier de configuration et quelques traductions à votre projet React.

### Utilisation du hook `useTranslation` pour traduire du contenu

Le hook `useTranslation` fourni par `react-i18next` permet de traduire facilement du texte dans vos composants.

Ajoutez le code suivant dans le fichier `App.tsx` de notre projet d’exemple.

```tsx
[...]
import { useTranslation } from "react-i18next";
[...]
function App() {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);

  return (
    <>
      <nav>
        <ul>
          <li>{t("navbar.home")}</li>
          <li>{t("navbar.about")}</li>
          <li>{t("navbar.contact")}</li>
        </ul>
      </nav>
[...]
<footer>
    <p>{t("footer.copyright")}</p>
    <ul>
        <li>{t("footer.privacyPolicy")}</li>
        <li>{t("footer.termsOfService")}</li>
    </ul>
</footer>
[...]
```

Dans cet exemple, le hook `useTranslation` est utilisé pour récupérer la fonction `t`, qui permet de traduire les clés de texte définies dans vos fichiers de traduction.

Comme nous utilisons les traductions de l’espace nom par défaut, il n’est pas nécessaire de le préciser.

Un point permet d’accéder aux clés imbriqués, ce qui nous permet de structurer correctement notre fichier en regroupant les traductions de manière logique.

### Gestion des changements de langue

Pour permettre aux utilisateurs de changer de langue dynamiquement, vous pouvez ajouter un sélecteur de langue dans votre application.

```tsx
import { ChangeEventHandler } from 'react';

import { useTranslation } from 'react-i18next';

const AVAILABLE_LANGUAGES = [
  { value: 'de', label: 'Deutsch' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage: ChangeEventHandler<HTMLSelectElement> = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select onChange={changeLanguage}>
      {AVAILABLE_LANGUAGES.map((l) => (
        <option selected={l.value === i18n.language} key={l.value} value={l.value}>
          {l.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
```

Ajoutez ensuite ce composant dans le composant `App.tsx`.

Si vous modifiez la langue depuis le sélecteur, elle sera aussi modifiée dans le localStorage.

## Utilisation des espaces de noms

Pour faciliter la gestion de nos traductions, il est plus simple de les diviser par module ou par fonctionnalité.

Mais cela impose de charger le bon espace de noms dans la méthode de traduction.

Ajoutez un fichier `account.json` avec le contenu suivant traduit pour chaque langue.

```json
{
  "signIn": "Sign in",
  "signUp": "Sign up"
}
```

Modifiez la configuration de `i18n.ts` pour les prendre en compte.

```tsx
[...]
import accountEn from "./locales/en/account.json";
import accountFr from "./locales/fr/account.json";
import accountEs from "./locales/es/account.json";
import accountDe from "./locales/de/account.json";

const RESOURCES = {
  en: { common: commonEn, account: accountEn },
  fr: { common: commonFr, account: accountFr },
  es: { common: commonEs, account: accountEs },
  de: { common: commonDe, account: accountDe },
};
[...]
```

Ajoutez ensuite ces 2 entrées à notre menu de navigation :

```tsx
[...]
<li><button>{t("signIn", { ns: "account" })}</button></li>
<li><button>{t("signUp", { ns: "account" })}</button></li>
[...]
```

Utiliser les espaces de noms est intéressant quand le nombre de vos traductions devient conséquentes.

## Traduction de composants complexes et dynamiques

### Traduction avec interpolation

i18next nous permet d’ajouter des variables dans nos traductions.

Par exemple pour ajouter le nom de notre utilisateur.

#### **Fichier de traduction (en/common.json)**

```json
{
  "welcomeUser": "Welcome, {{name}}!"
}
```

#### **Utilisation dans un composant React**

```jsx
// src/App.js
import React from 'react';
import { useTranslation } from 'react-i18next';

function WelcomeUser({ name }) {
  const { t } = useTranslation();

  return <h1>{t('welcomeUser', { name })}</h1>;
}

export default WelcomeUser;
```

### Gestion des pluriels

Il peut être rapidement fastidieux de gérer les pluriels dans une application. Avec i18next, il suffit de rajouter `_other` en suffixe de la clé de référence.

```json
{
  "key": "item",
  "key_other": "items",
  "keyWithCount": "{{count}} item",
  "keyWithCount_other": "{{count}} items"
}
```

L'argument `count`, qu'il soit présent ou non dans la traduction, gère automatiquement le passage du singulier au pluriel.

### Gestion des intervalles

Parfois, il est nécessaire de gérer des intervalles de valeurs qui affichent des traductions différentes.

Pour ces cas, on va utiliser `i18next-intervalplural-postprocessor`, que l’on a déclaré dans la configuration d’i18n.

Prenons nos fichiers de traductions et ajoutons les lignes suivantes :

```json
[...]
"counter": {
 "value_interval": "(0)[No object];(1)[ {{count}} object];(2-inf)[ {{count}} objects]"
}
[...]
```

Dans notre fichier `App.tsx` on va remplacer le bouton de compteur par l'élément ci dessous.

```tsx
<button onClick={() => setCount((count) => count + 1)}>
  {t('counter.value_interval', { postProcess: 'interval', count })}
</button>
```

Maintenant, la traduction va varier suivant la valeur de `count`.

Notez l’utilisation de `inf` comme fin de notre plage. Cela permet de prendre en compte toutes les valeurs. Mais il est aussi possible de cumuler avec la gestion des pluriels comme secours.

### Gestion des montants et des dates

A partie de la version 21.3.0 d’i18next, il est possible de formatter directement les montants numéraires et les dates et heures sans recourir à des bibliothèques tierces.

Si vous ne pouvez pas utiliser à minima cette version, il est possible de combiner i18next pour la détection de langue avec les différents modules de l’API Intl de JavaScript ou des librairies comme `date-fns`.

## Conclusion

En appliquant les connaissances et techniques abordées dans cet article, vous êtes désormais mieux équipé pour internationaliser votre application React, en assurant une meilleure expérience adaptée à vos utilisateurs.
