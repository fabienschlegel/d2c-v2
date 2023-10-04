---
title: "De Gatsby à NextJS - l'itinéraire d'un blog"
pageTitle: "De Gatsby à NextJS - L'itinéraire d'un blog : Le point de vue d'un développeur"
date: '2022-09-20'
coverImage: '/assets/blog/cover-images/from-gatsby-to-nextjs-journey-of-a-blog-illustration-fr.webp'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
excerpt: "L'utilisation de Gatsby était un exemple parfait pour ne pas réinventer la roue. Réalisé avec React, Giving free templates."
tags: ['gatsby', 'story', 'blog', 'nextjs']
related: ['create-a-blog-with-nextjs', 'publish-my-own-blog-start-of-content-creator']
---

J'ai eu l'idée de créer un blog pour deux raisons. Aider d'autres développeurs et partager mon parcours professionnel. Augmenter ma valeur sur le marché du travail en apprenant de nouvelles choses et en partageant mes connaissances.

Au début, je m'impose deux contraintes. Utiliser React et rester simple. Je décide donc d'utiliser [Gatsby](https://www.gatsbyjs.com/) avec des posts markdown pour le code et [Netlify](https://www.netlify.com/) pour héberger le blog.

## Pourquoi GatsbyJS

Je crée la première version de mon blog avec GatsbyJS. Je fais le premier commit le 31 juillet 2019. J'utilise un modèle de la bibliothèque de démarrage Gatsby.

L'utilisation de Gatsby est un exemple parfait pour ne pas réinventer la roue. Il est conçu avec React et fourni des modèles de sites simples et gratuits.

Gatsby utilise GraphQL sous le capot. Je n'ai pas le temps de l'apprendre.

Je crée donc un dépôt sur Gitlab et j'apporte quelques modifications au modèle. Après cela, je fais une mise à jour annuelle pour mettre à jour la version de Gatsby. Mais rien d'autre.

Au début de l'année 2020, je n'ai pas assez de temps et de compétences. Je n'essaie pas d'apprendre Gatsby plus avant et de faire évoluer les fonctionnalités du blog.

Je le maintiens en l'état et me contente d'écrire quelques articles.

## Typescript est la prochaine étape

Fin 2020, je commence à apprendre Typescript pour travailler sur un projet React. Un de mes collègues m'aide au début.

Le projet commence et après deux mois, je suis le seul développeur front-end dans une équipe de trois personnes.

Après sept mois, la partie front-end se termine et je commence à travailler sur un autre projet React.

## React et SEO

Dans ce nouveau projet, certaines pages sont publiques. Le client a rencontré des problèmes de référencement. Un de mes collègues m'explique différentes solutions, et l'une d'entre elles est [NextJS](https://nextjs.org/).

Avec son équipe, il migre le projet sur lequel il travaille de React à NextJS uniquement pour le référencement.

J'ai fait quelques recherches et j'ai gardé cette idée en tête. Mon client n'a pas le budget et le temps de réécrire le projet.

## NextJS arrive

Début 2022, j'achète une maison, je change d'employeur et après 2 ans, je deviens un vrai travailleur à distance.

Maintenant, je suis plus à l'aise avec React et Typescript. Et j'ai envie de créer plus de projets annexes.

La réécriture du blog est l'une de ces idées. Je garde les deux contraintes initiales et j'en ajoute une autre.

Pour avoir plus de fonctionnalités, il faut que le chemin d'accès des articles soient après `/blog`. Pour l'instant, les urls de chaque article sont à la racine. L'ensemble du site peut fonctionner en pré-rendu ou en rendu côté serveur. L'hébergement repose sur Netlify. Je souhaite utiliser un système de composants.

Je vérifie mes contraintes et je choisis NextJS pour créer mon nouveau site.

Comme design system, je choisis ChakraUI, je le trouve plus simple que MaterialUI.

## Conclusion

Je termine la migration. Je n'ai que des pages pré-rendues, créées lors de la construction. La prochaine étape sera d'utiliser SSR pour créer une partie ressources. Le prochain billet que j'écrirai concernera l'aspect technique.

Pour suivre mon parcours, j'ai décidé d'ouvrir le dépôt en open source. Il est disponible sur [Gitlab](https://gitlab.com/fabienschlegel/d2c-v2) et [Github](https://github.com/fabienschlegel/d2c-v2).

Vous pouvez suivre [le compte du site](https://twitter.com/devoreur2code) et [le mien](https://twitter.com/fabienschlegel) sur Twitter. Je publierai des nouvelles étonnantes sur les prochaines fonctionnalités.

A bientôt !
