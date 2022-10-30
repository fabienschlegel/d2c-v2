---
title: 'How to test React Hooks'
date: '2021-05-20'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: 'When you use hooks, you can write them in their own file. And you could test them.'
tags: ['javascript', 'typescript', 'React', 'hooks']
related: ['five-tips-about-react-hooks', 'testing-your-react-app-with-mocks']
---

When you use hooks, you can write them in their own file. And you could test them.

## Why we need tests for hooks

Tests are not the answer, but they protect your code from changes, they help to find bugs.

If you have a display component with all the logic in a custom hook, it would be a better idea to test the custom hook.

If you have all specs but you doesn't know how to design it, may be a good time to use TDD.

In short, saying  : "I don't know how to solve that" and stash it, it's a bad habit for a developer (and others people too).

## Why testing hooks doesn't works at first

When I have made my first test with hook, nothing works.  React answer :

> Hooks can only be called inside the body of a function component.

It's a hook's rule, so you need something around the hook to test it.

It's a lucky day , [Testing Library](https://testing-library.com/) have made [this project](https://react-hooks-testing-library.com/) for us.

## My stack to test React hooks

For the examples I use in this post, I use Typescript, but with Javascript, it will remain similar.

I use Jest with Enzyme. I work with this stack from the beginning, so I keep them. For Typescript, we need to use ts-jest.

I use Moxios to test API calls I make with Axios.

Test hooks with more than one API call gave me headaches, but when I resolve the case, it was like fireworks in my head.

And for hooks I use React Hooks Testing Library. They have a good documentation.

## It's time to begin

First example, a custom hook from the React documentation : usePrevious.

This hook store the previous value, like prevProps or prevState in class components.

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

As you can see, I use any type for the value. It's not a good practice in Typescript.

I make that when I use iterative development. You use any as a start, and after you refine with better types. So this custom hook is not finished.

May be a subject for another post 😉.

And now the test file.

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

First, we define a setup function. We give it an integer as initial property, I choose zero.

The first case : initial render. Result contain the return of your hook. We use it to assert the values or to access to methods.

The second case : we use rerender. It's useful to test the result of your variables for each rendering in this case.

## Another example with Axios

Now, we can test a custom hook with an API call.

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

This is the test file

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

The _jest.fn()_ method is used to test execution of a method.

In before and after, we get the Axios instance, in this case, it's from requestService. We give it to Moxios. Reset all mocks is just to avoid side effects in tests.

We have a wrapper, which contains all the related components. It can be the store provider if you use Redux. Here it contains a provider for React context API and for translations.

Next, the setUp method with our props and the wrapper.

The first test, as the comment explains is for successful request. Axios is based on promises, the test must be asynchronous.

Moxios is used to mock the return of the API call. I have a collection of mocks methods for API calls.

act works as in the React testing utilities, look at the documentation. In a nutshell, it renders and performs updates.

The test is cut into two parts, one when the method is executed and the second after the promise is resolved.

Why I have a failed case test ? Because we need to test errors too.

## It's gift time

If you have two API calls in your hook, you can replace the moxios wait with this snippet.

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

Make tests and automate them is mandatory.

But don't forget that tests must be maintained as the software itself.
Be pragmatic to choose which parts of your code needs them and where avoid them.
