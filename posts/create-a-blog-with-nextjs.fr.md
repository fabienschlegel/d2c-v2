---
title: 'Créer un blog avec NextJS'
pageTitle: 'Créer un blog avec NextJS : un tutoriel étape par étape'
date: '2022-09-27'
coverImage: '/assets/blog/cover-images/create-a-blog-with-nextjs-illustration-fr.webp'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
excerpt: 'Comment créer un blog avec NextJS et Typescript. Un guide tiré de ma propre expérience.'
tags: ['react', 'typescript', 'blog', 'nextjs']
related: ['from-gatsby-to-nextjs-journey-of-a-blog', 'publish-my-own-blog-start-of-content-creator']
---

Cette année, j'ai décidé de migrer mon blog de Gatsby à NextJS. Pour pouvoir ajouter des fonctionnalités plus facilement.

J'utilise [ChakraUI](https://chakra-ui.com/) comme librairie de composants et design system, Google Analytics pour les métriques, [Netlify](https://www.netlify.com/) pour l'hébergement et Typescript comme langage.

## Créer le projet

Dans la première version du blog, j'écrivais les billets en markdown. Il faut que je garde ce système. En tant que développeur, c'est plus facile que de maintenir un back-end WordPress (ou autre).

## NextJS

Créer un projet [NextJS](https://nextjs.org/), c'est simple, une commande suffit. Vous ajoutez le nom de votre projet, allez dans le dossier du projet et démarrez l'environnement de développement.

```bash
npx create-next-app@latest --typescript
```

Le projet contient les fichiers classiques d'un projet typescript. Et quelques fichiers importants pour NextJS aussi.

- `next.config.js` : le fichier utilisé pour la configuration
- le dossier `pages` : contient un fichier index pour la page racine
- le fichier `_app.tsx` : à l'intérieur du dossier `pages`, il contient le composant utilisé pour initialiser les pages.
- le dossier `public` : utilisé pour tous les fichiers statiques, comme le favicon et les images.

Dans NextJS, chaque dossier ou fichier à l'intérieur du dossier pages est une route. Vous pouvez suivre toutes les routes en dépliant l'arbre.

## Librairies du projet

Dans mes projets, j'aime utiliser des librairies qui me facilitent la vie.

- **_Prettier_** : pour formater mon code. Dans Visual Studio Code, je l'utilise avec l'enregistrement automatique.
- **_Husky_** : Prettier formate tous les fichiers avant le commit.
- **_Eslint_** : il donne un tas de règles pour vérifier le code statique de vos fichiers Typescript et Javascript.
- **_Stylelint_** : même chose qu'Eslint, mais pour les fichiers CSS et SCSS.
- **_Markdownlint_** : un autre linter, pour les fichiers markdown.
- **_Sass_** : pour les fichiers SCSS.

Vous pouvez penser que c'est trop. L'utilisation de linters et d'outils de formatage de code permet de gagner du temps.

Lorsque votre projet prendra de l'ampleur, vous rencontrerez des bugs. Consommer de la charge mentale pour vérifier les points-virgules et l'indentation du code est une perte de temps. Confiez ces tâches à des outils et consacrez votre temps à l'écriture de nouvelles fonctionnalités et à la correction de bugs.

Tous ces paquets ont besoin d'un fichier de configuration.

Ces configurations proviennent de mon expérience sur différents projets. Elles peuvent être obsolètes si vous lisez ce billet longtemps après sa publication.

## Structure de mon application

Pour mes projets React, j'utilise une structure à l'intérieur du dossier `src`. C'est pour répartir les fichiers en fonction de leur utilité. Les noms peuvent changer en fonction du projet.

- un dossier `generic` : pour tout ce que vous pouvez utiliser dans chaque projet sans changement.
- un dossier `business` : pour toutes les fonctionnalités du projet. Chaque dossier à l'intérieur est une fonctionnalité.
- un dossier `core` : pour le reste du projet. Fichiers de configuration, services spécifiques ou partagés.

C'est mon premier projet NextJS et le fait de ne pas avoir de dossier `src` me désoriente. Mais s'adapter fait partie des compétences du développeur. Je définis une nouvelle structure. Comme chaque première fois, ce n'est pas forcément la meilleure, mais je l'améliorerai plus tard.

- les dossiers `pages` et `public` : ils sont utilisés par le framework, je dois donc les conserver.
- le dossier `components` : chaque dossier à l'intérieur contient un composant et tout ce dont j'ai besoin pour lui.
- le dossier `hooks` : contient tous les hooks personnalisés utilisés par les composants.
- le dossier `core` : tout ce dont j'ai besoin pour l'application, comme l'API, les utilitaires, le thème personnalisé pour Chakra, etc.
- le dossier `posts` : contient tous les fichiers markdown

Si vous avez quelques composants, comme moi au début du projet, ne sur-ingénieriez pas votre projet. Vous n'avez pas besoin d'une multitude de dossiers et de fichiers vides.

## Implémenter ChakraUI

Pour ajouter ChakraUI au projet, j'utilise cette commande, comme expliqué dans [la documentation](https://chakra-ui.com/getting-started).

```bash
yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

Pour utiliser ChakraUI, vous devez ajouter un composant appelé `ChakraProvider`. Ce composant a une propriété `theme`, pour surcharger le thème par défaut de ChakraUI. Vous devez l'ajouter dans le dossier pages, dans le fichier `_app.tsx`.

Je crée un fichier de thème personnalisé pour étendre les couleurs et ajouter des polices.

```typescript
import { extendTheme } from '@chakra-ui/react';

const mainTheme = extendTheme({
  colors: {
    brand: {
      darkBlue: '#1f4f6f',
      blue: '#22577a',
      greenBlue: '#38a3a5',
      greener: '#57cc99',
      green: '#80ED99',
      lightGreen: '#c7f9cc',
    },
  },
  fonts: {
    heading: `'Raleway', sans-serif`,
    body: `'Libre Baskerville', sans-serif`,
  },
});

export default mainTheme;
```

C'est mon premier bug. J'utilise SCSS `import` pour récupérer les polices google. NextJS V12 utilise SWC comme outil de minification. Il y a un [bug](https://github.com/vercel/next.js/issues/32645) avec cette version et `import` ne fonctionne pas en production.

Pour résoudre ce problème, je fais une recherche sur Google et je trouve la solution [ici](https://medium.com/nextjs/how-to-add-font-in-next-js-7a7fba80d528).

J'utilise le fichier spécial `_document.tsx`. Le build met à jour le rendu des balises `html` et `body` dans ce fichier.

J'y ajoute tous les scripts recommandés par le site de Google fonts. Et ça marche.

```tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          {/* Google fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&family=Raleway:wght@800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

## CSS in JS

ChakraUI utilise les propriétés CSS comme accessoires pour les composants. Au début, j'utilise SCSS d'abord et les props ensuite.

C'est une erreur. J'ai choisi un système de conception pour gagner du temps. Même si j'ai perdu du temps pendant la courbe d'apprentissage, je le récupérerai par la suite. Je dois donc l'exploiter à 100%. Je vais supprimer la plupart des fichiers de style et essayer de ne garder que le fichier SCSS pour les posts.

CSS in JS est facile à utiliser. Au lieu d'utiliser les classes CSS, vous ajoutez la propriété au composant. En CSS, j'écris les propriétés en kebab-case (minuscules et séparées par des traits d'union). Une propriété React ne peut pas contenir de trait d'union. Au lieu de cela, elles sont en camel-case. Chakra nous donne aussi quelques raccourcis, comme `justify` pour `justifyContent`.

Parfois, nous avons besoin de media queries. C'est pour le responsive design comme la propriété flexbox direction ci-dessus. Chakra nous donne deux [solutions](https://chakra-ui.com/docs/styled-system/responsive-styles) : une syntaxe de tableau et une syntaxe d'objet. L'utilisation de la syntaxe objet est plus claire. Les clés sont les différents points de changement de taille.

```tsx
<Flex
  width="100%"
  padding={{ base: "0.5em", lg: "6em" }}
  align="center"
  justify={"space-evenly"}
  backgroundColor="brand.darkBlue"
  minHeight="80vh"
  direction={{ base: "column-reverse", lg: "row" }}
>
```

## Du markdown à l'article

La première version du blog utilisait Gatsby et un starter (comme un modèle). A la construction, le moteur utilise des requêtes GraphQL pour les billets. Je n'ai pas eu le temps de comprendre comment Gatsby utilise GraphQL. Je l'ai donc laissé de côté.

NextJS utilise des fonctions pour lire les messages et les rendre en tant qu'objets. Pour nous aider, NextJS nous donne un [starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter). Je l'utilise pour comprendre comment procéder avec les fichiers markdown.

Tout d'abord, nous devons exécuter cette commande pour installer les paquets dont nous avons besoin.

```bash
yarn add prismjs remark remark-html remark-prism gray-matter @types/remark-prism
```

Il est temps de parler de `getStaticProps` et `getStaticPath`. Ce sont deux fonctions spéciales de NextJS.

### getStaticProps

Elle est utilisée pour la génération de sites statiques. Cette fonction est exécutée pendant la construction, pour générer des pages statiques. Le paramètre unique est `context`.

Je l'utilise pour obtenir la dernière partie de l'URL nommée `slug`. Je le donne aux fonctions qui retournent l'article courant et quelques données sur l'article suivant et l'article précédent.

`getStaticProps` renvoie un objet utilisé par le composant pour rendre la page des billets.

```typescript
export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'coverImage',
    'ogImage',
    'tags',
  ]);
  const content = await markdownToHtml(post.content || '');

  const previous = getPreviousPost(params.slug);

  const next = getNextPost(params.slug);

  return {
    props: {
      post: {
        ...post,
        content,
      },
      previous,
      next,
    },
  };
}
```

### getStaticPaths

Il est utilisé pour la génération de sites statiques lorsque vous utilisez des itinéraires dynamiques. Il construit tous les chemins statiques disponibles pendant la construction.

Je l'utilise pour récupérer tous les chemins de mes posts pendant la construction.

```typescript
export async function getStaticPaths() {
  const posts = getAllPostsByDate(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
```

### L'API des articles

C'est la partie principale du processus. Comment obtenir un objet JSON avec les données de l'article à partir d'un fichier markdown ?

La fonction `getPostBySlug` prend en paramètre une chaîne et un tableau. Il représente le nom du fichier sans l'extension et une liste de champs. Elle provient de la dernière partie de l'URL. La fonction lit le fichier dans le dossier posts. La bibliothèque `gray-matter` divise les données entre le contenu et les métadonnées. La fonction renvoie un objet à `getStaticProps`. Les champs et le contenu sont les clés de cet objet.

```typescript
export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}
```

La fonction `markdownToHtml` utilise la bibliothèque `remark`. Elle transforme la valeur du champ de contenu en texte avec des balises HTML.

La dernière bibliothèque que j'utilise est PrismJS. Cette bibliothèque met en évidence les parties codées du message pour une meilleure compréhension.

```typescript
export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(html, { sanitize: false }).use(prism).process(markdown);
  return result.toString();
}
```

## Créer une liste d'articles à partir des tags

Chacun de mes articles contient des tags. Vous cliquez sur un tag et vous êtes redirigé vers une page dédiée avec les articles filtrés.

C'est une fonctionnalité en 2 étapes. Souvenez-vous de `getStaticPaths`, il va créer tous les chemins à partir de la liste des tags. Nous l'utilisons pour obtenir la liste de tous les tags et créer tous les chemins nécessaires pendant la construction. Tout est dans cette fonction.

```typescript
export function getAllTags(): Array<string> {
  const allPosts = getAllPosts(['slug', 'tags']);

  const flattenTags = allPosts.map((post) => post?.tags).flat();

  const allTags = flattenTags.filter((item, pos) => flattenTags.indexOf(item) == pos);
  return allTags;
}
```

Je m'explique. Chaque article contient un tableau de tags. J'utilise une fonction map pour les récupérer. La fonction flat concatène mon tableau de tableaux. Donc dans `flattenTags`, j'ai un tableau de tags avec des doublons. Dans la fonction suivante, j'utilise un filtre pour supprimer tous les doublons.

```typescript
export function getPostsByTag(tag: string, fields: string[] = []) {
  return getAllPostsByDate(fields).filter((post) => post.tags.includes(tag));
}
```

La deuxième partie récupère la liste des messages triés par date. Elle conserve les messages si le tableau des tags contient le tag demandé.

Cette API a besoin de quelques améliorations, comme des tags en minuscules.

## Ajouter des métriques

J'aime avoir des indicateurs sur les sites. Je peux savoir quel contenu est le plus populaire, quelle est la meilleure taille pour un article, etc.

J'utilise Google Analytics sur la première version du site avec un plugin Gatsby. Avec NextJS, je ne peux pas garder le même outil. Après quelques recherches sur Google, je trouve ce que je cherche.

```tsx
{
  isProduction && (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
```

Ce bout de code dans le fichier `_document.tsx` charge le script avec mon ID de suivi. Le booléen `isProduction` l'active si la variable `NODE_ENV` est positionnée à production.

## Ajouter des sitemaps

Chaque site web doit avoir des sitemaps et des fichiers robots.txt.

Cela aide les moteurs de recherche à indexer votre site. J'ajoute le paquet next-sitemap pour effectuer cela. Il s'exécute après la construction pour collecter toutes les routes et créer des fichiers dédiés. J'ajoute la commande du paquet la commande `postbuild` dans le fichier `package.json` et un fichier de configuration.

Après le déploiement, les sitemaps et les fichiers robots.txt seront disponibles.

```typescript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://devoreur2code.com',
  generateRobotsTxt: true,
};
```

## Déploiement

La version précédente est déjà en production. Je souhaite déployer la nouvelle version sans créer de contenu dupliqué.

C'est facile avec Netlify. Je crée une nouvelle application dans le tableau de bord et la lie à mon dépôt en 2 clics. Netlify détecte mon application comme un projet NextJS et règle tout pour moi Je supprime le domaine dans la première version. Je l'ajoute à mon nouveau site dans les paramètres du domaine.

Je déploie la nouvelle version en moins de 10 minutes.

## Conclusion

J'ai appris beaucoup de choses en faisant cette réécriture de mon site web. J'ai fait quelques erreurs à cause de mon manque d'expérience avec NextJS. Mais ça fait parti du job. On peut apprendre en pratiquant et en progressant.

L'ajout de nouvelles fonctionnalités m'aidera à trouver des bugs et des améliorations. J'ai décidé d'ouvrir le dépôt. Il est disponible sur [Gitlab](https://gitlab.com/fabienschlegel/d2c-v2) et [Github](https://github.com/fabienschlegel/d2c-v2).

Vous pouvez suivre [le compte du site](https://twitter.com/devoreur2code) et [le mien](https://twitter.com/fabienschlegel) sur Twitter. Je publierai des news sur les prochaines fonctionnalités.

A bientôt !
