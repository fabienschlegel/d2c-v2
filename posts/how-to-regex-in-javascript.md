---
title: 'How to Regex in Javascript'
date: '2023-03-29'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/how-to-regex-in-javascript-illustration.webp'
excerpt: 'Want to write more efficient and effective JavaScript code? Understanding how regex works is a must. Our article covers the basics of regex to guide you through the process of creating flexible patterns for manipulating and validating strings.'
tags: ['react', 'typescript', 'regex']
related: ['publish-my-own-blog-start-of-content-creator', 'how-to-structure-react-app']
---

In JavaScript, regex is used to manipulate and validate text-based data. Understanding how regex works in JavaScript is essential for any programmer looking to improve their JavaScript skills.

In this article, we will explore the basics of regex in JavaScript, including syntax, methods, and examples.

## What are regular expressions?

Regular expressions, as known as regex, are a sequence of characters that forms a search pattern. It is a powerful tool used to search, replace, and extract specific patterns in text.

Regex is widely used in programming, including JavaScript, to validate and manipulate text-based data. The search pattern is defined using a special syntax that follows a specific set of rules.

## Regex Syntax in JavaScript

In JavaScript, regex can be created using the `RegExp` constructor or the literal syntax. The literal syntax uses forward slashes (`/`) to define the search pattern. Here's an example:

```typescript
let regex = /pattern/;
```

In this example, `pattern` is the search pattern that the regex will match. The `RegExp` constructor is used to create regex objects that can be used to match patterns in strings.

```typescript
let regex = new RegExp('pattern');
```

In this example, `pattern` is the search pattern passed as a string to the `RegExp` constructor.

## Regex Methods in JavaScript

There are several methods available in JavaScript for working with regex. These methods allow us to match patterns in strings, replace patterns with new strings, and extract specific patterns from strings. Here are some commonly used regex methods in JavaScript:

### Test Method

The `test()` method tests whether a string matches a specific pattern. It returns `true` if the pattern is found and `false` if not. Here's an example:

```typescript
let regex = /cat/;
let str = 'This is a test string.';
let result = regex.test(str); // returns false
```

In this example, the `test()` method is used to test whether the string `str` contains the pattern `cat`. Since the pattern is not found in the string, the method returns `false`.

### Exec Method

The `exec()` method is used to match a pattern in a string and return the matched result. It returns an array that contains the matched result and any captured groups. Here's an example:

```typescript
let regex = /test (\w+)/;
let str = 'This is a test string.';
let result = regex.exec(str); // returns ["test string", "string"]
```

In this example, the `exec()` method is used to match the pattern `test (\w+)` in the string `str`. The result is an array that contains the matched result and the captured group `string`.

### Match Method

The `match()` method is used to match a pattern in a string and return an array of all matches. It returns `null` if no matches are found. Here's an example:

```typescript
let regex = /test (\w+)/g;
let str = 'This is a test string. Another test string.';
let result = str.match(regex); // returns ["test string", "test string"]
```

In this example, the `match()` method is used to match the pattern `test (\w+)` in the string `str`. The `g` flag is used to find all matches in the string. The result is an array that contains all matches of the pattern.

### Replace Method

The `replace()` method is used to replace a pattern in a string with a new string. It returns the modified string. Here's an example:

```typescript
let regex = /test (\w+)/;
let str = 'This is a test string.';
let newStr = str.replace(regex, 'new'); // returns "This is a new string."
```

In this example, the `replace()` method is used to replace the pattern `test (\w+)` in the string `str` with the string `"new"`. The result is the modified string `"This is a new string."`.

## Regex Patterns in JavaScript

Regex patterns are defined using a specific syntax that follows a set of rules. Here are some commonly used regex patterns in JavaScript:

### Character Classes

Character classes are used to match specific characters in a string. They are defined using square brackets `[]`. Here's an example:

```typescript
let regex = /[aeiou]/;
let str = 'This is a test string.';
let result = regex.test(str); // returns true
```

In this example, the character class `[aeiou]` matches any of the characters `a`, `e`, `i`, `o`, or `u` in the string `str`.

### Quantifiers

Quantifiers are used to match a specific number of occurrences of a pattern. They are defined using curly braces `{}`. Here's an example:

```typescript
let regex = /\d{3}/;
let str = 'My phone number is 123-456-7890.';
let result = regex.exec(str); // returns ["123"]
```

In this example, the quantifier `{3}` matches exactly three occurrences of the pattern `\d`, which matches any digit in the string `str`.

### Alternation

Alternation is used to match one of several patterns. It is defined using the pipe `|` character. Here's an example:

```typescript
let regex = /cat|dog/;
let str = 'I have a cat and a dog.';
let result = regex.exec(str); // returns ["cat"]
```

In this example, the alternation `cat|dog` matches either the pattern `cat` or the pattern `dog` in the string `str`.

### Anchors

Anchors are characters that match a specific position in a string. For example, the `^` anchor matches the beginning of a string, while the `$` anchor matches the end of a string. Here's an example:

```typescript
let regex = /^This is/;
let str = 'This is a test string.';
let result = regex.test(str); // returns true
```

In this example, the regex pattern `/^This is/` matches the beginning of the string `"This is a test string."`.

### Modifiers and Metacharacters

Regex patterns can include modifiers and metacharacters to provide more flexibility in matching character combinations.

Modifiers are characters that change the behaviour of a pattern. For example, the `i` modifier makes a pattern case insensitive, so it matches both uppercase and lowercase characters. Here's an example:

```typescript
let regex = /test/i;
let str = 'This is a Test string.';
let result = regex.test(str); // returns true
```

In this example, the regex pattern `/test/i` is tested against the string `"This is a Test string."`. The `test()` method returns `true` because the `i` modifier makes the pattern case-insensitive, so it matches the uppercase "T" in the string.

Metacharacters are characters that have a special meaning in regex patterns. For example, the `.` metacharacter matches any character except a newline character. Here's an example:

```typescript
let regex = /t.st/;
let str = 'This is a test string.';
let result = regex.test(str); // returns true
```

In this example, the regex pattern `/t.st/` matches the character combination "test" in the string `"This is a test string."`.

## Conclusion

As you can see, regular expressions are a powerful tool used to search, validate, and manipulate text-based data in JavaScript.

Understanding how regex works in JavaScript is essential for any programmer looking to improve their JavaScript skills.

By mastering the syntax, methods, and patterns of regex, programmers can build robust and efficient applications that handle complex text-based data.
