---
title: 'Les tableaux en JavaScript'
pageTitle: 'Tableaux en JavaScript : fondamentaux et méthodes'
date: '2023-10-11'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/array-methods-javascript-fr.webp'
excerpt: 'Apprenez à créer et manipuler des tableaux en JavaScript avec cet article complet. Découvrez les fondamentaux des tableaux, ainsi que des techniques avancées pour itérer, transformer, filtrer, agréger et trier les données.'
tags: ['javascript']
related: ['how-to-regex-in-javascript', 'javascript-reduce-method']
---

Les tableaux en JavaScript sont des structures de données fondamentales pour le stockage et la manipulation de collections d'éléments.

Ils sont incroyablement polyvalents et peuvent être utilisés pour stocker et manipuler une large variété de données. Ils sont au cœur de nombreuses opérations de traitement de données, de rendu d'interface utilisateur dynamique et de résolution de problèmes algorithmiques.

## Les fondamentaux des tableaux en JavaScript

Les tableaux servent à stocker des collections d'éléments, qu'il s'agisse de nombres, de chaînes de caractères, d'objets ou même de fonctions. Une solide compréhension des tableaux JavaScript est un atout majeur dans la boîte à outils du développeur et de la développeuse.

### Qu'est-ce qu'un tableau en JavaScript ?

Un tableau en JavaScript est une collection ordonnée d'éléments, où chaque élément est associé à un indice (ou "index") unique. La particularité des tableaux JavaScript réside dans leur capacité à contenir une variété de types de données dans un même tableau. Par exemple, un tableau peut contenir à la fois des nombres, des chaînes de caractères et des objets, le tout dans un ordre spécifique.

### Syntaxe de création et d'initialisation de tableaux

Pour créer un tableau en JavaScript, vous pouvez utiliser la notation littérale des tableaux (array literal) ou le constructeur `Array()`. Voici comment créer un tableau vide avec chaque méthode :

```javascript
// Utilisation de la notation littérale des tableaux
const tableauVide1 = [];

// Utilisation du constructeur Array()
const tableauVide2 = new Array();
```

Pour initialiser un tableau avec des éléments, vous pouvez simplement lister ces éléments entre crochets, séparés par des virgules :

```javascript
const animals = ['dog', 'cat', 'horse', 'badger'];
```

### Accès aux éléments d'un tableau par index

Les éléments d'un tableau sont accessibles via leur indice, qui commence à zéro pour le premier élément. Par exemple, pour accéder aux éléments du tableau `animals` défini ci-dessus, vous pouvez utiliser :

```javascript
const firstAnimal = animals[0]; // 'dog'
const secondAnimal = animals[1]; // 'cat'
```

### Méthodes de base pour manipuler les tableaux

JavaScript propose plusieurs méthodes intégrées pour effectuer des opérations courantes sur les tableaux. Voici quelques-unes des méthodes les plus utilisées :

### Ajouter des éléments à la fin du tableau avec `push()`

La méthode `push()` permet d'ajouter un ou plusieurs éléments à la fin d'un tableau.

```javascript
animals.push('tiger');
console.log(animals); // ['dog','cat','horse','badger','tiger'];
```

### Retirer le dernier élément du tableau avec `pop()`

Inversement, la méthode `pop()` retire le dernier élément d'un tableau et renvoie cet élément.

```javascript
const lastAnimal = animals.pop(); // 'tiger'
console.log(animals); // ['dog','cat','horse','badger'];
```

### Retirer le premier élément du tableau avec `shift()`

La méthode `shift()` retire le premier élément d'un tableau et renvoie cet élément.

```javascript
const firstAnimal = animals.shift(); // 'dog'
console.log(animals); // ['cat','horse','badger'];
```

### Ajouter un élément au début du tableau avec `unshift()`

La méthode `unshift()` permet d'ajouter un ou plusieurs éléments au début d'un tableau.

```javascript
animals.unshift('bear');
console.log(animals); // ['bear','cat','horse','badger'];
```

Ces méthodes de base constituent les fondements de la manipulation des tableaux en JavaScript. Elles vous permettent d'ajouter, de retirer et de modifier les éléments d'un tableau selon vos besoins.

## Manipulation Avancée des Tableaux

Maintenant que nous avons exploré les fondamentaux des tableaux en JavaScript, il est temps de passer à la vitesse supérieure. Dans cette section, nous allons découvrir des techniques de manipulation avancées qui vous permettront de tirer pleinement parti de cette structure de données flexible.

### Utilisation de boucles pour itérer à travers les éléments

L'une des premières choses que vous apprenez en programmation est l'importance des boucles. Les boucles vous permettent de répéter des actions sur un ensemble d'éléments, ce qui est particulièrement utile lors de la manipulation de tableaux.

### Boucle `for` pour itérer

La boucle `for` est l'une des plus couramment utilisées pour parcourir un tableau. Elle utilise un compteur pour accéder aux éléments du tableau par leur indice. Voici comment elle fonctionne :

```javascript
const animals = ['dog', 'cat', 'horse', 'badger'];

for (let i = 0; i < animals.length; i++) {
  console.log(animals[i]);
}
```

Cette boucle parcourt chaque élément du tableau `animals` en utilisant l'indice `i`, ce qui permet d'accéder à chaque élément individuellement.

### Utilisation de `forEach()`

Bien que la boucle `for` soit efficace, JavaScript propose également la méthode `forEach()` pour itérer à travers un tableau de manière lisible :

```javascript
animals.forEach(function (animal) {
  console.log(animal);
});
```

La méthode `forEach()` prend une fonction de rappel (callback) en argument, qui est exécutée pour chaque élément du tableau. Cela rend le code plus propre et plus lisible.

### La méthode `map()` : Transformation d'un Tableau

La méthode `map()` crée un nouveau tableau en appliquant une fonction à chaque élément du tableau d'origine et renvoie le tableau modifié. Cela permet de transformer les données du tableau sans modifier le tableau initial. Voici un exemple :

```javascript
const nombres = [1, 2, 3, 4, 5];
const carres = nombres.map(function (nombre) {
  return nombre * nombre;
});
// carres : [1, 4, 9, 16, 25]
```

Dans cet exemple, la fonction passée à `map()` élève chaque nombre au carré, créant ainsi un nouveau tableau `carres`.

### La méthode `filter()` : Filtrage des Éléments

La méthode `filter()` crée un nouveau tableau contenant les éléments qui satisfont une condition spécifiée dans une fonction de rappel. Par exemple, pour obtenir un tableau contenant uniquement les nombres pairs :

```javascript
const nombres = [1, 2, 3, 4, 5];
const pairs = nombres.filter(function (nombre) {
  return nombre % 2 === 0;
});
// pairs : [2, 4]
```

La fonction de rappel renvoie `true` pour les éléments à conserver et `false` pour ceux à exclure.

### La méthode `reduce()` : Agrégation de Données

La méthode `reduce()` permet d'agréger les éléments d'un tableau en un seul résultat en utilisant une fonction de rappel. Par exemple, pour calculer la somme de tous les éléments d'un tableau :

```javascript
const nombres = [1, 2, 3, 4, 5];
const somme = nombres.reduce(function (acc, nombre) {
  return acc + nombre;
}, 0);
// somme : 15
```

La fonction de rappel prend deux arguments, `acc` (l'accumulateur) et l'élément en cours, et renvoie la valeur accumulée.

[Un article complet est disponible sur la méthode `reduce()`.](/fr/blog/javascript-reduce-method)

### La méthode `sort()` : Tri d'un Tableau

La méthode `sort()` permet de trier les éléments d'un tableau en place, c'est-à-dire qu'elle modifie le tableau d'origine. Par défaut, elle trie les éléments en les convertissant en chaînes de caractères et en les comparant selon leur ordre lexicographique. Pour un tri numérique, vous devez spécifier une fonction de comparaison :

```javascript
const nombres = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
nombres.sort(function (a, b) {
  return a - b;
});
// nombres : [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
```

Ces méthodes de tableau simplifient grandement la manipulation des données. En les combinant intelligemment, vous pouvez effectuer une grande variété d'opérations sur les tableaux en quelques lignes de code.

## Conclusion

Dans cet article, nous avons exploré les fondamentaux des tableaux en JavaScript, ainsi que quelques techniques de manipulation avancées. Nous avons vu comment créer et initialiser des tableaux, accéder aux éléments d'un tableau, et utiliser les méthodes de base pour manipuler les tableaux.

Nous avons également vu comment utiliser les boucles et les méthodes avancées pour itérer à travers les éléments d'un tableau, transformer les données du tableau, filtrer les éléments, agréger les données et trier les éléments.

En maîtrisant ces concepts, vous serez en mesure de manipuler des tableaux en JavaScript de manière efficace.
