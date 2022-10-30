---
title: 'Working with REST APIs in React'
date: '2022-03-15'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: 'An API (application programming interface) is an interface that allows one service to be connected to another.'
tags: ['React', 'Typescript']
---

API is the backroom of front end applications.

An API (application programming interface) is an interface that allows one service to be connected to another. To fill in your front end applications, you need data. Back end applications provide them to your app through API endpoints.

Knowing how to communicate through these APIs is needed to create alive front end apps.

## The REST API

A REST API is an application programming interface that respects the constraints of the REST architecture style. The REST (Representational State Transfer) architecture was created by the computer scientist Roy Fielding.

With this post, we will explore how to interact with REST APIs

## Interact with API endpoints

An API must give the front end developer a list of endpoints.

An endpoint is an URL (Uniform Resource Locator). This URL can be static, which means it’s never changed or dynamic, which means there are parameters inside.

```bash
# This is a static URL to get a list of recipes
https://www.myrecipes.com/recipes

# This is a dynamic URL, give us the recipe with the id 1
https://www.myrecipes.com/recipes/1
```

In the example above of dynamic URL, we can change the number at the end to interact with another recipe.

## HTTP request methods

To interact with API endpoints, we have request methods. Each of these methods gives us a different result.

There are 4 main methods to interact with an endpoint. Other methods exist but you will rarely if ever, use them.

### GET method

GET is the method to retrieve data.

It’s the most basic method to interact with the endpoint. To use it, you must build an URL with query parameters to organize and filter data.

```bash
https://www.myrecipes.com/recipes?sort=ascending&category=starters
```

This URL is divided into 2 parts, separated by the question mark. The URL itself is on the left and the query parameters are on the right. Query parameters are separated by an ampersand. Each query parameter has a name and a value separated by an equal sign.

The naming and the number of query parameters are not limited. The complete URL must be under 2048 characters.

Like other variables, parameters names must be comprehensive and logical to keep URLs understandable by humans.

### POST method

POST is the method to create data.

POST requests are different from GET requests. You have an URL too, but without parameters. Instead, the request has a body, which contains the data. This data can have several types.

I use Axios as a library for requests, and by default, Axios use JSON as the content type for POST. To send files, we use the multipart/form-data content type. Another type of body exists, but these two are the most used with React.

### PUT method

PUT is the method to update data.

This request is similar to the POST request. Instead of sending a complete object of data to create it, we send only the updated part of the object. If the resource does not exist, then API may decide to create a new resource or not.

### DELETE method

DELETE is the method to remove data.

This method works on a single object at a time. If the object is deleted, calling the URL another time will return an error 404 (Not found).

## The CRUD operations

CRUD is an acronym for Create Read Update Delete.

Behind each of these operations, there is an HTTP method. And it’s the only thing you need to work with an API. Now we’ll see these 4 operations in detail with React examples.

Now, we can dive into the code. I created a repository with a React front end and a REST API. you can clone it [here](https://github.com/fabienschlegel/s02e04-rest-api-react).

I used these libraries with React to mock a REST API :

- json-server : [https://github.com/typicode/json-server](https://github.com/typicode/json-server)
- Falso: [https://ngneat.github.io/falso/](https://ngneat.github.io/falso/)

### Create a resource

To create a resource, we’ll use a form.

The function to create our resource is divided into 2 parts. In the first part, we collect data from the form. In the second part, we use Axios to send data to the server with the URL as the first parameter and the body, our data, as the second parameter.

When we get the answer of the REST API, we log it to the console.

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

### Read resources

To read a resource, we need a simple function for using Axios GET.

Here we have no parameters. When we get the answer, we set the data to a state. Our data will be displayed on the screen by other components.

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

We can update our function to pass query parameters like a page number for paginating.

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

### Update Resource

To update a resource, we will use a form, like in the create part.

The difference is in the URL. Our item already exists, and we only want to update it. So we add the item id in the URL and the rest of our data in the body part.

When the request is successful, we erase our form and reload data to see the update.

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

### Delete Resource

To delete a resource, it’s easy. We add the item id to the URL and let’s go. We reload our data if the delete is successful to keep our list up to date on the screen.

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

These functions explain how to deal with a REST API. You can clone the repository and update functions to for example add notifications.

This post is in a series on the basics of React with Typescript. Check back or follow me on social media to find out what's next.

See you later!
