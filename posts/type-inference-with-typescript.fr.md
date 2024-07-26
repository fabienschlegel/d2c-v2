---
title: "L'inférence de type avec TypeScript"
pageTitle: "TypeScript et l'inférence de type : guide complet pour les devs"
date: '2024-07-26'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/type-inference-with-typescript-illustration-fr.webp'
excerpt: "Découvrez comment TypeScript utilise l'inférence de type pour améliorer votre code. Un guide complet avec des exemples pratiques et des recommandations."
tags: ['typescript']
related: ['10-typescript-tips-for-beginner-developers', 'typescript-utility-types']
---

L’intérêt premier de TypeScript est son typage statique. Il ajoute à JavaScript une couche de sécurité pour éviter les erreurs et une meilleure maintenabilité du code.

Un autre des concepts puissants de TypeScript est l’inférence de type.

## Qu'est-ce que l'inférence de type ?

L'inférence de type permet à TypeScript de déduire automatiquement les types des variables, des paramètres de fonction et des valeurs de retour sans nécessiter de déclarations explicites. Le code est plus concis et souvent plus lisible tout en maintenant une sécurité de typage robuste.

### Définition et explication

Lorsqu'une variable est initialisée sans spécifier son type, TypeScript analyse la valeur attribuée pour déterminer son type. Par exemple, si vous écrivez `const myValue = 5`, TypeScript infère que `myValue` est de type `number`. Cette inférence est possible grâce aux règles internes de TypeScript qui permettent de déduire les types à partir des valeurs et des contextes dans lesquels elles sont utilisées.

De la même manière, si vous retournez une valeur d'une fonction sans préciser le type de retour, TypeScript déduira le type de cette valeur de retour.

```typescript
function add(a: number, b: number) {
  return a + b; // TypeScript infère que le type de retour est 'number'
}
```

### Comparaison avec le typage explicite

Le typage explicite, quant à lui, consiste à déclarer explicitement le type de chaque variable, paramètre ou valeur de retour. Cela peut être bénéfique pour la clarté du code, surtout dans les équipes où la lisibilité et la compréhension rapide du code sont cruciales.

Le code deviendra plus verbeux et encombré dans certains cas. C’est un peu le même principe que pour les commentaires qui n’ajoutent pas de plus value à votre code.

```typescript
const nombre: number = 5;
function add(a: number, b: number): number {
  return a + b;
}
```

### Avantages de l'inférence de type

L'inférence de type présente plusieurs avantages significatifs :

- **Réduction du code boilerplate** : L'inférence de type réduit la nécessité d'écrire des annotations de type explicites partout, rendant le code plus concis.
- **Amélioration de la lisibilité** : Moins de déclarations de type peuvent rendre le code plus facile à lire et à comprendre, surtout pour les développeurs expérimentés qui peuvent rapidement identifier les types à partir du contexte.
- **Détection précoce des erreurs** : TypeScript peut encore détecter les erreurs de type à la compilation, même lorsque les types sont inférés, assurant ainsi une sécurité de typage sans surcharge de code.
- **Flexibilité** : L'inférence permet aux développeurs de se concentrer sur la logique métier plutôt que sur la gestion des types, ce qui peut accélérer le développement.
- **Maintenabilité** : Moins de déclarations de type explicites signifient moins de points de changement lors de la refactorisation du code, rendant le code plus facile à maintenir.

Notons par contre que l'inférence de type n'est pas toujours la meilleure solution.

Dans certains cas, il peut être préférable d'utiliser des types explicites pour améliorer la clarté et la documentation du code, en particulier dans les grandes bases de code ou lorsque vous travaillez en équipe.

## Comment TypeScript effectue-t-il l'inférence ?

### Inférence dans les variables

Lorsque vous déclarez une variable sans spécifier son type mais en lui attribuant une valeur, TypeScript infère le type de cette valeur.

```typescript
const message = 'Bonjour'; // TypeScript infère que 'message' est de type 'string'
const ultimateQuestion = 42; // TypeScript infère que 'ultimateQuestion' est de type 'number'
const isValid = true; // TypeScript infère que 'isValid' est de type 'boolean'
```

Cette inférence repose sur les valeurs littérales fournies lors de la déclaration. Le type de la variable est ainsi verrouillé à celui de la valeur initiale.

### Inférence dans les fonctions

L'inférence de type dans les fonctions peut se faire grâce aux paramètres. Connaitre leur type permet à TypeScript d’inférer les valeurs de retour.

TypeScript peut aussi deviner le type de retour en analysant la valeur retournée par la fonction.

```typescript
const add = (a: number, b: number) => a + b;
// Les types des paramètres 'a' et 'b' sont explicitement définis ici.

const sendHello = (nom: string) => `Bonjour, ${nom}`;
// TypeScript infère que le type de retour est 'string'
```

### Inférence dans les objets et les tableaux

Pour les objets et les tableaux, TypeScript infère les types de manière récursive en examinant les valeurs de chaque propriété ou élément.

```typescript
const user = {
  nom: 'Alice',
  age: 30,
  isAdmin: false,
}; // TypeScript infère que 'user' est de type '{ nom: string; age: number; isAdmin: boolean; }'

const countMe = [1, 2, 3, 4, 5]; // TypeScript infère que 'countMe' est de type 'number[]'
const mixed = [1, 'deux', true]; // TypeScript infère que 'mixed' est de type '(number | string | boolean)[]'
```

### Cas spécifiques et limites de l'inférence

**Inférence contextuelle :** TypeScript utilise le contexte pour inférer des types. Par exemple, dans les fonctions de rappel, le type est basé sur la signature de l'interface ou du type attendu.

```typescript
const numberList = [1, 2, 3];

const callbackFn = (num) => console.log(num); // 'num' est inféré comme 'number'

numberList.forEach(callbackFn);
```

**Inférence avec des génériques :** Les types génériques permettent à TypeScript de maintenir la flexibilité tout en offrant une sécurité de typage.

```typescript
function identity<T>(arg: T): T {
  return arg;
}
let resultat = identity('test'); // TypeScript infère que 'T' est 'string'
```

**Contenu externe :** Pour des retours de fonction comme `parse` de l’API JSON ou des retours de requêtes avec Axios par exemple, le type ne peut être inféré.

```typescript
const myObject = JSON.parse('{}'); // TypeScript infère le type 'any'
```

**Perte de précision :** Dans certains cas, TypeScript peut inférer un type plus large que nécessaire, ce qui peut entraîner une perte de sécurité de typage.

```typescript
const randomValue = Math.random() > 0.5 ? 'texte' : 42;
// TypeScript infère 'valeur' comme 'string | number'
```

Dans le cas de pertes de précisions ou de contenu externe, j’utilise généralement du typage générique ou des guard clauses pour garantir le type du retour.

```typescript
// Exemple de guard clause pour garantir le type d'un objet
function isTagTextBox(box: BoxTypes): box is ITagTextBox {
  return box && typeof box === 'object' && box.type === 'tagText';
}
```

## Bonnes pratiques et recommandations

Voici quelques conseils pour utiliser l'inférence de type de manière efficace et équilibrée.

### Quand utiliser l'inférence vs typage explicite

**Utiliser l'inférence :**

1. **Code simple et évident :** Utilisez l'inférence pour les variables, les constantes et les fonctions où le type est immédiatement évident à partir de la valeur ou du contexte.

   ```typescript
   let myNumber = 42; // Inférence évidente de type 'number'
   ```

2. **Initialisation immédiate :** Lorsque vous initialisez une variable ou une constante immédiatement après sa déclaration, l'inférence est généralement appropriée.

   ```typescript
   const message = 'Bonjour!'; // Inférence de type 'string'
   ```

3. **Retours de fonctions simples :** Pour des fonctions avec des retours simples, l'inférence peut rendre le code plus lisible.

   ```typescript
   function salutations(nom: string) {
     return `Bonjour, ${nom}!`; // TypeScript infère que le type de retour est 'string'
   }
   ```

**Utiliser le typage explicite :**

1. **Fonctions publiques et API :** Pour les fonctions qui sont exportées ou utilisées dans une API publique, il est préférable de déclarer les types explicitement pour améliorer la clarté et la documentation.

   ```typescript
   export function computeAmount(total: number, taxe: number): number {
     return total + taxe;
   }
   ```

2. **Complexité accrue :** Pour les structures de données complexes ou les génériques, le typage explicite peut éviter les ambiguïtés et améliorer la lisibilité.

   ```typescript
   interface User {
     name: string;
     age: number;
     isAdmin: boolean;
   }

   function createUser(data: User): User & { creationDate: Date } {
     return {
       ...data,
       creationDate: new Date(),
     };
   }
   ```

3. **Documentation et compréhension :** Le typage explicite peut servir de documentation intégrée, aidant les autres développeurs (ou vous-même) à comprendre rapidement les types attendus sans devoir analyser le code en détail.

### Équilibrer la lisibilité du code et la sécurité des types

1. **Préférez la clarté :** Lorsque le type n'est pas évident, utilisez des annotations explicites pour clarifier le code.

   ```typescript
   const data: { name: string; age: number } = { name: 'Alice', age: 30 };
   ```

2. **Réduisez les annotations redondantes :** Ne dupliquez pas les informations de type si l'inférence de TypeScript est suffisante.

   ```typescript
   // Évitez ceci
   const myValue: number = 42;

   // Préférez ceci
   const myValue = 42; // TypeScript infère 'number'
   ```

3. **Utilisez des interfaces et des types :** Déclarez des interfaces et des types pour les structures de données complexes afin d'améliorer la réutilisabilité et la lisibilité.

   ```typescript
   interface Product {
     name: string;
     price: number;
   }

   let cart: Product[] = [
     { name: 'Ordinateur', price: 999.99 },
     { name: 'Clavier', price: 49.99 },
   ];
   ```

4. **Documentez avec JSDoc :** Utilisez des commentaires JSDoc pour ajouter des descriptions et des types aux fonctions, en particulier pour les fonctions complexes ou génériques.

   ```typescript
   /**
    * Calcule la somme de deux nombres.
    * @param a - Le premier nombre.
    * @param b - Le deuxième nombre.
    * @returns La somme des deux nombres.
    */
   function add(a: number, b: number): number {
     return a + b;
   }
   ```

### Cas d'utilisation spécifiques

1. **Fonctions de callback dans des bibliothèques :** TypeScript peut inférer les types des fonctions de callback utilisées avec des méthodes comme `map`, `filter`, et `reduce`.

   ```typescript
   const myNumbers = [1, 2, 3, 4, 5];
   const sumUp = myNumbers.reduce((acc, curr) => acc + curr, 0);
   // TypeScript infère 'sumUp' comme 'number'
   ```

2. **Typage des props dans React :** Utilisez les interfaces pour typer explicitement les props dans les composants React, mais laissez l'inférence gérer les états internes simples.

   ```tsx
   interface Props {
     title: string;
   }

   const MyComponent = ({ title }: Props) => {
     const [counter, setCounter] = useState(0); // TypeScript infère 'number'

     return (
       <h1>
         {title} - {counter}
       </h1>
     );
   };
   ```

## Outils et ressources pour améliorer l'inférence

Un grand nombre d’outils peuvent aider à analyser, visualiser, et optimiser le typage dans les projets TypeScript. Ils permettent de bénéficier pleinement de la sécurité et des avantages offerts par TypeScript.

### **Visual Studio Code**

C’est l’un des éditeurs les plus populaires. Il offre une intégration native avec TypeScript, y compris l'inférence de type.

- **Autocomplétion intelligente :** Basée sur l'inférence de type, elle suggère les méthodes, propriétés et variables disponibles.
- **IntelliSense :** Affiche les types inférés, les signatures de fonction, et la documentation en ligne.
- **Navigation facile :** Aller à la définition, recherche d'usages, et refactoring assisté par type.
- **Linting :** Aide à détecter les erreurs de type en temps réel.

### Linters et analyseurs de code

Les linters et les analyseurs de code peuvent aider à maintenir un code propre et bien typé.

ESLint, combiné avec le plugin TypeScript, est le standard moderne pour le linting de TypeScript. Il peut :

- **Détecter les erreurs de type et les mauvaises pratiques :** En utilisant des règles spécifiques à TypeScript.
- **Appliquer des conventions de style :** Assurant ainsi la consistance du code.
- **Suggérer des améliorations :** Pour les types et l'inférence.

### Outils de compilation et de vérification de type

**TypeScript Compiler :**

Le compilateur TypeScript (`tsc`) est l'outil principal pour vérifier les types dans vos projets. Il peut :

- **Détecter les erreurs de type :** En analysant tout le projet.
- **Transpiler le code :** De TypeScript à JavaScript.

**DefinitelyTyped :**

DefinitelyTyped est un dépôt de définitions de type pour les bibliothèques JavaScript.

Si vous ajoutez une librairie qui n’embarque pas ses types, Visual Studio Code vous proposera de l’installer via ce dépôt.

**TypeScript Utility Types :**

Utilisez les types utilitaires intégrés de TypeScript pour créer des types complexes et améliorer l'inférence.

```typescript
type PartialUser = Pick<User, 'name' | 'age'>;

type UserReadOnly = Readonly<User>;
```

## Conclusion

En permettant à TypeScript de déduire automatiquement les types là où c'est possible, le code est plus propre, plus lisible et moins verbeux sans sacrifier la robustesse et la sécurité.

**Avantages de l'inférence de type :**

- **Productivité accrue :** Moins de code à écrire signifie plus de temps pour se concentrer sur la logique métier.
- **Sécurité de type :** Même sans annotations explicites, TypeScript assure une vérification des types rigoureuse.
- **Lisibilité et maintenance :** Le code est plus propre et plus facile à comprendre, facilitant ainsi la collaboration et la maintenance.

Pour tirer le meilleur parti de l'inférence de type, il est important de comprendre ses limites et de savoir quand l'utiliser.

Utilisez des annotations explicites dans les API publiques et les fonctions complexes, mais laissez TypeScript gérer les types dans les cas évidents.

Exploitez les outils et les ressources disponibles pour maintenir un code propre et bien typé.
