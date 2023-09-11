---
title: "Introduction à Pew - Une bibliothèque Python pour la création d'environnements virtuels"
pageTitle: 'Pew : Gérer ses environnements vitaux en Python'
date: '2019-10-14'
updated: '2023-04-14'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
excerpt: 'Apprenez à utiliser Pew, une bibliothèque Python, pour créer et gérer des environnements virtuels, ce qui vous permet de travailler avec différentes versions de Python et dépendances de projet sans affecter la configuration de votre système.'
tags: ['python', 'library']
---

Si vous êtes un développeur Python, vous connaissez l'importance d'utiliser un environnement virtuel pour vos projets. Pew est une bibliothèque Python qui vous permet de créer et de gérer facilement des environnements virtuels. Dans cet article, nous allons voir comment utiliser Pew pour créer et gérer des environnements virtuels.

## Qu'est-ce que Pew ?

Pew est une bibliothèque Python qui fournit un ensemble de commandes pour créer et gérer des environnements virtuels. Elle est similaire à d'autres outils d'environnement virtuel comme virtualenv et conda. La différence est que Pew fournit des fonctionnalités et des commandes supplémentaires qui facilitent le travail avec les environnements virtuels.

## Installation de Pew

Pour installer Pew, utilisez la commande suivante :

```shell
sudo pip3 install pew
```

## Démarrer avec Pew

Une fois Pew installé, vous pouvez créer un nouvel environnement virtuel en utilisant la commande `mkproject`. Cette commande crée un nouvel environnement virtuel et y bascule :

```shell
pew mkproject myproject
```

Vous êtes maintenant dans votre nouvel environnement virtuel. Si vous voulez quitter l'environnement virtuel, vous pouvez utiliser la commande `exit`. Pour voir la liste de vos environnements virtuels, utilisez la commande `ls`. Pour changer d'environnement virtuel, utilisez la commande `workon` suivie du nom de l'environnement virtuel :

```shell
pew workon myproject
```

Voilà, c'est fait ! Vous savez maintenant comment utiliser Pew pour créer et gérer des environnements virtuels.

## Conclusion

Les environnements virtuels sont un outil essentiel pour les développeurs et les développeuses Python. Ils vous permettent de travailler avec différentes versions de Python et dépendances de projet sans affecter la configuration de votre système.

Pew facilite la création et la gestion des environnements virtuels, et fournit des fonctionnalités et des commandes supplémentaires qui le rendent encore plus utile. Essayez-le par vous-même et voyez comment il peut améliorer votre flux de travail de développement Python.
