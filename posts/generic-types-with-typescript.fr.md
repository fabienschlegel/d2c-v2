---
title: 'Les types génériques avec TypeScript'
pageTitle: 'TypeScript : les types génériques, utilisation, avantages et exemples'
date: '2024-07-12'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/generic-types-with-typescript-illustration.fr.webp'
excerpt: 'Apprenez à maîtriser les types génériques en TypeScript pour créer des méthodes réutilisables et flexibles. Découvrez leur syntaxe, leurs avantages, et explorez des exemples et des meilleures pratiques pour écrire du code TypeScript robuste.'
tags: ['typescript']
related: ['typescript-enums', 'typescript-union-intersection-typeguards']
---

La réutilisabilité et la flexibilité du code sont des critères essentiels pour créer des applications robustes et maintenables.

TypeScript, un sur-ensemble de JavaScript, répond à ces besoins grâce à une fonctionnalité puissante : les types génériques.

Les types génériques permettent d’utiliser différents types de données sans sacrifier la clarté du typage.

Les génériques sont particulièrement utiles dans des situations où des structures de données ou des algorithmes doivent être appliqués de manière cohérente à différents types d'objets. Que ce soit pour manipuler des collections, définir des interfaces flexibles ou créer des classes réutilisables, les types génériques offrent une solution élégante et efficace.

## Qu'est-ce qu'un type générique ?

### Définition et concept

Les types génériques en TypeScript sont une fonctionnalité avancée qui permet de créer des composants réutilisables et flexibles.

Un type générique agit comme un modèle qui peut fonctionner avec une variété de types au lieu d'un type spécifique.

Vous pouvez écrire du code qui fonctionne avec différents types de données sans le dupliquer pour chaque type spécifique.

Un type générique est défini en utilisant des paramètres de type, souvent représentés par des lettres majuscules comme `T`, `U` ou `V`. Ces paramètres de type agissent comme des espaces réservés que vous pouvez remplacer par des types concrets lors de l'utilisation de la fonction, de la classe ou de l'interface générique.

### Comparaison avec les types spécifiques

Un type spécifique est, comme son nom l’indique, un type qui représente un ensemble bien défini de valeurs ou d'objets avec des propriétés et des comportements particuliers.

Contrairement aux types génériques, qui peuvent s'adapter à différents types de données, un type spécifique est destiné à un usage précis et restreint.

Prenons un exemple simple.

```typescript
function identityString(arg: string): string {
  return arg;
}

function identityNumber(arg: number): number {
  return arg;
}
```

Il va falloir définir 2 fonctions si on veut garder un typage strict. Si on utilise une union (string ou number) pour n’avoir qu’une fonction, on peut se retrouver obligé de contrôler le type retourné dans le flux de notre programme.

Avec les types génériques, une seule définition de la fonction peut couvrir tous les types, ce qui réduit la duplication de code et facilite la maintenance. Les génériques permettent aussi à notre code d'être plus expressif et robuste grâce à l’inférence.

## Syntaxe des types génériques

La syntaxe des types génériques en TypeScript est simple mais puissante. Elle permet de définir des composants, des fonctions et des classes qui peuvent fonctionner avec n'importe quel type, tout en conservant les avantages du typage statique.

Les types génériques utilisent des paramètres de type, qui sont placés entre chevrons (`< >`) et ajoutés à la définition des fonctions, des classes ou des interfaces. Un paramètre de type est une variable de type qui peut être remplacée par un type concret lors de l'utilisation du composant générique.

Voici un exemple de fonction générique définie avec un paramètre de type.

```typescript
function getArrayIntersection<T>(arrA: T[], arrB: T[]) {
  return arrA.filter((el) => arrB.includes(el));
}
```

Dans cet exemple `T` est un paramètre de type qui représente le type des éléments des listes passées en argument. La fonction `getArrayIntersection` retourne un résultat du même type que les arguments qu'elle reçoit.

Vous pouvez appeler cette fonction avec différents types. On peut omettre de préciser le paramètre de type, TypeScript va le déduire automatiquement grâce aux arguments.

```typescript
const stringOutput = getArrayIntersection<string>(['a', 'b', 'c'], ['c', 'd', 'e']);

const numberOutput = getArrayIntersection<number>([1, 2, 3], [3, 4, 5]);
```

## Utilisation des types génériques

### Création de fonctions génériques

Voici une fonction `swap` qui permet d’intervertir 2 valeurs dans un tuple.

```typescript
function swap<T, U>([a, b]: [T, U]): [U, T] {
  return [b, a];
}

let swapped = swap<string, number>(['hello', 42]);
console.log(swapped); // [42, "hello"]
```

Les types génériques sont aussi pratiques dans le cas de ce hook React `useDebounce`.

```typescript
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

D’un seul coup d’œil et sans savoir ce que fait ce hook, je sais que le type du retour sera le même que celui de `value`. Si on avait utilisé les types `any` ou `unknown`, ça ne serait pas le cas.

### Création de classe génériques

Prenez le cas de cette classe `Result`.

```typescript
class Result<T> {
  isSuccess: boolean;
  error?: Error;
  value?: T;

  constructor(isSuccess: boolean, error?: Error, value?: T) {
    this.isSuccess = isSuccess;
    this.error = error;
    this.value = value;
  }

  static success<T>(value: T): Result<T> {
    return new Result(true, undefined, value);
  }

  static failure<T>(error?: Error): Result<T> {
    const fallbackError = new Error(errorsMessages.UNKNOWN_ERROR_OCCURED);
    return new Result(false, error || fallbackError);
  }
}
```

Elle sert de conteneur à des données pour gérer par exemple des retours de requêtes. Le type générique T utilisé lors de la création de l’instance garanti le type de la donnée tout au long de la vie de l’instance

### Utilisation de types génériques dans les interfaces

Les interfaces génériques permettent de définir des contrats de type flexibles et réutilisables.

Voici par exemple l’interface de la configuration d’une colonne pour construire un élément `table` dans un projet React.

Grâce aux types génériques, ce tableau est utilisable pour n’importe quel type de données, sans avoir à modifier l’interface qui définit les colonnes.

```typescript
type ResolvableValue<T, U> =
  | ((allData: T[], rowData: T, rowIndex: number, isHovered: boolean) => U)
  | U;

export interface ColumnConfig<T> {
  label?: ReactNode | (() => ReactNode);
  value?: ((allData: T[], rowData: T, rowIndex: number) => ReactNode) | keyof T;
  icon?: ResolvableValue<T, ReactNode>;
  iconButtonStyle?: ResolvableValue<T, CSSProperties>;
  tooltip?: ResolvableValue<T, string>;
  onClick?: (rowData: T, column: ColumnConfig<T>, colIndex: number, rowIndex: number) => void;
  sortable?: boolean;
  defaultSort?: SortOrder;
  sortComparer?: SortComparer<T>;
  onSort?: (sortOrder: SortOrder) => void;
  align?: 'left' | 'centered' | 'right' | 'justified';
  cellsStyle?: ResolvableValue<T, CSSProperties>;
  cellsClassName?: ResolvableValue<T, string>;
}
```

## Avantages des types génériques

### Réutilisabilité du code

L'un des principaux avantages des types génériques est la réutilisabilité du code.

Plutôt que d'écrire des fonctions, des classes ou des interfaces spécifiques à chaque type de données, les génériques permettent de créer des composants qui peuvent fonctionner avec n'importe quel type.

La duplication de code est réduite ce qui simplifie grandement la maintenance.

### Flexibilité accrue

Les types génériques offrent une flexibilité accrue en permettant de créer des composants qui peuvent s'adapter à différents types de données.

Cette flexibilité est particulièrement utile lors de la création de bibliothèques ou de frameworks qui doivent fonctionner avec divers types sans connaître à l'avance les types spécifiques.

## Meilleures pratiques pour utiliser les types génériques

Pour utiliser efficacement les types génériques en TypeScript, il est nécessaire de bien comprendre le concept et de l’appliquer dans des cas variés.

### Utiliser des noms de paramètres de type descriptifs

Il est courant d'utiliser des noms de paramètres de type comme `T`, `U`, ou `V`, surtout pour des exemples simples ou des cas de figure classiques.

Pour des scénarios plus complexes Il vaut mieux utiliser des noms de paramètres de type plus descriptifs. Cela améliore la lisibilité et la compréhension du code.

### Contraindre les types génériques si nécessaire

Les contraintes de types génériques vous permettent de restreindre les types qu'un paramètre générique peut accepter. Cela peut prévenir les erreurs et garantir que les types passés aux génériques possèdent certaines propriétés ou méthodes.

```typescript
interface HasId {
  id: number;
}

function printId<T extends HasId>(obj: T): void {
  console.log(obj.id);
}

printId({ id: 123, name: 'Alice' }); // Correct
printId({ name: 'Bob' }); // Erreur : La propriété 'id' est manquante
```

### Éviter la surcharge de génériques

Il est important de ne pas abuser des types génériques. Même si le code se retrouve plus flexible et optimisé, il est souvent plus abstrait, donc plus difficile à comprendre.

Utilisez les génériques lorsqu'ils apportent une réelle valeur ajoutée en termes de flexibilité et de réutilisabilité.

### Documenter les types génériques

La documentation des types génériques est essentielle, surtout lorsqu'ils sont utilisés dans des librairies. Expliquez clairement les paramètres de type et les contraintes pour aider les autres développeurs à comprendre comment utiliser votre code correctement.

```typescript
/**
 * Représente une réponse paginée d'une API.
 * @template ItemType Le type des éléments dans la réponse.
 */
interface PaginatedResponse<ItemType> {
  items: ItemType[];
  totalCount: number;
  hasNextPage: boolean;
}

/**
 * Récupère des données paginées à partir d'une URL.
 * @template T Le type des éléments dans la réponse.
 * @param url L'URL de l'API.
 * @returns Une promesse de réponse paginée.
 */
async function fetchPaginatedData<T>(url: string): Promise<PaginatedResponse<T>> {
  const response = await fetch(url);
  const data = await response.json();
  return {
    items: data.items,
    totalCount: data.totalCount,
    hasNextPage: data.hasNextPage,
  };
}
```

### Utiliser les génériques avec les types utilitaires de TypeScript

TypeScript fournit plusieurs types utilitaires intégrés qui fonctionnent bien avec les génériques pour manipuler les types de manière flexible et puissante.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function updateUser<T extends Partial<User>>(user: T): T {
  // Mise à jour de l'utilisateur
  return user;
}

const partialUser = updateUser({ id: 1, email: 'newemail@example.com' });

function getUserInfo<T extends Pick<User, 'id' | 'name'>>(user: T): string {
  return `ID: ${user.id}, Name: ${user.name}`;
}

const userInfo = getUserInfo({ id: 1, name: 'Alice' });
```

## Conclusion

Les types génériques en TypeScript sont importants. Ils permettent de créer des méthodes et des classes flexibles, réutilisables et maintenables.

En exploitant les types génériques, vous écrirez du code plus robuste et plus souple.

Créer vos propres projets et expérimenter avec les génériques vous aidera à mieux comprendre leurs nuances et à développer votre expertise.
