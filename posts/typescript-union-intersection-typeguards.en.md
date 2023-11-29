---
title: 'Handling complex types: Union, Intersection and Typeguards in TypeScript'
pageTitle: 'Advanced manipulation of complex types in TypeScript: Unions, Intersections and Typeguards'
date: '2023-11-29'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/typescript-union-intersection-typeguards-illustration.webp'
excerpt: "Explore the subtleties of TypeScript's advanced handling of complex types such as unions, intersections and typeguards to enhance the robustness of your applications."
tags: ['typescript']
related: ['typescript-types-interfaces-and-classes', 'typescript-enums']
---

When it comes to building robust applications in TypeScript, handling complex types quickly becomes indispensable.

An in-depth understanding of the notions of unions, intersections and typeguards becomes a major asset for developers looking to enhance the safety of their code.

## Introduction

Complex types, such as unions and intersections, represent an advanced set of possibilities for structuring data in TypeScript.

Unions enable the creation of types that can contain several different types, while intersections allow several types to be combined to form a single type.

Typeguards help ensure code security by validating data at program runtime.

## Unions and Intersections

### Explaining unions and their use

Unions offer remarkable flexibility in defining types capable of representing multiple shapes. For example:

```typescript
type ID = string | number;
let userId: ID;

userId = 'abc123'; // OK
userId = 456; // OK
userId = true; // Error: Type 'boolean' is not assignable to type 'string | number'
```

### Learn more about intersections and how to use them effectively

Unlike unions, intersections allow you to merge types to create a new type with all the characteristics of its components:

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

### Comparing use cases to choose between unions and intersections

The decision to use unions or intersections often depends on context and application logic.

Unions are ideal for representing a value that can be of several distinct types, while intersections are better suited to combining types to create a complete new type.

## Typeguards: guardians of code safety

Typeguards are functions that check the type of a variable at runtime.

They guarantee greater security and precision in data processing.

### Concrete examples of how typeguards can be used to secure code

In this example, we want to calculate the area of a shape. And the calculation changes according to the shape used. Thanks to the `in` keyword, we can check for the presence of a property exclusive to our shape and use the right formula.

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
  if ("size" in shape) return shape.size ** 2; // Calculating area of a square

  if ("radius" in shape) return Math.PI * shape.radius ** 2 // Calculating area for a circle

  return shape.width * shape.height; // Calculating area for a rectangle
```

In this example, we want to check whether our pet is a dog or a cat and display its information. If we can't identify it, we'll throw an exception.

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

  throw new Error('Ouch, this animal is unknown');
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

### Best practices and tips for optimizing the use of typeguards

**Naming typeguard functions**: Give typeguard functions clear, explicit names to make them easier to understand and improve code readability.

```typescript
function isManager(employee: Employee): employee is Manager {
  return (employee as Manager).department !== undefined;
}
```

**Use `as` or `in` with care**: Use `as` and `in` judiciously and precisely to avoid unnecessary conversions or checks that could alter the safety of the code.

```typescript
if ('department' in employee) {
  // Do something...
}
```

**Combine typeguards**: Use several typeguards in combination for more complex checks.

```typescript
function isSeniorManager(employee: Employee): boolean {
  return isManager(employee) && employee.department === 'Engineering';
}
```

**Typeguards extension**: Extend the functionality of typeguards for more specific cases or additional conditions.

```typescript
function isSeniorManager(employee: Employee): boolean {
  return isManager(employee) && employee.department === 'Engineering';
}
```

**Avoid code redundancy**: Reuse existing typeguards to avoid duplicating similar checks.

```typescript
function isEmployeeSenior(employee: Employee): boolean {
  return isManager(employee) || isSeniorManager(employee);
}
```

By following these best practices and tips, you can maximize the efficiency and clarity of your typeguards, reinforcing the safety and reliability of your TypeScript code.

## Advanced use cases

### Managing states in an application

In this example, we use union for the types of the various states and typeguards to check that the data is present before displaying it.

In this way, we can anticipate the contents of the `state` variable and the behavior of the `handleState` function.

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
    // Display loading
  } else if ('data' in state) {
    // Use state.data
  } else {
    // Display error : state.error
  }
}
```

In this example, we use the combination of typeguards and an intersection. This will allow you to check the type of the `box` element to ensure that it contains the properties required for specific processing. In this way, errors are avoided.

```typescript
type BoxTypes = ImageBox | StaticTextBox | TagTextBox | SocialMediaBox | TagImageBox | GroupBox;

function isTagBox(box: BoxTypes): box is TagTextBox | TagImageBox {
  return isTagTextBox(box) || isTagImageBox(box);
}
```

## Conclusion

Advanced handling of complex types such as unions, intersections and typeguards opens up a world of possibilities for TypeScript developers.

By understanding these concepts and applying them judiciously, you can enhance the robustness and safety of your code, while simplifying the management of complex data structures.

By exploring unions and intersections in depth, mastering typeguards to secure your typing operations, and applying this knowledge in real-world scenarios, you're armed to take your TypeScript development to new heights.

Keep exploring these concepts, experiment with them in your projects and discover how they can fundamentally transform your approach to software development.
