---
title: 'Type inference with TypeScript'
pageTitle: 'TypeScript and type inference: a complete guide for devs'
date: '2024-07-26'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/type-inference-with-typescript-illustration.webp'
excerpt: 'Discover how TypeScript uses type inference to improve your code. A complete guide with practical examples and recommendations.'
tags: ['typescript']
related: ['10-typescript-tips-for-beginner-developers', 'typescript-utility-types']
---

The main advantage of TypeScript is its static typing. It adds a layer of security to JavaScript to prevent errors and improve code maintainability.

Another of TypeScript's powerful concepts is type inference.

## What is type inference?

Type inference enables TypeScript to automatically infer the types of variables, function parameters and return values without the need for explicit declarations. Code is more concise and often more readable, while maintaining robust typing security.

### Definition and explanation

When a variable is initialized without specifying its type, TypeScript analyzes the assigned value to determine its type. For example, if you write `const myValue = 5`, TypeScript infers that `myValue` is of type `number`. This inference is made possible by TypeScript's internal rules, which deduce types from values and the contexts in which they are used.

Similarly, if you return a value from a function without specifying the return type, TypeScript will infer the type of that return value.

```typescript
function add(a: number, b: number) {
  return a + b; // TypeScript infers that the return type is 'number'
}
```

### Comparison with explicit typing

Explicit typing involves explicitly declaring the type of each variable, parameter or return value. This can be beneficial for code clarity, especially in development teams where readability and rapid code comprehension are crucial.

The code will become more verbose and cluttered in some cases. It's much the same principle as for comments, which don't add value to your code.

```typescript
const myNumber: number = 5;
function add(a: number, b: number): number {
  return a + b;
}
```

### Advantages of type inference

Type inference offers several significant advantages:

- **Reduction of boilerplate code**: Type inference reduces the need to write explicit type annotations everywhere, making code more concise.
- **Improved readability**: Fewer type declarations can make code easier to read and understand, especially for experienced developers who can quickly identify types from context.
- **Early error detection**: TypeScript can still detect type errors at compile time, even when types are inferred, ensuring typing safety without code overhead.
- **Flexibility**: Inference allows developers to focus on business logic rather than type management, which can speed up development.
- Maintainability\*\*: Fewer explicit type declarations mean fewer change points when refactoring code, making it easier to maintain.

However, type inference is not always the best solution.

In some cases, it may be preferable to use explicit types to improve code clarity and documentation, particularly in large code bases or when working in a team.

## How does TypeScript perform inference?

### Inference in variables

When you declare a variable without specifying its type but assigning it a value, TypeScript infers the type of that value.

```typescript
const message = 'Hello'; // TypeScript infers that 'message' is of type 'string'.
const ultimateQuestion = 42; // TypeScript infers that 'ultimateQuestion' is of type 'number'.
const isValid = true; // TypeScript infers that 'isValid' is of type 'boolean'.
```

This inference is based on the literal values provided during declaration. The variable's type is thus locked to that of the initial value.

### Inference in functions

Type inference in functions can be performed using parameters. Knowing their type enables TypeScript to infer return values.

TypeScript can also guess the return type by analyzing the value returned by the function.

```typescript
const add = (a: number, b: number) => a + b;
// The types of parameters 'a' and 'b' are explicitly defined here.

const sendHello = (name: string) => `Hello, ${name}`;
// TypeScript infers that the return type is 'string'.
```

### Inference in objects and arrays

For objects and arrays, TypeScript recursively infers types by examining the values of each property or element.

```typescript
const user = {
  name: 'Alice',
  age: 30,
  isAdmin: false,
}; // TypeScript infers that 'user' is of type '{ name: string; age: number; isAdmin: boolean; }''

const countMe = [1, 2, 3, 4, 5]; // TypeScript infers that 'countMe' is of type 'number[]'.
const mixed = [1, 'two', true]; // TypeScript infers that 'mixed' is of type '(number | string | boolean)[]'.
```

### Specific cases and limits of inference

**Contextual inference:** TypeScript uses context to infer types. For example, in callback functions, the type is based on the signature of the expected interface or type.

```typescript
const array = [1, 2, 3];

const callbackFn = (num) => console.log(num); // 'num' is inferred as 'number

tableau.forEach(callbackFn);
```

**Inference with generics:** Generic types allow TypeScript to maintain flexibility while offering typing security.

```typescript
function identite<T>(arg: T): T {
  return arg;
}
let resultat = identite('test'); // TypeScript infers that 'T' is 'string'.
```

**External content:** For function returns such as `parse` from the JSON API or query returns with Axios for example, the type cannot be inferred.

```typescript
const myObject = JSON.parse('{}'); // TypeScript infers the 'any' type
```

**Loss of precision:** In some cases, TypeScript may infer a wider type than necessary, resulting in a loss of typing safety.

```typescript
const value = Math.random() > 0.5 ? 'text' : 42;
// TypeScript infers 'value' as 'string | number'.
```

In the case of loss of precision or external content, I generally use generic typing or guard clauses to guarantee the return type.

```typescript
// Example of a guard clause to guarantee the type of an object
function isTagTextBox(box: BoxTypes): box is ITagTextBox {
  return box && typeof box === 'object' && box.type === 'tagText';
}
```

## Best practices and recommendations

Here are a few tips for using type inference in an efficient and balanced way.

### When to use inference vs. explicit typing

**Using inference:**

1. **Simple, obvious code:** Use inference for variables, constants and functions where the type is immediately obvious from the value or context.

   ```typescript
   let myNumber = 42; // Obvious inference of type 'number'.
   ```

2. **Immediate initialization:** When you initialize a variable or constant immediately after declaring it, inference is generally appropriate.

   ```typescript
   const message = 'Bonjour!'; // 'string' type inference
   ```

3. **Simple function returns:** For functions with simple returns, inference can make the code more readable.

   ```typescript
   function salutations(nom: string) {
     return `Bonjour, ${nom}!`; // TypeScript infers that the return type is 'string'.
   }
   ```

**Using explicit typing:**

1. **Public functions and APIs:** For functions that are exported or used in a public API, it's best to declare types explicitly to improve clarity and documentation.

   ```typescript
   export function computeAmount(total: number, taxe: number): number {
     return total + taxe;
   }
   ```

2. **Increased complexity:** For complex data structures or generics, explicit typing can avoid ambiguity and improve readability.

   ```typescript
   interface User {
     name: string;
     age: number;
     estAdmin: boolean;
   }

   function createUser(data: User): User & { creationDate: Date } {
     return {
       ...data,
       creationDate: new Date(),
     };
   }
   ```

3. **Documentation and understanding:** Explicit typing can serve as built-in documentation, helping other developers (or yourself) to quickly understand the expected types without having to analyze the code in detail.

### Balancing code readability and type safety

1. **Prefer clarity:** When the type is not obvious, use explicit annotations to clarify the code.

   ```typescript
   const data: { name: string; age: number } = { name: 'Alice', age: 30 };
   ```

2. **Reduce redundant annotations:** Do not duplicate type information if TypeScript inference is sufficient.

   ```typescript
   // Avoid this
   let myValue: number = 42;

   // Prefer this
   let myValue = 42; // TypeScript infers 'number'
   ```

3. **Use interfaces and types:** Declare interfaces and types for complex data structures to improve reusability and readability.

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

4. **Document with JSDoc:** Use JSDoc comments to add descriptions and types to functions, especially complex or generic functions.

   ```typescript
   /**
    * Calculates the sum of two numbers.
    * @param a - The first number.
    * @param b - The second number.
    * @returns The sum of the two numbers.
    */
   function add(a: number, b: number): number {
     return a + b;
   }
   ```

### Specific use cases

1. **Callback functions in libraries:** TypeScript can infer the types of callback functions used with methods such as `map`, `filter`, and `reduce`.

   ```typescript
   const myNumbers = [1, 2, 3, 4, 5];
   const sumUp = myNumbers.reduce((acc, curr) => acc + curr, 0);
   // TypeScript infers 'sumUp' as 'number'.
   ```

2. **Type props in React:** Use interfaces to explicitly type props in React components, but let inference handle simple internal states.

   ```tsx
   interface Props {
     title: string;
   }

   const MyComponent = ({ title }: Props) => {
     const [counter, setCounter] = useState(0); // TypeScript infers 'number'.

     return (
       <h1>
         {title} - {counter}
       </h1>
     );
   };
   ```

## Tools and resources to improve inference

A wide range of tools can help you analyze, visualize and optimize typing in TypeScript projects. They allow you to take full advantage of the security and benefits offered by TypeScript.

### Visual Studio Code

This is one of the most popular editors. It offers native integration with TypeScript, including type inference.

- **Intelligent autocompletion:** Based on type inference, it suggests available methods, properties and variables.
- **IntelliSense:** Displays inferred types, function signatures and online documentation.
- **EasyNavigation :** Go to definition, search for usages, and type-assisted refactoring.
- **Linting:** Helps detect type errors in real time.

### Linters and code analyzers

Code linters and analyzers can help maintain clean, well-typed code.

ESLint, combined with the TypeScript plugin, is the modern standard for TypeScript linting. It can:

- **Detect type errors and bad practices:** Using TypeScript-specific rules.
- **Applying style conventions:** Ensuring code consistency.
- **Suggest improvements:** For types and inference.

### Compilation and type checking tools

**TypeScript Compiler :**

The TypeScript Compiler (`tsc`) is the main tool for checking types in your projects. It can:

- **Detect type errors:** By analyzing the entire project.
- **Translate code:** From TypeScript to JavaScript.

**DefinitelyTyped :**

DefinitelyTyped is a repository of type definitions for JavaScript libraries.

If you add a library that doesn't embed its types, Visual Studio Code will prompt you to install it via this repository.

**TypeScript Utility Types:**

Use TypeScript's built-in utility types to create complex types and improve inference.

```typescript
type PartialUser = Pick<User, 'name' | 'age'>;
type UserReadOnly = Readonly<User>;
```

## Conclusion

By enabling TypeScript to automatically infer types where possible, code is cleaner, more readable and less verbose without sacrificing robustness and security.

**Benefits of type inference:**

- **Increased productivity:** Less code to write means more time to focus on business logic.
- **Type safety:** Even without explicit annotations, TypeScript ensures rigorous type checking.
- **Readability and maintenance :** Code is cleaner and easier to understand, facilitating collaboration and maintenance.

To get the most out of type inference, it's important to understand its limitations and know when to use it.

Use explicit annotations in public APIs and complex functions, but let TypeScript handle types in obvious cases.

Take advantage of the tools and resources available to keep your code clean and well-typed.
