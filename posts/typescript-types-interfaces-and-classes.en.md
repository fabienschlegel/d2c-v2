---
title: 'TypeScript: types, interfaces and classes'
pageTitle: 'Discover key concepts of TypeScript: types, interfaces and classes'
date: '2023-10-18'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/typescript-types-interfaces-and-classes.webp'
excerpt: "Let's explore the basics of TypeScript, focusing on types, interfaces and classes. Learn how to use them to improve the robustness of your TypeScript code."
tags: ['typescript']
related: ['10-typescript-tips-for-beginner-developers', 'begin-react-with-typescript']
---

TypeScript is a language that has gained in popularity in recent years thanks to its ability to make development more robust.

The language offers a range of features that enable developers to better structure their code, improve readability and prevent potential errors. At the heart of TypeScript are three key concepts: types, interfaces and classes.

## Understanding types in TypeScript

One of the fundamental pillars of TypeScript is its handling of types. Whereas JavaScript is a dynamically typed language, TypeScript introduces the notion of static types, which means you can specify the type of data your variables and functions should use.

### Basic types

Typescript offers a set of basic types that correspond to common data types. These include types such as `number` for numbers, `string` for strings, `boolean` for Boolean values, and so on. Using these types allows you to explicitly declare the expected type for a variable, which can avoid subtle bugs.

```typescript
const age: number = 30;
const name: string = 'Alice';
const isActive: boolean = true;
```

By specifying the type, TypeScript can detect errors as early as the development phase, even before your code is executed. For example, if you try to assign a string to a variable declared as `number`, TypeScript will warn you of type incompatibility.

### Custom types

In addition to basic types, TypeScript lets you create custom types. This feature is invaluable for defining complex data structures or types specific to your application. You can use the `type` keyword to create a type alias.

```typescript
type Point = {
  x: number;
  y: number;
};
```

Custom types become useful when working with complex data, such as objects containing multiple properties. They allow you to document the expected structure of the data and ensure that your code respects this structure.

### Defining types for functions

You can also use them to define function signatures. This ensures that functions are called with the right argument types and return the appropriate value types.

```typescript
function addValues(a: number, b: number): number {
  return a + b;
}
```

By specifying the types of parameters and return values, TypeScript helps you write consistent functions and avoid runtime errors.

### TypeScript type inference

One of TypeScript's powerful features is its type inference system. Unlike many other languages, TypeScript can infer the type of a variable based on the value to which it is initially assigned.

For example, if you assign a number to a variable, TypeScript will automatically know that this variable is of type `number`. This can make your code more concise and readable, as you don't always need to specify types explicitly.

Type inference does not compromise TypeScript's type safety. The language will continue to detect type inconsistencies and issue warnings in the event of problems.

## Interfaces in TypeScript

Interfaces are another fundamental element of TypeScript. They are used to define contracts, i.e. specifications on the structure of objects. Interfaces offer a powerful way of describing the expected form of data in your application, contributing to the clarity and robustness of your code.

### Introduction to interfaces

A TypeScript interface is an implementation-free structure that defines a set of properties and methods that objects must respect. You can think of them as contracts that objects must sign in order to comply.

```typescript
interface Person {
  name: string;
  age: number;
}
```

In this example, the `Person` interface defines a contract stipulating that any object claiming to be a person must have a `name` property of type `string` and a `age` property of type `number`.

### Using interfaces to structure code

Interfaces are particularly useful for structuring your code. They help you define the expected form of objects and clarify expectations for developers working with your code.

Let's take the example of a function that displays a person's information:

```typescript
function displayPerson(person: Person) {
  console.log(`Nom: ${person.name}, Age: ${person.age}`);
}
```

The `displayPerson` function accepts an object that conforms to the `Person` interface. If an object does not comply with this contract, TypeScript will issue an error at compile time.

### Inheriting interfaces

Interfaces can also inherit from other interfaces. This makes it possible to create hierarchies of interfaces that extend the basic contracts.

```typescript
interface Employee extends Person {
  job: string;
}
```

The `Employee` interface inherits from the `Person` interface, adding a new `job` property. This means that any employee must respect the `Person` contracts and also include the `job` property.

Interfaces offer a powerful way of structuring code in TypeScript, helping to define clear contracts and encourage consistency in your application.

## Classes and TypeScript

Classes are another essential element of TypeScript, allowing you to create complex data structures and apply object-oriented programming (OOP) principles. Understanding how to use classes in TypeScript is crucial to developing robust, modular applications.

### Introduction to Classes

In programming, a class is a model for the creation of objects. In TypeScript, classes provide a way of defining objects with properties and methods. This allows logic and data to be encapsulated in a coherent unit.

Here's a simple example of how to declare a class in TypeScript:

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

In this example, the `Car` class defines two properties (`brand` and `year`), a constructor to initialize these properties and a `displayDetails` method to display the car's information.

### Creating class instances

Once you've defined a class, you can create instances of it. Instances are individual objects based on the class.

```typescript
const myCar = new Car('Toyota', 2022);
myCar.displayDetails();
```

This creates a `myCar` instance of the `Car` class and calls the `displayDetails` method to display the car's details.

### Comparison with JavaScript prototypes

TypeScript classes are similar to JavaScript prototypes, but with clearer syntax and additional functionality. TypeScript classes are converted to ES5/ES6 JavaScript code for browser compatibility.

### Using classes for complex data structures

Classes are particularly useful when working with complex data structures. They enable you to group data and related functionality into a single entity, improving the readability and maintainability of your code.

### Encapsulation and modulation

Classes also encourage encapsulation, i.e. limiting access to the object's internal data. You can define private or protected properties to control access to data. This promotes better data modeling and reduces potential errors.

In short, TypeScript classes offer a powerful way of creating complex objects, encapsulating logic and data, and structuring your code in a modular way. They are an essential tool for developing robust applications in TypeScript.

## Combining types, interfaces and classes

Types, interfaces and classes each have their own uses, but the real power of TypeScript lies in the way they interact to create solid, coherent code.

### Types, interfaces and classes in synergy

When you combine types, interfaces and classes, you create a robust development ecosystem. Here's how these concepts can interact in beneficial ways:

1. **Types for data security:** By using types, you ensure that your data is correctly typed. This reduces type errors at runtime and improves the readability of your code.
2. **Interfaces for structuring:** Interfaces define the form of objects and contracts. By using them, you clearly define what you expect from objects and create real-time documentation for developers working with your code.
3. **Classes for encapsulation and modeling:** Classes enable you to create complex data structures by encapsulating logic and data. They make your code modular, reusable and maintainable.

Let's take a concrete example: suppose you're developing a library management application. You can define a type to represent a book, an interface to describe the form expected of a user and a class to represent a library. By combining these elements, you obtain organized, coherent code.

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

In this example, the `Book` type defines the structure of the books, the `User` interface specifies the form of a user, and the `UserLibrary` class encapsulates the collection of books with methods for adding and listing them.

This combination of types, interfaces and classes promotes clear, consistent communication between developers working on the project. It enables errors to be detected as early as the development phase, and facilitates long-term maintenance.

### Conclusion

The fundamental principles of TypeScript - types, interfaces and classes - are essential for creating robust, well-structured TypeScript code. By understanding how these concepts interact, you're better prepared to develop quality applications.

TypeScript offers a range of advanced features, such as generics, decorators and more, that can further enhance your development experience.
