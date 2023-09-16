---
title: 'Comment utiliser le hook useEffect dans vos composants React'
pageTitle: 'Comment utiliser le hook useEffect dans vos composants React : Un tutoriel complet'
date: '2023-01-04'
coverImage: '/assets/blog/cover-images/how-to-useeffect-hook-in-your-react-components-illustration-fr.webp'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
excerpt: 'Le hook useEffect pour React vous aide à créer des side effets dans vos composants fonctionnels.'

tags: ['javascript', 'typescript', 'React', 'hooks']
related: ['five-tips-about-react-hooks', 'manage-your-state-with-the-usestate-in-react']
---

React introduit les hooks dans la version 16.8. Les hooks nous permettent de créer des composants fonctionnels avec des états et des effets secondaires.

Le hook `useEffect` vous aide à créer des effets de bord dans vos composants fonctionnels.

Ce hook prend une fonction comme premier paramètre et un tableau de dépendances comme second.

L'effet doit être dans le corps de la fonction. Si votre effet a besoin d'une function cleanup, vous pouvez retourner une fonction pour l'exécuter.

## Anatomie du hook

```tsx
function App() {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(false);

  const handleIncrease = () => setTimer((prevState) => !prevState);

  useEffect(() => {
    let timer1 = setTimeout(() => setCount((prevcount) => prevcount + 1), 2000);

    return () => {
      clearTimeout(timer1);
    };
  }, [timer]);

  return (
    <div>
      <p>count : {count}</p>
      <button onClick={handleIncrease} type="button">
        Launch Timer
      </button>
    </div>
  );
}
```

Voici un exemple de hook. Il exécute un timer qui incrémente `count` de 1. Nous utilisons une fonction timeout, c'est pourquoi nous avons besoin d'une fonction cleanup pour le supprimer.

Le tableau de dépendances contient l'état `timer`. Nous l'utilisons pour déclencher la fonction `useEffect`.

Chaque fois qu'un état est mis à jour dans notre composant, il est redéfini. Si `timer` est mis à jour, la fonction à l'intérieur de `useEffect` est exécutée.

Notre fonction de nettoyage est également exécutée lorsque le composant se démonte, afin d'éviter une fuite de mémoire.

## Le tableau de dépendances

Avec le tableau de dépendances, nous pouvons choisir quand la fonction à l'intérieur du hook est exécutée.

### A chaque rerendu

Pour l'exécuter au montage et à chaque rendu, ignorez le tableau de dépendances.

### Au montage

Avec un tableau de dépendances vide, votre effet sera exécuté une seule fois lorsque le composant sera monté.

### A la mise à jour

Chaque fois que la valeur du tableau de dépendance est mise à jour et au moment du montage, le hook sera exécuté.

## Plus d'exemples de useEffect

Maintenant que nous avons couvert les bases du hook `useEffect`, regardons quelques autres exemples de son utilisation.

### Récupérer des données depuis une API

Un cas d'utilisation courant du hook `useEffect` est la récupération de données depuis une API.

```tsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
    }

    fetchData();
  }, [userId]);

  if (loading) {
    return <Loading />;
  }

  return <Profile user={user} />;
}
```

Nous utilisons le hook `useEffect` pour récupérer les données de l'utilisateur pour le `userId` donné lorsque le composant se monte ou lorsque la propriété `userId` change.

Nous mettons l'état `loading` à `true` pendant que les données sont récupérées, puis nous le mettons à `false` lorsque les données ont été reçues.

Cela nous permet d'afficher un indicateur de chargement pendant que les données sont récupérées, puis d'afficher le profil de l'utilisateur une fois que les données sont disponibles.

### Mise en place des abonnements

Le hook `useEffect` peut également être utilisé pour mettre en place des abonnements, tels que des récepteurs d'événements ou des connexions de websockets.

```tsx
function Chat({ userId, onMessage }) {
  useEffect(() => {
    const socket = new WebSocket(`wss://chat.example.com/${userId}`);

    socket.addEventListener('message', onMessage);

    return () => {
      socket.removeEventListener('message', onMessage);
      socket.close();
    };
  }, [userId, onMessage]);

  // ...
}
```

Dans cet exemple, nous utilisons le hook `useEffect` pour mettre en place une connexion websocket et un event listener pour les messages entrants.

Le hook `useEffect` inclut également une fonction de nettoyage qui supprime l'écouteur d'événements et ferme la connexion au websocket lorsque le composant se démonte.

### Ajout d'auditeurs d'événements

Le hook `useEffect` peut également être utilisé pour ajouter des écouteurs d'événements au DOM.

```tsx
function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      Window size: {size.width} x {size.height}
    </div>
  );
}
```

Dans cet exemple, nous utilisons le hook `useEffect` pour ajouter un événement `resize` à la page. Au montage, la variable size est mise à jour avec la largeur et la hauteur de la fenêtre. La fonction de nettoyage supprime l'événement lorsque le composant est démonté.

## Combiner useEffect avec d'autres hooks

Le hook `useEffect` peut être utilisé en combinaison avec d'autres hooks, tels que `useState` et `useContext`, pour créer une logique plus complexe.

Par exemple, vous pourriez utiliser le hook `useState` pour gérer un élément d'état qui est utilisé pour déclencher un effet :

```tsx
function Form() {
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (submitting) {
      // perform submission logic
    }
  }, [submitting]);

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={submitting}>
        Submit
      </button>
    </form>
  );
}
```

Dans cet exemple, nous utilisons le hook `useEffect` pour exécuter la logique de soumission lorsque l'état `submitting` est `true`. Cela nous permet de désactiver le bouton de validation et d'afficher un indicateur de chargement pendant que le formulaire est soumis.

Vous pouvez également utiliser le hook `useContext` pour accéder aux valeurs du contexte dans le hook `useEffect` :

```tsx
function UserList({ userId }) {
  const { users, dispatch } = useContext(UserContext);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(`/api/users?id=${userId}`);
      const data = await response.json();
      dispatch({ type: 'ADD_USERS', users: data });
    }

    fetchUsers();
  }, [userId, dispatch]);

  // ...
}
```

Dans cet exemple, nous utilisons le hook `useEffect` pour récupérer une liste d'utilisateurs basée sur la propriété `userId` et dispatcher une action pour ajouter les utilisateurs à l'état du contexte.

Vous pouvez utiliser le hook `useRef` pour déclencher le contenu d'un useEffect une seule fois.

```tsx
function App() {
  const trigger = useRef(false);

  useEffect(() => {
    if (trigger.current) return;
    trigger.current = true;

    // your logic here...
  }, []);
  // ...
}
```

Dans cet exemple, au moment du montage, le contenu de `useEffect` sera exécuté et `trigger` sera mis à jour à true. Maintenant, chaque exécution de `useEffect` résultera en un retour anticipé.

## Meilleures pratiques pour useEffect

Voici quelques bonnes pratiques à garder à l'esprit lors de l'utilisation du hook `useEffect` :

- Soyez attentif à l'impact de vos effets sur les performances. Evitez d'utiliser des effets qui s'exécutent trop fréquemment ou qui ont des calculs coûteux.
- Utilisez le tableau de dépendances pour contrôler quand les effets sont exécutés. Cela permet d'éviter les re-rendus inutiles et d'améliorer les performances.
- Utilisez la fonction de nettoyage pour nettoyer correctement les effets secondaires, tels que les récepteurs d'événements ou les requêtes réseau. Cela permet d'éviter les fuites de mémoire.
- Utiliser le hook `useCallback` pour mémoriser les fonctions qui sont passées comme dépendances au hook `useEffect`. Cela peut aider à éviter les re-renders inutiles.
- Préférez des `useEffect` plus petits. Ils sont plus faciles à comprendre et à maintenir.

## Problèmes et éléments à prendre en compte

Il y a quelques points à prendre en compte lors de l'utilisation du hook `useEffect` :

- Le hook `useEffect` s'exécute de manière asynchrone, ce qui signifie que vous ne devez pas compter sur le fait que ses effets secondaires soient terminés avant le prochain rendu.
- Le hook `useEffect` ne s'exécute pas sur le rendu initial à moins que vous n'incluiez un tableau de dépendances vide. Cela signifie que vous ne devriez pas utiliser le hook `useEffect` pour mettre en place un état qui est utilisé dans le rendu initial.
- Faites attention à ne pas inclure des valeurs dans le tableau de dépendance qui changent trop fréquemment. Cela peut entraîner l'exécution trop fréquente du hook `useEffect`, ce qui peut avoir un impact sur les performances.

J'espère que ces informations vous ont été utiles et vous ont permis de mieux comprendre le hook `useEffect` dans React !

Ce billet fait partie d'une série sur les bases de React avec Typescript. Revenez me voir ou [suivez-moi](https://twitter.com/fabienschlegel) sur Twitter pour découvrir la suite.

À plus tard !
