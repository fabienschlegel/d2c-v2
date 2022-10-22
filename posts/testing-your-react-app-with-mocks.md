---
title: 'Testing your React app with mocks'
date: '2022-08-19'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: 'Testing avoids regressions and makes your app safer and easier to debug.'
tags: ['React', 'Typescript']
related: ['how-to-test-react-hooks']
---

For your app, you need tests.

Testing avoids regressions and makes your app safer and easier to debug. Writing tests isn’t easy for a lot of reasons. Few of them are the features of the browser or the external APIs. They’re not available during the execution of our tests.

To resolve this issue, we have the mocks.

## Mocks are magic

We will use them to imitate what we can't have available for our tests.

The magic is for example when my app depends on the local storage. I can't request this API during my tests, so how do I do it? Well, we mock!

## Mock the local storage

With JS frameworks, like React, for example, we use the local storage, which is a function integrated into the browser.

It helps us to store some data as a string. We can use `JSON.stringify()` function to store it and `JSON.parse()` to restore our data.

To mock this feature of the browser we need to create a function and bind it to the window object.

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

With this function, we can mock all the features of the local storage. Look at the tests below.

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

We use the mock to set our data to our local storage and the tested function will return the expected value.

## Mock the response

Other parts of our code request the back end or third-party services. We must test the model of the payload we receive from these services.

We want to be sure that our code is going to be robust enough to handle the responses. Whether positive feedback (data) or negative feedback (errors).

During our tests, we can’t request these services, connect to them or predict their live answers.

But we know the model of their answers from their documentation.

For some of the projects that I’m working on, I use [Axios](https://github.com/axios/axios) for requests. For our tests, we can use [Moxios](https://github.com/axios/moxios). Axios provide this library to mock our requests.

This is an example of this kind of test.

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

Now some explanations about this test.

Axios works with Promises, so our tests must be asynchronous. We configure Moxios with our Axios instance and our React hook. The Moxios wait function will return the response.

In these tests, we will verify that set the `isLoading` variable to true launch the request. When we receive the response, `isLoading` comes back to false and `isUnique` is correctly set.

## Mock the time

Testing the dates is a big pain. Now isn’t now a second later, so how to test a function which compares now with a date to define if it’s tomorrow or yesterday?

For our tests, we can use [Jest](https://jestjs.io/), a testing framework for JavaScript. Look at the tests below to see it in action.

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

We have a function to build the name of a file from variables and a timestamp. Every time we will run the test, now will change and our test will fail.

Jest gives us two functions to help us. `spyOn` to detect the execution of a function, here it is `Date.now()` and `mockImplementationOnce` to replace the spied function. Our date will never change and the test will succeed.

## Conclusion

Mocks are magic. They’re very helpful.

We can be tempted to make mocks for everything and anything. But this is not the purpose of testing. The goal is to check the robustness of our project in conditions as close as possible to reality.

A mock is a simulation that should only be used when you have no choice, not for convenience.
