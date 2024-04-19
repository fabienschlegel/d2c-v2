---
title: 'Comment utiliser les regex en Javascript'
pageTitle: 'Les Regex en Javascript : Un guide complet pour les développeurs'
date: '2023-03-29'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/how-to-regex-in-javascript-illustration-fr.webp'
excerpt: 'Vous souhaitez écrire un code JavaScript plus efficace et plus performant ? Il est indispensable de comprendre le fonctionnement des regex. Cet article couvre les bases des expressions régulières pour vous guider dans le processus de création de modèles flexibles pour la manipulation et la validation de chaînes de caractères.'
tags: ['react', 'typescript', 'regex']
related: ['publish-my-own-blog-start-of-content-creator', 'how-to-structure-react-app']
---

En JavaScript, les expressions régulières sont utilisées pour manipuler et valider des données textuelles. Comprendre le fonctionnement des regex en JavaScript est essentiel pour tout développeur·se désireux·se d'améliorer ses compétences dans ce domaine.

Dans cet article, nous allons explorer les bases des expressions régulières en JavaScript, y compris la syntaxe, les méthodes et les exemples.

## Que sont les expressions régulières ?

Les expressions régulières, connues sous le nom de regex, sont une séquence de caractères formant un motif de recherche. Il s'agit d'un outil puissant utilisé pour rechercher, remplacer et extraire des motifs spécifiques dans un texte.

Les expressions régulières sont largement utilisées en programmation, y compris en JavaScript, pour valider et manipuler des données textuelles. Le motif de recherche est défini à l'aide d'une syntaxe spéciale qui suit un ensemble de règles spécifiques.

## Syntaxe des regex en JavaScript

En JavaScript, les regex peuvent être créées à l'aide du constructeur `RegExp` ou de la syntaxe littérale. La syntaxe littérale utilise des barres obliques (`/`) pour définir le motif de recherche. Voici un exemple :

```typescript
let regex = /pattern/;
```

Dans cet exemple, `pattern` est le motif de recherche que la regex doit faire correspondre. Le constructeur `RegExp` est utilisé pour créer des objets regex qui peuvent être utilisés pour faire correspondre des motifs dans des chaînes de caractères.

```typescript
let regex = new RegExp('pattern');
```

Dans cet exemple, `pattern` est le motif de recherche transmis sous forme de chaîne au constructeur `RegExp`.

## Méthodes Regex en JavaScript

Il existe plusieurs méthodes disponibles en JavaScript pour travailler avec les regex. Ces méthodes nous permettent de faire correspondre des motifs dans des chaînes, de remplacer des motifs par de nouvelles chaînes et d'extraire des motifs spécifiques de chaînes. Voici quelques méthodes de regex couramment utilisées en JavaScript :

### Méthode de test

La méthode `test()` teste si une chaîne correspond à un motif spécifique. Elle renvoie `true` si le motif est trouvé et `false` dans le cas contraire. Voici un exemple :

```typescript
let regex = /cat/;
let str = 'This is a test string.';
let result = regex.test(str); // returns false
```

Dans cet exemple, la méthode `test()` est utilisée pour tester si la chaîne `str` contient le motif `cat`. Comme le motif n'est pas trouvé dans la chaîne, la méthode renvoie `false`.

### Méthode Exec

La méthode `exec()` est utilisée pour faire correspondre un motif dans une chaîne et renvoyer le résultat de la correspondance. Elle renvoie un tableau contenant le résultat de la recherche et les groupes capturés. Voici un exemple :

```typescript
let regex = /test (\w+)/;
let str = 'This is a test string.';
let result = regex.exec(str); // returns ["test string", "string"]
```

Dans cet exemple, la méthode `exec()` est utilisée pour faire correspondre le motif `test (\w+)` dans la chaîne `str`. Le résultat est un tableau qui contient le résultat de la correspondance et le groupe capturé `string`.

### Méthode Match

La méthode `match()` est utilisée pour faire correspondre un motif dans une chaîne et retourner un tableau de toutes les correspondances. Elle retourne `null` si aucune correspondance n'est trouvée. Voici un exemple :

```typescript
let regex = /test (\w+)/g;
let str = 'This is a test string. Another test string.';
let result = str.match(regex); // returns ["test string", "test string"]
```

Dans cet exemple, la méthode `match()` est utilisée pour trouver le motif `test (\w+)` dans la chaîne `str`. Le flag `g` est utilisé pour trouver toutes les correspondances dans la chaîne. Le résultat est un tableau qui contient toutes les correspondances du motif.

### Méthode de remplacement

La méthode `replace()` est utilisée pour remplacer un motif dans une chaîne par une nouvelle chaîne. Elle renvoie la chaîne modifiée. Voici un exemple :

```typescript
let regex = /test (\w+)/;
let str = 'This is a test string.';
let newStr = str.replace(regex, 'new'); // returns "This is a new string."
```

Dans cet exemple, la méthode `replace()` est utilisée pour remplacer le motif `test (\w+)` dans la chaîne `str` par la chaîne `"new"`. Le résultat est la chaîne modifiée `"This is a new string."`.

## Motifs de regex en JavaScript

Les motifs regex sont définis à l'aide d'une syntaxe spécifique qui suit un ensemble de règles. Voici quelques motifs regex couramment utilisés en JavaScript :

### Classes de caractères

Les classes de caractères sont utilisées pour faire correspondre des caractères spécifiques dans une chaîne. Elles sont définies à l'aide de crochets `[]`. Voici un exemple :

```typescript
let regex = /[aeiou]/;
let str = 'This is a test string.';
let result = regex.test(str); // returns true
```

Dans cet exemple, la classe de caractères `[aeiou]` correspond à n'importe lequel des caractères `a`, `e`, `i`, `o`, ou `u` de la chaîne `str`.

### Quantificateurs

Les quantificateurs sont utilisés pour rechercher un nombre spécifique d'occurrences d'un motif. Ils sont définis en utilisant les accolades `{}`. Voici un exemple :

```typescript
let regex = /\d{3}/;
let str = 'My phone number is 123-456-7890.';
let result = regex.exec(str); // returns ["123"]
```

Dans cet exemple, le quantificateur `{3}` correspond exactement à trois occurrences du motif `\d`, qui correspond à n'importe quel chiffre de la chaîne `str`.

### Alternance

L'alternance est utilisée pour faire correspondre un motif parmi plusieurs. Elle est définie à l'aide du caractère pipe `|`. Voici un exemple :

```typescript
let regex = /cat|dog/;
let str = 'I have a cat and a dog.';
let result = regex.exec(str); // returns ["cat"]
```

Dans cet exemple, l'alternance `cat|dog` correspond soit au motif `cat` soit au motif `dog` dans la chaîne `str`.

### Ancres

Les ancres sont des caractères qui correspondent à une position spécifique dans une chaîne. Par exemple, l'ancre `^` correspond au début d'une chaîne, tandis que l'ancre `$` correspond à la fin d'une chaîne. Voici un exemple :

```typescript
let regex = /^This is/;
let str = 'This is a test string.';
let result = regex.test(str); // returns true
```

Dans cet exemple, le motif regex `/^This is/` correspond au début de la chaîne `"This is a test string."`.

### Modificateurs et métacaractères

Les modèles de regex peuvent inclure des modificateurs et des métacaractères afin d'offrir une plus grande souplesse dans la correspondance des combinaisons de caractères.

Les modificateurs sont des caractères qui changent le comportement d'un motif. Par exemple, le modificateur `i` rend un motif insensible à la casse, il correspond donc aux caractères majuscules et minuscules. Voici un exemple :

```typescript
let regex = /test/i;
let str = 'This is a Test string.';
let result = regex.test(str); // returns true
```

Dans cet exemple, le motif regex `/test/i` est testé par rapport à la chaîne de caractères `"This is a Test string."`. La méthode `test()` renvoie `true` car le modificateur `i` rend le motif insensible à la casse, il correspond donc au "T" majuscule de la chaîne.

Les métacaractères sont des caractères qui ont une signification particulière dans les motifs de regex. Par exemple, le métacaractère `.` correspond à n'importe quel caractère à l'exception du caractère de retour à la ligne. Voici un exemple :

```typescript
let regex = /t.st/;
let str = 'This is a test string.';
let result = regex.test(str); // returns true
```

Dans cet exemple, le motif regex `/t.st/` correspond à la combinaison de caractères "test" dans la chaîne `"This is a test string."`.

## Conclusion

Comme vous pouvez le constater, les expressions régulières sont un outil puissant utilisé pour rechercher, valider et manipuler des données textuelles en JavaScript.

Comprendre le fonctionnement des expressions régulières en JavaScript est essentiel pour tout développeur·se désireux d'améliorer ses compétences en JavaScript.

En maîtrisant la syntaxe, les méthodes et les modèles de regex, les développeur·ses peuvent créer des applications robustes et efficaces qui traitent des données textuelles complexes.
