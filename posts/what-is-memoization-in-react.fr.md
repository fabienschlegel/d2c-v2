---
title: "Qu'est-ce que la mémoïsation dans React ?"
pageTitle: "Qu'est-ce que la mémoïsation dans React et comment l'utiliser ?"
date: '2023-03-08'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/what-is-memoization-in-react-illustration-fr.webp'
excerpt: "Apprenez à optimiser votre application ReactJS en mettant en œuvre la mémoïsation à l'aide de TypeScript. Cet article couvre les bases de la mémoïsation, son fonctionnement et la manière dont vous pouvez l'utiliser."
tags: ['react', 'typescript', 'hooks']
related: ['five-tips-about-react-hooks', 'how-to-test-react-hooks']
---

La mémoïsation est une technique d'optimisation puissante utilisée pour améliorer les performances de votre application en mettant en cache les résultats des appels de fonctions coûteux.

Elle peut apporter des améliorations significatives en termes de performances. Dans cet article, nous allons explorer les bases de la mémoïsation, son fonctionnement et la façon dont vous pouvez l'appliquer à vos projets TypeScript et ReactJS avec des exemples de code.

## Qu'est-ce que la mémoïsation ?

La mémoïsation est une technique utilisée pour optimiser les appels de fonction coûteux en mettant en cache le résultat de ces appels de fonction. Lorsqu'une fonction est appelée avec un ensemble spécifique d'entrées, la sortie de cette fonction est stockée dans un cache.

La prochaine fois que la fonction est appelée avec les mêmes entrées, la sortie mise en cache est renvoyée au lieu d'être recalculée.

Cela permet de réduire considérablement le temps d'exécution de la fonction et d'améliorer les performances de votre application.

## Comment fonctionne la mémoïsation ?

La mémoïsation consiste à stocker les résultats des appels de fonction dans un cache. Le cache est généralement implémenté sous la forme d'un objet dont les clés sont les entrées de la fonction et les valeurs sont les sorties de la fonction correspondante.

Lorsqu'une fonction est appelée, les entrées sont utilisées pour rechercher la sortie mise en cache. Si la sortie est trouvée dans le cache, elle est renvoyée. Si la sortie n'est pas trouvée dans le cache, la fonction est exécutée et la sortie est stockée dans le cache pour une utilisation ultérieure.

## Appliquer la mémoïsation à TypeScript et ReactJS

L'application de la mémoïsation à TypeScript et ReactJS est relativement simple. Il existe plusieurs bibliothèques qui fournissent des fonctionnalités de mémorisation, telles que la fonction memoize de [Lodash](https://lodash.com/docs/4.17.15#memoize), [reselect](https://github.com/reduxjs/reselect) ou les hooks de ReactJS. Ces bibliothèques peuvent être installées à l'aide de NPM ou Yarn et utilisées dans vos projets TypeScript et ReactJS.

### Avec la bibliothèque reselect

Voici un exemple de la façon dont vous pouvez utiliser la mémorisation dans un composant ReactJS en utilisant la bibliothèque reselect.

Si vous utilisez le package Redux Tool Kit, reselect est inclus par défaut.

```tsx
import { createSelector } from 'reselect';

const getExpensiveData = (state) => state.expensiveData;

const getMemoizedData = createSelector([getExpensiveData], (expensiveData) => {
  // Expensive computation here
  return expensiveData.map((item) => item * 2);
});

function MyComponent(props) {
  const memoizedData = useSelector(getMemoizedData);

  return (
    <div>
      {memoizedData.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
}
```

Dans cet exemple, nous utilisons la bibliothèque reselect pour créer un sélecteur mémorisé qui calcule des données coûteuses.

La fonction `getExpensiveData` sélectionne les données coûteuses dans le magasin Redux, et la fonction `getMemoizedData` calcule les données coûteuses en utilisant la fonction `createSelector` de reselect.

La fonction `createSelector` prend un tableau de sélecteurs en entrée et une fonction de résultat qui calcule la valeur mémorisée. Le hook `useSelector` est alors utilisé pour sélectionner les données mémorisées dans le magasin Redux et les rendre dans le composant.

### Avec le hook useMemo

Voici un exemple d'utilisation de la mémorisation dans un composant React à l'aide de hooks.

```tsx
import React, { useState, useMemo } from 'react';

const MyComponent = () => {
  const [count, setCount] = useState(0);

  const expensiveComputation = (num: number) => {
    console.log('Computing...');
    return num ** 2;
  };

  // memoize the expensiveComputation function
  const memoizedComputation = useMemo(() => expensiveComputation(count), [count]);

  return (
    <div>
      <h1>Memoization Example</h1>
      <p>Count: {count}</p>
      <p>Computed value: {memoizedComputation}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  );
};

export default MyComponent;
```

Dans cet exemple, un simple composant React utilise le hook `useState` pour maintenir une variable de comptage. Nous avons également une fonction appelée `expensiveComputation` qui prend un nombre en argument et renvoie son carré.

Pour mémoriser la fonction `expensiveComputation`, nous utilisons le hook `useMemo`. Le hook `useMemo` prend deux arguments : une fonction à mémoriser et un tableau de dépendances. Dans ce cas, nous mémorisons la fonction `expensiveComputation` et ne recalculons son résultat que lorsque la variable `count` change.

En utilisant `useMemo`, nous pouvons éviter les recalculs inutiles de `expensiveComputation`, améliorant ainsi les performances de notre composant.

Globalement, la mémoïsation peut être un outil puissant pour améliorer les performances de vos applications TypeScript et ReactJS, et l'utilisation de hooks comme `useMemo` peut faciliter l'implémentation de la mémoïsation dans vos composants.

Une autre façon d'utiliser la mémoïsation dans les composants React est d'utiliser le hook `useCallback`. Le hook `useCallback` peut être utilisé pour mémoriser une fonction et éviter les re-rendus inutiles d'un composant.

Voici un exemple :

```tsx
import React, { useState, useCallback } from 'react';

const MyComponent = () => {
  const [count, setCount] = useState(0);

  // memoize the handleClick function
  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []);

  return (
    <div>
      <h1>Memoization Example</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

export default MyComponent;
```

Dans cet exemple, nous utilisons le hook `useCallback` pour mémoriser la fonction `handleClick`. Le crochet `useCallback` prend deux arguments : une fonction à mémoriser et un tableau de dépendances. Dans ce cas, nous mémorisons la fonction `handleClick` et fournissons un tableau vide comme dépendances, ce qui signifie que la fonction ne sera mémorisée qu'une seule fois.

En utilisant `useCallback`, nous pouvons éviter les re-renders inutiles de notre composant, ce qui peut améliorer les performances. La mémorisation peut être un outil puissant dans les applications React, et l'utilisation de hook comme `useCallback` peut faciliter l'implémentation de la mémorisation dans vos composants.

## Avantages de la mémoïsation en TypeScript et ReactJS

Il y a plusieurs avantages à utiliser la mémoïsation dans vos projets TypeScript et ReactJS :

- **Amélioration des performances** : La mémoïsation peut améliorer considérablement les performances de votre application en réduisant le nombre d'appels de fonctions coûteux.
- **Réduction des re-renders** : La mémoïsation peut également réduire le nombre de rendus dans vos composants ReactJS en empêchant les rendus inutiles lorsque les données d'entrée n'ont pas changé.
- **Un code plus propre** : La mémoïsation peut également permettre d'obtenir un code plus propre et plus modulaire. En séparant la logique de calcul de la logique de rendu, vous pouvez créer un code plus modulaire et réutilisable.
- **Évolutivité** : Au fur et à mesure que votre application se développe et devient plus complexe, la mémoïsation peut vous aider à maintenir les performances et l'évolutivité en évitant les recalculs inutiles.
- **Débogage facilité** : La mémoïsation peut faciliter le débogage en fournissant un cache des résultats des fonctions, ce qui permet d'identifier plus facilement les problèmes potentiels de votre code.

Les fonctions qui sont coûteuses en termes de calcul et qui sont susceptibles d'être appelées à plusieurs reprises avec les mêmes entrées sont de bons candidats pour la mémoïsation.

La mémoïsation peut augmenter l'utilisation de la mémoire et introduire de la complexité dans votre code. Il est important d'utiliser la mémoïsation de manière judicieuse et uniquement dans les cas où elle offre un avantage significatif en termes de performances.

## Conclusion

La mémoïsation est une technique d'optimisation puissante qui peut améliorer de manière significative les performances de vos applications TypeScript et ReactJS.

En mettant en cache les résultats des appels de fonctions coûteux, vous pouvez réduire le nombre de calculs et améliorer l'évolutivité de votre application.

Avec l'aide de bibliothèques comme reselect, la mémoïsation peut être facilement mise en œuvre dans vos projets TypeScript et ReactJS. Cependant, il est essentiel d'utiliser la mémoïsation de manière judicieuse et uniquement dans les cas où elle apporte un avantage significatif en termes de performances.

Avec les avantages d'une performance améliorée, d'une réduction des re-renders, d'un code plus propre et de l'évolutivité, la mémoïsation vaut vraiment la peine d'être envisagée pour vos projets TypeScript et ReactJS.
