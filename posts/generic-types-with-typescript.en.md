---
title: 'Generic types with TypeScript'
pageTitle: 'TypeScript: generic types, usage, benefits and examples'
date: '2024-07-12'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/generic-types-with-typescript-illustration.en.webp'
excerpt: 'Learn how to master generic types in TypeScript to create flexible, reusable methods. Discover their syntax and benefits, and explore examples and best practices for writing robust TypeScript code.'
tags: ['typescript']
related: ['typescript-enums', 'typescript-union-intersection-typeguards']
---

Code reusability and flexibility are essential criteria for creating robust, maintainable applications.

TypeScript, a superset of JavaScript, meets these needs with a powerful feature: generic types.

Generic types allow the use of different data types without sacrificing typing clarity.

Generics are particularly useful in situations where data structures or algorithms need to be applied consistently to different object types. Whether for manipulating collections, defining flexible interfaces or creating reusable classes, generic types offer an elegant and efficient solution.

## What is a generic type?

### Definition and concept

Generic types in TypeScript are an advanced feature for creating flexible, reusable components.

A generic type acts as a template that can work with a variety of types instead of one specific type.

You can write code that works with different data types without duplicating it for each specific type.

A generic type is defined using type parameters, often represented by uppercase letters such as `T`, `U` or `V`. These type parameters act as placeholders that you can replace with concrete types when using the generic function, class or interface.

### Comparison with specific types

A specific type is, as the name suggests, a type that represents a well-defined set of values or objects with particular properties and behaviors.

Unlike generic types, which can be adapted to different types of data, a specific type is intended for a precise and restricted use.

Let's take a simple example.

```typescript
function identityString(arg: string): string {
  return arg;
}

function identityNumber(arg: number): number {
  return arg;
}
```

We'll need to define 2 functions if we want to maintain strict typing. If we use a union (string or number) to have just one function, we may find ourselves having to control the type returned in our program flow.

With generic types, a single function definition can cover all types, reducing code duplication and facilitating maintenance. Generics also enable our code to be more expressive and robust thanks to inference.

## Generic type syntax

TypeScript's generic type syntax is simple yet powerful. It allows you to define components, functions and classes that can work with any type, while retaining the advantages of static typing.

Generic types use type parameters, which are enclosed in chevrons (`< >`) and added to the definition of functions, classes or interfaces. A type parameter is a type variable that can be replaced by a concrete type when the generic component is used.

Here's an example of a generic function defined with a type parameter.

```typescript
function getArrayIntersection<T>(arrA: T[], arrB: T[]) {
  return arrA.filter((el) => arrB.includes(el));
}
```

In this example, `T` is a type parameter representing the type of the elements in the lists passed as arguments. The `getArrayIntersection` function returns a result of the same type as the arguments it receives.

You can call this function with different types. You can omit the type parameter, as TypeScript will automatically deduce it from the arguments.

```typescript
const stringOutput = getArrayIntersection<string>(['a', 'b', 'c'], ['c', 'd', 'e']);

const numberOutput = getArrayIntersection<number>([1, 2, 3], [3, 4, 5]);
```

## Using generic types

### Creating generic functions

Here's a `swap` function that swaps 2 values in a tuple.

```typescript
function swap<T, U>([a, b]: [T, U]): [U, T] {
  return [b, a];
}

let swapped = swap<string, number>(['hello', 42]);
console.log(swapped); // [42, "hello"]
```

Generic types are also useful in the case of the React `useDebounce` hook.

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

At a glance, and without knowing what this hook does, I know that the return type will be the same as that of `value`. If we'd used the `any` or `unknown` types, this wouldn't be the case.

### Creating generic classes

Consider this `Result` class.

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

It is used as a data container to manage query returns, for example. The generic type T used when the instance is created guarantees the data type throughout the instance's life.

### Using generic types in interfaces

Generic interfaces can be used to define flexible, reusable type contracts.

Here, for example, is the column configuration interface for building a `table` element in a React project.

Thanks to generic types, this table can be used for any data type, without having to modify the interface that defines the columns.

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

## Advantages of generic types

### Code reusability

One of the main advantages of generic types is code reusability.

Rather than writing functions, classes or interfaces specific to each data type, generics allow you to create components that can work with any type.

Code duplication is reduced, greatly simplifying maintenance.

### Greater flexibility

Generic types offer increased flexibility by enabling the creation of components that can adapt to different data types.

This flexibility is particularly useful when creating libraries or frameworks that need to work with various types without knowing the specific types in advance.

## Best practices for using generic types

To use generic types effectively in TypeScript, you need to understand the concept and apply it to a variety of situations.

### Use descriptive type parameter names

It's common to use type parameter names like `T`, `U`, or `V`, especially for simple examples or classic case scenarios.

For more complex scenarios, it's better to use more descriptive type parameter names. This makes the code easier to read and understand.

### Constrain generic types if necessary

Generic type constraints allow you to restrict the types a generic parameter can accept. This can prevent errors and ensure that types passed to generics have certain properties or methods.

```typescript
interface HasId {
  id: number;
}

function printId<T extends HasId>(obj: T): void {
  console.log(obj.id);
}

printId({ id: 123, name: 'Alice' }); // Correct
printId({ name: 'Bob' }); // Error: 'id' property missing
```

### Avoid overloading with generics

It's important not to overuse generic types. Even if the code is more flexible and optimized, it is often more abstract and therefore harder to understand.

Use generics when they add real value in terms of flexibility and reusability.

### Documenting generic types

Documentation of generic types is essential, especially when they are used in libraries. Clearly explain type parameters and constraints to help other developers understand how to use your code correctly.

```typescript
/**
 * Represents a paginated API response.
 * @template ItemType The type of items in the response.
 */
interface PaginatedResponse<ItemType> {
  items: ItemType[];
  totalCount: number;
  hasNextPage: boolean;
}

/**
 * Retrieves paginated data from a URL.
 * @template T The type of elements in the response.
 * @param url The URL of the API.
 * @returns A paginated response promise.
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

### Using generics with TypeScript utility types

TypeScript provides several built-in utility types that work well with generics to manipulate types in a flexible and powerful way.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function updateUser<T extends Partial<User>>(user: T): T {
  return user;
}

const partialUser = updateUser({ id: 1, email: 'newemail@example.com' });

function getUserInfo<T extends Pick<User, 'id' | 'name'>>(user: T): string {
  return `ID: ${user.id}, Name: ${user.name}`;
}

const userInfo = getUserInfo({ id: 1, name: 'Alice' });
```

## Conclusion

Generic types in TypeScript are important. They enable you to create flexible, reusable and maintainable methods and classes.

By exploiting generic types, you'll write more robust and flexible code.

Creating your own projects and experimenting with generics will help you better understand their nuances and develop your expertise.
