---
title: 'Setup JWT for a React Django app in minutes'
date: '2021-06-25'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: 'How to setup JWT in a project with a React frontend and a Django backend in minutes.'
tags: ['React', 'django', 'jwt']
related: ['introduction-to-jwt', 'five-reasons-to-use-django']
---

In my previous post, I explained what the JWT are.

Today I will show you how to use it in a project with a React frontend and a Django backend.

## The backend part with Django

I guess you already have basic knowledge of Python, Django and Django Rest Framework.

We install the required package with pip.

```bash
pip install djangorestframework-simplejwt
```

Now go to the `settings.py` file to setup the packages.

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

Now the explanations for settings. We setup Django Rest Framework to use simplejwt as default for authentification.

Simplejwt provide 2 tokens per user :

- Access token is needed to access a resource directly. They usually have an expiration date and are short-lived. Here We setup it to expire after 5 minutes.

- Refresh token is needed to get a new access token. When an access token is expired, user request the authentication server with a refresh token to get a fresh access token. Refresh tokens can also expire but are rather long-lived. We setup it to expire after 1 day.

The last part for Django is the routes to let user get tokens.

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

The first is the route get tokens against user authentication with a password and an username.

The second need a refresh token and gives you back a fresh access token.

## The frontend part with React

I guess you already have basic knowledge of Javascript and React.

First, we install the required package with your favorite package manager.

```bash
yarn add jsonwebtoken
# or
npm install jsonwebtoken
```

We need 2 services with React to manage our JWT.

### Request service

I use Axios but it works with fetch too.

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

First we create an Axios instance.

After we create 2 interceptors :

- For requests : we add the access token to all requests.

- For responses : if the access token is expired, we make a new request to get a fresh one. Then we replay the original request with our new token. The another case is when the refresh token is expired. At that time we purge user data and redirect him to login page.

### Token service

The second service is to manage the tokens.

We manage tokens with local storage and the service can set, get, check validity, or delete them.

Take care of one thing : with a refresh token, a malicious person can pretend to be your user. Store a long term token in the local storage is a bad idea.

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

That's all we need to setup a simple JWT authentication between a React frontend and a Django backend.

JWT is a great solution to manage authentication between apps.

Resources :

- [Django](https://docs.djangoproject.com/en/3.2/)
- [Django Rest Framework](https://www.django-rest-framework.org/)
- [Django Rest Framework Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/index.html#)
- [React](https://reactjs.org/)
- [Axios](https://axios-http.com/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
