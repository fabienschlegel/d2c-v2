---
title: 'Tests et qualité de code - Allez hop, on pose les mains et on refactorise'
date: '2019-09-15'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: "Quand on est dans l'écriture de code et qu'on arrive à une solution fonctionnelle, on passe à la suite. En procédant de cette manière, on va produire de la dette technique."
tags: ['tests', 'qualité de code']
---

### C'est le début de la fin

Au bout d'un certain temps, ça va arriver, il va falloir retourner dans du vieux code, genre d'il y a (mets la date que tu veux, ça n'a pas d'importance).

Et là, c'est le drame, tout bascule. Pas de commentaires, les variables c'est des a, des b, des siMaTanteEnAvait et des fonctions de 80 lignes avec des if/else partout, bref le type chargé de relire le code avant le merge aka Super Lead Dev était en vacances...

Quand on est dans l'écriture de code et qu'on arrive à une solution fonctionnelle, on est content, on lève les mains du clavier, on commit, et on passe à la suite.

En procédant de cette manière, on va produire du code de merde et surtout de la dette technique.

La dette technique c'est quand on ajoute des éléments dans un projet ( code, dépendances, librairies, frameworks, etc) qui vont le rendre plus complexe, plus difficile à maintenir et générer des heures de taf en plus.

### On dit merci qui

Pour améliorer la qualité du code sans pleurer toutes les cinq minutes auprès des plus expérimentés de l'équipe on va utiliser un outil qui va analyser notre code.

Pour ma part j'utilise [Code Climate](https://codeclimate.com/quality/), c'est pas le seul mais il est gratuit pour les projets Github publics et simple à mettre en oeuvre en local avec docker pour les autres projets.

La version web attachée aux projets Github publics est plus complète, le portail analysant les données trouvés par les moteurs.

### Les bases

Code Climate indique une maintenabiblité global pour le projet dans l'onglet code, un indice par fichier avec une lettre de A à F et un temps pour refactoriser le fichier.

#### Le turnover versus maintenabilité

![turnover versus maintenabilité](/assets/blog/content-images/tests_ep3_churn_vs_maintenability.png)

L'idée est simple, plus un fichier est modifié souvent, plus il est difficile de le maintenir, ce graph permet de suivre cette info.

#### La dette technique

![graphique dette technique](/assets/blog/content-images/tests_ep3_technical_debt.png)

Ici on va trouver un graphique qui va indiquer le pourcentage de dette technique ainsi que le temps nécessaire pour refactoriser le code.

### Les problèmes commencent

Pour chaque fichier, on va avoir plein d'infos sur les problèmes rencontrés.

#### Complexité cognitive

La complexité cognitive mesure la difficulté à lire et à comprendre une portion de code.

Typiquement, l'imbrication de code avec plusieurs couches contenant des boucles, des conditions et des try/except (Python ou try/cath en JS) augmente la difficulté à comprendre une fonction.

Idem pour tout ce qui casse le déroulement d'une fonction. Les mêmes que pour l'imbrication et on ajoute les switch/case, les combinaisons d'opérateurs logiques, etc.

```javascript
if (
  date !== '' &&
  endDate !== '' &&
  (date !== prevProps.date ||
    time !== prevProps.time ||
    endDate !== prevProps.endDate ||
    endTime !== prevProps.endTime)
) {
  if (moment(`${date} ${time}`).isBefore(moment(`${endDate} ${endTime}`))) {
    this.toggleButton(true);
    onTA('danger', "La date de fin du vote ne peut pas être supérieure à la date de l'événement");
    setTimeout(() => {
      offTA();
    }, 5000);
  } else if (moment(date).isBefore(moment(), 'day')) {
    onTA('warning', "Ca c'était avant, un peu tard pour programmer événement ;-) !");
    setTimeout(() => {
      offTA();
    }, 5000);
  } else if (
    endDate !== '' &&
    endTime !== '' &&
    moment(`${endDate} ${endTime}`).isBefore(moment())
  ) {
    onTA('warning', 'Ca va être compliqué de voter, la fin du vote est passée !');
    setTimeout(() => {
      offTA();
    }, 5000);
  } else if (disabledButton === true) {
    this.toggleButton(false);
  }
}
```

Un exemple de portion de code à refactoriser...

#### Complexité cyclomatique

La complexité cyclomatique ou mesure de McCabe indique le nombre de chemins ou de décisions qu'un algorithme peut suivre dans un programme informatique.

Pour Python, on va utiliser Radon, qui va appliquer tout un malus à chaque embranchement dans la fonction. Si on dépasse un seuil fixé à l'avance, la fonction est marquée comme trop complexe et à retravailler.

Ca reste différent de la complexité cognitive, meme si les deux sont liés.

#### Duplication de code

La c'est assez transparent, si deux portions de code sont trop ressemblantes, le moteur va considérer qu'il y a duplication. Reste plus qu'à isoler dans une fonction pour supprimer le doublon !

### Et en local c'est la même

Comme dit au début, l'interêt de Code Climate, c'est qu'ils fournissent une version open source de leur moteur que l'on va pouvoir utiliser en local ou en intégration continue.

On configure avec un joli fichier YAML.

```yaml
version: 2

checks:
  identical-code:
    config:
      threshold: 25
  similar-code:
    config:
      threshold: 50

plugins:
  duplication:
    enabled: true
    debug: true
    config:
      languages:
        - python
        - javascript
  fixme:
    enabled: true
  radon:
    enabled: true
  sonar-python:
    enabled: true
  pep8:
    enabled: true
  eslint:
    enabled: true

exclude_patterns:
  - 'htmlcov/'
  - '*/migrations/'
  - '*/tests/'
```

Je t'économise l'explication du truc mais si ça t'intéresse rendez-vous sur la [documentation](https://docs.codeclimate.com/docs/advanced-configuration).

En suivant, c'est la commande pour executer le moteur en local. Après avoir récupéré les containers de l'outil et des moteurs avec un docker pull, on lance la commande.

Le chevron à la fin indique sous Linux que l'on copie le résultat vers le fichier cc_report.html.

```bash
docker run   --interactive --tty --rm   --env CODECLIMATE_CODE="$PWD"
--volume "$PWD":/code   --volume /var/run/docker.sock:/var/run/docker.sock
--volume /tmp/cc:/tmp/cc codeclimate/codeclimate analyze -f html > cc_report.html
```

### C'est la fin de la fin

Et voila, c'est tout pour aujourd'hui. On se retrouve la semaine prochaine pour la suite et fin de notre série.

---

- [Partie 0 - A quoi ça sert ?](/tests-quality-ep0)
- [Partie 1 - Les tests, comment ça marche ?](/tests-quality-ep1)
- [Partie 2 - Les linter, c'est statique et c'est déjà pas mal](/tests-quality-ep2)
- [Partie 3 - Allez hop, on pose les mains et on refactorise](/tests-quality-ep3)
- [Partie 4 - Automatiser tout ça c'est dans nos cordes](/tests-quality-ep4)
