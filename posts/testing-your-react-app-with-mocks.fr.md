---
title: 'Tester votre application React avec des mocks'
pageTitle: 'Tester votre application React avec Mocks : Meilleures pratiques et exemples'
date: '2022-08-19'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
excerpt: "Les tests permettent d'éviter les régressions et rendent votre application React plus sûre et plus facile à maintenir."
tags: ['react', 'Typescript']
related: ['how-to-test-react-hooks']
---

Pour votre application, vous avez besoin de tests.

Les tests évitent les régressions et rendent votre application plus sûre et plus facile à maintenir. Il n'est pas facile d'écrire des tests pour de nombreuses raisons. Quelques-unes d'entre elles sont les caractéristiques du navigateur ou les API externes. Elles ne sont pas disponibles pendant l'exécution de nos tests.

Pour résoudre ce problème, nous avons les mocks.

## Les mocks sont magiques

Nous les utiliserons pour imiter ce que nous ne pouvons pas avoir à disposition pour nos tests.

La magie, c'est par exemple lorsque mon application dépend du _localStorage_. Je ne peux pas demander cette API pendant mes tests, alors comment faire ? Eh bien, nous simulons !

## Mocker le _localStorage_

Avec les frameworks JS, comme React, par exemple, nous utilisons le _localStorage_, qui est une fonction intégrée au navigateur.

Elle nous aide à stocker certaines données sous forme de chaîne de caractères. Nous pouvons utiliser la fonction `JSON.stringify()` pour les stocker et `JSON.parse()` pour restaurer nos données.

Pour simuler cette fonctionnalité du navigateur, nous devons créer une fonction et la lier à l'objet window.

```typescript
interface LocalStorage {
  [key: string]: string;
}

const mock = (() => {
  let store: LocalStorage = {};
  return {
    getItem(key: string) {
      return store[key];
    },
    setItem(key: string, value: string | number) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    },
  };
})();

export default Object.defineProperty(window, 'localStorage', { value: mock });
```

Grâce à cette fonction, nous pouvons simuler toutes les caractéristiques du _localStorage_. Regardez les tests ci-dessous.

```typescript
import LS from '../__mocks__/localStorage';

describe('Test i18n', () => {
  beforeEach(() => {
    LS.window.localStorage.clear();
  });

  afterEach(() => {
    LS.window.localStorage.clear();
  });

  it('Get date locale namespace default', () => {
    const locale = getDateLocale();

    expect(locale).toBe(enGB);
  });

  it('Get date locale namespace with french detected', () => {
    LS.window.localStorage.setItem('i18nextLng', 'fr-FR');

    const locale = getDateLocale();

    expect(locale).toBe(fr);
  });
});
```

Nous utilisons le mock pour placer nos données dans notre _localStorage_ et la fonction testée renverra la valeur attendue.

## Simuler la réponse

D'autres parties de notre code sollicitent le back-end ou des services tiers. Nous devons tester le modèle de la charge utile que nous recevons de ces services.

Nous voulons être sûrs que notre code sera suffisamment robuste pour gérer les réponses. Qu'il s'agisse de retours positifs (données) ou négatifs (erreurs).

Pendant nos tests, nous ne pouvons pas demander ces services, nous connecter à eux ou prédire leurs réponses en direct.

Mais nous connaissons le modèle de leurs réponses grâce à leur documentation.

Pour certains des projets sur lesquels je travaille, j'utilise [Axios](https://github.com/axios/axios) pour les requêtes. Pour nos tests, nous pouvons utiliser [Moxios](https://github.com/axios/moxios). Axios fournit cette bibliothèque pour simuler nos requêtes.

Voici un exemple de ce type de test.

```typescript
const mockSuccess = (data: any): Payload => ({ status: 200, response: data });

describe('Test useIsUnique hook', () => {
  beforeEach(() => {
    moxios.install(axiosInstance);
  });

  afterEach(() => {
    moxios.uninstall(axiosInstance);
    jest.resetAllMocks();
  });

  const setUp = () => renderHook(() => useIsUnique('/fake'));

  it('useIsUnique request is success and data is unique', async () => {
    const data: { data: never[] } = { data: [] };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockSuccess(data));
    });

    const { result, waitForNextUpdate } = setUp();

    const [isUnique, isLoading, setLoading] = result.current;

    act(() => {
      setLoading(true);
    });

    expect(isLoading).toBeTruthy();

    await waitForNextUpdate();

    expect(isLoading).toBeFalsy();
    expect(isUnique).toBeTruthy();
  });
});
```

Maintenant, quelques explications sur ce test.

Axios fonctionne avec des promesses, donc nos tests doivent être asynchrones. Nous configurons Moxios avec notre instance Axios et notre hook React. La fonction wait de Moxios renverra la réponse.

Dans ces tests, nous allons vérifier que la variable `isLoading` est fixée à true pour lancer la requête. Quand nous recevons la réponse, `isLoading` revient à false et `isUnique` est correctement positionné.

## Simuler le temps

Tester les dates est très pénible. Maintenant n'est pas maintenant une seconde plus tard, alors comment tester une fonction qui compare maintenant avec une date pour définir si c'est demain ou hier ?

Pour nos tests, nous pouvons utiliser [Jest](https://jestjs.io/), un framework de test pour JavaScript. Regardez les tests ci-dessous pour le voir à l'œuvre.

```typescript
describe('Test RequestService - buildDownloadedFileName property', () => {
  const operation = 'fake-test';
  const fileType = {
    mimeType: MimeTypeEnum.CSV,
    extension: ExtensionsEnum.CSV,
  };
  beforeEach(() => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() => new Date('2022-08-19T07:30').valueOf());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  it('Call buildDownloadedFileName ', () => {
    const filename = buildDownloadedFileName(fileType, operation);

    expect(filename).toEqual(`${appSlugName}-${operation}_2022-08-19_07-30.${fileType.extension}`);
  });
});
```

Nous avons une fonction qui construit le nom d'un fichier à partir de variables et d'un timestamp. A chaque fois que nous exécuterons le test, now changera et notre test échouera.

Jest nous donne deux fonctions pour nous aider. `spyOn` pour détecter l'exécution d'une fonction, ici c'est `Date.now()` et `mockImplementationOnce` pour remplacer la fonction espionnée. Notre date ne changera jamais et le test réussira.

## Conclusion

Les mocks sont magiques. Ils sont très utiles.

Nous pouvons être tentés de faire des mocks pour tout et n'importe quoi. Mais ce n'est pas le but des tests. Le but est de vérifier la robustesse de notre projet dans des conditions aussi proches que possible de la réalité.

Une mock est une simulation qui ne doit être utilisée que lorsque l'on n'a pas le choix, pas par commodité.
