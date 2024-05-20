---
title: 'Supprimer des librairies utilitaires comme Lodash'
pageTitle: 'Comment optimiser votre projet en supprimant des libs utilitaires'
date: '2024-05-21'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/remove-lib-like-lodash-from-your-code-illustration-fr.webp'
excerpt: 'Découvrez comment réduire la dépendance à des librairies externes comme Lodash pour améliorer la performance et la maintenance de votre code TypeScript.'
tags: ['typescript']
related: ['typescript-for-react-development', 'javascript-reduce-method']
---

Quand on démarre un projet, on veut souvent aller vite. Et pour allier productivité et facilité de développement, on ajoute des librairies utilitaires.

Mais cette quête de simplicité peut parfois conduire à une dépendance forte à des librairies utilitaires externes telles que Lodash.

Cette librairie JavaScript, largement utilisée, offre une panoplie de fonctions utilitaires facilitant la manipulation de données, la gestion des tableaux et bien plus encore.

### La tentation de Lodash (ou d’autres)

La popularité de Lodash s'explique facilement. Sa vaste gamme de fonctionnalités et de méthodes éprouvées répondent à beaucoup de traitement commun dans les applications web.

Malgré ses avantages évidents, la dépendance excessive à Lodash ou tout autre librairie externe peut présenter des inconvénients majeurs en termes de performance, de maintenabilité et de sécurité de notre code. Dans cet article, nous explorerons les raisons pour lesquelles vous devriez envisager de réduire votre dépendance à ce type de librairies dans vos projets TypeScript. Nous examinerons également les alternatives disponibles et les méthodes pour effectuer cette transition en douceur.

## Les inconvénients de la dépendance

Lorsqu'une base de code TypeScript devient trop dépendante d’une librairie, on peut se retrouver avec plusieurs inconvénients significatifs, affectant à la fois les performances et la maintenabilité du code.

### Impact sur les performances

L'un des premiers inconvénients réside dans son impact sur les performances de l'application. En effet, chaque fois que nous intégrons une fonction externe, nous augmentons la taille du bundle JavaScript généré.

Plus le bundle JavaScript est volumineux, plus le temps de chargement de l'application sera long. Cela peut entraîner une expérience utilisateur médiocre, en particulier sur des réseaux lents ou des appareils avec des ressources limitées.

### Complexité accrue de la base de code

Une dépendance excessive peut également entraîner une complexité accrue de la base de code. En ajoutant des dépendances externes, nous introduisons de nouveaux points de rupture potentiels dans notre application. La maintenance et la gestion des versions deviennent plus complexes, car nous devons surveiller et mettre à jour régulièrement les versions de ces librairies utilisées dans notre projet.

De plus, la dépendance à une librairie externe peut rendre le code moins lisible et plus difficile à comprendre pour les nouveaux développeurs rejoignant l'équipe.

### Risques de sécurité

Cette dépendance peut aussi présenter des risques de sécurité pour notre application. Chaque dépendance ajoutée à notre projet introduit potentiellement de nouvelles vulnérabilités. Si ces dépendances ne sont pas régulièrement mises à jour pour inclure les derniers correctifs de sécurité, notre application pourrait être exposée à des attaques potentielles.

Même si nous ajoutons de nombreuses fonctionnalités utiles, les dépendances peuvent entraîner des conséquences néfastes pour nos projets TypeScript. Il est donc important d'évaluer attentivement notre utilisation de ces librairies et de rechercher des alternatives lorsque cela est possible.

## Trouver des alternatives

Il existe plusieurs alternatives disponibles, notamment des fonctionnalités natives de JavaScript/TypeScript ainsi que d'autres librairies plus légères et spécialisées.

### Utilisation des fonctionnalités natives de JavaScript/TypeScript

JavaScript et TypeScript offrent un ensemble riche de fonctionnalités intégrées pour manipuler des données, des tableaux, des chaînes et bien plus encore. En réévaluant nos besoins en matière de manipulation de données, nous pourrions découvrir que de nombreuses tâches pour lesquelles nous utilisons actuellement Lodash peuvent être facilement accomplies en utilisant des fonctions natives.

Par exemple, des opérations courantes telles que la recherche, le filtrage et le tri de tableaux peuvent être réalisées en utilisant des méthodes comme `filter`, `map`, `reduce`, etc.

Prenons un exemple concret, venant de Lodash. La fonction `flow` prend en paramètres une liste de fonctions, sous forme de tableau ou d'arguments individuels, et renvoie une fonction qui prend une valeur comme argument et l'exécute à travers les fonctions originales données.

C’est une fonction très utile pour réaliser dynamiquement des traitements successifs sur des données.

Voici son implémentation quasi équivalente en TypeScript. La seule limitation vient de notre typage générique, qui nous oblige à garder le même type de données en entrée et en sortie de nos méthodes. Nous pouvons donc la remplacer dans la majorité des cas.

```typescript
function pipe<T>(...fns: Array<(arg: T) => T>) {
  return function (value: T) {
    return fns.reduce((acc, fn) => fn(acc), value);
  };
}
```

### Utilisation des fonctionnalités intégrées dans TypeScript

De même, TypeScript offre des fonctionnalités intégrées puissantes pour manipuler les objets, les tableaux et les chaînes de caractères. Par exemple, les types génériques, les fonctions fléchées, les types d'énumération et les interfaces peuvent être utilisés pour simplifier et améliorer la maintenabilité de notre code.

En explorant et en utilisant ces fonctionnalités intégrées, nous pouvons réduire notre dépendance à des librairies externes comme Lodash tout en améliorant la lisibilité et la maintenabilité de notre code.

### Utilisation de librairies plus légères et spécialisées

Enfin, lorsque des fonctionnalités spécifiques ne sont pas disponibles dans les fonctionnalités natives de JavaScript/TypeScript, nous pouvons rechercher des librairies alternatives plus légères et spécialisées. Ces librairies sont souvent conçues pour des cas d'utilisation spécifiques et offrent généralement des performances meilleures ou comparables, tout en ayant une empreinte plus légère.

En explorant ces alternatives, nous pouvons réduire notre dépendance à des librairies externes comme Lodash tout en améliorant la performance, la maintenabilité et la sécurité de notre code TypeScript. Dans la section suivante, nous verrons comment mettre en œuvre ces alternatives pour supprimer progressivement Lodash de notre base de code.

## Les méthodes pour supprimer les dépendances

Maintenant que nous avons identifié les inconvénients de la dépendance excessive et exploré les alternatives disponibles, examinons les méthodes pratiques pour supprimer ces librairies de notre base de code TypeScript.

### Analyse de l'utilisation actuelle dans le projet

La première étape consiste à analyser attentivement son utilisation actuelle dans notre projet. Nous devons identifier toutes les occurrences de la librairie dans notre base de code et comprendre quelles fonctionnalités sont utilisées et dans quel contexte.

Cela peut être fait en effectuant une recherche dans tout le projet pour les importations (par exemple `import * as _ from 'lodash'` pour Lodash) ainsi que pour les appels de fonctions spécifiques.

### Identification des fonctionnalités utilisées et des alternatives disponibles

Une fois que nous avons une vue d'ensemble de l'utilisation de la librairie dans notre projet, nous devons identifier les fonctionnalités spécifiques qui sont utilisées et rechercher des alternatives disponibles dans JavaScript/TypeScript ou d'autres librairies plus légères et spécialisées.

Pour chaque fonctionnalité utilisée, nous devons évaluer si elle peut être remplacée par une fonction native ou une librairie alternative, en tenant compte des performances, de la maintenabilité et de la compatibilité de notre code.

### Utilisation du tree shaking pour des méthodes ciblées

Une approche efficace pour ajouter des méthodes ciblées sans inclure toute une librairie dans notre projet consiste à utiliser le tree shaking. Le tree shaking est une technique d'optimisation du bundle qui élimine les parties inutilisées du code lors de la construction de notre application.

Avec le tree shaking, nous pouvons importer uniquement les méthodes dont nous avons besoin dans notre code, plutôt que d'importer toute la librairie. Par exemple, si nous n'utilisons que la méthode `map` de Lodash, nous pouvons l'importer de la manière suivante :

```typescript
import map from 'lodash/map';
```

Cela permet au bundler de détecter que seule la méthode `map` est utilisée et de l'inclure dans le bundle final, tout en éliminant les autres parties inutilisées de la librairie.

Il est aussi possible d’ajouter uniquement la fonction au fichier `package.json` en installant uniquement la méthode nécessaire avec `npm install lodash/map`.

### Étapes pour remplacer progressivement les utilisations

Une fois que nous avons identifié les fonctionnalités à remplacer et les alternatives disponibles, nous pouvons commencer à les remplacer progressivement par des implémentations natives ou alternatives.

Cela peut être fait en suivant une approche incrémentielle, une à la fois et en vérifiant que le comportement de notre application reste cohérent à chaque étape. Il est également essentiel de mettre en place des tests automatisés pour garantir que les modifications ne causent pas de régressions dans notre application.

### Suivi régulier et documentation

Enfin, une fois que nous avons réduit notre dépendance, il est important de maintenir un suivi régulier des nouvelles fonctionnalités natives de JavaScript/TypeScript et des librairies alternatives. En restant à jour avec les évolutions du langage et de l'écosystème, nous pouvons continuer à optimiser et à améliorer notre base de code.

De plus, documenter les changements apportés et les raisons sous-jacentes à ces changements peut aider à faciliter la compréhension du code par les membres de l'équipe et à assurer une transition en douceur pour les futurs développeurs rejoignant le projet.

## Étude de cas : Migration vers des solutions natives

Pour illustrer concrètement le processus de migration vers des solutions natives, prenons l'exemple d'une application web développée en TypeScript qui utilise des dépendances comme Lodash.

Voyons ensemble les étapes concrètes à suivre pour réussir.

1. **Analyse de l'utilisation** : Nous commençons par analyser notre application en recherchant toutes les occurrences des librairies à substituer dans notre code. Nous identifions les fonctionnalités spécifiques utilisées et évaluons si elles peuvent être remplacées par des méthodes natives ou des alternatives plus légères.
2. **Identification des alternatives** : Pour chaque fonctionnalité utilisée, nous recherchons des alternatives dans les fonctionnalités natives de JavaScript/TypeScript ou dans d'autres librairies plus légères et spécialisées. Nous pouvons utiliser des ressources externes comme **[You-Dont-Need-Lodash-Underscore](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore),** StackOverflow ou ChatGPT. Si le remplacement est impossible, utiliser le tree-shaking va nous aider à limiter les dépendances externes.
3. **Remplacement progressif** : Nous commençons à remplacer progressivement les méthodes détectées par des implémentations natives ou alternatives. Nous effectuons des tests rigoureux à chaque étape pour garantir que le comportement de l'application reste cohérent.
4. **Documentation et formation** : Nous documentons les changements apportés et les raisons à ces changements pour faciliter la compréhension du code par les membres de l'équipe.

## Conclusion

Au travers de cet article, nous avons pu voir la possibilité de réduire notre dépendance à des packages externes dans nos applications. Lodash n’est qu’un exemple et ces solutions peuvent être transposées à n’importe quelle librairie.

N’oubliez pas aussi que certaines librairies sont utiles à conserver. Elles sont maintenues par des développeurs et des développeuses de talent qui veillent à la qualité de leur code.

Il faut parfois choisir intelligemment entre dépendance et gain de temps. Certaines méthodes sont faciles à remplacer grâce au contexte de notre projet. Mais d’autres nécessiteraient trop de temps et d’énergie. Dans ce cas il est plus sage de choisir la dépendance à des librairies externes.
