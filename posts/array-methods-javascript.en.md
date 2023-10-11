---
title: 'JavaScript arrays'
pageTitle: 'JavaScript arrays : fundamentals & methods'
date: '2023-10-11'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/array-methods-javascript.webp'
excerpt: 'Learn how to create and manipulate arrays in JavaScript with this comprehensive article. Discover the fundamentals of arrays, as well as advanced techniques for iterating, transforming, filtering, aggregating and sorting data.'
tags: ['javascript']
related: ['how-to-regex-in-javascript', 'javascript-reduce-method']
---

Arrays in JavaScript are fundamental data structures for storing and manipulating collections of elements.

They are incredibly versatile and can be used to store and manipulate a wide variety of data. They are at the heart of many data processing operations, dynamic user interface rendering and algorithmic problem solving.

## Array basics in JavaScript

Arrays are used to store collections of elements, be they numbers, strings, objects or even functions. A solid understanding of JavaScript arrays is a major asset in any developer's toolbox.

### What is an array in JavaScript?

An array in JavaScript is an ordered collection of elements, where each element is associated with a unique index. The special feature of JavaScript arrays is their ability to contain a variety of data types within a single array. For example, an array can contain numbers, strings and objects, all in a specific order.

### Syntax for creating and initializing arrays

To create an array in JavaScript, you can use array literal notation or the `Array()` constructor. Here's how to create an empty array with each method:

```javascript
// array literal notation
const emptyArray1 = [];

// Array constructor
const emptyArray2 = new Array();
```

To initialize an array with elements, you can simply list these elements in square brackets, separated by commas:

```javascript
const animals = ['dog', 'cat', 'horse', 'badger'];
```

### Accessing array elements by index

The elements of an array are accessed via their index, which starts at zero for the first element. For example, to access the elements of the `animals` array defined above, you can use :

```javascript
const firstAnimal = animals[0]; // 'dog'
const secondAnimal = animals[1]; // 'cat'
```

### Basic methods for manipulating arrays

JavaScript offers several built-in methods for performing common operations on arrays. Here are some of the most frequently used methods:

### Adding elements to the end of the array with `push()`

The `push()` method can be used to add one or more elements to the end of an array.

```javascript
animals.push('tiger');
console.log(animals); // ['dog','cat','horse','badger','tiger'];
```

### Remove the last element from an array with `pop()`

Conversely, the `pop()` method removes the last element from an array and returns that element.

```javascript
const lastAnimal = animals.pop(); // 'tiger'
console.log(animals); // ['dog','cat','horse','badger'];
```

### Remove the first element from an array with `shift()`

The `shift()` method removes the first element from an array and returns that element.

```javascript
const firstAnimal = animals.shift(); // 'dog'
console.log(animals); // ['cat','horse','badger'];
```

### Add an element to the beginning of an array with `unshift()`

The `unshift()` method adds one or more elements to the beginning of an array.

```javascript
animals.unshift('bear');
console.log(animals); // ['bear','cat','horse','badger'];
```

These basic methods are the foundation of array manipulation in JavaScript. They allow you to add, remove and modify array elements as required.

## Advanced array manipulation

Now that we've explored the fundamentals of arrays in JavaScript, it's time to move up a gear. In this section, we'll discover advanced manipulation techniques that will enable you to take full advantage of this flexible data structure.

### Using loops to iterate through elements

One of the first things you learn in programming is the importance of loops. Loops allow you to repeat actions over a set of elements, which is particularly useful when manipulating arrays.

### Loop `for` to iterate

The `for` loop is one of the most commonly used loops for iterating through an array. It uses a counter to access array elements by their index. Here's how it works:

```javascript
const animals = ['dog', 'cat', 'horse', 'badger'];

for (let i = 0; i < animals.length; i++) {
  console.log(animals[i]);
}
```

This loop traverses each element of the `animals` array using the `i` index, allowing access to each element individually.

### Using `forEach()`

Although the `for` loop is efficient, JavaScript also offers the `forEach()` method for iterating through an array in a readable way:

```javascript
animals.forEach(function (animal) {
  console.log(animal);
});
```

The `forEach()` method takes a callback function as argument, which is executed for each element of the array. This makes the code cleaner and more readable.

### The `map()` method: Transforming an array

The `map()` method creates a new array by applying a function to each element of the original array, and returns the modified array. This allows you to transform array data without modifying the original array. Here's an example:

```javascript
const arrayNumbers = [1, 2, 3, 4, 5];
const squares = arrayNumbers.map(function (num) {
  return num * num;
});
console.log(squares); // [1, 4, 9, 16, 25]
```

In this example, the function passed to `map()` squares each number, creating a new `squares` array.

### The `filter()` method: Element filtering

The `filter()` method creates a new array containing elements that satisfy a condition specified in a callback function. For example, to obtain an array containing only even numbers:

```javascript
const arrayNumbers = [1, 2, 3, 4, 5];
const evenNums = arrayNumbers.filter(function (num) {
  return num % 2 === 0;
});
console.log(evenNums); // [2, 4]
```

The callback function returns `true` for elements to keep and `false` for those to exclude.

### The `reduce()` method: Data aggregation

The `reduce()` method is used to aggregate the elements of an array into a single result, using a callback function. For example, to calculate the sum of all elements in an array :

```javascript
const arrayNumbers = [1, 2, 3, 4, 5];
const sumNumbers = arrayNumbers.reduce(function (acc, curr) {
  return acc + curr;
}, 0);
console.log(sumNumbers); // 15
```

The callback function takes two arguments, `acc` (the accumulator) and the current element, and returns the accumulated value.

[A complete article is available on the `reduce()` method.](/blog/javascript-reduce-method)

### The `sort()` method: Sorting an array

The `sort()` method sorts the elements of an array in place, i.e. it modifies the original array. By default, it sorts elements by converting them into character strings and comparing them according to their lexicographical order. For numerical sorting, you need to specify a comparison function :

```javascript
const arrayNumbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
arrayNumbers.sort(function (a, b) {
  return a - b;
});
console.log(arrayNumbers); // [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
```

These array methods greatly simplify data manipulation. By combining them intelligently, you can perform a wide variety of array operations in just a few lines of code.

## Conclusion

In this article, we've explored the fundamentals of arrays in JavaScript, as well as some advanced manipulation techniques. We've seen how to create and initialize arrays, access array elements, and use basic methods to manipulate arrays.

We've also seen how to use loops and advanced methods to iterate through array elements, transform array data, filter elements, aggregate data and sort elements.

By mastering these concepts, you'll be able to manipulate arrays efficiently in JavaScript.
