---
title: 'Automatiser Prettier dans un hook de pre-commit'
pageTitle: 'Comment automatiser Prettier dans un hook de precommit git'
date: '2021-06-04'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
excerpt: "Prettier est un outil formidable. Il fonctionne dans de nombreux éditeurs et prend en charge de nombreuses langues. Son fonctionnement sans configuration est la première raison de l'utiliser."
tags: ['prettier', 'git']
---

[Prettier](https://prettier.io/) est un outil formidable. Il fonctionne dans de nombreux éditeurs et prend en charge de nombreuses langages.

Mais sa meilleure qualité est sa simplicité et la première raison de l'utiliser.

Lorsque vous commencez à travailler avec une nouvelle équipe, la première tâche consiste à définir le guide de style du projet. Plus le langage est permissif, plus le débat est difficile.

Avec Prettier, le débat est clos, car la plupart des décisions sont prises. Il a peu d'options, il est donc facile à configurer. Tout ce dont vous avez besoin est un fichier json nommé `.prettierrc.json`.

C'est le mien, par exemple :

```json
{
  "useTabs": false,
  "printWidth": 90,
  "tabWidth": 2,
  "singleQuote": true,
  "jsxBracketSameLine": false
}
```

Si vous utilisez Visual Studio Code, ajoutez l'extension [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) et activez la fonction de formatage à l'enregistrement. Chaque fois que vous enregistrez un fichier, Prettier s'exécute et procède au formatage automatique. C'est pratique.

Si vous ne savez pas ce qu'est un pre-commit ou un post-commit, ce sont des scripts qui s'exécutent pendant le déroulement d'un commit avec git.

Tout ce dont vous avez besoin est de définir un fichier de precommit comme celui-ci.

```bash
#!/bin/sh
FILES=$(git diff --cached --name-only --diff-filter=ACMR "*.js" "*.ts" "*.tsx" "*.scss" | sed 's| |\\ |g')
[ -z "$FILES" ] && exit 0

# Prettify all selected files
echo "$FILES" | xargs ./node_modules/.bin/prettier --write

# Add back the modified/prettified files to staging
echo "$FILES" | xargs git add

exit 0
```

Ce fichier est pour un projet TypeScript avec SCSS, vous pouvez donc modifier les extensions de fichiers pour les adapter aux vôtres.

Il s'agit de lancer Prettier et d'ajouter les fichiers mis à jour à ceux en attente de commit.

Et un post commit pour mettre à jour l'index.

```bash
#!/bin/sh

git update-index -g
```

Créez un dossier `.githooks` à la racine de votre projet et mettez-y les fichiers `pre-commit` et `post-commit` avec le contenu ci-dessus.

La dernière commande à taper est d'indiquer à git le dossier des hooks et de les rendre exécutables. Exécutez-les dans votre terminal.

```shell
git config core.hooksPath .githooks
chmod +x .githooks/*
```

Ce post est court mais il contient tout ce dont vous avez besoin pour travailler avec Prettier.

D'autres outils existent pour créer des hooks pour git, comme [Husky](https://typicode.github.io/husky/#/).
