---
title: 'Array of objects comparison in TypeScript : Intersection, Difference and Union'
pageTitle: 'Advanced object array comparison in TypeScript'
date: '2024-04-19'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/compare-arrays-of-objects-with-typescript-illustration.en.webp'
excerpt: 'Discover how to efficiently compare arrays of objects in TypeScript by exploring the concepts of intersection, difference and union.'
tags: ['typescript']
related: ['typescript-utility-types', 'typescript-enums']
---

Data manipulation is an essential component of software development.

The array of objects is a very common data structure. It enables sets of objects to be stored and manipulated in a structured and efficient way.

A common task in software development is to compare object arrays for a variety of reasons:

- **Data validation**: Before processing data, it is often necessary to check that it is complete, consistent and valid. Comparing object arrays can help identify discrepancies or inconsistencies between data.
- **Filtering and transformation** : When handling large datasets, it is sometimes necessary to filter data according to certain criteria, or to transform it into another format. Object array comparison can facilitate these filtering and transformation operations.
- **Change detection**: In some cases, it is necessary to detect changes between two versions of data. Object array comparison can help identify additions, deletions or modifications to data sets.

Efficiently comparing arrays of objects can optimize the development process, improve code quality and deliver a better user experience.

In this article, we'll look at specific methods, as well as generic and reusable ones.

A section at the end of the article will explain the benefits of using these methods.

## Intersection

![Illustration of arrays intersection](/assets/blog/content-images/intersection-illustration.webp)

The intersection between two arrays of objects is the set of objects that are present in both arrays. In other words, if an object is present in both the first and second arrays, it's part of the intersection.

This can be useful in many situations, such as finding matches between two data sets or validating data consistency.

### How to find the intersection of arrays of objects

In TypeScript, there are several approaches to finding the intersection between two arrays of objects.

A common approach is to use the `filter()` method in combination with the `includes()` or `some()` method to check whether every object in the first array is present in the second array. This method only works if you can guarantee the uniqueness of an object property, such as its `id`. Here's an example of code to find the intersection of 2 arrays with `id` :

```typescript
const intersection = arr1.filter((obj) => arr2.some((item) => item.id === obj.id));
```

If you need a more generic solution that allows you to compare objects according to one or more properties, you can use a function like `getIntersection()` below.

Here's an example of code illustrating how to find the intersection between two arrays of objects in TypeScript :

```typescript
interface Animal {
  id: number;
  name: string;
}
const landAnimals = [
  { id: 0, name: 'Bear' },
  { id: 1, name: 'Tiger' },
  { id: 2, name: 'Sea lion' },
  { id: 3, name: 'Rabbit' },
];

const seaAnimals = [
  { id: 4, name: 'Whale' },
  { id: 0, name: 'Shark' },
  { id: 2, name: 'Sea lion' },
  { id: 6, name: 'Dolphin' },
  { id: 1, name: 'Turtle' },
];

function getIntersection<T>(array1: T[], array2: T[], ...keys: Array<keyof T>) {
  return array1.filter((obj1) => array2.find((obj2) => keys.every((k) => obj1[k] === obj2[k])));
}

const intersection = getIntersection<Animal>(landAnimals, seaAnimals, 'id', 'name');

console.log(intersection); // [{id: 2, name: "Sea lion"}]
```

In this example, `intersection` will contain the objects shared by `landAnimals` and `seaAnimals`. The result will be an array of objects containing the object with identifier 2 and the name `sea lion`, as it is present in both arrays.

## Difference

![Illustration of the difference in arrays](/assets/blog/content-images/difference-illustration.webp)

The difference of arrays is an operation that allows you to find items present in one array but absent from another. This operation is useful for detecting additions or deletions between two data sets.

### How to find the difference between arrays of objects in TypeScript

In TypeScript, you can find the difference between two arrays of objects by using the `filter()` method in combination with the `some()` or `includes()` method to check whether every object in the first array is absent from the second array. This method only works if you can guarantee the uniqueness of an object property, such as its `id`. Here's an example of code to find the difference between 2 arrays using `id` :

```typescript
const difference = arr1.filter((objet) => !arr2.some((item) => item.id === objet.id));
```

If you need a more generic solution that allows you to compare objects according to one or more properties, you can use a function like `getDifference()` below.

Here's an example of code illustrating how to find the difference between two arrays of objects in TypeScript :

```typescript
interface Animal {
  id: number;
  name: string;
}
const landAnimals = [
  { id: 0, name: 'Bear' },
  { id: 1, name: 'Tiger' },
  { id: 2, name: 'Sea lion' },
  { id: 3, name: 'Rabbit' },
];

const seaAnimals = [
  { id: 4, name: 'Whale' },
  { id: 0, name: 'Shark' },
  { id: 2, name: 'Sea lion' },
  { id: 6, name: 'Dolphin' },
  { id: 1, name: 'Turtle' },
];

function getDifference<T>(array1: T[], array2: T[], ...keys: Array<keyof T>) {
  return array1.filter((obj1) => !array2.some((obj2) => keys.every((k) => obj1[k] === obj2[k])));
}

const difference = getDifference<Animal>(landAnimals, seaAnimals, 'id', 'name');

console.log(difference); // [{id: 0, name: "Bear"}, {id: 1, name: "Tiger"}, {id: 3, name: "Rabbit"}]
```

In this example, `difference` will contain the objects present in `landAnimals` but absent in `seaAnimals` . The result will be an array containing the objects `{id: 0, name: "Bear"}`, `{id: 1, name: "Tiger"}` and `{id: 3, name: "Rabbit"}`, as they are present in `landAnimals` but not in `seaAnimals` .

By using the difference in arrays of objects in TypeScript, it becomes simple to quickly detect changes between two data sets and take the necessary steps to maintain data consistency and integrity.

This is particularly useful in applications where data synchronization and updating are essential.

## Union

![Illustration of array's union](/assets/blog/content-images/union-illustration.webp)

The union between two arrays of objects is the set of objects that are present in either array, but not both. Duplicates are eliminated to avoid duplication in the final result.

This operation is useful when you need to combine data sets without including duplicate elements.

### How to find the union of object arrays in TypeScript

In TypeScript, the union of two arrays of objects can be found by combining the two arrays and then using methods such as `filter()` and `reduce()` to eliminate duplicates.

This method only works if you can guarantee the uniqueness of an object property, such as its `id`. Here's an example of code to find the union between 2 arrays with `id` :

```typescript
const union = [
  ...arr1,
  ...arr2.reduce((acc, obj) => {
    if (!arr1.some((item) => item.id === obj.id)) {
      acc.push(obj);
    }
    return acc;
  }, []),
];
```

If you need a more generic solution that allows you to compare objects according to one or more properties, you can use a function like `getUnion()` below.

Here's an example of code illustrating how to find the union between two arrays of objects in TypeScript :

```typescript
interface Animal {
  id: number;
  name: string;
}
const landAnimals = [
  { id: 0, name: 'Bear' },
  { id: 1, name: 'Tiger' },
  { id: 2, name: 'Sea lion' },
  { id: 3, name: 'Rabbit' },
];

const seaAnimals = [
  { id: 4, name: 'Whale' },
  { id: 0, name: 'Shark' },
  { id: 2, name: 'Sea lion' },
  { id: 6, name: 'Dolphin' },
  { id: 1, name: 'Turtle' },
];

function getUnion<T>(array1: T[], array2: T[], ...keys: Array<keyof T>) {
  return [
    ...array1,
    ...array2.reduce((acc, obj1) => {
      if (!array1.some((obj2) => keys.every((k) => obj1[k] === obj2[k]))) {
        acc.push(obj1);
      }
      return acc;
    }, []),
  ];
}

const union = getUnion(landAnimals, seaAnimals, 'id', 'name');

console.log(union.length); // On obtiendra 8 résultats dans la liste
```

In this example, `union` will contain objects that are present in `landAnimals` or `seaAnimals`, but not in both.

Duplicates are eliminated, so the final result will contain only one copy of each object.

The union of object's arrays in TypeScript offers an efficient way of combining data sets while avoiding duplicates. This operation is useful in many scenarios, such as merging data from different sources or creating unified views across multiple datasets.

## Performance comparison

When comparing arrays of objects in TypeScript, it's important to consider the performance of different approaches for each operation (intersection, difference, union). Data size and performance constraints can influence the choice of approach.

### Recommendations for approach selection

For small to medium-sized arrays, approaches using the methods presented in the previous sections may be appropriate.

For large arrays, it may be necessary to explore more efficient data manipulation techniques, such as the use of optimized data structures or specialized libraries.

By choosing the right approach according to data size and performance constraints, comparison operations will be more efficient and optimized in terms of performance.

It is also advisable to profile and test the different approaches to assess their impact on performance in real-life situations.

Here's an example for arrays difference, optimized for large arrays in TypeScript :

```typescript
interface Animal {
  id: number;
  name: string;
}

function now() {
  return new Date().getTime();
}

function elapsed(beginning) {
  const duration = new Date().getTime() - beginning;
  console.log(`exec time: ${duration / 1000}s`);
}

function getDifference<T>(array1: T[], array2: T[], ...keys: Array<keyof T>) {
  return array1.filter((obj1) => !array2.some((obj2) => keys.every((k) => obj1[k] === obj2[k])));
}

function getDifferenceMap<T>(array1: T[], array2: T[]) {
  const mapArr2 = new Map<string, T>();

  for (const obj of array2) {
    mapArr2.set(JSON.stringify(obj), obj);
  }

  const difference: Array<T> = [];

  for (const obj of array1) {
    const key = JSON.stringify(obj);
    if (!mapArr2.has(key)) difference.push(obj);
  }

  return difference;
}

const bigLandAnimals: Animal[] = [];
const bigSeaAnimals: Animal[] = [];

for (let i = 0; i < 10000; i++) {
  bigLandAnimals.push({ id: i, name: `Objet ${i}` });
  bigSeaAnimals.push({ id: i + 5000, name: `Objet ${i + 5000}` });
}

for (let i = 10000; i < 10500; i++) {
  bigSeaAnimals.push({ id: i, name: `Objet ${i}` });
}

function execGetDifference() {
  let beginning = now();

  const difference = getDifference(bigLandAnimals, bigSeaAnimals, 'id', 'name');

  console.log(`Difference: ${difference.length}`);

  elapsed(beginning);
}

function execBigGetDifference() {
  let beginning = now();

  const difference = getDifferenceMap(bigLandAnimals, bigSeaAnimals);

  console.log(`Difference: ${difference.length}`);

  elapsed(beginning);
}

execGetDifference(); // Difference: 5000 exec time: 1.163s

execBigGetDifference(); // Difference: 5000 exec time: 0.112s
```

In this example, the `getDifferenceMap` function uses the `Map` object. This reduces the time complexity of the algorithm from O(n^2) to O(n), making it more suitable for large arrays.

We can clearly see the difference in execution time between the 2 methods for comparing 2 arrays, one containing 10000 elements and the other 15000 elements.

## Conclusion

Comparing arrays of objects in TypeScript is a common task in software development, and it's essential to choose the right approaches to ensure efficient and optimal operations. In this article, we've explored three main comparison operations: intersection, difference and union.

Using techniques such as `filter()`, `some()`, `includes()` or `every()` and optimized data structures such as the `Map` object, it is possible to compare arrays of objects efficiently, even with large data volumes.

The choice of approach depends on the size of the data and the specific performance constraints of each application. I recommend profiling and testing different approaches to assess their impact on performance in real-life situations.

By understanding the different techniques for comparing object arrays in TypeScript and choosing the appropriate approaches, you'll be able to optimize your development processes, improve the quality of your code and deliver a better user experience.

As you continue to explore and experiment with these techniques, you'll strengthen your TypeScript skills and become more efficient at manipulating data in your applications.
