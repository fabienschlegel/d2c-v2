---
title: 'Le Python Pew'
date: '2019-10-14'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: 'Python - découverte de la librairie pew'
tags: ['Python', 'module']
---

Pour toi qui ne connait pas, avec Python on ne démarre pas un projet sans utiliser un environnement virtuel.

Un environnement virtuel te permet de choisir la version de python et les dépendances du projet sans impacter la configuration de ton poste.

Virtualenv peut être utilisé avec virtualenvwrappper, qui lui rajoute des fonctionnalités et autres joyeuses commandes.

ça s'installe comme tous les packages python avec un :

```shell
sudo pip3 install pew
```

### Comment ça marche

pour créer un environnement, on se place dans le bon dossier :

```shell
pew mkproject monsuperprojet
```

et bim, on se retrouve dedans.

Une fois dans notre répertoire virtuelle, si on veut en sortir on passe par un **_exit_**.

On liste nos repertoires avec **_pew ls_** et les réactive avec _**pew workon monsuperprojet**_.

Facile, non ?

Tous les commandes sont expliqués sur [la page du projet](https://github.com/berdario/pew).

Bon développements avec Python !
