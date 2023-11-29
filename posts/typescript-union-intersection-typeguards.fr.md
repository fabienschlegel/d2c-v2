---
title: 'Manipulation des types complexes : Union, Intersection et Typeguards en TypeScript'
pageTitle: 'Manipulation avancée des types complexes en TypeScript : Unions, Intersections et Typeguards'
date: '2023-11-29'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/typescript-union-intersection-typeguards-illustration.webp'
excerpt: 'Explorez les subtilités de la manipulation avancée des types complexes tels que les unions, intersections et typeguards en TypeScript pour renforcer la robustesse de vos applications.'
tags: ['typescript']
related: ['typescript-types-interfaces-and-classes', 'typescript-enums']
---

Lorsqu'il s'agit de construire des applications robustes en TypeScript, la manipulation des types complexes est rapidement indispensable.

Comprendre en profondeur les notions d'unions, d'intersections et de typeguards devient un atout majeur pour les développeuses et les développeurs cherchant à renforcer la sûreté de leur code.

## Introduction

Les types complexes, tels que les unions et les intersections, représentent un ensemble de possibilités avancées pour structurer les données en TypeScript.

Les unions permettent la création de types qui peuvent contenir plusieurs types différents, tandis que les intersections permettent de combiner plusieurs types pour former un seul type.

Le typeguards aident à garantir la sécurité du code en permettant de valider les données lors de l’exécution du programme.

## Unions et Intersections

### Explication des unions et de leur utilisation

Les unions offrent une flexibilité remarquable pour définir des types capables de représenter plusieurs formes. Par exemple :

```typescript
type ID = string | number;
let userId: ID;

userId = 'abc123'; // OK
userId = 456; // OK
userId = true; // Error: Type 'boolean' is not assignable to type 'string | number'
```

### Approfondissement sur les intersections et leur utilisation efficace

À l'opposé des unions, les intersections permettent de fusionner des types pour créer un nouveau type possédant toutes les caractéristiques de ses composants :

```typescript
interface Car {
  brand: string;
  color: string;
}

interface Electric {
  batteryLife: number;
}

type ElectricCar = Car & Electric;

let myCar: ElectricCar;
myCar = {
  brand: 'Tesla',
  color: 'Red',
  batteryLife: 300,
};
```

### Comparaison des cas d'utilisation pour choisir entre unions et intersections

La décision d'utiliser des unions ou des intersections dépend souvent du contexte et de la logique applicative.

Les unions sont idéales pour représenter une valeur pouvant être de plusieurs types distincts, tandis que les intersections sont plus adaptées pour combiner des types pour créer un nouveau type complet.

## Typeguards : Gardiens de la sûreté du code

Les typeguards, ou gardiens de type, sont des fonctions qui permettent de vérifier le type d'une variable à l'exécution.

Ils garantissent ainsi une meilleure sécurité et précision dans le traitement des données.

### Exemples concrets illustrant l'utilisation des typeguards pour sécuriser le code

Dans l’exemple, on veut calculer l’aire d’une forme. Et le calcul change suivant la forme utilisé. Grâce au mot clé `in`, on va pouvoir vérifier la présence d’une propriété exclusive à notre forme et utiliser la bonne formule.

```typescript
interface Square {
  size: number;
}

interface Rectangle {
  width: number;
  height: number;
}

interface Circle {
  radius: number
}

type Shape = Square | Rectangle | Circle;

function calculateArea(shape: Shape): number {
  if ("size" in shape) return shape.size ** 2; // Calcul de l'aire pour un carré

  if ("radius" in shape) return Math.PI * shape.radius ** 2 // Calcul de l'aire pour un cercle

  return shape.width * shape.height; // Calcul de l'aire pour un rectangle
```

Dans cet exemple, on veut vérifier si notre animal est un chien ou un chat et afficher ses informations. Dans le cas où on ne peut pas l’identifier, on va lever une exception.

```typescript
interface Dog extends Animal {
  breed: string;
}

interface Cat extends Animal {
  color: string;
}

function isDog(animal: any): animal is Dog {
  return animal && animal.breed !== undefined;
}

function isCat(animal: any): animal is Cat {
  return animal && animal.color !== undefined;
}

function processAnimal(animal: Animal) {
  if (isDog(animal)) return console.log(`Dog: ${animal.name}, Breed: ${animal.breed}`);

  if (isCat(animal)) return console.log(`Cat: ${animal.name}, Color: ${animal.color}`);

  throw new Error('Aie, cet animal est inconnu');
}

const dog: Dog = {
  name: 'Buddy',
  breed: 'Golden Retriever',
};

const cat: Cat = {
  name: 'Whiskers',
  color: 'Gray',
};

processAnimal(dog); // Output: Dog: Buddy, Breed: Golden Retriever
processAnimal(cat); // Output: Cat: Whiskers, Color: Gray
```

### Bonnes pratiques et astuces pour optimiser l'emploi des typeguards

**Nommage des fonctions de typeguards** : Donnez des noms clairs et explicites aux fonctions de typeguards pour faciliter la compréhension et améliorer la lisibilité du code.

```typescript
function isManager(employee: Employee): employee is Manager {
  return (employee as Manager).department !== undefined;
}
```

**Usage de `as` ou `in` avec précaution** : Utilisez `as` et `in` de manière judicieuse et précise pour éviter des conversions ou vérifications inutiles qui pourraient altérer la sûreté du code.

```typescript
if ('department' in employee) {
  // Faites quelque chose...
}
```

**Combiner les typeguards** : Utilisez plusieurs typeguards combinés pour des vérifications plus complexes.

```typescript
function isSeniorManager(employee: Employee): boolean {
  return isManager(employee) && employee.department === 'Engineering';
}
```

**Extension de typeguards** : Étendez les fonctionnalités des typeguards pour des cas plus spécifiques ou des conditions supplémentaires.

```typescript
function isSeniorManager(employee: Employee): boolean {
  return isManager(employee) && employee.department === 'Engineering';
}
```

**Éviter la redondance de code** : Réutilisez les typeguards existants pour éviter la duplication de vérifications similaires.

```typescript
function isEmployeeSenior(employee: Employee): boolean {
  return isManager(employee) || isSeniorManager(employee);
}
```

En suivant ces bonnes pratiques et astuces, vous pouvez maximiser l'efficacité et la clarté de vos typeguards, renforçant ainsi la sûreté et la fiabilité de votre code TypeScript.

## Cas d'utilisation avancés

### Gestion des états dans une application

Dans cet exemple on utilise l’union pour les types des différents états et des typeguards qui permet de vérifier que les données sont présentes pour les afficher.

De cette manière, on peut anticiper le contenu de la variable `state` et le comportement de la fonction `handleState`.

```typescript
type LoadingState = {
  loading: true;
};

type SuccessState<T> = {
  loading: false;
  data: T;
};

type ErrorState = {
  loading: false;
  error: string;
};

type State<T> = LoadingState | SuccessState<T> | ErrorState;

function handleState<T>(state: State<T>) {
  if (state.loading) {
    // Afficher l'indicateur de chargement
  } else if ('data' in state) {
    // Utiliser state.data
  } else {
    // Afficher l'erreur : state.error
  }
}
```

Dans cet exemple, on utilise la combinaison de typeguards et une intersection. Cela va permettre de vérifier le type de l’élément `box` pour s’assurer qu’il contient bien les propriétés indispensables lors d’un traitement spécifique. On évite ainsi les erreurs.

```typescript
type BoxTypes = ImageBox | StaticTextBox | TagTextBox | SocialMediaBox | TagImageBox | GroupBox;

function isTagBox(box: BoxTypes): box is TagTextBox | TagImageBox {
  return isTagTextBox(box) || isTagImageBox(box);
}
```

## Conclusion

La manipulation avancée des types complexes tels que les unions, les intersections et les typeguards ouvre un monde de possibilités pour les développeuses et les développeurs TypeScript.

En comprenant ces concepts et en les appliquant judicieusement, vous renforcez la robustesse et la sûreté de votre code, tout en simplifiant la gestion des structures de données complexes.

En explorant en profondeur les unions et les intersections, en maîtrisant les typeguards pour sécuriser vos opérations de typage, et en appliquant ces connaissances dans des scénarios concrets, vous êtes armés pour élever votre développement en TypeScript à de nouveaux sommets.

Continuez d'explorer ces concepts, expérimentez-les dans vos projets et découvrez comment ils peuvent transformer fondamentalement votre approche du développement logiciel.
