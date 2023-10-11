---
title: 'Comment utiliser les props et les state dans React'
pageTitle: 'Comment utiliser les props et les state dans React : Comprendre les fondamentaux'
date: '2022-03-03'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
excerpt: 'Apprenez tout ce que vous devez savoir sur les props et le state en React, deux concepts fondamentaux de cette librairie JavaScript.'
tags: ['React', 'Typescript']
---

Ce billet de blog s'appuie sur React et Typescript, un superset de JavaScript. Si vous êtes débutant, vous pouvez consulter [ce billet](/fr/blog/begin-react-with-typescript) pour obtenir les prérequis sur ces 2 technologies.

React est une puissante bibliothèque d'interface utilisateur qui fonctionne avec une arborescence de composants. Il peut s'agir de composants basés sur des classes ou de composants fonctionnels. Depuis la version 16.8 de React et les hooks, les composants basés sur des classes sont moins utilisés au profit des composants fonctionnels.

Les `props` et les `state` sont deux types de variables utilisées dans les composants React.

## Les points communs

Avant de séparer `props` et `state`, identifions également leurs points de recoupement.

- Ce sont de simples objets JS
- S'ils changent, React déclenche une mise à jour du rendu du composant.
- Ils sont **déterministes.** La même combinaison de props et de state doit générer le même résultat.

## Props

Le terme `props` est le raccourci pour propriétés.

Ils sont immuables, c'est-à-dire qu'ils ne peuvent pas changer. Le composant fonctionnel les reçoit en tant que paramètres. La modification des `props` déclenche une mise à jour du rendu du composant.

Vous pouvez voir ici que notre composant _ItemsList_ reçoit des props, une liste de chaînes de caractères.

```tsx
import { FunctionComponent, useState } from 'react';

interface ItemsListProps {
  list: Array<string>;
}

const ItemsList: FunctionComponent<ItemsListProps> = ({ list }) => {
  console.log('ItemsList rerender');

  return (
    <ul>
      {list.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
};

function App() {
  const [list, setList] = useState(['item1', 'item2', 'item3']);

  const handleClick = () => {
    setList([...list, 'item4']);
  };

  return (
    <div className="App">
      <button onClick={handleClick}>Add</button>
      <ItemsList list={list} />
    </div>
  );
}

export default App;
```

Si vous cliquez sur le bouton, vous ajoutez un élément à la liste et mettez à jour les accessoires. Le composant est exécuté pour signaler la modification. Vous pouvez le vérifier dans la console du navigateur.

## State (Etat local)

Les `state` sont mutables, ils peuvent changer dans le temps.

Ils reçoivent une valeur par défaut lors du montage du composant. Un composant gère ses états en interne. Un état passé à un composant enfant devient un `props` pour l'enfant.

Si vous regardez l'exemple ci-dessus, notre liste dans le composant App est un état. La méthode setList peut modifier cet état.

## Conclusion

Vous connaissez maintenant la différence entre les `props` et les `state`.

Les `props` sont utilisés pour passer des données aux composants enfants. Les états sont utilisés pour gérer les données dans les composants. Ce billet fait partie d'une série sur les bases de React avec Typescript.
