---
title: 'Comment tester les Hooks de React'
pageTitle: 'Comment tester les hooks de React : Guide du développeur'
date: '2021-05-20'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
excerpt: 'Avec React, nous pouvez créer des hooks custom. Et surtout les tester.'
tags: ['javascript', 'typescript', 'React', 'hooks']
related: ['five-tips-about-react-hooks', 'testing-your-react-app-with-mocks']
---

Lorsque vous utilisez des hooks, vous pouvez les écrire dans leur propre fichier. Et vous pouvez les tester.

## Pourquoi nous avons besoin de tests pour les crochets

Les tests ne sont pas la solution, mais ils protègent votre code des changements, ils aident à trouver les problèmes.

Si vous avez un composant d'affichage avec toute la logique dans un hook custom, il serait préférable de tester ce hook.

Si vous avez toutes les spécifications mais que vous ne savez pas comment les concevoir, c'est peut-être le bon moment pour utiliser le TDD.

En bref, dire : "Je ne sais pas comment résoudre cela" et le cacher, c'est une mauvaise habitude pour un développeur (et d'autres personnes aussi).

## Pourquoi les tests de hooks ne fonctionnent pas au début

Lorsque j'ai fait mon premier test avec un hook, rien ne fonctionne. Réponse de React :

> Les hooks ne peuvent être appelés qu'à l'intérieur du corps d'un composant de fonction.

C'est la règle du hook, il faut donc quelque chose autour du hook pour le tester.

[Testing Library](https://testing-library.com/) a fait [ce projet](https://react-hooks-testing-library.com/) pour nous.

## Ma stack pour tester les hooks React

Pour les exemples que j'utilise dans ce billet, j'utilise Typescript, mais avec Javascript, cela restera similaire.

J'utilise Jest avec Enzyme. Je travaille avec cette stack depuis le début, donc je les garde. Pour Typescript, il faut utiliser ts-jest.

J'utilise Moxios pour tester les appels d'API que je fais avec Axios.

J'ai eu du mal à tester des hooks avec plusieurs appels d'API, mais après quelques prises de tête, j'ai réussi à trouver une solution.

Et pour les hooks, j'utilise la bibliothèque de test React Hooks. Ils ont une bonne documentation.

## Il est temps de commencer

Premier exemple, un hook custom issu de la documentation de React : usePrevious.

Ce hook stocke la valeur précédente, comme prevProps ou prevState dans les composants de la classe.

```typescript
import { useEffect, useRef } from 'react';

function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default usePrevious;
```

Comme vous pouvez le voir, j'utilise n'importe quel type pour la valeur. Ce n'est pas une bonne pratique en Typescript.

Je le fais lorsque j'utilise le développement itératif. Vous utilisez n'importe quel type pour commencer, et après vous affinez avec de meilleurs types. Donc ce custom hook n'est pas terminé.

Il pourrait faire l'objet d'un autre article 😉 .

Et maintenant, le fichier de test.

```typescript
import { renderHook } from '@testing-library/react-hooks';
import usePrevious from './usePrevious';

import '../../setupTests';

describe('Test usePrevious hook', () => {
  const setUp = () =>
    renderHook(({ state }) => usePrevious(state), {
      initialProps: { state: 0 },
    });

  it('should return undefined on initial render', () => {
    const { result } = setUp();

    expect(result.current).toBeUndefined();
  });

  it('should always return previous state after each update', () => {
    const { result, rerender } = setUp();

    rerender({ state: 2 });
    expect(result.current).toBe(0);

    rerender({ state: 4 });
    expect(result.current).toBe(2);

    rerender({ state: 6 });
    expect(result.current).toBe(4);
  });
});
```

Tout d'abord, nous définissons une fonction de configuration. Nous lui donnons un entier comme propriété initiale, je choisis zéro.

Le premier cas : le rendu initial. Resultat contient le retour de votre hook. On l'utilise pour affirmer les valeurs ou pour accéder aux méthodes.

Le deuxième cas : on utilise le rendu initial. Il est utile de tester le résultat de vos variables pour chaque rendu dans ce cas.

## Un autre exemple avec Axios

Maintenant, nous pouvons tester un hook custom avec un appel API.

```typescript
const useRequestWithComment = ({
  element,
  request,
  updatedStatus,
  commentAdded,
}: UseRequestWithCommentProps): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<string | undefined>>,
] => {
  const [comment, setComment] = useState<string | undefined>();
  const [isUpdating, setUpdating] = useState<boolean>(false);

  const { t } = useTranslation();

  const { dispatch } = useContext(Context);

  useEffect(() => {
    let isCancelled = false;
    if (isUpdating && comment) {
      DataService.requestWithComment(element, comment, request).then(
        (payload) => {
          if (payload.status === 202) {
              const updatedElement = { ...element, status: updatedStatus };
              dispatch({
                type: Types.Update,
                payload: updatedElement,
              });
            }
            NotificationService.success(t("updateWithSuccess"));
          } else {
            NotificationService.error(t("somethingWentWrong"));
          }
          if (!isCancelled) {
            setUpdating(false);
          }
        },
      );
    }
    return () => {
      isCancelled = true;
    };
  }, [ element, request, updatedStatus, dispatch, comment, isUpdating, t]);

  return [isUpdating, setUpdating, setComment];
};

export default useRequestWithComment;
```

Voici le fichier de test

```typescript
describe('Test useRequestWithComment hook', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    moxios.install(requestService);
  });

  afterEach(() => {
    moxios.uninstall(requestService);
    jest.resetAllMocks();
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wrapper = ({ children }: any) => (
    <I18nextProvider i18n={i18n}>
      <Context.Provider value={{ state: initialState, dispatch }}>{children}</Context.Provider>
    </I18nextProvider>
  );

  const setUp = () =>
    renderHook(
      ({ element, request, updatedStatus }) =>
        useRequestWithComment({ element, request, updatedStatus }),
      {
        wrapper,
        initialProps: {
          element: example,
          request: RequestWithCommentType.Dispute,
          updatedStatus: Status.Rejected,
        },
      }
    );

  it('useRequestWithComment request is success', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith(mockAccepted({}));
    });

    const { result, waitForNextUpdate } = setUp();

    const setUpdating = result.current[1];
    const setComment = result.current[2];

    act(() => {
      setComment("It's a trap");
      setUpdating(true);
    });

    expect(result.current[0]).toBeTruthy();

    await waitForNextUpdate();

    expect(dispatch).toHaveBeenCalled();
    expect(result.current[0]).toBeFalsy();
  });

  it('useRequestWithComment request is failed', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith(mockError({}));
    });

    const { result, waitForNextUpdate } = setUp();

    const setUpdating = result.current[1];
    const setComment = result.current[2];

    act(() => {
      setComment("It's a trap");
      setUpdating(true);
    });

    expect(result.current[0]).toBeTruthy();

    await waitForNextUpdate();

    expect(dispatch).not.toHaveBeenCalled();
    expect(result.current[0]).toBeFalsy();
  });
});
```

La méthode _jest.fn()_ est utilisée pour tester l'exécution d'une méthode.

Dans `before` et `after`, nous obtenons l'instance d'Axios, dans ce cas, elle provient de `requestService`. Nous la donnons à Moxios. La réinitialisation de tous les mocks est juste pour éviter les effets de bord dans les tests.

Nous avons un wrapper, qui contient tous les composants associés. Cela peut être le store si vous utilisez Redux. Ici, il contient un provider pour l'API de contexte React et pour les traductions.

Ensuite, la méthode `setUp` avec nos props et le wrapper.

Le premier test, comme l'explique le commentaire, est celui d'une requête réussie. Axios est basé sur des promesses, le test doit être asynchrone.

Moxios est utilisé pour simuler le retour de l'appel à l'API. J'ai une collection de méthodes mock pour les appels API.

`act` fonctionne comme dans les utilitaires de test de React, regardez la documentation. En bref, il effectue le rendu et les mises à jour.

Le test est découpé en deux parties, l'une lorsque la méthode est exécutée et la seconde après que la promesse soit résolue.

Pourquoi ai-je un test de cas d'échec ? Parce que nous avons aussi besoin de tester les erreurs.

## C'est l'heure du cadeau

Si vous avez deux appels API dans votre hook, vous pouvez remplacer le wait de moxios par ce snippet.

```typescript
moxios.wait(() => {
  const firstRequest = moxios.requests.at(0);
  firstRequest.respondWith(mockSuccess(firstData));
  moxios.wait(() => {
    const secondRequest = moxios.requests.at(1);
    secondRequest.respondWith(mockSuccess(secondData));
  });
});
```

## Conclusion

Faire des tests et les automatiser est obligatoire.

Mais n'oubliez pas que les tests doivent être maintenus comme le logiciel lui-même.
Soyez pragmatique pour choisir les parties de votre code qui ont besoin de tests et celles où c'est inutile.
