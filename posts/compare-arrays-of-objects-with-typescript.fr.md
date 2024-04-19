---
title: "Comparaison de listes d'objets en TypeScript : Intersection, Différence et Union"
pageTitle: "Comparaison avancée de listes d'objets en TypeScript"
date: '2024-04-19'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/compare-arrays-of-objects-with-typescript-illustration.fr.webp'
excerpt: "Découvrez comment comparer efficacement des listes d'objets en TypeScript en explorant les concepts d'intersection, de différence et d'union."
tags: ['typescript']
related: ['typescript-utility-types', 'typescript-enums']
---

La manipulation de données est une composante essentielle du développement logiciel.

La liste d’objet est une structure de données très fréquente. Elle permet de stocker et de manipuler des ensembles d'objets de manière structurée et efficace.

L'une des tâches courantes dans le développement logiciel est de comparer des listes d'objets pour diverses raisons :

- **Validation des données** : Avant de traiter les données, il est souvent nécessaire de vérifier si elles sont complètes, cohérentes et valides. La comparaison de listes d'objets peut aider à identifier les écarts ou les incohérences entre les données.
- **Filtrage et transformation** : Lors de la manipulation de grands ensembles de données, il est parfois nécessaire de filtrer les données en fonction de certains critères ou de les transformer en un autre format. La comparaison de listes d'objets peut faciliter ces opérations de filtrage et de transformation.
- **Détection de changements** : Dans certains cas, il est nécessaire de détecter les changements entre deux versions de données. La comparaison de listes d'objets peut aider à identifier les ajouts, les suppressions ou les modifications dans les ensembles de données.

Comparer efficacement des listes d'objets permet d’optimiser le processus de développement, améliorer la qualité du code et offrir une meilleure expérience utilisateur.

Dans cet article, nous verrons des méthodes spécifiques mais aussi des méthodes génériques et réutilisables.

Une section à la fin de l’article vous détaillera l’interêt d’utiliser ces méthodes.

## Intersection

![Illustration de l'intersection de listes](/assets/blog/content-images/intersection-illustration.webp)

L'intersection entre deux listes d'objets est l'ensemble des objets qui sont présents dans les deux listes. Autrement dit, si un objet est présent à la fois dans la première liste et dans la deuxième liste, il fait partie de l'intersection.

Cela peut être utile dans de nombreuses situations, telles que la recherche de correspondances entre deux ensembles de données ou la validation de la cohérence des données.

### Comment trouver l'intersection de listes d'objets

En TypeScript, il existe plusieurs approches pour trouver l'intersection entre deux listes d'objets.

Une approche courante consiste à utiliser la méthode `filter()` combinée avec la méthode `includes()` ou `some()` pour vérifier si chaque objet de la première liste est présent dans la deuxième liste. Cette méthode fonctionne uniquement si vous pouvez garantir l’unicité d’une propriété de l’objet, par exemple son `id`. Voici un exemple de code pour trouver l’intersection de 2 listes avec l’`id` :

```typescript
const intersection = arr1.filter((obj) => arr2.some((item) => item.id === obj.id));
```

Si vous avez besoin d’une solution plus générique qui permettent de comparer des objets suivant une ou plusieurs propriétés, vous pourrez utiliser une fonction comme `getIntersection()` ci dessous.

Voici un exemple de code illustrant comment trouver l'intersection entre deux listes d'objets en TypeScript :

```typescript
interface Animal {
  id: number;
  name: string;
}
const landAnimals = [
  { id: 0, name: 'Bear' },
  { id: 1, name: 'Tiger' },
  { id: 2, name: 'Sea lion' },
  { id: 3, name: 'Rabbit' },
];

const seaAnimals = [
  { id: 4, name: 'Whale' },
  { id: 0, name: 'Shark' },
  { id: 2, name: 'Sea lion' },
  { id: 6, name: 'Dolphin' },
  { id: 1, name: 'Turtle' },
];

function getIntersection<T>(array1: T[], array2: T[], ...keys: Array<keyof T>) {
  return array1.filter((obj1) => array2.find((obj2) => keys.every((k) => obj1[k] === obj2[k])));
}

const intersection = getIntersection<Animal>(landAnimals, seaAnimals, 'id', 'name');

console.log(intersection); // [{id: 2, name: "Sea lion"}]
```

Dans cet exemple, `intersection` contiendra les objets communs entre `landAnimals`et `seaAnimals`. Le résultat sera un tableau d'objets contenant l’objet avec l’identifiant 2 et le nom `sea lion`, car il est présent dans les 2 listes.

## Différence

![Illustration de la différence de listes](/assets/blog/content-images/difference-illustration.webp)

La différence de listes d'objets est une opération qui permet de trouver les éléments présents dans une liste mais absents dans une autre liste. Cette opération est utile pour détecter les ajouts ou les suppressions entre deux ensembles de données.

### Comment trouver la différence de listes d'objets en TypeScript

En TypeScript, il est possible de trouver la différence entre deux listes d'objets en utilisant la méthode `filter()` combinée avec la méthode `some()` ou `includes()` pour vérifier si chaque objet de la première liste est absent de la deuxième liste. Cette méthode fonctionne uniquement si vous pouvez garantir l’unicité d’une propriété de l’objet, par exemple son `id`. Voici un exemple de code pour trouver la différence entre 2 listes avec l’`id` :

```typescript
const difference = arr1.filter((objet) => !arr2.some((item) => item.id === objet.id));
```

Si vous avez besoin d’une solution plus générique qui permettent de comparer des objets suivant une ou plusieurs propriétés, vous pourrez utiliser une fonction comme `getDifference()` ci dessous.

Voici un exemple de code illustrant comment trouver la différence entre deux listes d'objets en TypeScript :

```typescript
interface Animal {
  id: number;
  name: string;
}
const landAnimals = [
  { id: 0, name: 'Bear' },
  { id: 1, name: 'Tiger' },
  { id: 2, name: 'Sea lion' },
  { id: 3, name: 'Rabbit' },
];

const seaAnimals = [
  { id: 4, name: 'Whale' },
  { id: 0, name: 'Shark' },
  { id: 2, name: 'Sea lion' },
  { id: 6, name: 'Dolphin' },
  { id: 1, name: 'Turtle' },
];

function getDifference<T>(array1: T[], array2: T[], ...keys: Array<keyof T>) {
  return array1.filter((obj1) => !array2.some((obj2) => keys.every((k) => obj1[k] === obj2[k])));
}

const difference = getDifference<Animal>(landAnimals, seaAnimals, 'id', 'name');

console.log(difference); // [{id: 0, name: "Bear"}, {id: 1, name: "Tiger"}, {id: 3, name: "Rabbit"}]
```

Dans cet exemple, `difference` contiendra les objets présents dans `landAnimals` mais absents dans `seaAnimals` . Le résultat sera un tableau d'objets contenant les objets `{id: 0, name: "Bear"}`, `{id: 1, name: "Tiger"}` et `{id: 3, name: "Rabbit"}`, car ils sont présent dans `landAnimals` mais pas dans `seaAnimals` .

En utilisant la différence de listes d'objets en TypeScript, il devient simple de détecter rapidement les changements entre deux ensembles de données et prendre les mesures nécessaires pour maintenir la cohérence et l'intégrité des données.

Cette opération est particulièrement utile dans les applications où la synchronisation et la mise à jour des données sont essentielles.

## Union

![Illustration de l'union de listes](/assets/blog/content-images/union-illustration.webp)

L'union entre deux listes d'objets est l'ensemble des objets qui sont présents dans l'une ou l'autre liste, mais pas les deux. Les doublons sont éliminés pour éviter les duplications dans le résultat final.

Cette opération est utile lorsque vous avez besoin de combiner des ensembles de données sans inclure les éléments en double.

### Comment trouver l'union de listes d'objets en TypeScript

En TypeScript, l'union de deux listes d'objets peut être trouvée en combinant les deux listes et en utilisant ensuite des méthodes telles que `filter()` et `reduce()` pour éliminer les doublons.

Cette méthode fonctionne uniquement si vous pouvez garantir l’unicité d’une propriété de l’objet, par exemple son `id`. Voici un exemple de code pour trouver l’union entre 2 listes avec l’`id` :

```typescript
const union = [
  ...arr1,
  ...arr2.reduce((acc, obj) => {
    if (!arr1.some((item) => item.id === obj.id)) {
      acc.push(obj);
    }
    return acc;
  }, []),
];
```

Si vous avez besoin d’une solution plus générique qui permettent de comparer des objets suivant une ou plusieurs propriétés, vous pourrez utiliser une fonction comme `getUnion()` ci dessous.

Voici un exemple de code illustrant comment trouver l'union entre deux listes d'objets en TypeScript :

```typescript
interface Animal {
  id: number;
  name: string;
}
const landAnimals = [
  { id: 0, name: 'Bear' },
  { id: 1, name: 'Tiger' },
  { id: 2, name: 'Sea lion' },
  { id: 3, name: 'Rabbit' },
];

const seaAnimals = [
  { id: 4, name: 'Whale' },
  { id: 0, name: 'Shark' },
  { id: 2, name: 'Sea lion' },
  { id: 6, name: 'Dolphin' },
  { id: 1, name: 'Turtle' },
];

function getUnion<T>(array1: T[], array2: T[], ...keys: Array<keyof T>) {
  return [
    ...array1,
    ...array2.reduce((acc, obj1) => {
      if (!array1.some((obj2) => keys.every((k) => obj1[k] === obj2[k]))) {
        acc.push(obj1);
      }
      return acc;
    }, []),
  ];
}

const union = getUnion(landAnimals, seaAnimals, 'id', 'name');

console.log(union.length); // On obtiendra 8 résultats dans la liste
```

Dans cet exemple, `union` contiendra les objets qui sont présents dans `landAnimals` ou `seaAnimals`, mais pas dans les deux.

Les doublons sont éliminés, donc le résultat final ne contiendra qu'un seul exemplaire de chaque objet.

L'union de listes d'objets en TypeScript offre une manière efficace de combiner des ensembles de données tout en évitant les doublons. Cette opération est utile dans de nombreux scénarios, tels que la fusion de données provenant de sources différentes ou la création de vues unifiées sur plusieurs ensembles de données.

## Comparaison des performances

Lorsqu'il s'agit de comparer des listes d'objets en TypeScript, il est important de prendre en compte les performances des différentes approches pour chaque opération (intersection, différence, union). La taille des données et les contraintes de performance peuvent influencer le choix de l'approche à adopter.

### Recommandations sur le choix de l'approche

Pour des listes de petite à moyenne taille, les approches utilisant les méthodes présentées dans les sections précédentes peuvent être appropriées.

Pour des listes de grande taille, il peut être nécessaire d'explorer des techniques de manipulation de données plus efficaces, telles que l'utilisation de structures de données optimisées ou l'utilisation de bibliothèques spécialisées.

En choisissant la bonne approche en fonction de la taille des données et des contraintes de performance, Les opérations de comparaison seront plus efficaces et optimales en termes de performances.

Il est également recommandé de profiler et de tester les différentes approches pour évaluer leur impact sur les performances dans des situations réelles.

Voici un exemple pour la différence de listes d'objets, optimisé pour des listes de grande taille en TypeScript :

```typescript
interface Animal {
  id: number;
  name: string;
}

function now() {
  return new Date().getTime();
}

function elapsed(beginning) {
  const duration = new Date().getTime() - beginning;
  console.log(`exec time: ${duration / 1000}s`);
}

function getDifference<T>(array1: T[], array2: T[], ...keys: Array<keyof T>) {
  return array1.filter((obj1) => !array2.some((obj2) => keys.every((k) => obj1[k] === obj2[k])));
}

function getDifferenceMap<T>(array1: T[], array2: T[]) {
  const mapArr2 = new Map<string, T>();

  for (const obj of array2) {
    mapArr2.set(JSON.stringify(obj), obj);
  }

  const difference: Array<T> = [];

  for (const obj of array1) {
    const key = JSON.stringify(obj);
    if (!mapArr2.has(key)) difference.push(obj);
  }

  return difference;
}

const bigLandAnimals: Animal[] = [];
const bigSeaAnimals: Animal[] = [];

for (let i = 0; i < 10000; i++) {
  bigLandAnimals.push({ id: i, name: `Objet ${i}` });
  bigSeaAnimals.push({ id: i + 5000, name: `Objet ${i + 5000}` });
}

for (let i = 10000; i < 10500; i++) {
  bigSeaAnimals.push({ id: i, name: `Objet ${i}` });
}

function execGetDifference() {
  let beginning = now();

  const difference = getDifference(bigLandAnimals, bigSeaAnimals, 'id', 'name');

  console.log(`Difference: ${difference.length}`);

  elapsed(beginning);
}

function execBigGetDifference() {
  let beginning = now();

  const difference = getDifferenceMap(bigLandAnimals, bigSeaAnimals);

  console.log(`Difference: ${difference.length}`);

  elapsed(beginning);
}

execGetDifference(); // Difference: 5000 exec time: 1.163s

execBigGetDifference(); // Difference: 5000 exec time: 0.112s
```

Dans cet exemple, la fonction `getDifferenceMap` utilise l’objet `Map` . Cela réduit la complexité temporelle de l'algorithme de O(n^2) à O(n), ce qui le rend plus adapté aux listes de grande taille.

On voit clairement la différence de temps d’execution entre les 2 méthodes pour comparer 2 listes contenant pour l’une 10000 éléments et l’autre 15000 éléments.

## Conclusion

La comparaison de listes d'objets en TypeScript est une tâche courante dans le développement logiciel, et il est essentiel de choisir les bonnes approches pour garantir des opérations efficaces et optimales. Dans cet article, nous avons exploré trois opérations de comparaison principales : l'intersection, la différence et l'union.

En utilisant des techniques telles que `filter()`, `some()`, `includes()` ou `every()` et des structures de données optimisées comme l'objet `Map`, il est possible de comparer des listes d'objets de manière efficace, même avec des volumes de données importants.

Le choix de l'approche dépend de la taille des données et des contraintes de performance spécifiques à chaque application. Je vous recommande de profiler et de tester différentes approches pour évaluer leur impact sur les performances dans des situations réelles.

En comprenant les différentes techniques de comparaison de listes d'objets en TypeScript et en choisissant les approches appropriées, vous pourrez optimiser vos processus de développement, améliorer la qualité de votre code et offrir une meilleure expérience utilisateur.

En continuant à explorer et à expérimenter avec ces techniques, vous renforcerez vos compétences en TypeScript et deviendrez plus efficaces dans la manipulation des données dans vos applications.
