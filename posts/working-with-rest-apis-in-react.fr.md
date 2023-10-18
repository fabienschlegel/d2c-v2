---
title: 'Travailler avec des API REST dans React'
pageTitle: 'Travailler avec des API REST dans React : Guide du débutant'
date: '2022-03-15'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
excerpt: "Une API (interface de programmation d'application) est une interface qui permet de connecter un service à un autre."
tags: ['React', 'Typescript']
---

L'API est l'arrière-boutique des applications front.

Une API (application programming interface) est une interface qui permet de connecter un service à un autre. Pour remplir vos applications front, vous avez besoin de données. Les applications dorsales les fournissent à votre application par l'intermédiaire des points d'extrémité de l'API.

Pour créer des applications front dynamiques, il est nécessaire de savoir comment communiquer par le biais de ces API.

## L'API REST

Une API REST est une interface de programmation d'application qui respecte les contraintes du style d'architecture REST. L'architecture REST (Representational State Transfer) a été créée par l'informaticien Roy Fielding.

Dans ce billet, nous allons voir comment interagir avec les API REST

## Interagir avec les points d'extrémité de l'API

Une API doit fournir au développeur frontal une liste de points de terminaison.

Un point de terminaison est une URL (Uniform Resource Locator). Cette URL peut être statique, ce qui signifie qu'elle n'est jamais modifiée, ou dynamique, ce qui signifie qu'elle contient des paramètres.

```bash
# This is a static URL to get a list of recipes
https://www.myrecipes.com/recipes

# This is a dynamic URL, give us the recipe with the id 1
https://www.myrecipes.com/recipes/1
```

Dans l'exemple ci-dessus d'URL dynamique, nous pouvons changer le numéro à la fin pour interagir avec une autre recette.

## Méthodes de requête HTTP

Pour interagir avec les points de terminaison de l'API, nous disposons de méthodes de requête. Chacune de ces méthodes donne un résultat différent.

Il existe 4 méthodes principales pour interagir avec un point de terminaison. Il existe d'autres méthodes, mais vous ne les utiliserez que rarement, voire jamais.

### Méthode GET

La méthode GET permet de récupérer des données.

C'est la méthode la plus basique pour interagir avec le point de terminaison. Pour l'utiliser, vous devez construire une URL avec des paramètres de requête pour organiser et filtrer les données.

```bash
https://www.myrecipes.com/recipes?sort=ascending&category=starters
```

Cette URL est divisée en deux parties, séparées par un point d'interrogation. L'URL elle-même est à gauche et les paramètres de la requête sont à droite. Les paramètres de requête sont séparés par un symboile &. Chaque paramètre de requête a un nom et une valeur séparés par un signe égal.

La dénomination et le nombre de paramètres de requête ne sont pas limités. L'URL complète ne doit pas dépasser 2048 caractères.

Comme les autres variables, les noms des paramètres doivent être complets et logiques pour que les URL soient compréhensibles par les humains.

### Méthode POST

POST est la méthode de création de données.

Les requêtes POST sont différentes des requêtes GET. Vous avez également une URL, mais sans paramètres. Au lieu de cela, la requête a un corps, qui contient les données. Ces données peuvent être de plusieurs types.

J'utilise Axios comme bibliothèque pour les requêtes, et par défaut, Axios utilise JSON comme type de contenu pour POST. Pour envoyer des fichiers, on utilise le type de contenu multipart/form-data. Un autre type de corps existe, mais ces deux-là sont les plus utilisés avec React.

### Méthode PUT

PUT est la méthode de mise à jour des données.

Cette requête est similaire à la requête POST. Au lieu d'envoyer un objet complet de données pour le créer, nous n'envoyons que la partie mise à jour de l'objet. Si la ressource n'existe pas, l'API peut décider de créer une nouvelle ressource ou non.

### Méthode DELETE

La méthode DELETE permet de supprimer des données.

Cette méthode fonctionne sur un seul objet à la fois. Si l'objet est supprimé, un nouvel appel à l'URL renverra une erreur 404 (Non trouvé).

## Les opérations CRUD

CRUD est un acronyme pour Create Read Update Delete (créer, lire, mettre à jour, supprimer).

Derrière chacune de ces opérations, il y a une méthode HTTP. Et c'est la seule chose dont vous avez besoin pour travailler avec une API. Nous allons maintenant voir ces 4 opérations en détail avec des exemples React.

Maintenant, nous pouvons nous plonger dans le code. J'ai créé un dépôt avec un front-end React et une API REST. Vous pouvez le cloner [ici](https://github.com/fabienschlegel/s02e04-rest-api-react).

J'ai utilisé ces bibliothèques avec React pour simuler une API REST :

- json-server : [https://github.com/typicode/json-server](https://github.com/typicode/json-server)
- Falso : [https://ngneat.github.io/falso/](https://ngneat.github.io/falso/)

### Créer une ressource

Pour créer une ressource, nous allons utiliser un formulaire.

La fonction de création de notre ressource est divisée en 2 parties. Dans la première partie, nous collectons les données du formulaire. Dans la seconde partie, nous utilisons Axios pour envoyer des données au serveur avec l'URL comme premier paramètre et le corps, nos données, comme second paramètre.

Lorsque nous obtenons la réponse de l'API REST, nous l'enregistrons dans la console.

```typescript
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  const id = (): string => Math.random().toString(36).substr(2);
  const realName = formData.get('realName') as string;
  const alterEgo = formData.get('alterEgo') as string;
  const company = formData.get('company') as string;

  axios
    .post('http://localhost:3001/heroes', { id, realName, alterEgo, company })
    .then((payload) => {
      console.log(payload);
    });
};
```

### Lire des ressources

Pour lire une ressource, nous avons besoin d'une fonction simple pour utiliser Axios GET.

Ici, nous n'avons pas de paramètres. Lorsque nous obtenons la réponse, nous plaçons les données dans un état. Nos données seront affichées à l'écran par d'autres composants.

```typescript
const handleGetItems = useCallback(
  () =>
    axios.get('http://localhost:3001/heroes').then((payload) => {
      const { data } = payload;
      setHeroes(data);
    }),
  []
);
```

Nous pouvons mettre à jour notre fonction pour passer des paramètres de requête comme un numéro de page pour la pagination.

```typescript
const handleGetItems = useCallback(
    (page:number) =>
      const params = { '_page': page };
      axios.get("http://localhost:3001/heroes",{params}).then((payload) => {
        const { data } = payload;
        setHeroes(data);
      }),
    []
  );
```

### Mise à jour d'une ressource

Pour mettre à jour une ressource, nous utiliserons un formulaire, comme dans la partie création.

La différence réside dans l'URL. Notre élément existe déjà et nous voulons seulement le mettre à jour. Nous ajoutons donc l'identifiant de l'élément dans l'URL et le reste de nos données dans la partie "body".

Lorsque la demande aboutit, nous effaçons notre formulaire et rechargeons les données pour voir la mise à jour.

```typescript
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const id = hero?.id;
  const { realName, alterEgo, company } = hero as Hero;
  axios
    .put(`http://localhost:3001/heroes/${id}`, {
      realName,
      alterEgo,
      company,
    })
    .then((payload) => {
      handleReload();
      handleSet(null);
      console.log(payload);
    });
};
```

### Supprimer une ressource

Pour supprimer une ressource, c'est facile. Nous ajoutons l'identifiant de l'élément à l'URL et c'est parti. Nous rechargeons nos données si la suppression est réussie afin de garder notre liste à jour à l'écran.

```typescript
const handleDelete = () => {
  axios.delete(`http://localhost:3001/heroes/${item.id}`).then((payload) => {
    if (payload.status === 200) {
      handleReload();
    }
  });
};
```

## Conclusion

Ces fonctions expliquent comment gérer une API REST. Vous pouvez cloner le dépôt et mettre à jour les fonctions pour, par exemple, ajouter des notifications.

Ce billet fait partie d'une série sur les bases de React avec Typescript. Revenez me voir ou suivez-moi sur les réseaux sociaux pour découvrir la suite.
