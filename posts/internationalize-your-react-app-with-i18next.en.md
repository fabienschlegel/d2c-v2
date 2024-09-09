---
title: 'Internationalize your React application with i18next'
pageTitle: 'How to internationalize your React application with i18next'
date: '2024-09-09'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/internationalize-your-react-app-with-i18next-illustration.webp'
excerpt: 'Learn how to internationalize your React application using i18next with this comprehensive guide.'
tags: ['typescript', 'react']
related: ['10-typescript-tips-for-beginner-developers', 'how-to-test-react-hooks']
---

Internationalization (abbreviated i18n) is the process of designing and developing an application in such a way as to facilitate its localization in different languages and cultures.

This involves not only the translation of text, but also the adaptation of date, time, number formats, and many other cultural aspects.

A well-internationalized application can be easily localized, meaning that it can be translated and adjusted to meet the specificities of a target market without requiring major modifications to the source code.

I've only worked on projects using languages with LTR (Left to Right) writing systems. This article therefore covers only the i18n aspects common to these languages.

### Introducing i18next and its benefits for React

i18next is a powerful, easy-to-use translation library for TypeScript applications. It offers a full range of features for managing translations, pluralizations, interpolations and much more.

When it comes to React, i18next integrates seamlessly with `react-i18next`, an add-on that enables its functionality to be used with React components seamlessly.

The main advantages of using i18next with React are :

- **Simple integration**: `react-i18next` simplifies the integration of i18next into a React application, with dedicated hooks and components for managing translations.
- **Modularity**: i18next allows translations to be structured in a modular way, facilitating management and maintenance.
- **Comprehensive support**: The library supports all functionalities required for full internationalization, including pluralizations, contexts, and complex interpolations.
- **Performance**: With techniques such as lazy loading of translations, i18next ensures optimum performance even in large-scale applications.

## Installation and basic configuration

Before getting started, make sure you have the minimum configuration required to create a React application.

Let's start with the creation of a basic React application

```bash
yarn create vite i18n-react --template react-ts
cd i18n-react
yarn
```

### Installing i18next and the necessary dependencies

```bash
yarn add i18next react-i18next i18next-browser-languagedetector i18next-intervalplural-postprocessor
```

- **i18next**: The main library for managing translations.
- **react-i18next**: An add-on that provides hooks and components for integrating i18next into React.
- **i18next-browser-languagedetector**: A module to automatically detect the language of the user's browser.
- **i18next-intervalplural-postprocessor**: A module for managing different translations per interval.

### Initial configuration of i18next in a React project

Once the packages have been installed, the next step is to configure i18next. Create an `i18n.ts` file at the root of your project to centralize configuration.

```tsx
import i18n from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import commonEn from './locales/en/common.json';
import commonFr from './locales/fr/common.json';
import commonEs from './locales/es/common.json';
import commonDe from './locales/de/common.json';

const RESOURCES = {
  en: { common: commonEn },
  fr: { common: commonFr },
  es: { common: commonEs },
  de: { common: commonDe },
};

const DETECTION_OPTIONS = {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage'],
};

export const defaultNS = 'common';

i18n
  .use(LanguageDetector)
  .use(intervalPlural)
  .use(initReactI18next)
  .init({
    detection: DETECTION_OPTIONS,
    resources: RESOURCES,
    defaultNS,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
```

In this file, we initialize i18next with the necessary plugins.

- **LanguageDetector**: Automatically detects the user's preferred language.
- **IntervalPlural**: Manages value intervals.
- **initReactI18next**: Integrates i18next with React.

Here are details of the configurations used.

- **detection.order**: First detects the language from the localStorage, then the value returned by the browser.
- **detection.cache**: caches the detected language in the localStorage
- **defaultNS**: allows you to set a default namespace.
- **fallbackLng** : The default language to use if the preferred language is not available.
- **interpolation.escapeValue** : Disable value escape, as React already manages security against XSS attacks.

Each file added to `resources` contains the translations of our application. It is added opposite the key indicating its namespace.

So now you need to create the JSON files associated with the languages you want to support.

Next, you need to integrate this configuration into your React application. Open the `main.tsx` file and import `i18n.ts`.

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import './i18n.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

We'll now create a `Welcome` component and add the translation hook to it.

```tsx
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

const Welcome: FunctionComponent = () => {
  const { t } = useTranslation();

  return <h1>{t('welcome')}</h1>;
};

export default Welcome;
```

Replace `<h1>Vite + React</h1>` in the main `App` component with the `Welcome` component. Create the `welcome` key in your translation files, in all the languages you wish to support.

Your JSON file for English should look like this:

```json
{
  "welcome": "Welcome"
}
```

You should now have the translation displayed on your page.

## Translation file structure

Eventually, your translation files will contain a large number of elements. It's important to keep them well organized. This makes them easier to manage, update and extend to other languages.

### Organization of translation files

As is often the case with React projects, there are no predefined frameworks or rules. What's important is that the location is logical for your project. I'd still advise you to use software industry standards.

For example, use a locale folder at the root of the project. Each language has its own subfolder containing translation files in JSON format. Here's an example of a folder structure.

```bash
/src
└── /locales
    ├── /de
    │   ├── common.json
    │   └── account.json
    ├── /en
    │   ├── common.json
    │   └── account.json
    ├── /es
    │   ├── common.json
    │   └── account.json
    └── /fr
        ├── common.json
        └── account.json
```

In this example, each subfolder (`en`, `fr`, `es`,`de`) corresponds to a language, and the `common.json` and `account.json` files contain the language-specific translations for a particular namespace.

### Examples of translation files

### English translation file (en/common.json)

```json
{
  "welcome": "Welcome to our application!",
  "navbar": {
    "home": "Home",
    "about": "About",
    "contact": "Contact"
  },
  "footer": {
    "copyright": "© 2024 Your Company. All rights reserved.",
    "privacyPolicy": "Privacy Policy",
    "termsOfService": "Terms of Service"
  }
}
```

### French translation file (fr/common.json)

```json
{
  "welcome": "Bienvenue dans notre application !",
  "navbar": {
    "home": "Accueil",
    "about": "À propos",
    "contact": "Contact"
  },
  "footer": {
    "copyright": "© 2024 Votre Entreprise. Tous droits réservés.",
    "privacyPolicy": "Politique de confidentialité",
    "termsOfService": "Conditions d'utilisation"
  }
}
```

## Implementation in a React application

By following the steps above, you can already add the configuration file and a few translations to your React project.

### Using the `useTranslation` hook to translate content

The `useTranslation` hook provided by `react-i18next` makes it easy to translate text in your components.

Add the following code to the `App.tsx` file of our example project.

```tsx
[...]
import { useTranslation } from "react-i18next";
[...]
function App() {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);

  return (
    <>
      <nav>
        <ul>
          <li>{t("navbar.home")}</li>
          <li>{t("navbar.about")}</li>
          <li>{t("navbar.contact")}</li>
        </ul>
      </nav>
[...]
<footer>
    <p>{t("footer.copyright")}</p>
    <ul>
        <li>{t("footer.privacyPolicy")}</li>
        <li>{t("footer.termsOfService")}</li>
    </ul>
</footer>
[...]
```

In this example, the `useTranslation` hook is used to retrieve the `t` function, which translates text keys defined in your translation files.

As we're using translations from the default namespace, there's no need to specify it.

A dot is used to access nested keys, enabling us to structure our file correctly by grouping translations logically.

### Managing language changes

To enable users to change language dynamically, you can add a language selector to your application.

```tsx
import { ChangeEventHandler } from 'react';

import { useTranslation } from 'react-i18next';

const AVAILABLE_LANGUAGES = [
  { value: 'de', label: 'Deutsch' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage: ChangeEventHandler<HTMLSelectElement> = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select onChange={changeLanguage}>
      {AVAILABLE_LANGUAGES.map((l) => (
        <option selected={l.value === i18n.language} key={l.value} value={l.value}>
          {l.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
```

Then add this component to the `App.tsx` component.

If you change the language from the selector, it will also be changed in the localStorage.

## Using namespaces

To make it easier to manage our translations, it's simpler to divide them up by module or feature.

But this requires the right namespace to be loaded into the translation method.

Add an `account.json` file with the following translated content for each language.

```json
{
  "signIn": "Sign in",
  "signUp": "Sign up"
}
```

Modify `i18n.ts` configuration to add them.

```tsx
[...]
import accountEn from "./locales/en/account.json";
import accountFr from "./locales/fr/account.json";
import accountEs from "./locales/es/account.json";
import accountDe from "./locales/de/account.json";

const RESOURCES = {
  en: { common: commonEn, account: accountEn },
  fr: { common: commonFr, account: accountFr },
  es: { common: commonEs, account: accountEs },
  de: { common: commonDe, account: accountDe },
};
[...]
```

Then add these 2 entries to our navigation menu:

```tsx
[...]
<li><button>{t("signIn", { ns: "account" })}</button></li>
<li><button>{t("signUp", { ns: "account" })}</button></li>
[...]
```

Using namespaces is useful when the number of translations you need to make becomes significant.

## Translation of complex and dynamic components

### Translation with interpolation

i18next lets you add variables to your translations.

For example, to add our user's name.

#### **Translation file (en/common.json)**

```json
{
  "welcomeUser": "Welcome, {{name}}!"
}
```

#### **Use in a React component**

```jsx
// src/App.js
import React from 'react';
import { useTranslation } from 'react-i18next';

function WelcomeUser({ name }) {
  const { t } = useTranslation();

  return <h1>{t('welcomeUser', { name })}</h1>;
}

export default WelcomeUser;
```

### Managing plurals

Managing plurals in an application can quickly become tedious. With i18next, simply add `_other` as a suffix to the reference key.

```json
{
  "key": "item",
  "key_other": "items",
  "keyWithCount": "{{count}} item",
  "keyWithCount_other": "{{count}} items"
}
```

The `count` argument, whether present in the translation or not, automatically handles the change from singular to plural.

### Range management

Sometimes it's necessary to manage ranges of values that display different translations.

For these cases, we'll use `i18next-intervalplural-postprocessor`, which we've declared in i18n's configuration.

Let's take our translation files and add the following lines:

```json
[...]
"counter": {
 "value_interval": "(0)[No object];(1)[ {{count}} object];(2-inf)[ {{count}} objects]"
}
[...]
```

In our `App.tsx` file, we'll replace the counter button with the element below.

```tsx
<button onClick={() => setCount((count) => count + 1)}>
  {t('counter.value_interval', { postProcess: 'interval', count })}
</button>
```

Now, the translation will vary according to the value of `count`.

Note the use of `inf` as the end of our range. This allows all values to be taken into account. But it's also possible to cumulate with plural management as a backup.

### Amount and date management

As of i18next version 21.3.0, it is possible to format cash amounts and dates and times directly, without using third-party libraries.

If you can't use at least this version, you can combine i18next for language detection with the various JavaScript Intl API modules or libraries such as `date-fns`.

## Conclusion

By applying the knowledge and techniques discussed in this article, you are now better equipped to internationalize your React application, ensuring a better experience for your users.
