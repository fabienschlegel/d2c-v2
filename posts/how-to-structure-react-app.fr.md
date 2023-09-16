---
title: 'Comment structurer votre application React'
pageTitle: 'Comment structurer votre application React : Meilleures pratiques et conseils'
date: '2023-01-25'
coverImage: '/assets/blog/cover-images/how-to-structure-react-app-illustration-fr.webp'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
excerpt: 'Sans une stratégie appropriée, travailler sur un projet React peut devenir une corvée quotidienne et une tâche écrasante.'

tags: ['javascript', 'typescript', 'react']
related: ['conditional-rendering-of-your-react-components', 'working-with-rest-apis-in-react']
---

React est une excellente bibliothèque pour construire des interfaces utilisateur. Mais, ce n'est pas un framework, et lorsqu'il s'agit d'organiser et de structurer le projet, on ne sait pas comment faire. Être trop libre et non guidé peut rapidement rendre votre projet ingérable.

Sans une stratégie appropriée, travailler sur un projet React peut devenir une corvée quotidienne et une tâche écrasante, en particulier pour les développeurs et les développeuses avec une expérience limitée.

## Il n'y a pas de bonne réponse

C'est le concept fondamental qu'il faut saisir lorsqu'on entreprend un projet React : il n'y a pas de solution unique et définitive. Chaque projet React est unique et nécessite sa propre stratégie car il existe de nombreuses façons d'aborder un même problème. La meilleure façon de procéder est de considérer le contexte spécifique du projet, puis de décider de la solution la plus appropriée. Cela peut impliquer l'exploration de diverses options et l'expérimentation de différentes approches, afin d'identifier la plus efficace. L'objectif est de créer un projet React qui atteigne ses objectifs et fournisse un résultat satisfaisant.

La manière la plus efficace d'organiser vos dossiers est une question de préférence personnelle, qui tient compte de la taille du projet, de la technologie utilisée et des habitudes spécifiques de l'équipe. Il peut être utile de mettre en place un système de conventions de classement pour tout projet, petit ou grand. Cela permet de s'assurer que tous les membres de l'équipe travaillent avec la même structure d'organisation des dossiers.

Prendre le temps d'examiner la stack technique du projet peut aider à déterminer les meilleures méthodes d'organisation. Par exemple, si le projet comprend une base de données, il peut être avantageux d'organiser les fichiers en suivant le schéma de la base de données, alors qu'un projet impliquant une programmation orientée objet peut nécessiter une approche différente.

Il est important de tenir compte des habitudes de l'équipe pour déterminer la meilleure méthode d'organisation des fichiers. Certaines équipes préfèrent un système de dossiers et de sous-dossiers, tandis que d'autres préfèrent un système plus libre.

Quel que soit le système de classement choisi, il est nécessaire de le documenter et de le partager avec l'équipe pour s'assurer que tous les membres sont sur la même longueur d'onde et peuvent accéder aux fichiers dont ils ont besoin.

Il est important d'être vigilant et de se mettre au défi de réfléchir aux décisions que l'on prend et aux idées que l'on émet. Prendre le temps d'y réfléchir et d'envisager les conséquences potentielles peut vous aider à faire les bons choix.

Il est également important d'être ouvert aux nouvelles idées et perspectives, car elles peuvent vous aider à voir les choses sous un angle différent et à trouver des solutions innovantes. Être attentif à ses choix et à ses idées est un élément clé du développement personnel et de la réussite.

Testez ma solution et voyez si elle répond à vos besoins. Si ce n'est pas le cas, n'hésitez pas à la peaufiner et à la modifier pour qu'elle réponde mieux à vos impératifs. Il n'existe pas de solution unique, veillez donc à l'adapter à vous.

## Diviser par utilisation

En supposant que src est le dossier racine, je divise mon code en 3 parties distinctes. Ces trois parties contribuent toutes à la structure et à la fonctionnalité de l'application. Nous commençons par la partie générique pour finir par la plus spécifique.

### La partie générique

Le premier dossier est destiné au code générique, une collection d'extraits de code qui peuvent être utilisés dans n'importe quel projet React sans aucune modification. Ce dossier peut être utilisé pour stocker tout le code qui n'est pas spécifique à un projet, comme les composants, les fonctions et autres utilitaires qui peuvent être réutilisés dans différents projets. Ce dossier est un excellent point de départ pour tout projet React, car il contient du code qui peut être utilisé à plusieurs reprises. C'est aussi un excellent moyen de gagner du temps, car vous n'avez pas à réécrire le même code.

Ce dossier sera léger et facile à maintenir si vous choisissez d'utiliser un système de design comme MaterialUI, ChakraUI ou toute autre bibliothèque similaire. En utilisant un système de conception, vous pouvez vous assurer que vos interfaces utilisateur sont cohérentes sur de nombreuses plateformes, tout en ayant un aspect et une convivialité unifiés qui seront reconnaissables. En outre, vous aurez accès à une série de fonctionnalités et de composants qui faciliteront la conception et le développement de votre interface utilisateur, ce qui vous permettra d'économiser du temps et des efforts sur le long terme.

En échange de la possibilité de produire des conceptions cohérentes pour les applications, il sera plus difficile de créer des composants personnalisés en modifiant les éléments du système de conception. En effet, les composants personnalisés nécessitent une approche plus réfléchie et une compréhension plus approfondie du système de conception. En outre, il faudra plus de temps et d'efforts pour s'assurer que les composants personnalisés sont compatibles avec le système de conception et tous ses éléments.

### La partie centrale

Tout ici est au cœur de l'application : l'authentification, le routage, les services, les constantes globales, les fichiers de configuration et les actifs. L'authentification est essentielle pour garantir la sécurité de l'application et de ses utilisateurs, tandis que le routage fournit le cadre permettant de définir les chemins de navigation et que les services offrent la possibilité d'accéder aux données et de les manipuler. Les constantes globales permettent de configurer l'application une fois pour toutes pour tous les utilisateurs, et les actifs sont utilisés pour le style et les éléments visuels. Ces composants sont essentiels au bon fonctionnement de l'application.

S'il y a quelque chose de spécifique à l'application qui n'est pas seulement utilisé par une seule fonctionnalité, il peut être stocké ici dans la section core. Cette section permet de conserver tous les éléments nécessaires ensemble et de les rendre facilement accessibles, ce qui facilite la gestion et la maintenance de l'application.

En outre, cette section sert de plaque tournante centralisée pour tous les différents composants essentiels au bon fonctionnement de l'application. Ainsi, les développeurs et les concepteurs peuvent accéder rapidement aux éléments nécessaires et apporter les modifications requises pour assurer le bon fonctionnement de l'application.

### La partie sur les caractéristiques

La dernière partie concerne les fonctionnalités. Il s'agit d'une partie importante du produit dans son ensemble, et j'ai tendance à l'appeler "features, business" ou quelque chose de ce genre. Il s'agit plus d'une suggestion que d'une règle, donc le nom exact n'est pas crucial.

Tout ce qui compte, c'est que les caractéristiques soient incluses dans le produit, car elles sont essentielles à son succès. Les caractéristiques doivent être soigneusement étudiées, car ce sont elles qui permettent au produit de se démarquer de ses concurrents sur le marché.

Chaque dossier est une caractéristique unique de l'application, et j'ai veillé à conserver le même modèle pour chacun d'entre eux, quel que soit le nombre de fichiers qu'il contient.

Cette méthode garantit la cohérence de l'application. Elle permet de s'assurer que chaque fonctionnalité fonctionne comme il se doit. C'est un avantage car cela rend le processus de développement plus rapide et plus efficace. Il est également plus facile d'identifier les problèmes potentiels qui peuvent survenir, ce qui permet à l'utilisateur de vivre une expérience plus transparente.

Il est primordial de veiller à la cohérence des conventions de dénomination lorsqu'un nouveau développeur est recruté pour un projet. Il sera ainsi plus facile pour le développeur de saisir rapidement les concepts sous-jacents et de comprendre le travail à effectuer.

En outre, il rationalise la communication entre les membres de l'équipe, ce qui leur permet de discuter du projet de manière plus efficace et efficiente. Cela permet non seulement de gagner du temps, mais aussi de créer un environnement de travail plus productif.

## Conclusion

Cette architecture est en constante amélioration et s'adapte au contexte du projet. Essayez-la et faites-moi part de vos commentaires [ici](https://twitter.com/fabienschlegel).

À plus tard !
