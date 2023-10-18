---
title: 'TypeScript : types, interfaces et classes'
pageTitle: 'Découvrez les concepts clés de TypeScript : types, interfaces et classes'
date: '2023-10-18'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/typescript-types-interfaces-and-classes-fr.webp'
excerpt: "Explorons les bases de TypeScript, en mettant l'accent sur les types, les interfaces et les classes. Apprenez comment les utiliser pour améliorer la robustesse de votre code TypeScript."
tags: ['typescript']
related: ['10-typescript-tips-for-beginner-developers', 'begin-react-with-typescript']
---

TypeScript est un langage qui a gagné en popularité ces dernières années grâce à sa capacité à rendre le développement plus robuste.

Ce langage offre une série de fonctionnalités qui permettent aux développeurs et aux développeuses de mieux structurer leur code, d'améliorer la lisibilité et de prévenir les erreurs potentielles. Au cœur de TypeScript se trouvent trois concepts clés : les types, les interfaces et les classes.

## Comprendre les types en TypeScript

L'un des piliers fondamentaux de TypeScript est sa gestion des types. Alors que JavaScript est un langage dynamiquement typé, TypeScript introduit la notion de types statiques, ce qui signifie que vous pouvez spécifier le type de données que vos variables et fonctions doivent utiliser.

### Les types de base

Typescript offre un ensemble de types de base qui correspondent aux types de données courants. Vous trouverez parmi eux des types tels que `number` pour les nombres, `string` pour les chaînes de caractères, `boolean` pour les valeurs booléennes, etc. L'utilisation de ces types permet de déclarer explicitement le type attendu pour une variable, ce qui peut éviter des bugs subtils.

```typescript
const age: number = 30;
const name: string = 'Alice';
const isActive: boolean = true;
```

En précisant le type, TypeScript peut détecter des erreurs dès la phase de développement, avant même que votre code soit exécuté. Par exemple, si vous essayez d'assigner une chaîne de caractères à une variable déclarée comme `number`, TypeScript vous avertira de l'incompatibilité des types.

### Types personnalisés

Outre les types de base, TypeScript permet de créer des types personnalisés. Cette fonctionnalité est précieuse pour définir des structures de données complexes ou des types spécifiques à votre application. Vous pouvez utiliser le mot-clé `type` pour créer un alias de type.

```typescript
type Point = {
  x: number;
  y: number;
};
```

Les types personnalisés deviennent utiles lorsque vous travaillez avec des données complexes, comme des objets contenant plusieurs propriétés. Ils permettent de documenter la structure attendue des données et de s'assurer que votre code respecte cette structure.

### Définition de types pour les fonctions

Les types ne se limitent pas aux variables, vous pouvez également les utiliser pour définir les signatures de fonctions. Cela garantit que les fonctions sont appelées avec les bons types d'arguments et renvoient les types de valeurs appropriés.

```typescript
function addValues(a: number, b: number): number {
  return a + b;
}
```

En spécifiant les types des paramètres et de la valeur de retour, TypeScript vous aide à écrire des fonctions cohérentes et à éviter les erreurs d'exécution.

### Inférence de types en TypeScript

L'une des caractéristiques puissantes de TypeScript est son système d'inférence de types. Contrairement à de nombreux autres langages, TypeScript peut déduire le type d'une variable en fonction de la valeur à laquelle elle est initialement attribuée.

Par exemple, si vous affectez un nombre à une variable, TypeScript saura automatiquement que cette variable est de type `number`. Cela peut rendre votre code plus concis et plus lisible, car vous n'avez pas toujours besoin de spécifier les types de manière explicite.

L'inférence de types ne compromet pas la sécurité des types de TypeScript. Le langage continuera à détecter les incohérences de types et à émettre des avertissements en cas de problème.

## Les interfaces en TypeScript

Les interfaces sont un autre élément fondamental de TypeScript. Elles sont utilisées pour définir des contrats, c'est-à-dire des spécifications sur la structure des objets. Les interfaces offrent une manière puissante de décrire la forme attendue des données dans votre application, ce qui contribue à la clarté et à la robustesse du code.

### Introduction aux interfaces

Une interface en TypeScript est une structure sans implémentation qui définit un ensemble de propriétés et de méthodes que les objets doivent respecter. Vous pouvez les considérer comme des contrats que les objets doivent signer pour être conformes.

```typescript
interface Person {
  name: string;
  age: number;
}
```

Dans cet exemple, l'interface `Person` définit un contrat stipulant que tout objet qui prétend être une personne doit avoir une propriété `nom` de type `string` et une propriété `age` de type `number`.

### Utilisation d'interfaces pour structurer le code

Les interfaces sont particulièrement utiles pour structurer votre code. Elles vous aident à définir la forme attendue des objets et à clarifier les attentes pour les développeurs qui travaillent avec votre code.

Prenons l'exemple d'une fonction qui affiche les informations d'une personne :

```typescript
function displayPerson(person: Person) {
  console.log(`Nom: ${person.name}, Age: ${person.age}`);
}
```

La fonction `displayPerson` accepte un objet conforme à l'interface `Person`. Si un objet ne respecte pas ce contrat, TypeScript émettra une erreur au moment de la compilation.

### Héritage d'interfaces

Les interfaces peuvent également hériter d'autres interfaces. Cela permet de créer des hiérarchies d'interfaces qui étendent les contrats de base.

```typescript
interface Employee extends Person {
  job: string;
}
```

L'interface `Employee` hérite de l'interface `Person`, ajoutant une nouvelle propriété `job`. Cela signifie que tout employé doit respecter les contrats de `Person` et inclure également la propriété `job`.

Les interfaces offrent une puissante méthode de structuration du code en TypeScript, en aidant à définir des contrats clairs et à encourager la cohérence dans votre application.

## Classes et TypeScript

Les classes sont un autre élément essentiel de TypeScript, elles vous permettent de créer des structures de données complexes et d'appliquer des principes de programmation orientée objet (POO). Comprendre comment utiliser les classes en TypeScript est crucial pour développer des applications robustes et modulaires.

### Introduction aux Classes

En programmation, une classe est un modèle pour la création d'objets. En TypeScript, les classes fournissent une manière de définir des objets avec des propriétés et des méthodes. Cela permet d'encapsuler la logique et les données dans une unité cohérente.

Voici un exemple simple de déclaration d'une classe en TypeScript :

```typescript
class Car {
  brand: string;
  year: number;

  constructor(brand: string, year: number) {
    this.brand = brand;
    this.year = annee;
  }

  displayDetails() {
    console.log(`Brand : ${this.brand}, Année : ${this.year}`);
  }
}
```

Dans cet exemple, la classe `Car` définit deux propriétés (`brand` et `year`), un constructeur pour initialiser ces propriétés et une méthode `displayDetails` pour afficher les informations de la voiture.

### Création d'instances de classes

Une fois que vous avez défini une classe, vous pouvez créer des instances de celle-ci. Les instances sont des objets individuels basés sur la classe.

```typescript
const myCar = new Car('Toyota', 2022);
myCar.displayDetails();
```

Cela crée une instance `myCar` de la classe `Car` et appelle la méthode `displayDetails` pour afficher les détails de la voiture.

### Comparaison avec les prototypes JavaScript

Les classes en TypeScript sont similaires aux prototypes en JavaScript, mais elles apportent une syntaxe plus claire et des fonctionnalités supplémentaires. Les classes TypeScript sont converties en code JavaScript ES5/ES6 pour être compatibles avec les navigateurs.

### Utilisation de classes pour des structures de données complexes

Les classes sont particulièrement utiles lorsque vous travaillez avec des structures de données complexes. Elles vous permettent de regrouper des données et des fonctionnalités connexes en une seule entité, améliorant ainsi la lisibilité et la maintenabilité du code.

### Encapsulation et modulation

Les classes encouragent également l'encapsulation, c'est-à-dire la limitation de l'accès aux données internes de l'objet. Vous pouvez définir des propriétés privées ou protégées pour contrôler l'accès aux données. Cela favorise une meilleure modélisation des données et réduit les erreurs potentielles.

En résumé, les classes en TypeScript offrent un moyen puissant de créer des objets complexes, d'encapsuler la logique et les données, et de structurer votre code de manière modulaire. Elles sont un outil essentiel pour développer des applications robustes en TypeScript.

## Combinaison de types, interfaces et classes

Les types, les interfaces et les classes ont chacun leur propre utilité, mais la véritable puissance de TypeScript réside dans la manière dont ils interagissent pour créer un code solide et cohérent.

### Types, interfaces et classes en synergie

Lorsque vous combinez types, interfaces et classes, vous créez un écosystème de développement robuste. Voici comment ces concepts peuvent interagir de manière bénéfique :

1. **Types pour la sécurité des données :** En utilisant des types, vous assurez que vos données sont correctement typées. Cela réduit les erreurs de type à l'exécution et améliore la lisibilité de votre code.
2. **Interfaces pour la structuration :** Les interfaces définissent la forme des objets et des contrats. En les utilisant, vous définissez clairement ce que vous attendez des objets et créez une documentation en temps réel pour les développeurs qui travaillent avec votre code.
3. **Classes pour l'encapsulation et la modélisation :** Les classes vous permettent de créer des structures de données complexes en encapsulant la logique et les données. Elles rendent votre code modulaire, réutilisable et maintenable.

Prenons un exemple concret : supposons que vous développiez une application de gestion de bibliothèque. Vous pouvez définir un type pour représenter un livre, une interface pour décrire la forme attendue d'un utilisateur et une classe pour représenter une bibliothèque. En combinant ces éléments, vous obtenez un code organisé et cohérent.

```typescript
type Book = {
  title: string;
  author: string;
};

interface User {
  name: string;
  books: Book[];
}

class UserLibrary {
  private collection: Book[] = [];

  addBook(book: Book) {
    this.collection.push(book);
  }

  listBooks() {
    return this.collection;
  }
}
```

Dans cet exemple, le type `Book` définit la structure des livres, l'interface `User` spécifie la forme d'un utilisateur, et la classe `UserLibrary` encapsule la collection de livres avec des méthodes pour les ajouter et les lister.

Cette combinaison de types, interfaces et classes favorise une communication claire et cohérente entre les développeurs travaillant sur le projet. Elle permet de détecter les erreurs dès la phase de développement et facilite la maintenance à long terme.

### Conclusion

Les principes fondamentaux de TypeScript, à savoir les types, les interfaces et les classes, sont essentiels pour créer un code TypeScript robuste et bien structuré. En comprenant comment ces concepts interagissent, vous êtes mieux préparé à développer des applications de qualité.

TypeScript offre une gamme de fonctionnalités avancées, telles que les génériques, les décorateurs et bien d'autres, qui peuvent améliorer encore davantage votre expérience de développement.
