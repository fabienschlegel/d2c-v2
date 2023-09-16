---
title: 'Débuter React avec Typescript'
pageTitle: 'Commencer React avec Typescript : Un guide complet pour les débutants'
date: '2022-02-22'
coverImage: '/assets/blog/cover-images/S02E01_banner.webp'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
excerpt: "Ces technologies sont des choix judicieux pour créer des applications web solides et fiables. Il n'a jamais été aussi facile de développer une expérience utilisateur de qualité avec React et Typescript."
tags: ['React', 'Typescript']
related: ['five-tips-about-react-hooks', 'working-with-rest-apis-in-react']
---

Ces technologies sont de bons choix pour construire des applications web solides et fiables.

React est une puissante bibliothèque d'interface utilisateur créée par Facebook pour construire des interfaces utilisateurs.

Typescript est un langage basé sur Javascript. Si vous avez déjà appris le Javascript, vous ne serez pas perdu.

La bonne nouvelle est que tous les cours et tutoriels Javascript peuvent être utilisés pour Typescript. Les avantages de Typescript reposent sur l'ajout de types à tout le code que vous écrivez.

## L'environnement

Avant de commencer à jouer avec React et Typescript, vous devez installer quelques outils.

### Visual Studio Code

Pour écrire du code, vous avez besoin d'un éditeur de texte. Avec les langages modernes et, l'utilisation d'un IDE (environnement de développement intégré) peut être une meilleure idée pour profiter d'outils avancés comme l'autocomplétion, le linter, le formatage de code, les extraits de code, ...

Visual Studio Code prend en charge le langage TypeScript. Il fournit une coloration syntaxique et sémantique.

Cet éditeur peut vous montrer une complétion de code intelligente, des informations au survol et des informations sur les fonctions afin que vous puissiez écrire du code plus rapidement.

Il peut suggérer des types pour votre code. C'est très utile pour typer les composants React ou les hooks par exemple.

Vous pouvez installer Visual Studio Code depuis [ici](https://code.visualstudio.com/).

### Node

Le deuxième outil dont vous avez besoin est Node. Il s'agit d'un moteur d'exécution JavaScript construit sur le moteur JavaScript V8 de Chrome.

Avec Node, vous pourrez exécuter votre projet dans votre environnement local. Allez [ici](https://nodejs.org/en/) pour savoir comment l'installer pour votre système d'exploitation.

Vous pouvez vérifier l'installation de Node avec cette commande. Elle doit retourner la version de Node.

```bash
node -v
```

### NPM & NPX

Pour votre projet, vous aurez besoin de paquets. Un paquet est un ou plusieurs modules regroupés.

Heureusement, Node est livré avec NPM (Node Package Manager), un outil pour les installer.

Installer un paquet avec NPM est facile :

```bash
npm install react
```

Pour nous aider, npm nous donne une commande : NPX (Node Package eXecute). Elle permet d'exécuter une commande à partir d'un paquetage. Si le paquet n'est pas installé, il le cherchera dans le registre des paquets de NPM et l'installera.

### Créer une application React

Dernier outil, mais non le moindre, nous devons commencer avec React et Typescript : **Create React App**.

Facebook fournit ce package pour avoir la plus petite configuration pour commencer un projet.

Avec cet outil, nous allons commencer notre premier projet React et Typescript en quelques minutes.

## Commencer un projet

Maintenant, nous sommes prêts à commencer.

Tout d'abord, nous démarrons un nouveau projet avec ces commandes. Ouvrez votre terminal, tapez la première commande et attendez la fin.

```bash
npx create-react-app my-app --template typescript
cd my-app
npm start
```

Tapez le deuxième et le troisième.

Cela ouvre un nouvel onglet dans votre navigateur avec l'exemple "hello world" généré par Create React App.

### Fichiers importants

Ouvrez le dossier dans Visual Studio Code. Je vais vous donner quelques explications sur les fichiers que vous allez trouver.

![Visual Studio Code](/assets/blog/content-images/S02E01_VSC.png)

### package.json

Comme pour chaque projet NPM, vous trouverez un fichier **package.json**. Il décrit votre application, les scripts disponibles et les paquets nécessaires ainsi que leur version.

### tsconfig.json

Le fichier **tsconfig.json** donne au compilateur Typescript toute la configuration pour votre application. Create React App nous donne tout ce dont nous avons besoin pour commencer.

Les navigateurs ne comprennent pas le langage Typescript. Lorsque nous déploierons notre code, le compilateur transformera tout notre code en Javascript.

Comme vous pouvez le voir, les fichiers ont deux nouvelles extensions : ts et tsx. ts est pour les fichiers Typescript et tsx pour les fichiers avec JSX à l'intérieur.

JSX est une extension syntaxique de JavaScript. JSX vous permet de décrire l'interface utilisateur d'un composant avec une syntaxe semblable à celle du HTML.

### src/index.tsx

Le premier fichier à inspecter est **index.tsx**. C'est le point d'entrée de notre application. React doit y être importé. Notre composant principal **App.tsx** est importé ici

### src/App.tsx

Maintenant, jetez un coup d'œil au fichier **App.tsx**. Voyez-vous quelque chose d'étrange ?

Non, car tout est normal. Il s'agit de code Javascript. Et tout votre code Javascript est valide en Typescript.

### public/index.html

Un autre fichier important se trouve dans le dossier public. Il s'agit de **index.html**. Le bundle généré par Webpack et le compilateur TypeScript sera injecté dans ce fichier.

## Et maintenant nous pouvons éditer

Créez un nouveau fichier dans le dossier src. Nommez-le **ItemsList.tsx**. Ajoutez le code ci-dessous et enregistrez votre travail.

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

export default ItemsList;
```

Comme vous pouvez le voir, nous avons une déclaration appelée **ItemsListProps**. Typescript appelle cela une interface, c'est le nom du typage des objets. Ce sont les props que nous devons passer comme paramètres de notre composant.

La propriété est nommé _list_ et c'est un tableau de chaînes de caractères.

Une autre interface que vous pouvez voir est **FunctionComponent**. Cette interface est importée de React. C'est le retour de la fonction, ce que nous obtenons lorsque le composant fonctionnel est exécuté.

**FunctionComponent** est générique et a besoin d'un argument optionnel, la props de notre composant.

Ne vous arrêtez pas à ce type avancé. Vous l'étudierez plus tard.

C'est, à mon avis, l'un des fondamentaux du métier de développeur. Accepter de ne pas comprendre tout de suite, et se contenter d'utiliser. La maîtrise de chaque concept viendra avec le temps.

Revenons maintenant à **App.tsx**. Effacez tout le code entre la div avec le nom de classe App et remplacez-le par notre composant de liste d'éléments comme ci-dessous et ajoutez l'importation.

```typescript
import ItemsList from './ItemsList';

function App() {
  return (
    <div className="App">
      <ItemsList />
    </div>
  );
}

export default App;
```

Comme vous pouvez le voir, nous avons un problème. Le compilateur nous a dit que **ItemsList** avait besoin d'une propriété, notre liste d'objets.

![Nous avons besoin d'accessoires](/assets/blog/content-images/S02E01_need-props.png)

Créez une liste d'éléments, ajoutez-la à ItemsList comme ci-dessous et regardez le résultat. Vous verrez notre liste dans votre navigateur.

```typescript
import ItemsList from './ItemsList';

function App() {
  const ourList = ['item1', 'item2', 'item3'];

  return (
    <div className="App">
      <ItemsList list={ourList} />
    </div>
  );
}

export default App;
```

Ajoutez un numéro à notre liste et regardez l'application react.

![Le type est incorrect](/assets/blog/content-images/S02E01_type-is-incorrect.png)

Le compilateur nous donne une erreur. Dans le composant **ItemsList**, nous indiquons un tableau de chaînes de caractères, un nombre n'est pas valide pour cette propriété. Nous pouvons changer notre nombre pour une chaîne de caractères ou changer notre type de liste pour accepter les nombres.

Le symbole de la pipe est un caractère spécial dans Typescript. Il est utilisé pour enchaîner plusieurs types. Dans ce cas, nous pouvons modifier notre type de liste pour qu'il accepte les nombres et les chaînes de caractères.

```typescript
list: Array<string | number>;
```

## Conclusion

Vous serez en mesure de créer votre premier composant avec React et Typescript en quelques minutes à partir de maintenant.

Ce billet est le premier d'une série sur les bases de React avec Typescript. Revenez me voir ou suivez-moi sur les réseaux sociaux pour découvrir la suite.

À plus tard !
