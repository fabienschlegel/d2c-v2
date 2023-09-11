---
title: 'Les enums en Typescript'
pageTitle: 'TypeScript et les enums : Simplifier le code et améliorer la lisibilité'
date: '2023-06-28'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/typescript-enums-illustration-fr.webp'
excerpt: 'Les enums TypeScript simplifient le code et améliorent la lisibilité. Cet article complet explore le concept des enums, leur syntaxe, leurs avantages et les meilleures pratiques.'
tags: ['typescript']
related: ['begin-react-with-typescript', '10-typescript-tips-for-beginner-developers']
---

En TypeScript, les enums constituent un moyen pratique de définir un ensemble de constantes nommées. Elles permettent d'améliorer la clarté du code, la lisibilité et la sécurité des types en associant un ensemble de valeurs nommées à un type spécifique. Cet article a pour but d'explorer le concept des enums TypeScript, leur syntaxe, leurs avantages, leur utilisation et les meilleures pratiques.

## Comprendre les enums

### Que sont les enums ?

Les enums, abréviation d'énumérations, sont une fonctionnalité de TypeScript qui permet aux développeurs de définir une collection de valeurs apparentées sous un nom unique. Elles offrent un moyen simple et intuitif de travailler avec des ensembles de valeurs prédéfinis, rendant le code plus expressif et plus explicite.

### Syntaxe d'un Enum

Pour définir un enum en TypeScript, vous utilisez le mot-clé `enum` suivi du nom de l'enum et d'un ensemble de valeurs de membres entre accolades. Chaque valeur membre se voit attribuer une valeur numérique implicite, commençant à 0 et incrémentée de 1 pour chaque membre suivant.

Exemple:

```typescript
enum Weekday {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}
```

### Valeurs des enums

Par défaut, les valeurs de l'énumération sont représentées par des nombres. Vous pouvez accéder à ces valeurs en utilisant le nom du membre de l'énumération.

Exemple:

```typescript
console.log(Weekday.Monday); // Output: 0
console.log(Weekday.Tuesday); // Output: 1
```

### Enum avec des valeurs de type string

Les enums peuvent également être définis avec des valeurs de type chaîne de caractères au lieu de valeurs numériques. En attribuant explicitement des valeurs de chaîne aux membres de l'énumération, vous pouvez mieux contrôler les valeurs associées à chaque membre.

Exemple:

```typescript
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
```

## Avantages de l'utilisation des enums

### Clarté et lisibilité du code

Les enums améliorent la clarté du code en fournissant des noms descriptifs pour représenter les valeurs. Au lieu d'utiliser des nombres magiques ou des chaînes de caractères littérales dans tout le code, les enums offrent des symboles explicites qui facilitent la compréhension et la maintenance du code.

Exemple:

```typescript
let currentDay: Weekday = Weekday.Monday;

if (currentDay === Weekday.Monday) {
  console.log("It's Monday!");
}
```

### Sécurité des types et autocomplétion

Les enums TypeScript assurent la sécurité des types en garantissant que seules des valeurs d'enum valides sont utilisées. Le compilateur effectue des contrôles statiques pour éviter d'affecter des valeurs incorrectes ou inexistantes aux variables enum. Les IDE peuvent également fournir une autocomplétion et des suggestions basées sur les valeurs des enums, ce qui rend le développement plus efficace et plus résistant aux erreurs.

Exemple:

```typescript
function printDirection(direction: Direction) {
  console.log('Current direction:', direction);
}

printDirection(Direction.Up); // Output: Current direction: UP
printDirection(Direction.Left); // Output: Current direction: LEFT
```

### Enum en tant que type Union

Les enums peuvent être utilisés dans le cadre d'un type union, ce qui permet aux variables d'accepter des valeurs d'enum ou d'autres types compatibles. Cette flexibilité permet aux développeurs de créer des définitions de type plus expressives et de gérer différents scénarios dans leur base de code.

Exemple:

```typescript
type Result = 'Success' | 'Failure' | Direction;

function handleResult(result: Result) {
  if (result === Direction.Up) {
    console.log('Going up!');
  } else if (result === 'Success') {
    console.log('Operation successful!');
  }
}

handleResult(Direction.Up); // Output: Going up!
handleResult('Success'); // Output: Operation successful!
```

### Itération des enums

En TypeScript, les enums sont itérables, ce qui signifie que vous pouvez facilement itérer sur toutes les valeurs de l'enum. Cette fonctionnalité est particulièrement utile lorsque vous devez effectuer des opérations sur tous les membres possibles d'une énumération, comme la génération d'une liste déroulante ou la validation d'une entrée utilisateur.

Exemple:

```typescript
enum Month {
  January,
  February,
  March,
  // ... rest of the months
}

for (let month in Month) {
  console.log(Month[month]);
}
```

## Utilisez les enums

### Déclarer les enums

Pour déclarer un enum, il suffit de le définir en utilisant le mot-clé `enum` suivi du nom de l'enum et des valeurs de ses membres.

Exemple:

```typescript
enum Color {
  Red,
  Green,
  Blue,
}
```

### Affectation de valeurs aux enums

Par défaut, les enums se voient attribuer des valeurs numériques à partir de 0. Il est toutefois possible d'attribuer explicitement des valeurs spécifiques aux membres de l'Enum.

Exemple:

```typescript
enum StatusCode {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  // ... rest of the status codes
}
```

### Accessing Enum Values

To access the values of an enum, you can use either the enum member's name or its associated value.

Example:

```typescript
console.log(StatusCode.OK); // Output: 200
console.log(StatusCode[200]); // Output: OK
```

### Accès aux valeurs d'une énumération

Pour accéder aux valeurs d'une énumération, vous pouvez utiliser soit le nom du membre de l'énumération, soit la valeur qui lui est associée.

Exemple :

```typescript
enum Size {
  Small,
  Medium,
  Large,
}

console.log(Size.hasOwnProperty('Medium')); // Output: true
console.log(Object.keys(Size)); // Output: ["0", "1", "2"]
console.log(Object.values(Size)); // Output: [0, 1, 2]
```

## Meilleures pratiques

### Conventions de nommage

Pour nommer les enums, il est recommandé d'utiliser des noms ou des phrases singulières qui décrivent la collection de valeurs que l'Enum représente. Les noms doivent être concis, significatifs et suivre des conventions cohérentes dans l'ensemble de la base de code.

Exemple:

```typescript
enum UserRole {
  Admin,
  Editor,
  Viewer,
}
```

### Composition d'une énumération

Au lieu de créer de grandes énumérations avec un grand nombre de membres, envisagez de composer des énumérations plus petites et de les combiner lorsque c'est nécessaire. Cette approche favorise la modularité du code, sa réutilisation et une meilleure organisation.

Exemple :

```typescript
enum AnimalType {
  Dog,
  Cat,
  // ... other animal types
}

enum VehicleType {
  Car,
  Motorcycle,
  // ... other vehicle types
}

type TransportType = AnimalType | VehicleType;
```

### Utilisation des enums dans les fonctions et les interfaces

Les enums peuvent être utilisés comme paramètres de fonctions ou comme types de retour afin de garantir la sécurité et la clarté des types. Elles peuvent également être incorporées dans des interfaces pour définir des valeurs de propriétés spécifiques, fournissant ainsi une structure de type contractuel pour travailler avec des données liées aux enums.

Exemple :

```typescript
interface User {
  id: number;
  name: string;
  role: UserRole;
}

function getUserRole(user: User): UserRole {
  return user.role;
}
```

## Conclusion

Les enums TypeScript sont une fonctionnalité puissante qui simplifie le code, améliore la lisibilité et la sécurité des types. En utilisant les enums, les développeurs peuvent définir des constantes nommées, éviter les valeurs magiques et écrire un code plus expressif. Comprendre comment déclarer, assigner des valeurs et utiliser les enums de manière efficace peut grandement bénéficier aux projets TypeScript.
