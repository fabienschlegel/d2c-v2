---
title: "Tests et qualité de code - Automatiser tout ça c'est dans nos cordes"
date: '2019-09-22'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: "Automatiser tout ça c'est dans nos cordes"
tags: ['tests', 'qualité de code']
---

Et voila, c'est déjà le dernier tour, on est près de l'arrivée.

Notre projet est vérifié par un linter, blindé de tests trop top, et on contrôle la qualité de notre code.

Maintenant, le problème c'est qu'on aura jamais le temps / l'envie / le courage (raye la mention inutile) d'exécuter tout le bouzin à chaque commit.

Alors là, grosse décision, on lâche rien, on va automatiser en mode CI/CD, comme ça le serveur bossera à notre place (cette feignasse de pingouin).

### CI/CD c'est quoi ça

[La phrase des mecs de Red Hat](https://www.redhat.com/fr/topics/devops/what-is-ci-cd) est trop belle pour ne pas la citer :

> L'approche CI/CD permet d'augmenter la fréquence de distribution des applications grâce à l'introduction de l'automatisation au niveau des étapes de développement des applications.

Bordel, j'en ai la larme à l’œil, on dirait du Victor Hugo.

Plus simplement, on peut découper l'idée en deux parties :

- Continuous Integration : l'intégration continue c'est ce qui va nous permettre d'ajouter quotidiennement nos nouveaux développements dans notre projet. On va automatiser toute la vérification de nos changements et la fusion avec le reste du projet.
- Continuous Deployment : le déploiement continu, lui va nous permettre de distribuer notre application vers les environnements de recette et de production.

### La mise en place

Il existe pas mal d'outils permettant de mettre en place ce type de solution.

- Jenkins
- TravisCI
- CircleCi
- Codeship
- Gitlab CI

Comme la majorité de mes dépôts sont sur Gitlab, je vais l'utiliser comme exemple avec un projet Django déployé sur Heroku.

Gitlab CI, sur gitlab.com fonctionnent avec des runners partagés entre tout les utilisateurs. Suivant les heures de la journée, il faudra attendre qu'un runner (container docker) se libère pour exécuter les jobs (en gros les tâches) du pipeline (la liste des tâches).

A chaque commit envoyé sur le dépôt ou à chaque merge request, GitlabCI va exécuter le pipeline.

GitlabCI utilise un fichier YAML qu'il faut nommer _.gitlabci.yml_ et déposer à la racine du projet. Rien de compliqué.
On va découper notre chaîne de tâches en différents stages (étapes).

Un stage que l'on va appeler _test_, pour les tests et la qualité de code et un stage _deploy_, qui va servir à déployer notre projet.

```yaml
stages:
  - test
  - deploy

test:
  stage: test
  image: joyzoursky/python-chromedriver:3.7-selenium
  services:
    - postgres:11.3-alpine
    - docker:dind
  variables:
    DBUS_SESSION_BUS_ADDRESS: '/dev/null'
    SECRET_KEY: 'fake_key'
    DEBUG: 'False'
    ALLOWED_HOSTS: '.localhost'
    EMAIL_HOST: ''
    EMAIL_PORT: ''
    EMAIL_HOST_USER: ''
    EMAIL_HOST_PASSWORD: ''
    EMAIL_USE_TLS: ''
    DEFAULT_FROM_EMAIL: ''
    DATABASE_URL: 'postgres://db_user:fakepassword@postgres:5432/sample'
    POSTGRES_DB: sample
    POSTGRES_USER: db_user
    POSTGRES_PASSWORD: fakepassword

  cache:
    paths:
      - ~/.cache/pip/

  before_script:
    - apt-get update -qy
    - apt-get install -y libpq-dev python-dev python-pip
    - python -V
    - pip install -r requirements/ci.txt
    - mkdir static
    - python manage.py collectstatic
    - gunicorn -D core.wsgi

  script:
    - coverage run --source="." manage.py test -v 3
    - coverage report

codequality:
  stage: test
  image: docker:stable
  variables:
    DOCKER_DRIVER: overlay2
  allow_failure: true
  services:
    - docker:stable-dind
  script:
    - export SP_VERSION=$(echo "$CI_SERVER_VERSION" | sed 's/^\([0-9]*\)\.\([0-9]*\).*/\1-\2-stable/')
    - docker run
      --env SOURCE_CODE="$PWD"
      --volume "$PWD":/code
      --volume /var/run/docker.sock:/var/run/docker.sock
      "registry.gitlab.com/gitlab-org/security-products/codequality:$SP_VERSION" /code
  artifacts:
    reports:
      codequality: gl-code-quality-report.json

staging_deploy:
  stage: deploy
  script:
    - apt-get update -qy
    - apt-get install -y ruby-dev
    - gem install dpl
    - dpl --provider=heroku --app=super-staging --api-key=$HEROKU_SECRET_KEY
  only:
    - develop

production_deploy:
  stage: deploy
  script:
    - apt-get update -qy
    - apt-get install -y ruby-dev
    - gem install dpl
    - dpl --provider=heroku --app=super --api-key=$HEROKU_SECRET_KEY
  only:
    - master
```

On attaque la partie lourde du truc. Pour faire nos tests avec Django, on va utiliser Docker. Certains tests nécessitent en effet de lancer un vrai serveur web Django, d'utiliser Chrome et Sélénium cf [la partie 1 de la série](/tests-quality-ep1).

C'est tout l’intérêt du Docker Hub, quelqu'un a développé le container dont on a pile poil besoin. On met le nom du container principal dans _image_.

Dans _services_, on va ajouter les containers secondaires dont on a besoin :

- postgres:11.3-alpine, c'est pour la partie base de données
- docker:dind c'est pas du poulet, c'est docker-in-docker, qui permet de démarrer des containers dans un container, vu que le runner de Gitlab en est un.

_variables_ nous permet d'inclure les variables d'environnement nécessaires au projet. Si certaines variables sont secrètes, genre clé d'API AWS ou Google Maps, on l'ajoute dans les settings de gitlabci et on le récupère avec un $NOTRE_VARIABLE.

_cache_ permet de stocker les packages python ou les dépendances npm dans un cache.

_before_\__script_, c'est l'étape avant. Ici on met à jour notre container, on installe notre projet et on lance gunicorn, un server WSGI en Python.

_script_ c'est le coeur de notre étape, on lance coverage, qui va exécuter nos tests et générer un rapport. Une fonctionnalité de GitlabCI va parser le résultat avec une expression régulière pour nous donner le pourcentage de couverture dans le merge request.

![coverage](/assets/blog/content-images/tests_ep4_coverage.png)

Si un test foire, le job passe en erreur et fait échouer le pipeline entier.

On passe à l'autre étape de notre stage test, la qualité de code. Là j'ai rien inventé, c'est fourni par GitlabCI.

_allowfailure_ à true permet, dans le cas où le job échoue, de ne pas planter le pipeline entier.

Le résultat de code quality est envoyé vers un fichier json et on va retrouver le résultat dans notre merge request.

![capture merge request](/assets/blog/content-images/tests_ep4_merge_request.png)

Dernière étape de notre automatisation, le déploiement.

Alors les deux blocs sont ressemblants, sauf :

- sur le nom de notre appli heroku, une pour le staging et une pour la production.
- sur la branche qui déclenche le job via le réglage _only_.

Maintenant si le pipeline foire, à chaque commit, on aura un joli mail.
Les merge request ne se feront automatiquement que si le pipeline est ok.

Grace à tout ce process, on va s'épargner un tas de boulot au fil de la vie de notre projet.

### C'est déjà la fin

Voila, on arrive au bout de notre série.

J'espère t'avoir fourni de quoi te plonger dans plusieurs sujets passionnants que je n'ai fait qu'effleurer.

N'hésites pas à laisser un commentaire ou un message privé sur mon LinkedIn ou mon Twitter, ça me permettra de m'améliorer pour la suite !

---

- [Partie 0 - A quoi ça sert ?](/tests-quality-ep0)
- [Partie 1 - Les tests, comment ça marche ?](/tests-quality-ep1)
- [Partie 2 - Les linter, c'est statique et c'est déjà pas mal](/tests-quality-ep2)
- [Partie 3 - Allez hop, on pose les mains et on refactorise](/tests-quality-ep3)
- [Partie 4 - Automatiser tout ça c'est dans nos cordes](/tests-quality-ep4)
