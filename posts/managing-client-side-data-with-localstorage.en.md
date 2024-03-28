---
title: 'Managing client-side data with localStorage and sessionStorage'
pageTitle: 'Use localStorage and sessionStorage to improve user experience'
date: '2024-03-28'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/localStrorage-sessionStorage-illustration.webp'
excerpt: 'How to take advantage of localStorage and sessionStorage to store client-side data.'
tags: ['javascript']
related: ['introduction-to-jwt', 'how-to-regex-in-javascript']
---

Using localStorage and sessionStorage with JavaScript can improve the user experience on a website.

These two client-side storage mechanisms enable data to be stored locally in the visitor's browser.

In this article, we'll explore how to take advantage of localStorage and sessionStorage to store data and help improve the user experience. With code examples and detailed explanations to help you implement these features in your web projects.

## What are localStorage and sessionStorage?

These are two client-side storage mechanisms offered by modern web browsers, enabling data to be stored locally in the visitor's browser.

This means that data can be retained even after the browser has been closed and the visitor has navigated to other pages on the site.

Data is stored in the form of key/value pairs. Values are exclusively strings. The `JSON.stringify` and `JSON.parse` methods can be used to add other types of values, such as lists or objects.

These two storage spaces are specific to the current domain, and it is not possible to access the localStorage or sessionStorage of another domain.

### Difference between localStorage and sessionStorage

- **LocalStorage**: Data stored in localStorage persists even after the browser is closed. It remains available until it is explicitly deleted or the user deletes the data from the browser.
- **SessionStorage**: Unlike localStorage, data stored in sessionStorage persist only for the duration of the user's browser session. This means that data is deleted as soon as the user closes the browser or tab.

### Storage limits and data lifetime

- Browsers impose storage limits for localStorage and sessionStorage, generally between 5 MB and 10 MB per domain.
- Data lifetime also varies according to storage type. LocalStorage data persists indefinitely, while sessionStorage data is limited to the duration of the browsing session.

## Using localStorage and sessionStorage: Common points

Both localStorage and sessionStorage are powerful tools for storing client-side data in the web browser. Here's how to use them.

### Data storage

```javascript
// Definition of data to be stored
const data = {
key: 'value',
};

// Store data in localStorage
localStorage.setItem('key', JSON.stringify(data));

// Store data in sessionStorage
sessionStorage.setItem('key', JSON.stringify(data));

```

### Data recovery

```javascript
// Retrieve data from localStorage
const storedDataLocal = localStorage.getItem('key');

// Retrieve data from sessionStorage
const storedDataSession = sessionStorage.getItem('key');

// Check existence of data in localStorage
if (storedDataLocal) {
  const dataLocal = JSON.parse(storedDataLocal);
  console.log('LocalStorage data:', dataLocal);
} else {
  console.log('No data found in LocalStorage.');
}

// Check existence of data in sessionStorage
if (storedDataSession) {
  const dataSession = JSON.parse(storedDataSession);
  console.log('SessionStorage data:', dataSession);
} else {
  console.log('No data found in sessionStorage.');
}
````

### Deleting data

```javascript
// Remove data from localStorage
localStorage.removeItem('key');

// Remove data from sessionStorage
sessionStorage.removeItem('key');

// Clear all data
localStorage.clear();
sessionStorage.clear();
```

## Specific use of localStorage

LocalStorage is ideal for storing data that needs to persist indefinitely in the browser, even after the browser has been closed and reopened. Here are a few examples of specific uses for localStorage:

- Storing user preferences
- Storing configuration settings

## Specific use of sessionStorage

SessionStorage is useful for storing temporary data that must be available for the duration of the user's browsing session. Here are a few examples of specific sessionStorage uses:

- Storage of user session data
- Storage of temporary shopping baskets

## Best practices and security

When using localStorage and sessionStorage, it is essential to follow good practices and take into account security considerations to ensure the protection of customer-side stored data.

### Securing stored data

- **Ban sensitive data**: Never store sensitive data such as passwords or personally identifiable information in localStorage or sessionStorage. Use server-side encryption methods for these types of data.
- **Data validation**: Be sure to validate and cleanse data before storing it in localStorage or sessionStorage.

### Data management

- **Regular cleaning**: Regularly clean obsolete or unused data from localStorage and sessionStorage to avoid unnecessary data accumulation.
- **Storage limits**: Carefully monitor the size of data stored in localStorage and sessionStorage to avoid exceeding browser-imposed limits.

## Conclusion

Integrating localStorage and sessionStorage into your website can not only enhance the user experience, but also simplify development by reducing dependency on cookies and server requests.

By understanding how to use these client-side storage features efficiently and securely, you can deliver a smoother experience to your users.

By investing time in planning and implementing these features, you can help create more robust and reliable web applications for your users.
