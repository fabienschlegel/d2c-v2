---
title: 'Introduction à la technologie JWT'
pageTitle: "Introduction à JWT : la forme d'un token JSON"
date: '2021-06-17'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
excerpt: "Un JWT (JSON Web token) est un jeton d'accès qui contient toutes les informations nécessaires pour communiquer de manière sécurisée entre deux parties. Les JWT sont principalement utilisés pour les opérations d'identification et la gestion des droits d'accès des utilisateurs."
tags: ['jwt']
related: ['setup-jwt-react-django-app']
---

## Qu'est-ce que JWT ?

Il s'agit d'une norme ouverte définie par la [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519).

Un JWT (JSON Web token) est un jeton d'accès qui contient toutes les informations nécessaires pour communiquer de manière sécurisée entre deux parties. Les JWT sont principalement utilisés pour les opérations d'identification et la gestion des droits d'accès des utilisateurs.

## À quoi ressemble un jeton Web JSON ?

Un JWT est divisé en trois parties. Un en-tête, une charge utile et une signature. Ces parties sont codées sous la forme de trois chaînes Base64-URL séparées par des points.

### En-tête

L'en-tête est généralement composé de deux parties et fournit des informations essentielles sur le jeton. Il contient le type de jeton et la signature et/ou l'algorithme de cryptage utilisé.

### Charge utile

La charge utile du jeton Web JSON est la partie qui contient les informations à transmettre à l'application. C'est ici que sont définies certaines normes qui déterminent les données à transmettre. Les données de la charge utile sont appelées "claims". Il existe trois types de claims : les claims enregistrés, les claims publics et les claims privés.

- Claims enregistrés : Ils sont enregistrées dans le [IANA JSON Web Token Claim Register](https://www.iana.org/assignments/jwt/jwt.xhtml). Certaines d'entre eux sont : issuer (émetteur), exp (délai d'expiration), sub (sujet), aud (audience).

- Claims publics : Ils peuvent être définies à volonté par ceux qui utilisent les JWT. Mais pour éviter les collisions, elles doivent être définies dans le registre de jetons Web JSON de l'IANA ou être définies en tant qu'URI contenant un espace de noms résistant aux collisions.

- Claims privées : Il s'agit des claims personnalisés créés pour partager des informations entre les parties qui conviennent de les utiliser et qui ne sont ni des claims enregistrés ni des claims publics.

Toutes les claims sont facultatifs. Il n'est donc pas nécessaire d'utiliser touts les claims réservés. En général, la charge utile peut contenir autant de claims que nécessaire, mais il est recommandé de limiter les informations de la JWT au strict nécessaire.

### Signature

La signature d'un jeton Web JSON est créée à l'aide du codage base64 de l'en-tête, de la charge utile et de la méthode de signature/chiffrement spécifiée. La structure est définie par JSON Web Signature (JWS), une norme standardisée selon la [RFC 7515](https://tools.ietf.org/html/rfc7515).

Pour que la signature fonctionne, il est nécessaire d'utiliser une clé secrète connue uniquement de l'application source. Cette signature vérifie d'une part que le message ne sera pas modifié pendant le transfert. D'autre part, dans le cas d'un jeton signé avec une clé privée, elle authentifie également l'expéditeur du JWT.

## Où utiliser les JWT

Les jetons Web JSON offrent un certain nombre d'avantages par rapport aux méthodes traditionnelles d'authentification et d'autorisation avec des cookies et sont donc utilisés dans les scénarios suivants :

- Applications REST : Dans les applications REST, le JWT sécurise le protocole sans état en envoyant les informations d'authentification directement lors de la demande.

- Partage de ressources inter-origines : le JSON Web Token envoie les informations pendant le partage de ressources inter-origines. Cela présente un avantage considérable par rapport aux cookies, qui ne sont généralement pas envoyés dans le cadre de cette procédure.

- Utilisation de plusieurs cadres : les jetons Web JSON sont normalisés et donc polyvalents. Lors de l'utilisation de plusieurs frameworks, ils permettent de partager facilement les données d'authentification.

## Conclusion

La forme d'un Web Token JSON est toujours la même. De nombreux debuggers existent sur Internet pour les décoder.

Vous pouvez trouver une bibliothèque dans chaque langage pour gérer les JWT. C'est assez simple à mettre en oeuvre.

Ces tokens sont principalement utilisés pour partager des données d'authentification entre applications, ils sont donc transparents pour les utilisateurs.
