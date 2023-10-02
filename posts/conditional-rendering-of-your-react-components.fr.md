---
title: 'Rendu conditionnel de vos composants React'
pageTitle: 'Rendu conditionnel de vos composants React : Conseils et astuces'
date: '2022-03-08'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
excerpt: "Le rendu conditionnel est une fonctionnalité de base des applications frontend. Elle permet d'afficher ou non des éléments en fonction de l'état de l'application."
tags: ['React', 'Typescript']
related: ['begin-react-with-typescript']
---

Ce billet de blog s'appuie sur React et Typescript, un superset de JavaScript. Si vous êtes débutant, vous pouvez consulter [cet article](/blog/begin-react-with-typescript) qui traite des bases.

L'interface utilisateur est constituée d'événements, comme des animations, des appels de données ou des changements.

Pour traiter tous ces états, nous pouvons utiliser la puissance de React, une bibliothèque créée par Facebook. Avec notre arbre de composants, nous sommes capables de cacher ou d'afficher des éléments, d'ajouter ou de supprimer des classes CSS, etc. React et Typescript nous donnent beaucoup de possibilités pour gérer ces situations.

Voci différents exemples pour rendre vos composants ou JSX à l'intérieur des composants en utilisant le rendu conditionnel.

## Utiliser l'instruction IF

L'instruction IF est le rendu conditionnel le plus basique que vous puissiez rencontrer.

Vous pouvez l'utiliser pour afficher un élément si une condition est remplie. Dans le code ci-dessous, notre composant ItemList renverra null si la liste est vide.

```typescript
import { FunctionComponent } from 'react';

interface ItemsListProps {
  list: Array<string>;
}

const ItemsList: FunctionComponent<ItemsListProps> = ({ list }) => {
  if (list.length === 0) {
    return null;
  }
  return (
    <ul>
      {list.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
};

function App() {
  const list: Array<string> = [];
  return (
    <div className="App">
      <ItemsList list={list} />
    </div>
  );
}

export default App;
```

## Utilisation de l'instruction IF/ELSE

Contrairement à l'instruction IF, l'instruction IF/ELSE vous permet d'ajouter une autre instruction en guise d'alternative. Dans le code ci-dessous, notre composant ItemsList renvoie un message sur la taille de la liste.

```typescript
import { FunctionComponent } from 'react';

interface ItemsListProps {
  list: Array<string>;
}

const ItemsList: FunctionComponent<ItemsListProps> = ({ list }) => {
  let listLength;

  if (list.length === 0) {
    listLength = 'No items';
  } else {
    listLength = 'We have at least one item';
  }

  return (
    <>
      <ul>
        {list.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      <p>{listLength}</p>
    </>
  );
};

function App() {
  const list: Array<string> = [];
  return (
    <div className="App">
      <ItemsList list={list} />
    </div>
  );
}

export default App;
```

## Utilisation de l'opérateur ternaire

L'avantage de l'utilisation de l'opérateur ternaire est qu'il peut être utilisé en JSX, contrairement à l'instruction IF/ELSE. Nous pouvons prendre le dernier exemple et le transformer en une expression ternaire.

```typescript
import { FunctionComponent } from 'react';

interface ItemsListProps {
  list: Array<string>;
}

const ItemsList: FunctionComponent<ItemsListProps> = ({ list }) => {
  return (
    <>
      <ul>
        {list.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      <p>{list.length === 0 ? 'No items' : 'We have at least one item'}</p>
    </>
  );
};

function App() {
  const list: Array<string> = [];
  return (
    <div className="App">
      <ItemsList list={list} />
    </div>
  );
}

export default App;
```

## Utiliser l'opérateur de court-circuit

En Javascript, une expression est évaluée de gauche à droite. Si le côté gauche de l'expression est faux, les autres conditions n'affecteront pas le résultat.

Regardez le code ci-dessous pour voir le court-circuit en action.

```typescript
import { FunctionComponent } from 'react';

interface ItemsListProps {
  list: Array<string>;
}

const ItemsList: FunctionComponent<ItemsListProps> = ({ list }) => {
  return (
    <ul>
      {list.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
};

function App() {
  const list: Array<string> = [];
  return <div className="App">{list.length > 0 && <ItemsList list={list} />}</div>;
}

export default App;
```

Dans cet exemple, vous pouvez utiliser l'opérateur ternaire en remplaçant la deuxième partie par null, comme ceci.

```typescript
<div className="App">{list.length > 0 ? <ItemsList list={list} /> : null}</div>
```

Avec le court-circuit, votre expression est plus concise.

## Utilisation de l'instruction switch/case

L'instruction switch/case utilise une variable comme commutateur et donne un résultat pour chaque cas que vous fournissez. Le cas par défaut est un cas particulier. Il est utilisé comme solution de repli.

L'instruction break est importante, elle parcours de l'instruction switch.

```typescript
import { FunctionComponent } from 'react';

interface ItemsListProps {
  list: Array<string>;
}

const ItemsList: FunctionComponent<ItemsListProps> = ({ list }) => {
  let listLength;
  switch (list.length) {
    case 0:
      listLength = 'no items';
      break;
    case 1:
      listLength = '1 item';
      break;
    default:
      listLength = `${list.length} items`;
      break;
  }
  return (
    <>
      <ul>
        {list.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      <p>{listLength}</p>
    </>
  );
};

function App() {
  const list: Array<string> = ['item 1', 'item 2', 'item 3'];
  return (
    <div className="App">
      <ItemsList list={list} />
    </div>
  );
}

export default App;
```

Un switch/case ne peut être utilisé en JSX qu'avec une fonction auto-invoquée comme celle-ci.

```typescript
<p>
  {() => {
    let listLength;
    switch (list.length) {
      case 0:
        listLength = 'no items';
        break;
      case 1:
        listLength = '1 item';
        break;
      default:
        listLength = `${list.length} items`;
        break;
    }
    return listLength;
  }}
</p>
```

## Conclusion

Vous utiliserez très souvent le rendu conditionnel lorsque vous construirez des applications React. Réfléchissez avant de coder pour choisir la meilleure approche pour votre rendu.

Ce billet fait partie d'une série sur les bases de React avec Typescript. Revenez me voir ou suivez-moi sur les médias sociaux pour découvrir la suite.

À plus tard !
