---
title: '5 conseils sur les hooks React'
pageTitle: '5 conseils sur les hooks React à ne pas manquer'
date: '2021-05-14'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
excerpt: "Aujourd'hui, lorsque vous utilisez React et des composants fonctionnels, vous avez besoin de hooks. J'ai rencontré quelques problèmes pendant le développement et aujourd'hui, je veux partager avec vous mes astuces sur les hooks React."
tags: ['javascript', 'typescript', 'React', 'hooks']
---

Aujourd'hui, lorsque vous utilisez React et des composants fonctionnels, vous avez besoin de hooks.

Travailler avec des hooks est plus facile que les méthodes de cycle de vie dans les composants de classe, mais j'ai rencontré quelques problèmes et aujourd'hui, je veux partager mes solutions avec vous.

## 1. Divisez votre code

J'aime diviser mon code en petites parties pour une meilleure compréhension. Je fais quatre blocs dans l'ordre de lecture. Habituellement, j'utilise la même disposition entre les composants fonctionnels et les composants de classe. Dans cet article, je n'aborderai que les composants fonctionnels.

Le premier bloc contient tous les hooks et les variables. Je commence par toutes les données comme l'état, les variables ou le contexte et ensuite tous les effets.

Le deuxième bloc est celui des événements.

Le troisième bloc est pour les cas : Parfois vous cassez votre jsx en petits morceaux ou vous avez une condition ternaire. Séparer certaines parties peut être une bonne idée pour maintenir la lisibilité.

Le dernier bloc contient la déclaration de retour avec la partie principale du jsx.

```typescript
const ReloadButton: React.FC<ReloadPageButtonProps> = () => {
  const { t } = useTranslation();
  const { dispatch } = useContext(MyContext);

  const handleClick = () => {
    dispatch({ type: Types.Reload });
  };

  return (
    <Button onClick={handleClick}>
      <Refresh />
    </Button>
  );
};

export default ReloadButton;
```

## 2. Utiliser des hooks custom

Si vous n'avez qu'un seul hook `useState` et un seul hook `useEffect`, vous pouvez garder tout cela dans le composant. Mais si vous en avez plus, il vaut mieux créer un custom hook.

Votre custom hook doit commencer par use et respecter [les règles des hooks React](https://reactjs.org/docs/hooks-rules.html).

Gardez à l'esprit que vous pouvez utiliser des custom hooks dans des custom hooks.

Le bon exemple est un hook pour remplir les options d'un champ de sélection. Un premier hook récupère les données d'une API et le second construit les options.

Sur votre composant de formulaire, vous n'avez que le hook d'options. Les autres variables et fonctions sont cachées.

Oui ! Un custom hook peut afficher les variables d'un autre hook.

```typescript
const useOptions = (): [SelectedOption[] | undefined, boolean] => {
  const [options, setOptions] = useState<SelectedOption[] | undefined>();
  const [data, isLoading, setLoading] = useData();

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    if (data && !isLoading) {
      const optionsResult = data.map((e) => {
        return { label: e.name, value: e.id };
      });
      setOptions(optionsResult);
      setLoading(false);
    }
  }, [data, isLoading, setOptions]);

  return [options, isLoading];
};

export default useOptions;
```

## 3. Utiliser la déstructuration pour afficher les variables d'un custom hook

Si vous avez un gros custom hook avec beaucoup de variables à exposer, comme un formulaire compliqué à poster, vous pouvez mettre toutes les variables dans un objet.

Lorsque vous voulez mettre à jour une valeur de l'objet, utilisez l'état précédent, fusionnez-le avec les nouvelles valeurs et renvoyez-le dans la fonction de mise à jour.

```typescript
const [value, setValue] = useState({ name: 'tomato', type: 'fruit', price: 1.72 });

setValue((prevState) => ({ ...prevState, price: 1.99 }));

// in your form component

const { name, type, price } = value;
```

## 4. Préférer des hooks `useEffect` simples

Utilisez le principe DRY sur le hook `useEffect`. Si vous créez un seul hook avec de nombreuses dépendances, votre hook s'exécutera à chaque fois qu'une dépendance sera mise à jour. Il peut en résulter des effets de bord indésirables ou des boucles conditionnelles dans le hook.

Lorsque vous le pouvez, divisez-le en plusieurs petites parties qui ne feront qu'une seule chose.

## 5. Combiner les hooks `useReducer` et l'API context

Si vous avez besoin de partager des variables entre des composants et que vous ne voulez pas utiliser Redux, vous pouvez combiner ces deux hooks.

Vous initialisez un hook ``useReducer avec un état initial et une fonction reducer. Vous donnez l'état et la fonction de distribution comme valeur pour un fournisseur de contexte, le travail est fait. Chaque enfant du fournisseur de contexte peut accéder à l'état et aux actions de distribution.

```typescript
// Context component
const ContextWrapper: React.FC<ContextWrapperProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export default ContextWrapper;

// Context file with reducer

interface ContextStateType {
  data: Data[] | undefined;
}

export enum Types {
  Get = 'GET_DATA',
  Update = 'UPDATE_DATA',
}

interface Get {
  type: Types.Get;
  payload: Data[];
}
interface Update {
  type: Types.Update;
  payload: Data;
}

type ActionType = Get | Update;

export const initialState: ContextStateType = {
  data: undefined,
};

// [...] file is cut

export const reducer = (
  state: ContextStateType = initialState,
  action: ActionType
): ContextStateType => {
  let newState: ContextStateType;
  switch (action.type) {
    case Types.Get:
      newState = { ...state, data: action.payload };
      break;
    case Types.Update: {
      newState = updateData(state, action);
      break;
    }
    default:
      throw new Error('Unknown action');
  }
  return newState;
};

export const Context = createContext<{
  state: ContextStateType;
  dispatch: Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});
```

## Conclusion

Habituellement, j'utilise Redux comme un magasin unique de données à la racine de l'application et le contexte React lorsque j'ai besoin de partager des variables entre plusieurs composants.

Les hooks React sont d'excellents outils, plus faciles à utiliser que les méthodes de cycle de vie dans les composants de classe.
