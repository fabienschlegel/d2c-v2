---
title: 'Gérer des données côté client avec localStorage et sessionStorage'
pageTitle: "Utiliser le localStorage et le sessionStorage pour améliorer l'expérience utilisateur"
date: '2024-03-28'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/localStrorage-sessionStorage-illustration.webp'
excerpt: 'Découvrez comment tirer parti du localStorage et du sessionStorage pour stocker des données côté client.'
tags: ['javascript']
related: ['introduction-to-jwt', 'how-to-regex-in-javascript']
---

L'utilisation du localStorage et du sessionStorage grâce à JavaScript peut améliorer l'expérience utilisateur sur un site web.

Ces deux mécanismes de stockage côté client permettent de conserver des données localement dans le navigateur du visiteur.

Dans cet article, nous allons explorer comment tirer parti du localStorage et du sessionStorage pour stocker des données et participer à l’amélioration de l'expérience utilisateur. Avec des exemples de code et des explications détaillées pour vous aider à mettre en œuvre ces fonctionnalités dans vos projets web.

## Qu'est-ce que le localStorage et le sessionStorage ?

Ce sont deux mécanismes de stockage côté client offerts par les navigateurs web modernes, permettant de stocker des données localement dans le navigateur du visiteur.

Cela signifie que les données peuvent être conservées même après la fermeture du navigateur et la navigation sur d'autres pages du site.

Les données sont stockées sous forme de paires clés/valeurs. Les valeurs sont exclusivement des chaines de caractères. Les méthodes `JSON.stringify` et `JSON.parse` permettent d’ajouter d’autres types de valeurs, comme des listes ou des objets.

Ces deux espaces de stockage sont propre au domaine courant et il n’est pas possible d’accéder au localStorage ou au sessionStorage d’un autre domaine.

### Différence entre localStorage et sessionStorage

- **LocalStorage :** Les données stockées dans le localStorage persistent même après la fermeture du navigateur. Elles restent disponibles jusqu'à ce qu'elles soient explicitement supprimées ou que l'utilisateur efface les données de son navigateur.
- **SessionStorage :** Contrairement au localStorage, les données stockées dans le sessionStorage ne persistent que pendant la durée de la session de navigation de l'utilisateur. Cela signifie que les données sont effacées dès que l'utilisateur ferme le navigateur ou l'onglet.

### Limites de stockage et durée de vie des données

- Les navigateurs imposent des limites de stockage pour le localStorage et le sessionStorage, généralement entre 5 Mo et 10 Mo par domaine.
- La durée de vie des données varie également en fonction du type de stockage. Les données du localStorage persistent indéfiniment, tandis que celles du sessionStorage sont limitées à la durée de la session de navigation.

## Utilisation du localStorage et du sessionStorage : Points Communs

Tant le localStorage que le sessionStorage sont des outils puissants pour stocker des données côté client dans le navigateur web. Voici comment les utiliser.

### Stockage des données

```javascript
// Définition des données à stocker
const data = {
  key: 'value',
};

// Stockage des données dans le localStorage
localStorage.setItem('key', JSON.stringify(data));

// Stockage des données dans le sessionStorage
sessionStorage.setItem('key', JSON.stringify(data));
```

### Récupération des données

```javascript
// Récupération des données depuis le localStorage
const storedDataLocal = localStorage.getItem('key');

// Récupération des données depuis le sessionStorage
const storedDataSession = sessionStorage.getItem('key');

// Vérification de l'existence des données dans le localStorage
if (storedDataLocal) {
  const dataLocal = JSON.parse(storedDataLocal);
  console.log('Données du LocalStorage:', dataLocal);
} else {
  console.log('Aucune donnée trouvée dans le localStorage.');
}

// Vérification de l'existence des données dans le sessionStorage
if (storedDataSession) {
  const dataSession = JSON.parse(storedDataSession);
  console.log('Données du sessionStorage :', dataSession);
} else {
  console.log('Aucune donnée trouvée dans le sessionStorage.');
}
```

### Suppression des données

```javascript
// Suppression des données du localStorage
localStorage.removeItem('key');

// Suppression des données du sessionStorage
sessionStorage.removeItem('key');

// Vider l'ensemble des données
localStorage.clear();
sessionStorage.clear();
```

## Utilisation spécifique du localStorage

Le localStorage est idéal pour stocker des données qui doivent persister indéfiniment dans le navigateur, même après la fermeture et la réouverture du navigateur. Voici quelques exemples d'utilisation spécifique du localStorage :

- Stockage des préférences utilisateur
- Stockage des paramètres de configuration

## Utilisation spécifique du sessionStorage

Le sessionStorage est utile pour stocker des données temporaires qui doivent être disponibles pendant la durée de la session de navigation de l'utilisateur. Voici quelques exemples d'utilisation spécifique du sessionStorage :

- Stockage des données de session utilisateur
- Stockage des paniers d'achat temporaires

## Bonnes pratiques et sécurité

Lors de l'utilisation du localStorage et du sessionStorage, il est essentiel de suivre des bonnes pratiques et de prendre en compte les considérations de sécurité pour garantir la protection des données stockées côté client.

### Sécurisation des données stockées

- **Bannissez les données sensibles :** Ne stockez pas de données sensibles telles que des mots de passe ou des informations personnelles identifiables dans le localStorage ou le sessionStorage. Utilisez des méthodes de chiffrement côté serveur pour ces types de données.
- **Validation des données :** Assurez-vous de valider et de nettoyer les données avant de les stocker dans le localStorage ou le sessionStorage.

### Gestion des données

- **Nettoyage régulier :** Nettoyez régulièrement les données obsolètes ou non utilisées du localStorage et du sessionStorage pour éviter l'accumulation de données inutiles.
- **Limite de stockage :** Surveillez attentivement la taille des données stockées dans le localStorage et le sessionStorage pour éviter de dépasser les limites imposées par le navigateur.

## Conclusion

Intégrer le localStorage et le sessionStorage dans votre site web peut non seulement améliorer l'expérience utilisateur, mais aussi simplifier le développement en réduisant la dépendance aux cookies et aux requêtes serveur.

En comprenant comment utiliser ces fonctionnalités de stockage côté client de manière efficace et sécurisée, vous pouvez offrir une expérience plus fluide à vos utilisateurs.

En investissant du temps dans la planification et la mise en œuvre de ces fonctionnalités, vous contribuez à créer des applications web plus robustes et fiables pour vos utilisateurs.
