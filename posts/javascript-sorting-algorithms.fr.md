---
title: 'JavaScript : algorithmes de tri'
pageTitle: "Explorez le tri à bulles et d'autres algorithmes de tri en JavaScript"
date: '2023-10-25'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/javascript-sorting-algorithms-fr.webp'
excerpt: 'Découvrez comment implémenter et comprendre les algorithmes de tri, en commençant par le tri à bulles, suivi du tri rapide, du tri fusion et du tri par insertion, en JavaScript.'
tags: ['javascript']
related: ['array-methods-javascript', 'how-to-regex-in-javascript']
---

Le tri est l'une des opérations fondamentales de la manipulation des données. Tri des listes, des tableaux, des objets - c'est une tâche omniprésente.

Le tri n'est pas seulement un exercice académique, il est essentiel pour optimiser les performances de vos applications, que ce soit pour organiser des données dans un tableau ou pour présenter des résultats de manière ordonnée.

Voici quatre algorithmes de tri différents en JavaScript. Chacun de ces algorithmes a ses avantages et ses inconvénients, et le choix de l'algorithme de tri approprié dépendra de votre cas d'utilisation spécifique.

## Tri à bulles en JavaScript

Le tri à bulles est l'un des algorithmes de tri les plus simples, mais aussi l'un des moins efficaces. Cependant, bien qu'il ne soit pas le choix optimal pour trier de grandes quantités de données, il reste un excellent point de départ pour comprendre les principes fondamentaux du tri.

### Explication de l'algorithme

Le principe du tri à bulles est assez direct. L'algorithme parcourt le tableau de gauche à droite, en comparant deux éléments consécutifs à chaque étape. Si l'élément actuel est plus grand que l'élément suivant, ils sont échangés. Ce processus se répète jusqu'à ce que tout le tableau soit parcouru sans aucun échange nécessaire.

Cela garantit que les éléments les plus grands "remontent" progressivement vers la fin du tableau, comme des bulles qui remontent à la surface.

L'algorithme continue ce processus jusqu'à ce que le tableau soit entièrement trié, ce qui peut nécessiter plusieurs passages. À chaque itération, le plus grand élément non trié "remonte" vers sa position finale.

Les éléments triés restent immobiles, tandis que les éléments non triés sont soumis à des comparaisons et des échanges.

### Implémentation en JavaScript

Voici une implémentation simple du tri à bulles en JavaScript :

```javascript
function bubbleSort(arr) {
  const n = arr.length;
  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
  } while (swapped);

  return arr;
}

const numbersArray = [64, 34, 25, 12, 22, 11, 90];
bubbleSort(numbersArray); // [11, 12, 22, 25, 34, 64, 90]
```

Cette implémentation en JavaScript utilise une boucle `do...while` pour répéter le processus de tri tant qu'il y a des échanges d'éléments. L'algorithme s'arrête dès qu'il parcourt le tableau sans effectuer d'échanges, indiquant que le tableau est trié.

### Avantages et inconvénients du tri à bulles

Le tri à bulles est simple à comprendre et à mettre en œuvre, ce qui en fait un excellent point de départ pour les débutants en programmation. Cepend à enseigner les concepts de base du tri. Cependant, il a des inconvénients significatifs :

- Il est inefficace pour les grandes quantités de données, avec une complexité temporelle de O(n^2) dans le pire cas.
- Il effectue un nombre d'opérations inutiles, même lorsque le tableau est déjà partiellement trié.

En conséquence, le tri à bulles est rarement utilisé dans des applications réelles, sauf pour des besoins pédagogiques ou pour trier de très petites quantités de données.

## Tri rapide en JavaScript

Le tri rapide, également connu sous le nom de **QuickSort** est un algorithme de tri efficace qui utilise une approche de diviser-pour-régner pour trier un tableau. C'est l'un des algorithmes de tri les plus rapides et couramment utilisés en informatique.

### Explication de l'algorithme

Le tri rapide repose sur un principe de partitionnement. L'idée principale est de choisir un élément du tableau, appelé le _pivot_ puis de partitionner le tableau en deux sous-tableaux : l'un contenant tous les éléments plus petits que le pivot, et l'autre contenant tous les éléments plus grands que le pivot. Ensuite, l'algorithme est récursivement appliqué aux sous-tableaux jusqu'à ce que tout le tableau soit trié.

L'étape de partitionnement est cruciale pour le fonctionnement du tri rapide. Il existe différentes stratégies pour choisir le pivot, telles que choisir le premier élément, le dernier élément ou un élément au hasard. Une fois que le pivot est choisi, les éléments du tableau sont réorganisés de manière à ce que les éléments plus petits se trouvent à gauche du pivot et les éléments plus grands à droite.

### Implémentation en JavaScript

Voici une implémentation du tri rapide en JavaScript :

```javascript
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

const numbersArray = [64, 34, 25, 12, 22, 11, 90];
quickSort(numbersArray); // [11, 12, 22, 25, 34, 64, 90]
```

L'implémentation du tri rapide en JavaScript utilise la récursivité pour trier les sous-tableaux gauche et droit en fonction du pivot choisi. La combinaison des résultats des sous-tableaux triés donne le tableau trié final.

### Avantages et inconvénients du tri rapide

Le tri rapide est largement apprécié pour sa rapidité et son efficacité. Ses avantages incluent :

- Une excellente performance pour les tableaux de grande taille.
- Une complexité temporelle moyenne de O(n log n), ce qui en fait l'un des algorithmes de tri les plus rapides.

Cependant, le choix du pivot peut affecter les performances. Dans le pire des cas, si le pivot est toujours choisi comme le plus petit ou le plus grand élément, la complexité peut atteindre O(n^2). Néanmoins, le tri rapide est un choix solide pour le tri en général.

## Tri fusion en JavaScript

Le tri fusion, également connu sous le nom de **MergeSort** est un algorithme de tri qui se base sur la méthode de diviser-pour-régner. Il est célèbre pour sa stabilité, sa prévisibilité des performances et sa capacité à trier efficacement de grandes quantités de données.

### Explication de l'algorithme

L'idée centrale du tri fusion est de diviser le tableau en deux moitiés égales, de trier chaque moitié de manière récursive, puis de fusionner les deux moitiés triées pour obtenir le tableau final trié.

Le processus de fusion est essentiel dans le tri fusion. Deux tableaux triés sont fusionnés en un seul tableau trié. Cela se fait en comparant les éléments de chaque tableau un par un et en les plaçant dans le tableau résultant dans le bon ordre. La fusion se poursuit jusqu'à ce que toutes les données des deux moitiés soient fusionnées.

### Implémentation en JavaScript avec des exemples de code

Voici une implémentation du tri fusion en JavaScript :

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  const fusion = (left, right) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
  };

  return fusion(mergeSort(left), mergeSort(right));
}

const numbersArray = [64, 34, 25, 12, 22, 11, 90];
mergeSort(numbersArray); // [11, 12, 22, 25, 34, 64, 90]
```

L'implémentation du tri fusion en JavaScript divise le tableau en deux moitiés, trie chaque moitié de manière récursive, puis les fusionne pour obtenir le tableau trié final.

### Cas d'utilisation et performances du tri fusion

Le tri fusion est un excellent choix lorsque la stabilité et la prévisibilité des performances sont essentielles. Il a une complexité temporelle moyenne de O(n log n), ce qui en fait une option efficace pour trier de grandes quantités de données. Cependant, il peut nécessiter plus de mémoire que d'autres algorithmes de tri, car il crée de nouveaux tableaux à chaque étape de la fusion.

Le tri fusion est également utilisé dans des applications telles que la fusion de fichiers triés et la classification de données dans des bases de données.

## Tri par insertion en JavaScript

Le tri par insertion est un algorithme de tri simple et efficace, particulièrement adapté aux petits tableaux ou à des tableaux qui sont déjà partiellement triés. Il est largement utilisé pour trier des données en temps réel ou pour trier de petites quantités de données.

### Explication de l'algorithme du tri par insertion

L'algorithme du tri par insertion fonctionne en construisant progressivement un tableau trié en insérant un élément non trié à la bonne position dans le tableau trié déjà existant. L'idée est de parcourir le tableau élément par élément, en comparant chaque élément avec les éléments précédents dans le tableau trié. Lorsqu'un élément non trié est trouvé, il est inséré à la bonne position dans le tableau trié.

### Implémentation en JavaScript

Voici une implémentation du tri par insertion en JavaScript :

```javascript
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currentValue = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > currentValue) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = currentValue;
  }

  return arr;
}

const numbersArray = [64, 34, 25, 12, 22, 11, 90];
insertSort(numbersArray); // [11, 12, 22, 25, 34, 64, 90]
```

L'implémentation du tri par insertion en JavaScript parcourt le tableau, compare chaque élément avec les éléments précédents dans le tableau trié et les insère à la bonne position.

### Situations où le tri par insertion brille

Le tri par insertion est particulièrement utile dans les scénarios suivants :

- **Tri de petits tableaux** : L'algorithme est efficace pour trier de petites quantités de données en raison de sa simplicité.
- **Données partiellement triées** : Lorsque les données sont déjà partiellement triées, le tri par insertion peut être plus rapide que d'autres algorithmes de tri plus complexes.
- **Tri en temps réel** : Il est couramment utilisé pour trier des données en temps réel, telles que les résultats de recherche ou les listes en constante évolution.

Bien que le tri par insertion ne soit pas aussi rapide que le tri rapide ou le tri fusion pour les grands ensembles de données, il reste un outil précieux pour des scénarios spécifiques où la simplicité et la performance suffisent.

## Comparaison et Choix d'Algorithme

La sélection de l'algorithme de tri approprié dépend fortement du contexte et des caractéristiques spécifiques de vos données et de votre application. Chacun des algorithmes que nous avons explorés - le tri à bulles, le tri rapide, le tri fusion et le tri par insertion - présente des avantages et des inconvénients distincts.

### Comparaison des performances et de la complexité

- **Tri à bulles** : Bien que simple à comprendre et à mettre en œuvre, il est inefficace pour les grandes quantités de données, avec une complexité temporelle de O(n^2) dans le pire cas. Il effectue un nombre d'opérations inutiles, même lorsque le tableau est partiellement trié.
- **Tri rapide** : Il est rapide et efficace pour trier de grandes quantités de données, avec une complexité temporelle moyenne de O(n log n). Cependant, le choix du pivot peut affecter les performances, et il peut nécessiter plus de mémoire.
- **Tri fusion** : Il est stable, prévisible en termes de performances et efficace pour trier de grandes quantités de données, avec une complexité temporelle moyenne de O(n log n). Cependant, il peut consommer plus de mémoire en raison de la création de nouveaux tableaux.
- **Tri par insertion** : Il est simple, efficace pour trier de petites quantités de données ou des données partiellement triées, et a une complexité temporelle de O(n^2) dans le pire cas.

### Conseils pour choisir l'algorithme approprié

- **Taille des données** : Pour de petites quantités de données ou des tableaux déjà partiellement triés, le tri par insertion est une option efficace. Pour de grandes quantités de données, le tri rapide ou le tri fusion sont des choix plus adaptés.
- **Stabilité** : Si la stabilité du tri est essentielle, le tri fusion est un choix solide, car il maintient l'ordre relatif des éléments égaux.
- **Prévisibilité des performances** : Si vous avez besoin de performances cohérentes et prévisibles, le tri fusion peut être préférable en raison de sa complexité temporelle stable.
- **Facilité d'implémentation** : Le tri à bulles et le tri par insertion sont les plus simples à implémenter et conviennent aux cas où la simplicité prime.
- **Espace mémoire** : Si l'espace mémoire est une préoccupation, le tri par insertion est efficace, tandis que le tri fusion peut consommer plus de mémoire.

En fin de compte, le choix de l'algorithme de tri dépendra de vos besoins spécifiques, de la taille de vos données et de vos priorités en matière de performances, de stabilité et de simplicité d'implémentation. Il peut être utile d'expérimenter avec différents algorithmes pour trouver celui qui convient le mieux à votre application.
