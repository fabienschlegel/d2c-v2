---
title: 'Configurer JWT pour une application React Django en quelques minutes'
pageTitle: 'Configurer JWT pour React Django : Un guide pas à pas'
date: '2021-06-25'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
excerpt: 'Comment configurer JWT dans un projet avec un frontend React et un backend Django en quelques minutes.'
tags: ['React', 'django', 'jwt']
related: ['introduction-to-jwt', 'five-reasons-to-use-django']
---

Dans mon article précédent, j'ai expliqué ce que sont les JWT.

Aujourd'hui, je vais vous montrer comment les utiliser dans un projet avec un frontend React et un backend Django.

## La partie backend avec Django

Je suppose que vous avez déjà des connaissances de base sur Python, Django et Django Rest Framework.

Nous installons le paquet nécessaire avec pip.

```bash
pip install djangorestframework-simplejwt
```

Maintenant, allez dans le fichier `settings.py` pour configurer les paquets.

```python
REST_FRAMEWORK = {
    # ... others DRF setup
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication"
    ],
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}
```

Passons maintenant aux explications concernant les paramètres. Nous avons configuré Django Rest Framework pour qu'il utilise `simplejwt` par défaut pour l'authentification.

`simplejwt` fournit 2 jetons par utilisateur :

- Le jeton d'accès est nécessaire pour accéder directement à une ressource. Ils ont généralement une date d'expiration et sont de courte durée. Ici, nous l'avons configuré pour qu'il expire après 5 minutes.

- Le jeton de rafraîchissement est nécessaire pour obtenir un nouveau jeton d'accès. Lorsqu'un jeton d'accès a expiré, l'utilisateur demande au serveur d'authentification un jeton de rafraîchissement pour obtenir un nouveau jeton d'accès. Les jetons de rafraîchissement peuvent également expirer, mais leur durée de vie est plutôt longue. Nous l'avons configuré pour qu'il expire au bout d'un jour.

La dernière partie pour Django, c'est les routes qui permettent à l'utilisateur d'obtenir des jetons.

```python
from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="obtain_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
]
```

La première est la route qui permet d'obtenir des jetons contre l'authentification de l'utilisateur avec un mot de passe et un nom d'utilisateur.

La seconde a besoin d'un jeton de rafraîchissement et vous renvoie un nouveau jeton d'accès.

## La partie frontend avec React

Je suppose que vous avez déjà des connaissances de base en Javascript et React.

Tout d'abord, nous installons les paquets nécessaires avec votre gestionnaire de paquets préféré.

```bash
yarn add jsonwebtoken
# or
npm install jsonwebtoken
```

Nous avons besoin de 2 services avec React pour gérer notre JWT.

### Service de requêtes

J'utilise Axios mais cela fonctionne aussi avec fetch.

```javascript
import axios from 'axios';

import { useDispatch } from 'react-redux';

import { TokenService } from '..';

import { deleteUserData } from '../../../Accounts/actions';

const requestService = axios.create({
  baseURL: process.env.REACT_APP_API_ENTRYPOINT,
});

requestService.interceptors.request.use(
  (config) => {
    const token = TokenService.getAccessToken();
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

requestService.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const valid = TokenService.getRefreshTokenValidity();
    // if refresh token is expired, redirect user to login with action
    if (!valid) {
      useDispatch(deleteUserData());
    }

    if (error.response.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      return requestService({
        url: '/api/v1/accounts/token/refresh/',
        method: 'post',
        data: {
          refresh: TokenService.getRefreshToken(),
        },
      }).then((res) => {
        if (res.status === 200) {
          TokenService.setToken(res.data);

          requestService.defaults.headers.common.Authorization = `Bearer ${TokenService.getAccessToken()}`;

          return requestService(originalRequest);
        }
        return null;
      });
    }
    return Promise.reject(error);
  }
);

export default requestService;
```

Nous commençons par créer une instance Axios.

Ensuite, nous créons 2 intercepteurs :

- Pour les requêtes : nous ajoutons le jeton d'accès à toutes les requêtes.

- Pour les réponses : si le jeton d'accès a expiré, nous faisons une nouvelle demande pour en obtenir un nouveau. Ensuite, nous rejouons la requête originale avec notre nouveau jeton. Un autre cas est celui où le jeton de rafraîchissement a expiré. À ce moment-là, nous purgeons les données de l'utilisateur et le redirigeons vers la page de connexion.

### Service de jeton

Le deuxième service consiste à gérer les jetons.

Nous gérons les tokens avec le `localStorage` du navigateur et le service peut les définir, les obtenir, vérifier leur validité ou les supprimer.

Attention à une chose : avec un jeton de rafraîchissement, une personne malveillante peut se faire passer pour votre utilisateur. Stocker un jeton à long terme dans le `localStorage` est une mauvaise idée.

```javascript
import jwt from 'jsonwebtoken';

const TokenService = (function tokenService() {
  let service;
  function getServiceFunc() {
    if (!service) {
      service = this;
      return service;
    }
    return service;
  }

  const setToken = (tokenObj) => {
    if (tokenObj.access) {
      localStorage.setItem('accessToken', tokenObj.access);
    }
    if (tokenObj.refresh) {
      localStorage.setItem('refreshToken', tokenObj.refresh);
    }
  };

  const getAccessToken = () => localStorage.getItem('accessToken');

  const getRefreshToken = () => localStorage.getItem('refreshToken');

  const getTokenValidity = (tokenObj) => {
    const decodedToken = jwt.decode(tokenObj, { complete: true });
    const dateNow = new Date();
    const timeStamp = dateNow.getTime() / 1000;

    if (decodedToken.payload.exp < timeStamp) {
      return false;
    }
    return true;
  };

  const getAccessTokenValidity = () => {
    const accessToken = getAccessToken();
    if (accessToken) {
      return getTokenValidity(accessToken);
    }
    return null;
  };

  const getRefreshTokenValidity = () => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      return getTokenValidity(refreshToken);
    }
    return null;
  };

  const clearToken = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return {
    getService: getServiceFunc,
    setToken,
    getAccessToken,
    getRefreshToken,
    getAccessTokenValidity,
    getRefreshTokenValidity,
    clearToken,
  };
})();

export default TokenService;
```

## Conclusion

C'est tout ce dont nous avons besoin pour mettre en place une authentification JWT simple entre un frontend React et un backend Django.

JWT est une excellente solution pour gérer l'authentification entre les applications.

Ressources :

- [Django](https://docs.djangoproject.com/en/3.2/)
- [Django Rest Framework](https://www.django-rest-framework.org/)
- [Django Rest Framework Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/index.html#)
- [React](https://reactjs.org/)
- [Axios](https://axios-http.com/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
