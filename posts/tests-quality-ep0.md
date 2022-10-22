---
title: 'Tests et qualité de code - A quoi ça sert ?'
date: '2019-08-26'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: "Les tests ça sert à rien ! Visiteur d'ici et d'ailleurs, tu entendras souvent ces mots dans la bouche de faiseurs de code..."
tags: ['tests', 'qualité de code']
---

**Les tests ça sert à rien !**

Visiteur d'ici et d'ailleurs, tu entendras souvent ces mots dans la bouche de faiseurs de code...

Le type qui a chiffré ton projet a forcément rajouté du temps pour les tests mais c'est bouffé parce qu'on est en retard, y a pas de budget, pense à ma retraite en Thaïlande, gna gna gna...

### Tests, késako ?

Les tests ça sauve la vie quand c'est bien fait et bien pensé.

Leur utilité première c'est la non régression du code.

Exemple tiré de la vie réelle :

Tu développes une fonctionnalité et une semaine après quelqu'un se sert d'une de tes fonctions ailleurs dans le projet.

Il la modifie, et ping, ta fonctionnalité, très belle et bien faite c'est certain ;) elle plante...

Deuxième utilité, c'est les bugs :

Malgré le fait que tu sois au top, quand on commence à écrire des fonctions qui font le beurre, l'argent du beurre, la crémière et sa bonne humeur, on ne peut pas tout prévoir.

En faisant des tests sur tout les if/else, forloop et j'en passe, on élimine souvent les risques d'effets de bord du code et parfois on trouve des problèmes qu'on avait pas repéré en première lecture.

### Et la qualité de code alors

Écrire du code plus qualitatif c'est important pour pleins de raisons.

Tu reviens dessus trois mois après, et là les variables a,b,c et les class GolDoRak c'est le drame.

La personne qui maintiendra le projet après toi te maudiras sur 10 générations.

La première solution est dans les noms des variables, des classes et des fonctions. Plus leur nom est clair, meilleure sera la compréhension du code associé.

La deuxième c'est mettre des commentaires. Ils permettent de comprendre ce que tu as voulu faire surtout trois mois après.

Voici des liens avec des guides de règles d'écriture de code. Ils regroupent des bonnes pratiques à suivre pour Javascript et Python.

- [AirBnB javascript styleguide](https://github.com/airbnb/javascript)

- [PEP8 Python](https://www.python.org/dev/peps/pep-0008/)

Si tu veux que je rajoute celui de ton langage préféré, envoie un message, ça sera avec plaisir...

### C'est tout pour le moment

Une introduction sur le sujet avec un peu de lecture pour les courageux. J'espère que ça vous aura plu.

Les articles suivants rentreront plus dans les détails avec des exemples Javascript et Python.

---

Ce post sera le premier d'une série sur les tests et la qualité de code.

- [Partie 0 - A quoi ça sert ? (Boum tu viens de le lire, bravo !)](/tests-quality-ep0)
- [Partie 1 - Les tests, comment ça marche ?](/tests-quality-ep1)
- [Partie 2 - Les linter, c'est statique et c'est déjà pas mal](/tests-quality-ep2)
- [Partie 3 - Allez hop, on pose les mains et on refactorise](/tests-quality-ep3)
- [Partie 4 - Automatiser tout ça c'est dans nos cordes](/tests-quality-ep4)
