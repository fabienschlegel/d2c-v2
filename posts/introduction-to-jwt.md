---
title: 'Introduction to JWT'
date: '2021-06-17'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: 'A JWT (JSON Web token) is an access token which contains all the information to communicate securely between two parties. JWTs are mainly used for identification operations and the management of user access rights.'
tags: ['jwt']
related: ['setup-jwt-react-django-app']
---

## What is JWT

It's an open standard defined by [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519).

A JWT (JSON Web token) is an access token which contains all the information to communicate securely between two parties. JWTs are mainly used for identification operations and the management of user access rights.

## What does a JSON Web Token look like?

A JWT is divided into three parts. An header, a payload and a signature. The parts are encoded as three Base64-URL strings separated by dots.

### Header

The header is usually made up of two parts and provides essentials informations about the token. It contains the type of token and the signature and / or encryption algorithm used.

### Payload

The payload of the JSON Web Token is the part that contains the information that needs to be passed to the application. This is where certain standards are defined which determine what data should be transmitted. Payload's data are called claims. There are three types of claims : registered, public, and private claims.

- Registered claims : These are registered in the [IANA JSON Web Token Claim Register](https://www.iana.org/assignments/jwt/jwt.xhtml). Some of them are : iss (issuer), exp (expiration time), sub (subject), aud (audience).

- Public claims : These can be defined at will by those using JWTs. But to avoid collisions they should be defined in the IANA JSON Web Token Registry or be defined as a URI that contains a collision resistant namespace.

- Private claims : These are the custom claims created to share information between parties that agree on using them and are neither registered or public claims.

All claims are optional. So you don't have to use all the reserved claims. In general, the payload can contain as many claims as necessary, however it is recommended to limit the information of the JWT to what is strictly necessary.

### Signature

The signature of a JSON Web Token is created using the base64 encoding of the header and payload and the specified signature / encryption method. The structure is defined by JSON Web Signature (JWS), a standard standardized according to [RFC 7515](https://tools.ietf.org/html/rfc7515).

For signing to work, it is necessary to use a secret key known only to the source application. This signature verifies on the one hand that the message will not be modified during the transfer. On the other hand, in the case of a token signed with a private key, it also authenticates the sender of the JWT.

## Where you can use JWT

JSON Web Tokens offer a number of advantages over traditional methods of authentication and authorization with cookies and are therefore used in the following scenarios :

- REST applications : In REST applications, the JWT secures the stateless protocol by sending the information for authentication directly upon request.

- Cross origin resource sharing : the JSON Web Token sends the information during the Cross Origin Resource Sharing. This has a huge advantage over cookies, which are usually not sent in this procedure.

- Use of several frameworks : JSON Web Tokens are standardized and therefore versatile. When using multiple Frameworks, they allow easy sharing of authentication data.

## Conclusion

The shape of a JSON Web Token is even the same. Many debuggers exists on the Internet to decode them.

You can find a library in each language to manage JWT. It's quite simple to implement.

These tokens are mainly used to share authentication data between apps, so they are transparent to users.
