---
title: 'JavaScript: sorting algorithms'
pageTitle: 'Explore bubble sorting and other sorting algorithms in JavaScript'
date: '2023-10-25'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/javascript-sorting-algorithms.webp'
excerpt: 'Discover how to implement and understand sorting algorithms, starting with bubble sort, followed by quick sort, merge sort and insertion sort, in JavaScript.'
tags: ['javascript']
related: ['array-methods-javascript', 'how-to-regex-in-javascript']
---

Sorting is one of the fundamental operations in data manipulation. Sorting lists, tables, objects - it's a ubiquitous task.

Sorting isn't just an academic exercise, it's essential for optimizing the performance of your applications, whether you're organizing data in an array or presenting results in an orderly fashion.

Here are four different sorting algorithms in JavaScript. Each has its advantages and disadvantages, and choosing the right sorting algorithm will depend on your specific use case.

## Bubble sorting in JavaScript

Bubble sorting is one of the simplest sorting algorithms, but also one of the least efficient. However, although it is not the optimal choice for sorting large quantities of data, it remains an excellent starting point for understanding the fundamentals of sorting.

### Explanation of the algorithm

The principle of bubble sort is fairly straightforward. The algorithm traverses the array from left to right, comparing two consecutive elements at each step. If the current element is larger than the next element, they are swapped. This process repeats itself until the entire array has been traversed, with no swapping necessary.

This ensures that the largest elements gradually "rise" to the end of the array, like bubbles to the surface.

The algorithm continues this process until the entire array is sorted, which may take several iterations. At each iteration, the largest unsorted element "moves up" to its final position.

Sorted elements remain stationary, while unsorted elements are subjected to comparisons and exchanges.

### JavaScript implementation

Here's a simple implementation of bubble sorting in JavaScript:

```javascript
function bubbleSort(arr) {
  const n = arr.length;
  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
  } while (swapped);

  return arr;
}

const numbersArray = [64, 34, 25, 12, 22, 11, 90];
bubbleSort(numbersArray); // [11, 12, 22, 25, 34, 64, 90]
```

This JavaScript implementation uses a `do...while` loop to repeat the sorting process as long as elements are exchanged. The algorithm stops as soon as it traverses the array without making any exchanges, indicating that the array has been sorted.

### Advantages and disadvantages of bubble sorting

Bubble sorting is simple to understand and implement, making it an excellent starting point for programming beginners. It can be used to teach basic sorting concepts. However, it has significant drawbacks:

- It is inefficient for large quantities of data, with a time complexity of O(n^2) in the worst case.
- It performs a number of unnecessary operations, even when the table is already partially sorted.

As a result, bubble sorting is rarely used in real applications, except for educational purposes or to sort very small quantities of data.

## Quick sort in JavaScript

Quick Sort is an efficient sorting algorithm that uses a divide-and-regard approach to sorting an array. It is one of the fastest and most commonly used sorting algorithms in computing.

### Explanation of the algorithm

Fast sorting is based on the principle of partitioning. The main idea is to select an element of the array, called the _pivot_, then partition the array into two sub-arrays: one containing all elements smaller than the pivot, and the other containing all elements larger than the pivot. The algorithm is then recursively applied to the sub-arrays until the entire array is sorted.

The partitioning step is crucial to the operation of fast sorting. There are different strategies for choosing the pivot, such as selecting the first element, the last element or an element at random. Once the pivot is chosen, the elements of the array are rearranged so that smaller elements are on the left of the pivot and larger elements on the right.

### JavaScript implementation

Here's a JavaScript implementation of quick sort:

```javascript
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

const numbersArray = [64, 34, 25, 12, 22, 11, 90];
quickSort(numbersArray); // [11, 12, 22, 25, 34, 64, 90]
```

The JavaScript implementation of quick sort uses recursion to sort left and right sub-tables according to the chosen pivot. Combining the results of the sorted sub-tables produces the final sorted table.

### Advantages and disadvantages of fast sorting

Quick sorting is widely appreciated for its speed and efficiency. Advantages include :

- Excellent performance for large arrays.
- An average time complexity of O(n log n), making it one of the fastest sorting algorithms.

However, the choice of pivot can affect performance. In the worst case, if the pivot is always chosen as the smallest or largest element, complexity can reach O(n^2). Nevertheless, fast sorting is a solid choice for sorting in general.

## Merge sort in JavaScript

Merge sort is a sorting algorithm based on the divide-and-regard method. It is renowned for its stability, predictable performance and ability to sort large quantities of data efficiently.

### Explanation of the algorithm

The central idea of merge sorting is to divide the array into two equal halves, sort each half recursively, then merge the two sorted halves to obtain the final sorted array.

The merging process is essential in fusion sorting. Two sorted arrays are merged into a single sorted array. This is done by comparing the elements of each array one by one and placing them in the resulting array in the correct order. Merging continues until all data in both halves has been merged.

### JavaScript implementation with code examples

Here's a JavaScript implementation of merge sorting:

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  const fusion = (left, right) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
  };

  return fusion(mergeSort(left), mergeSort(right));
}

const numbersArray = [64, 34, 25, 12, 22, 11, 90];
mergeSort(numbersArray); // [11, 12, 22, 25, 34, 64, 90]
```

The JavaScript implementation of merge sorting divides the array into two halves, sorts each half recursively, then merges them to obtain the final sorted array.

### Merge sort use cases and performance

Merge sorting is an excellent choice when stability and predictability of performance are essential. It has an average time complexity of O(n log n), making it an efficient option for sorting large quantities of data. However, it can require more memory than other sorting algorithms, as it creates new arrays at each merge step.

Merge sorting is also used in applications such as merging sorted files and classifying data in databases.

## Insert sort in JavaScript

Insertion sorting is a simple and efficient sorting algorithm, particularly suited to small tables or tables that are already partially sorted. It is widely used to sort data in real time or to sort small quantities of data.

### Explanation of the insertion sort algorithm

The insertion sort algorithm works by gradually building up a sorted array by inserting an unsorted element at the correct position in the existing sorted array. The idea is to go through the array element by element, comparing each element with the previous elements in the sorted array. When an unsorted element is found, it is inserted at the correct position in the sorted array.

### JavaScript implementation

Here's a JavaScript implementation of insertion sorting:

```javascript
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currentValue = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > currentValue) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = currentValue;
  }

  return arr;
}

const numbersArray = [64, 34, 25, 12, 22, 11, 90];
insertSort(numbersArray); // [11, 12, 22, 25, 34, 64, 90]
```

The JavaScript implementation of insertion sorting scans the array, compares each element with the previous elements in the sorted array and inserts them in the correct position.

### Situations where insertion sorting shines

Insertion sorting is particularly useful in the following scenarios:

- **Sorting small arrays**: The algorithm is effective for sorting small quantities of data due to its simplicity.
- **Partially sorted data**: When data is already partially sorted, insertion sorting can be faster than other, more complex sorting algorithms.
- **Real-time sorting**: This is commonly used to sort data in real time, such as search results or constantly changing lists.

Although insertion sorting is not as fast as quick sort or merge sort for large data sets, it remains a valuable tool for specific scenarios where simplicity and performance suffice.

## Algorithm comparison and selection

Selecting the right sorting algorithm is highly dependent on the context and specific characteristics of your data and application. Each of the algorithms we have explored - bubble sort, quick sort, merge sort and insertion sort - has distinct advantages and disadvantages.

### Performance and complexity comparison

- **Bubble sort**: Although simple to understand and implement, it is inefficient for large quantities of data, with a time complexity of O(n^2) in the worst case. It performs a number of unnecessary operations, even when the table is partially sorted.
- **Fast sort**: This is fast and efficient for sorting large quantities of data, with an average time complexity of O(n log n). However, the choice of pivot may affect performance, and it may require more memory.
- **Merge sort**: This is stable, predictable in terms of performance and efficient for sorting large quantities of data, with an average time complexity of O(n log n). However, it may consume more memory due to the creation of new arrays.
- **Insertion sort**: This is simple, efficient for sorting small quantities of data or partially sorted data, and has a worst-case time complexity of O(n^2).

### Tips for choosing the right algorithm

- **Data size**: For small amounts of data, or tables that are already partially sorted, insertion sorting is an efficient option. For large quantities of data, quick sort or merge sort are more suitable choices.
- **Stability**: If sort stability is essential, merge sort is a solid choice, as it maintains the relative order of equal elements.
- **Performance predictability**: If you need consistent, predictable performance, fusion sorting may be preferable because of its stable time complexity.
- **Easy to implement**: Bubble sort and insertion sort are the simplest to implement and are suitable for cases where simplicity is paramount.
- **Memory space**: If memory space is a concern, insertion sorting is efficient, while merge sorting may consume more memory.

Ultimately, the choice of sort algorithm will depend on your specific needs, the size of your data and your priorities in terms of performance, stability and ease of implementation. It may be worth experimenting with different algorithms to find the one best suited to your application.
