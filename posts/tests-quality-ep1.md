---
title: 'Tests et qualité de code - Les tests, comment ça marche ?'
date: '2019-09-01'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: "Aujourd'hui, on part à la découverte du merveilleux monde des tests..."
tags: ['tests', 'qualité de code']
---

### Les tests, comment ça marche ?

La suite de notre [premier article](/tests-quality-ep0). Aujourd'hui, on part à la découverte du merveilleux monde des tests...

### La méthode TDD

Le TDD ou Test Driven Development est une méthode non pas de tests mais d'écriture de code.

J'en parle en premier tout simplement parce que je ne suis pas fan.

Comme son nom l'indique le principe du développement orienté par les tests c'est de commencer par le test. On écrit le test, il échoue (bah oui la fonction associée n'existe pas encore). Ensuite on code la fonction et hop le test réussit, on passe à la suivante.

```python
import unittest # la librairie de tests

from words import capitalize # notre fonction

class TestWords(unittest.TestCase):

    def test_capitalize(self):
        "Test si la première lettre est en majuscule"

        self.assertEqual(capitalize("bob"), "Bob")

if __name__ == '__main__':
    unittest.main()
```

Dans cet exemple en Python on crée une classe qui va tester une fonction qui renvoie un mot avec la première lettre en capitale. Si on exécute ce test :

```bash
fabien@T430:~/Projets/Sandbox$ python tests.py
Traceback (most recent call last):
  File "tests.py", line 3, in <module>
    from words import capitalize
ImportError: No module named 'words'

```

On obtient une erreur d'import, puisque la fonction _capitalize_ n'existe pas. La voici donc :

```python
def capitalize(word):
    return word.capitalize()
```

On relance le test et magie, ça fonctionne :

```bash
fabien@T430:~/Projets/Sandbox$ python tests.py
.
----------------------------------------------------------------------
Ran 1 test in 0.000s
OK
```

Là où je ne suis pas fan du TDD, c'est quand on sort du monde des bisounours. Sur un vrai projet, on va se retrouver à faire plus de tests que de code. Et quand on attaque de la réécriture, faut se cogner le test **et** le code, voire plusieurs tests si on refactorise, découpe à la hache, etc.

En effet, il est préférable de ne tester d'une seule situation par test. Si notre fonction contient différentes conditions, il faudra peut être plusieurs tests, ce qui rendra le développement plus complexe au final.

Malgré tout, c'est pratique dans certaines situations et c'est important de connaitre cette méthode de travail.

### Des tests, rien que des tests

Des tests, il en existe différents types, chacun adapté à des situations différentes. Ils ont une utilité et une couverture du code différentes.

Pour Python, il y a plusieurs bibliotèques de tests, [unittest](https://docs.python.org/3/library/unittest.html) qui est intégré au langage et [pytest](http://pytest.org/en/latest/) une librairie tiers.

Pour Javascript, il en existe pas mal. Pour React, j'utilise [Jest](https://jestjs.io/en/) et [Enzyme](https://airbnb.io/enzyme/).

### Les tests unitaires

[Définition Wikipédia](https://fr.wikipedia.org/wiki/Test_unitaire)

Un exemple avec Redux, pour tester une action.

```Javascript
// une action simple avec un argument
export default operande => ({
  type: 'ADD_OPERANDE',
  operande,
});
```

```Javascript
// Notre super test
import { addOperande } from '..';

describe('Test addOperande Action', () => {
  it('add operande', () => {
    const operande = addOperande('+');
    expect(operande).toEqual({ type: 'ADD_OPERANDE', operande: '+' });
  });
});
```

Si jamais on modifie l'action en ajoutant un argument et que l'on exécute le test, celui-ci échouera.

Avec React et le principe des composants, il est plutot simple de faire des tests unitaires. Ici j'ai choisi de les grouper par type avec un répertoire \_\_tests\_\_ qui regroupe, bah les tests.

Quand j'utilise la méthode [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/), je mets chaque composant dans un répertoire et je colle les tests associés à ce composant avec.

Si tu veux plus de tests unitaires et de Python, va lire [ces articles](http://sametmax.com/un-gros-guide-bien-gras-sur-les-tests-unitaires-en-python-partie-1/) !

### Les tests d'intégration

[Définition Wikipédia](https://fr.wikipedia.org/wiki/Test_d%27int%C3%A9gration)

Pour ma part des tests d'intégration, je n'en fait pas. Avec les outils d'intégration continue, pour les applications web, je passe du test unitaire au test end to end ( de bout en bout dans la langue de Molière).

### Les tests end to end

Là, pas de définition sur Wikipédia. Mais le principe c'est de faire des tests en environnement réel.

Pour des gros projets, on a des testeurs qui vont débusquer les bugs de l'application et les remonter aux développeurs.

En effet, ces tests sont basés sur des scénarios d'utilisateurs de l'application.

Ces tests sont les seuls qui permettent de vraiment contrôler le fonctionnement d'un logiciel en environnement réel.

Pour le web, le top c'est [Sélénium](https://docs.seleniumhq.org/docs/).

On prends Sélénium, un navigateur web, le driver qui va bien pour lier le tout et on peut tester notre application.

```Python
class TestSignIn(StaticLiveServerTestCase):

    def setUp(self):
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--window-size=1420,1080')
        chrome_options.add_argument('--headless')
        self.driver = webdriver.Chrome(chrome_options=chrome_options)

        User.objects.create_user(username='johndoe', password='glass onion')

        self.driver.implicitly_wait(10)

    def tearDown(self):
        self.driver.quit()

    def _get_full_url(self, namespace):
        return self.live_server_url + reverse(namespace)

    def test_signin_succeed(self):
        """ test signin form succeed"""

        url = self._get_full_url('{}:login'.format(app_name))
        self.driver.get(url)
        self.driver.find_element_by_id('id_username').send_keys("johndoe")
        self.driver.find_element_by_id('id_password').send_keys("glass onion")
        self.driver.find_element_by_id('signInForm').submit()
        self.driver.implicitly_wait(10)
        self.assertTrue(self.driver.find_elements_by_id('linkToProfile'))
```

Sur cet exemple avec Django, petit décryptage...

- setUp permet de configurer Chrome, ici on vire le mode bac à sable, on choisit la taille de la fenêtre et le navigateur s'exécutera sans écran (pratique dans un environnement Docker).
- tearDown éteint la lumière à la fin du test.
- \_get_full_url c'est pour récupérer l'url appelée à partir de son namespace.
- test_signin_succeed, le vif du sujet, c'est notre test :
  - On indique à Sélénium le formulaire à renseigner avec les infos associés
  - Il le soumets, attends un peu que la page charge
  - Il vérifie qu'un id existe dans la page. Si il est présent, l'utilisateur voit le lien vers son profil et tout est ok.

### Et les mocks dans tout ça

Les mocks, c'est à la fois magique et totalement relou. Ils vont nous servir à imiter (merci google translate) ce que l'on ne peut pas avoir à disposition pour nos tests.

La magie, c'est par exemple quand mon site dépend d'une API quelconque. Je ne peux pas faire de requête à cet API lors de mes tests, alors comment on procède ? Eh bien, on mock ! On écrit une fonction qui va renvoyer la réponse espérée à notre requête vers l'API.

Avec les frameworks JS, genre React par exemple, on se sert du localstorage, qui est une fonction intégré au navigateur.

Pendant nos tests, on y a pas forcément accès, alors on se sert donc de ça :

```Javascript
const mock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    },
  };
})();

export default Object.defineProperty(window, 'localStorage', { value: mock });
```

Et hop ! On a les fonctions du localstorage à dispo pour nos tests.

Je sens la question arriver : Pourquoi t'as dit que c'est relou les mocks ? En fait c'est trop top !

Oui mais non, parce que dans les faits on peut être tenté de faire des mocks pour tout et n'importe quoi. Alors que ce n'est pas le but des tests. Le but c'est de contrôler la robustesse de notre projet dans des conditions les plus proches du réel.

Un mock c'est une simulation qui doit uniquement être utilisé quand tu n'as pas le choix, pas par facilité.

### Petite conclusion

Ici on a pu voir que les tests permettent d'apporter énormément à nos projets.

Ils garantissent la non régression, surveillent le fonctionnement de notre code.

Alors les tests c'est pas magique non plus, si personne ne les exécute, on pourra tout changer et ni vu ni connu j't'embrouille.

Par contre si les tests sont automatisés à chaque merge request ou mieux à chaque commit, on pourra surveiller l'évolution du code. Les merge requests seront plus simple à contrôler pour l'équipe.

---

- [Partie 0 - A quoi ça sert ?](/tests-quality-ep0)
- [Partie 1 - Les tests, comment ça marche ?](/tests-quality-ep1)
- [Partie 2 - Les linter, c'est statique et c'est déjà pas mal](/tests-quality-ep2)
- [Partie 3 - Allez hop, on pose les mains et on refactorise](/tests-quality-ep3)
- [Partie 4 - Automatiser tout ça c'est dans nos cordes](/tests-quality-ep4)
