---
title: 'Le hook useState dans React'
pageTitle: 'Gérer votre state avec le hook useState dans React : Conseils et astuces'
date: '2022-11-11'
coverImage: '/assets/blog/cover-images/manage-your-state-with-the-usestate-in-react-illustration.webp'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
excerpt: 'useState dans les composants fonctionnels. Le premier hook que vous pouvez utiliser dans un projet React.'

tags: ['javascript', 'typescript', 'react', 'hooks']
related: ['five-tips-about-react-hooks', 'how-to-use-props-and-state-in-react']
---

React introduit les hooks dans la version 16.8. Les hooks nous permettent de créer des composants fonctionnels avec des états et des effets de bord.

La méthode `useState` est le hook le plus simple que l'on puisse rencontrer dans un projet React. Cette méthode prend un paramètre, la valeur initiale de l'état et renvoie deux propriétés, la valeur elle-même et une méthode pour la mettre à jour.

## Règles des hooks

Comme les autres hooks, il n'y a que deux règles pour les utiliser. Utilisez-les toujours au niveau supérieur de la fonction, jamais dans les boucles, les conditions et les fonctions imbriquées. Vous ne pouvez utiliser les hooks que dans les fonctions React, jamais dans les fonctions javascript.

## Utilisation de base de useState

```tsx
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const handleIncrease = () => setCount(count + 1);

  return (
    <div>
      <p>Increase the count to {count + 1}</p>
      <button onClick={handleIncrease} type="button">
        Add
      </button>
    </div>
  );
}

export default App;
```

Dans l'extrait de code ci-dessus, vous pouvez voir une implémentation basique de `useState`. La variable `count` est initialement fixée à 0 avec le paramètre du hook. Je nomme la variable `count` et le setter `setCount`. C'est une convention de commencer le setter par set et d'utiliser le nom de la variable après. Mais ce n'est pas obligatoire, faites ce que vous voulez.

J'utilise `setCount` dans la fonction `handleIncrease`. A chaque fois que le bouton est cliqué, la variable `count` est mise à jour et React redessine le composant.

## Cas d'utilisation plus avancés

### Changements d'état asynchrones

Souvent, nos composants sont plus complexes et nous avons plusieurs états dans le même composant. Nous pouvons les mettre à jour séparément ou ensemble.

Reprenons notre exemple précédent et ajoutons-y quelques améliorations.

```tsx
import { useState } from 'react';

function App() {
  const [counters, setCount] = useState({ fizz: 0, buzz: 0 });

  const handleIncreaseFizz = () =>
    setCount((prevCounters) => ({ ...prevCounters, fizz: prevCounters.fizz + 1 }));

  const handleIncreaseBuzz = () =>
    setCount((prevCounters) => ({ ...prevCounters, buzz: prevCounters.buzz + 1 }));

  const handleIncreaseAll = () =>
    setCount((prevCounters) => ({ fizz: prevCounters.fizz + 1, buzz: prevCounters.buzz + 1 }));

  return (
    <div>
      <p>
        Fizz: {counters.fizz} Buzz: {counters.buzz}
      </p>
      <button onClick={handleIncreaseFizz} type="button">
        Increase Fizz
      </button>
      <button onClick={handleIncreaseBuzz} type="button">
        Increase Buzz
      </button>
      <button onClick={handleIncreaseAll} type="button">
        Increase all
      </button>
    </div>
  );
}

export default App;
```

Dans l'exemple ci-dessus, vous pouvez voir deux choses. Je n'utilise pas la variable elle-même et j'utilise un callback à l'intérieur de la fonction `setCount` à la place.

Dans plusieurs cas, il est préférable d'utiliser un callback si la valeur dépend du précédent ou si le setter est asynchrone.

Il y a une raison à cela. Vous ne pouvez pas garantir la valeur de la variable count lorsque vous la mettez à jour avec le setter. Mais avec le callback, vous êtes sûr d'utiliser la valeur actuelle.

Essayez-le en remplaçant le contenu de la fonction `handleIncreaseBuzz` par le code ci-dessous.

```tsx
const handleIncreaseBuzz = () =>
  setTimeout(
    () => setCount((prevCounters) => ({ ...prevCounters, buzz: counters.buzz + 1 })),
    2000
  );
```

Si vous cliquez sur augmenter Buzz et immédiatement après augmenter tout, vous aurez une mauvaise valeur pour Buzz. Parce que `setTimeout` planifie la fonction immédiatement et l'exécute plus tard.

`useState` est le hook le plus simple pour gérer les `state` dans les composants React.

Cet article fait partie d'une série sur les bases de React avec Typescript.
