---
title: "Gérer un store de données : combiner l'API Context et Redux Toolkit"
pageTitle: 'Gérer un contexte React avec Redux Toolkit. Comment les combiner ?'
date: '2024-06-14'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/combine-context-api-and-redux-toolkit-illustration-fr.webp'
excerpt: "Découvrez comment combiner l'API Context et Redux Toolkit pour une gestion de données efficace et flexible dans vos applications React. Apprenez à configurer, intégrer et optimiser ces outils pour des applications plus maintenables et performantes."
tags: ['typescript', 'react']
related: ['typescript-for-react-development', 'begin-react-with-typescript']
---

Dans le développement d’applications React, la gestion de la donnée est une problématique centrale. Nous cherchons constamment des solutions pour simplifier et optimiser cette gestion afin de rendre nos applications plus robustes et maintenables.

Historiquement, Redux a été l'outil privilégié pour cette tâche, offrant une approche claire et prévisible pour la gestion globale des données. Mais il est trop complexe et verbeux pour des projets de taille moyenne.

C'est ici qu'intervient la combinaison de l’API Context de React et de Redux Toolkit. Cette API, introduite dans React 16.3, permet de partager facilement des données entre différents composants sans avoir à passer explicitement par les propriétés. Bien qu’elle soit utile, ça peut devenir difficile à gérer lorsqu'il s'agit de données complexe. De l'autre côté, Redux Toolkit est une surcouche à Redux qui simplifie grandement sa configuration et son utilisation tout en conservant les avantages de Redux.

En combinant ces deux outils, nous pourrons profiter de la simplicité et de la flexibilité de l’API Context et bénéficier des avantages de Redux Toolkit. Cette approche permet non seulement de réduire la complexité du code mais aussi d'améliorer les performances de l'application.

## L’API Context c’est quoi ?

L’API Context se compose principalement de trois éléments :

- **Context** : Un objet créé avec `createContext()` qui contient deux composants : `Provider` et `Consumer`.
- **Provider** : Un composant React qui fournit des données à tous les composants enfants. Le `Provider` accepte une propriété `value` qui contient les données à partager.
- **Consumer** : Un composant React qui consomme les données fournies par le `Provider`. Il utilise une fonction de rendu pour accéder aux données.

Voici un exemple simple de création et d'utilisation d'un contexte :

```tsx
import React, { createContext, useContext } from 'react';

// Création du contexte
const ThemeContext = createContext();

const App = () => {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
};

const Toolbar = () => {
  return (
    <div>
      <ThemedButton />
    </div>
  );
};

const ThemedButton = () => {
  const theme = useContext(ThemeContext);
  return <button style={{ background: theme === 'dark' ? '#333' : '#FFF' }}>Theme Button</button>;
};
```

Dans cet exemple, le `ThemeContext.Provider` fournit la valeur `dark` à tous ses composants enfants, et le composant `ThemedButton` consomme cette valeur en utilisant le hook `useContext`.

### Cas d'utilisation courants

L’API Context est idéale pour :

- **Thématisation** : Partager les thèmes (sombre, clair) à travers l'application.
- **Authentification** : Partager l'état d'authentification de l'utilisateur et les informations de session.
- **Paramètres globaux** : Gérer les configurations et préférences globales de l'application.
- **Paramètres locaux** : Gérer les états et les données d’un sous ensemble de l’application.

### Avantages et inconvénients de l’API Context

**Avantages :**

- **Simplicité** : Facile à comprendre et à utiliser pour les états simples.
- **Réduction du "prop drilling"** : Évite le besoin de passer manuellement les propriétés à travers plusieurs niveaux de composants.
- **Intégration native** : Pas besoin d'installer des bibliothèques externes, tout est inclus dans React.

**Inconvénients :**

- **Performance** : Les composants consommateurs sont rendus chaque fois que le contexte change, ce qui peut impacter les performances si utilisé de manière abusive.
- **Les états complexes** : Gérer des états complexes avec des actions et des reducers peut devenir difficile.

## Redux Toolkit

Redux Toolkit (RTK) est une bibliothèque officielle de Redux qui simplifie le processus de configuration et d'utilisation de Redux dans les applications React. Lancé pour répondre aux critiques concernant la complexité et la verbosité de Redux, Redux Toolkit offre des abstractions et des outils pour rendre l'utilisation de Redux plus accessible et efficace.

### Les principales méthodes

Redux Toolkit est conçu pour être la meilleure pratique par défaut pour la gestion de state global avec Redux. Il regroupe plusieurs utilitaires pour simplifier les tâches courantes comme la configuration du store, la création des reducers, la gestion des actions, et bien plus encore. Voici les principaux composants de Redux Toolkit :

- **`configureStore`** : Une fonction qui configure automatiquement le store avec de bonnes pratiques par défaut (comme l'ajout du middleware Redux Thunk et l'activation du mode strict de Redux DevTools).
- **`createSlice`** : Une fonction qui simplifie la création de slices, combinant automatiquement les reducers et les actions.
- **`createAsyncThunk`** : Un utilitaire pour gérer les actions asynchrones, souvent utilisé pour les appels API.
- **`createEntityAdapter`** : Un outil pour normaliser et gérer les collections d'entités dans le state.

### C’est devenu un standard

Redux Toolkit est devenu le standard pour plusieurs raisons :

- **Simplification** : Il réduit le boilerplate et simplifie la configuration de Redux.
- **Meilleures pratiques intégrées** : Il applique par défaut des meilleures pratiques, comme l'utilisation d'immutabilité avec immer et la gestion des effets secondaires avec Redux Thunk.
- **Facilité de maintenance** : Les slices et les thunks rendent le code Redux plus modulaire et plus facile à maintenir.
- **Performance** : En intégrant immer, Redux Toolkit permet des mises à jour immutables efficaces sans compromis de performance.

### Les avantages

**Simplicité et réduction du boilerplate** : Redux Toolkit réduit considérablement le code nécessaire pour configurer Redux, grâce à des fonctions comme `configureStore` et `createSlice`.

**Modularité et maintenabilité** : En encourageant une structure de code modulaire, RTK facilite la gestion et la maintenance des grands projets Redux.

**Gestion des effets secondaires** : Avec des outils comme `createAsyncThunk`, RTK simplifie la gestion des actions asynchrones, rendant le code plus lisible et plus facile à comprendre.

**Interopérabilité** : RTK est conçu pour fonctionner de manière transparente avec les outils et les bibliothèques existants dans l'écosystème React, comme l’API Context.

Voici un exemple simple de configuration du store avec Redux Toolkit :

```tsx
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Création d'un slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

// Extraction des actions et du reducer
const { actions, reducer } = counterSlice;

// Configuration du store
const store = configureStore({
  reducer: {
    counter: reducer,
  },
});

// Exportation des actions pour utilisation dans les composants
export const { increment, decrement } = actions;
export default store;
```

Avec ce code, nous avons configuré un store Redux avec un simple slice pour gérer un compteur. Redux Toolkit a éliminé beaucoup de boilerplate, rendant le processus plus simple et plus direct.

## Pourquoi utiliser l'API Context avec Redux Toolkit ?

Combiner l’API Context de React avec Redux Toolkit peut sembler redondant à première vue, étant donné que ces deux outils ont des fonctionnalités qui se chevauchent en matière de gestion de l’état. Leur intégration peut offrir une série d'avantages qui améliorent la simplicité, la performance, et la maintenabilité de vos applications React.

### Simplification de la configuration

L'un des principaux avantages de Redux Toolkit est sa capacité à simplifier la configuration de Redux. Cependant, en utilisant l’API Context pour fournir un magasin de données à vos composants, vous pouvez réduire encore davantage le boilerplate et augmenter la souplesse de votre application. Au lieu de configurer un store global avec Redux qui va contenir toutes nos données, on va pouvoir découper en plusieurs contextes qui auront un cycle de vie relié aux composants qui les consomment.

### Réduction de la complexité du code

En utilisant l’API Context avec Redux Toolkit, vous pouvez tirer parti des forces de chacun. L’API Context est excellente pour le partage de données simples et statiques, tandis que Redux Toolkit gère efficacement les états plus complexes et les logiques de mise à jour. Cette combinaison permet de séparer les préoccupations : l’API Context seule pour les états et paramètres simples, et combiné avec Redux Toolkit pour les fonctionnalités plus complexes, réduisant ainsi la complexité globale du code.

### Exemple de scénario d'utilisation

Considérez une application comportant un module de gestion de tâches. Plutôt que gérer ces données avec un magasin global, nous allons déléguer cette gestion à un magasin de donées local, plus proche de nos composants.

Nous pourrons utiliser un contexte, un provider et un hook custom pour amener les tâches et les méthodes de CRUD à nos composants qui les consomment.

## Configuration de l’API Context avec Redux Toolkit

Configurer l’API Context avec Redux Toolkit dans une application React permet de bénéficier de la simplicité de l’API Context pour les états simples et de la puissance de Redux Toolkit pour les états complexes. Dans cette section, nous allons passer en revue les étapes nécessaires pour mettre en place cette configuration.

### Mise en place du projet initial

Commencez par créer une nouvelle application React si vous n'en avez pas déjà une. Vous pouvez utiliser `viteJS` pour cela :

```bash
yarn create vite task-manager --template react-ts
cd task-manager
yarn
yarn dev
```

### Installation des dépendances nécessaires

Avant de commencer, assurez-vous d'avoir installé les bibliothèques nécessaires. Vous aurez uniquement besoin de Redux Toolkit. Vous pouvez les installer via npm ou yarn :

```bash
npm install @reduxjs/toolkit
```

ou

```bash
yarn add @reduxjs/toolkit
```

### Mise en place du magasin de données avec Redux Toolkit

Ensuite, nous allons configurer le contexte en utilisant Redux Toolkit. Créez un fichier `TasksContext.ts` et configurez le magasin de données pour gérer les tâches :

```tsx
import { Dispatch, createContext } from 'react';

import { EntityState, PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { Task, TaskEntity, TasksState } from '../models/Tasks';

interface TasksContextStateType {
  tasks: EntityState<Task, string>;
}

type TasksContextPayloadActions =
  | PayloadAction<string>
  | PayloadAction<{ id: string; name: string }>
  | PayloadAction<{ id: string; taskState: TasksState }>;

const taskAdapter = createEntityAdapter<Task>();

export const { selectAll: selectAllTasks, selectById: selectTaskById } =
  taskAdapter.getSelectors<TasksContextStateType>((state) => state.tasks);

export const initialState: TasksContextStateType = {
  tasks: taskAdapter.getInitialState(),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<string>) {
      const entity = new TaskEntity();
      entity.create(action.payload);

      taskAdapter.addOne(state.tasks, entity.task);
    },
    updateTaskName(state, action: PayloadAction<{ id: string; name: string }>) {
      const { id, name } = action.payload;

      taskAdapter.updateOne(state.tasks, { id, changes: { name } });
    },
    updateTaskState(state, action: PayloadAction<{ id: string; taskState: TasksState }>) {
      const { id, taskState } = action.payload;

      taskAdapter.updateOne(state.tasks, { id, changes: { state: taskState } });
    },
    deleteTask(state, action: PayloadAction<string>) {
      taskAdapter.removeOne(state.tasks, action.payload);
    },
  },
});

export const { addTask, updateTaskName, updateTaskState, deleteTask } = tasksSlice.actions;

export const { reducer } = tasksSlice;

export const TasksContext = createContext<{
  state: TasksContextStateType;
  dispatch: Dispatch<TasksContextPayloadActions>;
}>({
  state: initialState,
  dispatch: () => null,
});
```

La méthode `createSlice` nous permet de créer nos actions et notre reducer pour modifier les données de notre contexte.

La méthode `createContext` va générer le contexte React avec d’un coté `state`, notre magasin de données et de l’autre dispatch, la méthode pour modifier nos données.

### Mise en place du contexte

Commençons par nous occuper du fournisseur de contexte. Créez un fichier `TasksProvider.tsx` et ajoutez les éléments suivants.

```tsx
import { FunctionComponent, ReactNode, useReducer } from 'react';

import { reducer, initialState, TasksContext } from './TasksContext';

interface TasksProviderProps {
  children: ReactNode;
}

const TasksProvider: FunctionComponent<TasksProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <TasksContext.Provider value={{ state, dispatch }}>{children}</TasksContext.Provider>;
};

export default TasksProvider;
```

Le hook `useReducer` va contenir notre reducer et l’état initial de notre magasin de données. Il renvoie l’état courant de nos données et la méthode de mise à jour `dispatch`.

Ajoutons ensuite un hook custom `useTasks.ts` qui nous permettra d’utiliser le contexte.

```tsx
import { useContext } from 'react';

import {
  TasksContext,
  addTask,
  deleteTask,
  selectAllTasks,
  updateTaskName,
  updateTaskState,
} from './TasksContext';

import { TasksState } from '../models/Tasks';

function useTasks() {
  const { state, dispatch } = useContext(TasksContext);

  const tasks = selectAllTasks(state);

  function add(name: string) {
    dispatch(addTask(name));
  }

  function updateName(id: string, name: string) {
    dispatch(updateTaskName({ id, name }));
  }

  function updateState(id: string, taskState: TasksState) {
    dispatch(updateTaskState({ id, taskState }));
  }

  function remove(id: string) {
    dispatch(deleteTask(id));
  }

  return { tasks, add, updateName, updateState, remove };
}

export default useTasks;
```

Ce hook nous mets à disposition les tâches et toutes les méthodes nécessaire pour les modifier.

### Intégration dans l’application

Maintenant, nous allons intégrer le contexte dans notre application. Créez ou modifiez le fichier `App.ts`pour utiliser les providers :

```tsx
import TasksList from './components/TasksList';
import TasksProvider from './contexts/TasksProvider';

function App() {
  return (
    <TasksProvider>
      <TasksList />
    </TasksProvider>
  );
}

export default App;
```

### Utilisation du contexte et du store dans les composants

Enfin, créons un composant `TaskList.tsx` qui utilise le contexte pour les tâches :

```tsx
import { FunctionComponent } from 'react';
import useTasks from '../contexts/useTasks';
import TaskItem from './TaskItem';

interface TasksListProps {}

const TasksList: FunctionComponent<TasksListProps> = () => {
  const { tasks, add, updateName, remove } = useTasks();

  const isCreatingNewTask = tasks.find((t) => t.name.length === 0);

  return (
    <div>
      <ul>
        {tasks.map((t) => (
          <TaskItem key={t.id} task={t} onEdit={updateName} onDelete={remove} />
        ))}
      </ul>
      {!isCreatingNewTask && (
        <button type="button" onClick={() => add('')}>
          Add Task
        </button>
      )}
    </div>
  );
};

export default TasksList;
```

## Conclusion

La combinaison de l’API Context et de Redux Toolkit offre une solution flexible et efficace pour gérer l'état dans les applications React.

Cette approche hybride permet de bénéficier de la simplicité de l’API Context tout en exploitant la puissance de Redux Toolkit pour les états des données. En comparaison, Redux pur est une solution robuste pour des applications très complexes, mais peut introduire une complexité inutile pour des états plus simples. En fonction de la complexité de votre application et des besoins spécifiques de votre projet, l'une ou l'autre approche peut être plus appropriée.

### Récapitulatif des avantages

1. **Simplicité et Réduction du Boilerplate** : Redux Toolkit, avec sa méthode `createSlice`, simplifie considérablement la création des actions et des reducers, réduisant le code verbeux typique de Redux pur. L'intégration avec l’API Context pour des états simples permet de garder le code propre et lisible.
2. **Gestion efficace des États** : Utiliser l’API Context et Redux Toolkit, permet de bénéficier du meilleur des deux mondes. Cela permet de gérer efficacement des scénarios variés au sein de la même application.
3. **Performance Optimisée** : Bien que l’API Context puisse entraîner des rendus inutiles si elle est mal utilisée, l'approche hybride permet de limiter son utilisation aux états qui ne changent pas fréquemment, minimisant ainsi les problèmes de performance.
4. **Facilité d'Apprentissage et d'Utilisation** : Redux Toolkit adoucit la courbe d'apprentissage de Redux en automatisant de nombreux aspects complexes. l’API Context, quant à elle, est intuitive et rapide à prendre en main, ce qui rend cette combinaison particulièrement attrayante pour les développeurs de tous niveaux.

### Cas d'utilisation appropriés

- **Applications de taille moyenne à grande** : Cette méthode est idéale pour les applications nécessitant une gestion d'état complexe pour certaines parties et des états simples pour d'autres.
- **Projets nécessitant une évolutivité** : Avec une architecture flexible et modulaire, cette approche facilite l'évolution et l'entretien du code à mesure que l'application grandit.
- **Développement collaboratif** : La lisibilité et la maintenabilité du code produites par cette approche sont particulièrement bénéfiques dans des équipes de développement variées, où plusieurs développeurs travaillent ensemble.

### Aller plus loin…

Si vous souhaitez aller plus loin, vous devriez explorer des combinaisons de cette approche hybride avec d'autres outils de gestion de l'état ou de structure de code, tels que Recoil, Zustand ou encore MobX, pour identifier ce qui correspond le mieux à vos besoins spécifiques.

### Conclusion finale

En conclusion, l'intégration de l’API Context avec Redux Toolkit offre une solution flexible, puissante et accessible pour la gestion de l'état global dans les applications React.

Cette approche hybride représente une option particulièrement efficace si vous cherchez à créer des applications réactives et maintenables.
