---
title: "Publier mon propre blog, le début d'un créateur de contenu"
pageTitle: 'Publier mon propre blog, les débuts : Conseils et astuces'
date: '2021-07-14'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
excerpt: "En tant que développeur, j'apprends beaucoup de choses. Certaines proviennent de mes collègues, de livres ou d'articles que je lis. L'idée de partager ce que je sais m'a poussé à créer un blog sur mon parcours."
tags: ['gatsby', 'story', 'blog']
related: ['create-a-blog-with-nextjs', 'from-gatsby-to-nextjs-journey-of-a-blog']
---

En tant que développeur, j'apprends beaucoup de choses. Certaines proviennent de mes collègues, de livres ou d'articles que je lis.

L'idée de partager ce que je sais m'a poussé à créer un blog sur mon parcours.

J'ai donc dressé une liste de ce que je voulais et de ce que je ne voulais pas.

- Ne pas partir de zéro.
- Utiliser une solution simple, sans base de données.
- Doit être responvise.
- Écrire des articles en Markdown.
- Posséder mon contenu.
- Pouvoir afficher du code sur les articles.

## La solution technique

Après quelques recherches, je décide d'utiliser GatsbyJS.

Gatsby utilise React et apporte quelques améliorations, l'ajout ou la suppression de fonctionnalités sera plus facile.

La construction est statique et il est livré avec des modèles de base pour les blogs. Des plugins pour Google analytics et le SEO existent déjà.

Je ne sais pas si Gatsby est le meilleur, mais comme pour chaque outil, je recommande d'utiliser celui avec lequel vous êtes le plus à l'aise.

Après l'avoir installé et fait quelques tests, je choisis un début de site et je l'édite. Je supprime certaines parties, je crée une page d'accueil, j'ajoute Google Analytics, et je modifie le CSS pour utiliser mes propres couleurs.

[Cet article](https://www.freecodecamp.org/news/how-to-build-a-react-and-gatsby-powered-blog-in-about-10-minutes-625c35c06481/) de FreeCodeCamp m'a beaucoup aidé à comprendre les bases de Gatsby.

Si vous êtes un débutant, vous pouvez utiliser le starter avec des métadonnées de site mises à jour dans la configuration de Gatsby uniquement. Après avoir appris quelques notions de React, vous serez en mesure d'apporter plus d'améliorations.

Je crée un dépôt sur Gitlab et j'y pousse le projet. La configuration est basique, develop est la branche par défaut et est utilisée pour la prévisualisation, la branche master est la branche de production. Le dépôt est public si vous voulez voir les détails.

La première fois que j'ai publié le site, c'était en 2019. J'ai écrit quelques billets et par manque de temps, j'ai abandonné le blog jusqu'en mai 2021.

Après un an et demi, je reviens, je mets à jour tous les paquets et je corrige les bugs. J'ai décidé de le traduire du français à l'anglais.

Cette première version est livrée avec beaucoup de paramètres par défaut. C'est un de mes projets, écrire ma propre version de mon blog avec Gatsby et Typescript, pour ajouter plus de fonctionnalités et le concevoir plus comme un site de personal branding.

## L'hébergement

Ma première règle pour un projet secondaire est : s'il ne rapporte pas d'argent, il doit coûter le moins possible.

Après une nouvelle recherche, j'ai trouvé Netlify. Le plan de démarrage me suffit. J'ai 100GB de bande passante et 300 minutes de build par mois.

Pour configurer votre site, c'est très simple, vous choisissez _New site from Git_ dans le panneau d'aperçu, vous donnez à Netlify l'accès à votre Gitlab ou Github et vous choisissez le bon dépôt.

La dernière étape est la partie paramétrage.

Pour un site Gatsby, j'utilise ceci :

- Branche à déployer : master
- Commande de construction : gatsby build
- Dépôt de publication : public/

C'est tout pour une configuration de base. Vous pouvez utiliser un sous-domaine du domaine _netlify.app_ ou configurer votre propre domaine.

J'ai choisi de configurer mon propre domaine. Dans les paramètres du site, je vais dans la gestion des domaines, j'ajoute mon domaine dans le champ du domaine primaire et je configure HTTPS avec Let's Encrypt.

La partie HTTPS peut prendre du temps et doit être faite après avoir configuré le domaine.

Avec Netlify, vous pouvez enregistrer votre domaine, je pense que la configuration sera plus facile. Mais j'ai mon propre registrar de domaine, c'est OVH.

J'ai donc dû mettre à jour mes enregistrements DNS avec un enregistrement A pour l'équilibreur de charge Netlify et un enregistrement TXT pour Google Analytics comme expliqué dans la documentation.

Je peux peut-être apporter quelques améliorations et les commentaires sont les bienvenus.

Les déploiements sont automatiques car Netlify a accès à votre référentiel.

## La republication

La partie la plus difficile lorsque vous démarrez un site web est la visibilité. Les médias sociaux peuvent vous aider. Je fais un tweet à chaque fois que je publie un article sur mon blog.

Mais j'ai découvert récemment une autre solution : les plateformes de publication de contenu.

Ces plateformes sont gratuites et vous pouvez y publier votre contenu. Pas de problème de duplicate content, vous pouvez définir une URL canonique. Il s'agit d'une balise méta dans la page HTML pour avertir le robot d'indexation.

J'utilise _DEV Community_ et _Hashnode_ pour republier mon contenu.

C'est très simple, vous créez un compte, vous créez un message. Les deux ont un éditeur markdown qui inclut une visionneuse de code snippet. La seule chose que vous devez faire est de copier et coller votre article depuis votre dépôt.

## Conclusion

Il est simple d'héberger son propre blog avec un peu de travail et d'utiliser des plateformes pour republier du contenu.

Créez une version de base pour commencer à publier et, après un certain temps, investissez du temps pour améliorer les choses.

## Ressources

- Mon dépôt gitlab : [https://gitlab.com/Humch/d2c](https://gitlab.com/fabienschlegel/d2c)
- Site Gatsby : [https://www.gatsbyjs.com/](https://www.gatsbyjs.com/)
- Démarrage de Gatsby : [https://www.gatsbyjs.com/starters/](https://www.gatsbyjs.com/starters/)
- Netlify : [https://www.netlify.com/](https://www.netlify.com/)
- Configurer un domaine personnalisé : [https://docs.netlify.com/domains-https/custom-domains/](https://docs.netlify.com/domains-https/custom-domains/)
- Communauté DEV : [https://dev.to/](https://dev.to/)
- Hashnode : [https://hashnode.com/](https://hashnode.com/)
