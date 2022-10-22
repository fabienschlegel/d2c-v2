---
title: "Tests et qualité de code - Les linter, c'est statique et c'est déjà pas mal"
date: '2019-09-08'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: 'Utiliser les linter comme ESLint pour surveiller notre code'
tags: ['tests', 'qualité de code']
---

Maintenant que vous êtes chaud sur les tests avec [la partie 2 de la série](/tests-quality-ep1), on va voir en amont comment on peut améliorer notre code.

Lors de notre processus d'écriture, on va utiliser un linter.

Un linter c'est quoi ? Historiquement lint est le premier outil d'analyse syntaxique sous forme de commande UNIX pour le langage C. Eh oui, moi j'utilise des langages interprétés, alors que C, est un langage compilé. Compiler c'est transformer ton code en langage exploitable par les machines qui comprennent que les 0 et 1 (ces truffes).

La compilation de base c'est : tu te barres vingt minutes pour la pause café, heureux de ton taf et boum, quand tu reviens la compilation a merdé lamentablement pour une raison obscure.

Avec un linter on va donc être prévenu de certaines erreurs présentes dans notre code avant qu'on l'exécute.

Attention ! Ça reste de l'analyse statique. Donc principalement les erreurs de syntaxe et les problèmes de style.

### En Javascript

Pour Javascript, pas de souci pour le choix, le standard c'est [ESLint](https://eslint.org).

Pour le configurer aux petits oignons, on ajoute un fichier .eslintrc à la racine du projet et c'est parti !

```json
{
  "parser": "babel-eslint",
  "extends": ["airbnb"],
  "env": {
    "es6": true,
    "node": true,
    "browser": true
  },
  "rules": {
    "jsx-a11y/href-no-hash": "off",
    "comma-dangle": 0,
    "linebreak-style": 0,
    "react/jsx-uses-react": 2,
    "react/require-default-props": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  },
  "plugins": ["react"]
}
```

On décrypte le truc :

- parser : ici babel-eslint, ça permet à ESLint de comprendre ES6.
- extends : airbnb indique que l'on veut utiliser les règles de style fourni par Airbnb
- env : spécifie les environnements que l'on veut utiliser pour notre projet
- rules va nous permettre de donner des règles particulières à ESLint, par exemple de ne pas tenir compte de l'import de React inutilisé dans les fichiers jsx.
- plugins : pour un projet React quoi !

Mais comme on aime pas les règles, on va pouvoir dans nos fichiers, ajouter des exceptions :

```javascript
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
```

### En python

Pour python, on a plus de choix pour les linters

[Pylint](https://www.pylint.org/) et [Flake8](http://flake8.pycqa.org/en/latest/index.html) qui sont assez semblables, ils suivent les recommandations de [PEP8](https://www.python.org/dev/peps/pep-0008/), à ceci près que Flake8 supporte les precommit hooks avec Git et Mercurial.

Et le petit nouveau [Black](https://black.readthedocs.io/en/stable/index.html), qui lui est plus qu'un linter, c'est un outil qui reformate le code à votre place avec des règles différentes de PEP8.
Par exemple les longueurs de ligne qui sont historiquement de 79 caractères sont ici étendu à 88.

L'interêt de Black vient de sa simplicité. Plus de débat sur le style du code à appliquer, pas de réglages compliqués, on exécute Black au pire dans un hook de precommit et c'est tout.

### On refait le match

Un article court mais avec des liens pour approfondir. De quoi s'occuper d'ici à la semaine prochaine pour la partie 3.

---

- [Partie 0 - A quoi ça sert ?](/tests-quality-ep0)
- [Partie 1 - Les tests, comment ça marche ?](/tests-quality-ep1)
- [Partie 2 - Les linter, c'est statique et c'est déjà pas mal](/tests-quality-ep2)
- [Partie 3 - Allez hop, on pose les mains et on refactorise](/tests-quality-ep3)
- [Partie 4 - Automatiser tout ça c'est dans nos cordes](/tests-quality-ep4)
