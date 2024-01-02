---
title: 'Typescript : Taking advantage of utility types'
pageTitle: 'Mastering TypeScript utility types : Improving code efficiency'
date: '2024-01-03'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/typescript-utility-types-illustration.webp'
excerpt: 'Explore the types of TypeScript utilities for streamlining and optimizing code in your projects. Learn how to leverage these powerful tools to increase code productivity and efficiency.'
tags: ['typescript']
related: ['typescript-types-interfaces-and-classes', 'typescript-enums']
---

TypeScript utility types allow existing types to be manipulated and transformed. These tools offer additional flexibility and expressiveness, enabling developers to create complex data structures while guaranteeing typing security.

Rather than being limited to simple types, utility types open the way to advanced operations such as creating subtypes, selecting or excluding properties, or transforming existing types.

Utility types help to improve the management and manipulation of data types, leading to more reliable and efficient software development.

## Main utility types

TypeScript's main utility types offer powerful functionality for manipulating and transforming existing types. Here are some of the most commonly used types:

### `Partial<T>` and `Readonly<T>` types

The `Partial<T>` type allows you to declare that part of a type's properties are optional, offering great flexibility when manipulating objects.

On the other hand, `Readonly<T>` ensures that objects remain read-only.

```tsx
interface User {
  name: string;
  age: number;
}

function updateUser(user: Partial<User>): void {
  // ...
}
```

### `Record<K, T>` and `Pick<T, K>` types

The `Record<K, T>` type allows you to create a type with keys of type `K` and values of type `T`, thus simplifying object and property management.

On the other hand, `Pick<T, K>` selects certain properties of a type.

```tsx
type Car = 'sedan' | 'coupe' | 'suv';
type CarDetails = Record<Car, { fuelEfficiency: number }>;
```

These utility types are fundamental tools for manipulating data types in TypeScript. They offer greater flexibility and facilitate the creation of complex data structures while maintaining typing security.

## Advanced utility types for type manipulation

Advanced utility types offer powerful features for filtering and transforming types in more complex ways. Here are some of these tools:

### `Exclude<T, U>` and `Extract<T, U>`

- `Exclude<T, U>` excludes types present in `U` from the `T` type.
- `Extract<T, U>` selects common types between `T` and `U`.

```tsx
type Numbers = 1 | 2 | 3 | 4 | 5;
type WithoutTwoThree = Exclude<Numbers, 2 | 3>; // Result: 1 | 4 | 5
```

These types can be used to create more specific types by excluding or extracting certain types from a union of types.

### `NonNullable<T>` and `ReturnType<T>`

- `NonNullable<T>` excludes `null` and `undefined` values from type `T`.
- `ReturnType<T>` determines the return type of a function.

```tsx
function greet(): string {
  return 'Hello, TypeScript!';
}

type Greeting = ReturnType<typeof greet>; // Result: string
```

These advanced type utilities are essential for refining types and ensuring data security and accuracy in your TypeScript applications. Exploit them for more advanced type manipulation and better control of your code.

## Creating custom utility types

In addition to built-in utility types, TypeScript offers the possibility of creating custom utility types, adapted to the specific needs of an application. This customization allows developers to define tailor-made tools to meet specific requirements.

### Example of creating a custom utility type

Let's consider an example where we want to create a utility type to extract only `string` properties from an object. We can define a custom utility type called `StringPropsOnly` to achieve this.

```tsx
type TrimmedStrings<T> = {
  [key in keyof T as T[key] extends string ? key : never]: T[key];
};

interface User {
  name: string;
  age: number;
  email: string;
}

type StringPropsOnly = TrimmedStrings<User>; // Result: { name: string, email: string }
```

In this example, the `TrimmedStrings` utility type uses a key loop (`keyof`) to cycle through all object properties, retaining only those of type `string`. Thus, `StringPropsOnly` will contain only the string properties of the `User` object.

### Step-by-step guide to creating custom utility types

1. **Define the purpose of the utility type:** Clearly identify what you want to achieve with the custom utility type.
2. **Use advanced TypeScript concepts:** Exploit concepts such as key loops (`keyof`), conditions (`extends`), and generic types to create specific rules.
3. **Test and iterate:** Test your utility type with different types to make sure it works as expected. If necessary, iterate and adjust.
4. **Document:** Clearly document the use and purpose of the custom utility type to facilitate understanding and maintenance by other developers.

The creation of custom utility types offers considerable flexibility in the design of your data structures. By integrating these tools specific to your application domain, you can simplify type management and make your code more tailored to your particular needs.

## Tips for efficient use of utility types

The judicious use of utility types is essential to take full advantage of their potential without unnecessarily burdening the code. Here are a few tips for effective use:

### 1. Limit the use of utility types

Avoid overuse of utility types. Use them when they really improve the readability and robustness of your code. An excess of utility types can make code difficult to understand for other developers.

### 2. Prioritize code readability

Prioritize code clarity. Make sure that the use of utility types does not unnecessarily complicate the reading of the code. Code that is too abstract can be difficult to maintain.

### 3. Document your custom utility types

Provide clear documentation to explain the use and intent behind each custom utility type you create. This will help other developers to understand and use these types correctly.

### 4. Avoid complex utility types

Keep utility types simple and understandable. Avoid overly complex structures that could make maintenance difficult. Opt for simplicity whenever possible.

### 5. Test your utility types

Perform thorough tests on your utility types, especially when they are used in sensitive cases. This ensures that they work properly and meet your expectations.

By following these tips, you'll be able to use utility types effectively in your TypeScript code. Keep in mind that clarity and simplicity are crucial aspects of robust, maintainable code.

## Conclusion

TypeScript utility types are an essential component for building robust, maintainable applications. From manipulating basic types to creating custom utility types, these tools offer considerable flexibility and power for managing complex data structures.

By understanding and effectively using built-in utility types such as `Partial`, `Readonly`, `Record`, `Pick`, as well as advanced types like `Exclude`, `Extract`, `NonNullable` and `ReturnType`, developers can improve the clarity, safety and efficiency of their TypeScript code.

The use of these types should be balanced: overuse can make code difficult to read, while judicious use improves code maintainability and robustness.

By continually exploring these features and experimenting with different use cases, developers can deepen their understanding of utility types and integrate them effectively into their projects.

In short, utility types in TypeScript offer a wide range of tools for managing the complexity of data types in modern software development. By integrating them appropriately, developers can create safer, more expressive and more maintainable code in their TypeScript applications.
