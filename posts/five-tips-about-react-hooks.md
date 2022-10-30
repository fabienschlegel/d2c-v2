---
title: 'Five tips about React hooks'
date: '2021-05-14'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: "Today, when you use React and functional components, you need hooks. I've encountered some issues during development and today, I want to share my tips about React hooks with you."
tags: ['javascript', 'typescript', 'React', 'hooks']
---

Today, when you use React and functional components, you need hooks.

Work with hooks is easier than lifecycle methods in class components, but I've encountered some issues and today, I want to share my solutions with you.

## 1. Cut your code

I like to cut my code in small pieces for a better understanding. I make four blocks in reading's order. Usually, I use the same layout between functional and class components. In this article, I will only get into functional components.

The first block is for all the hooks and variables. I begin with all datas like state, variables or context and next all effects.

The second block is for events.

The third block is for cases : Sometimes your break your jsx in small pieces or you have a ternary condition. Separate some parts can be a good idea to maintain readability.

The last one contain the return statement with the main jsx part.

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

## 2. Use custom hooks

If you have only one state and one effect, you can keep all the things in the component. But if you have more, It's better to create a custom hook.

Your custom hook must begin with use and respect [React hook's rules](https://reactjs.org/docs/hooks-rules.html).

Keep in mind : you can use custom hooks in custom hook.

The good example is an hook to populate the options of a select input field. A first hook fetch data from an API and the second build the options.

On your form component, you have the options hook only. Another variables and functions are hidden. The options hook launch the fetch hook on mount and display only the options when there are ready and the loading state of the fetch hook.

Yes ! A custom hook can display variables of another hook.

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

## 3. Use destructuring to display variables of a custom hook

If you have a big custom hook with many variables to expose, like a complicated form to post, you can pack all the variables in an object.

When you want to update a value of the object, use the previous state, merge it with the new values and return it inside the updater function.

```typescript
const [value, setValue] = useState({ name: 'tomato', type: 'fruit', price: 1.72 });

setValue((prevState) => ({ ...prevState, price: 1.99 }));

// in your form component

const { name, type, price } = value;
```

## 4. Prefer simple useEffect

Use the DRY principle on effect hook. If you create only one effect hook with many dependencies, your hook will run each time a dependency is updated. It may result in unwanted sides effects or conditional loops in the hook.

When you can, split it in smaller ones will make one thing.

## 5. Combine the context and the reducer hooks

If you need to share variables between components and you doesn't want to use Redux, you can combine this two hooks.

You initialize a reducer hook with an initial state and a reducer function. You give the state and dispatch function as value for a context provider, the job is done. Every children of the context provider can access to the state and dispatch actions.

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

Usually, I used Redux as a single store of data at the root of the app and React context when I need to share some variables between few components.

React hooks are great tools easier to use than lifecycle methods in class components.
