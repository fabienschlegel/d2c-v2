---
title: 'Comment créer facilement des formulaires dans React'
pageTitle: 'Comment créer facilement des formulaires dans React : Guide du débutant'
date: '2021-07-24'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
excerpt: "En tant que développeur, les formulaires constituent une part importante de notre travail. Ils permettent aux utilisateurs d'interagir avec l'application."
tags: ['React', 'Typescript']
---

En tant que développeur, les formulaires constituent une part importante de notre travail. C'est un moyen pour les utilisateurs d'interagir avec le logiciel.

Pour nous aider à créer des entrées de formulaire sans douleur, nous pouvons utiliser la composition. Si vous ne savez pas ce qu'est la composition, vous pouvez lire [cet article](/blog/understand-and-use-composition-in-react) avant.

Nous allons créer des composants contrôlés. Nous utiliserons un hook _useState_ pour stocker la valeur de l'entrée et gérer les changements de cette valeur.

## La paresse est utile

Je suis paresseux. Pas dans le sens où je n'aime pas travailler, mais je n'aime pas faire les choses deux fois ou plus.

Alors pour m'aider, j'ai créé [un package NPM](https://www.npmjs.com/package/@the-sleeping-dog/react-components) avec des composants React génériques et basiques.

Ces composants sont conçus avec [Bulma](https://bulma.io/).

Au début, c'était privé, sur mon Gitlab. Mais le rendre public était une évidence. Je veux aider les autres.

Certains des composants que j'ai utilisés ici proviennent de ce paquet.

Pour les autres composants, j'ai créé [un dépôt sur Github](https://github.com/Humch/Blog-S01E11).

## Le champ HTML input

Tout d'abord, nous avons besoin d'un champ HTML input générique.

```typescript
import React from 'react';

import clsx from 'clsx';

import { Colors, Sizes } from '../../types';

interface InputProps {
  inputSize?: Sizes;
  borderColor?: Colors;
  isRounded?: boolean;
  isHovered?: boolean;
  isFocused?: boolean;
  isLoading?: boolean;
  isStatic?: boolean;
}

export type InputType = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputType> = ({
  inputSize,
  borderColor,
  isRounded,
  isHovered,
  isFocused,
  isLoading,
  isStatic,
  className,
  ...others
}) => (
  <input
    className={clsx(
      'input',
      inputSize,
      borderColor,
      isRounded ? 'is-rounded' : undefined,
      isHovered ? 'is-hovered' : undefined,
      isFocused ? 'is-focused' : undefined,
      isLoading ? 'is-loading' : undefined,
      isStatic ? 'is-static' : undefined,
      className
    )}
    {...others}
  />
);

export default Input;
```

Regardez le type d'entrée. La première partie, InputProps, concerne Bulma. Il s'agit de classes CSS de base pour concevoir l'entrée.

La deuxième partie est plus intéressante, et c'est toute la force de Typescript.

Le type `React.InputHTMLAttributes<HTMLInputElement>` décrit ce que vous pouvez utiliser comme propriétés dans la propriété `other`. Vous ne pouvez ajouter que des propriétés autorisées pour un champ input.

## L'élément de formulaire complet

Nous avons maintenant notre champ input générique. Nous pouvons passer à l'étape suivante.

```typescript
import React from 'react';

import Field from '../field/Field';
import Control, { IconsProps } from '../control/Control';
import Input, { InputType } from '../input/Input';
import Label, { LabelType } from '../label/Label';
import Help, { HelpProps } from '../help/Help';

import { Colors, Sizes } from '../../types';

export interface InputFieldProps {
  name: string;
  label: React.ReactNode;
  color?: Colors;
  size?: Sizes;
  labelProps?: LabelType;
  inputProps?: InputType;
  helpProps?: HelpProps;
  icons?: IconsProps;
  controlIsExpanded?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  color,
  size,
  labelProps,
  inputProps,
  helpProps,
  icons,
  controlIsExpanded,
}) => (
  <Field>
    <Label size={size} htmlFor={name} {...labelProps}>
      {label}
    </Label>
    <Control isExpanded={controlIsExpanded} icons={icons}>
      <Input inputSize={size} name={name} borderColor={color} {...inputProps} />
    </Control>
    {helpProps && <Help textColor={color} {...helpProps} />}
  </Field>
);

export default InputField;
```

Comme vous pouvez le voir, il s'agit d'un champ générique, avec un `label`, un `input`, une aide si nécessaire et la possibilité d'ajouter des icônes. Chaque propriété est définie avec un type de son propre composant.

## Il est temps de composer

Il est temps de créer un champ spécialisé avec ce champ de saisie générique.

### Le formulaire de connexion

Tout d'abord, nous créons un composant de formulaire de connexion. Il conserve les hooks et la méthode pour soumettre le formulaire.

```typescript
import React, { useState } from 'react';

import { Box, Title } from '@the-sleeping-dog/react-components';

import UsernameField from 'components/username-field/UsernameField';
import SubmitButton from 'components/submit-button/SubmitButton';
import PasswordField from 'components/password-field/PasswordField';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    username.length &&
      password.length &&
      alert(`Your username is : ${username} \nYour password is : ${password}`);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Title size="is-3" useParagraph>
          Login Form
        </Title>
        <UsernameField username={username} handleChange={(e) => setUsername(e.target.value)} />
        <PasswordField password={password} handleChange={(e) => setPassword(e.target.value)} />
        <SubmitButton />
      </form>
    </Box>
  );
};

export default LoginForm;
```

### Le champ du nom d'utilisateur

Deuxièmement, un champ nom d'utilisateur.

Il prend la valeur de `username` et une function d'affectation comme props.

Nous avons défini notre champ `input` générique avec un nom, un label et nos `inputProps` du parent.

```typescript
import React, { ChangeEventHandler } from 'react';

import { InputField } from '@the-sleeping-dog/react-components';

export interface UsernameFieldProps {
  username: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

const UsernameField: React.FC<UsernameFieldProps> = ({ username, handleChange }) => {
  return (
    <InputField
      name="username"
      label="Username"
      inputProps={{ value: username, onChange: handleChange }}
    />
  );
};

export default UsernameField;
```

### Le champ du mot de passe

Troisièmement, un champ mot de passe. Il est réalisé de la même manière que le précédent.

Voyez-vous la différence ?

Oui, nous avons une icône cliquable pour afficher ou cacher le mot de passe. Et l'icône change pour aider l'utilisateur.

```typescript
import React, { ChangeEventHandler, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { InputField } from '@the-sleeping-dog/react-components';

export interface PasswordFieldProps {
  password: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ password, handleChange }) => {
  const [hidePassword, setHidePassword] = useState(true);

  const rightIcon = hidePassword ? faEye : faEyeSlash;

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const icons = {
    rightIcon: <FontAwesomeIcon icon={rightIcon} className="has-text-info" />,
    handleRightIconClick: toggleHidePassword,
  };

  const fiedType = hidePassword ? 'password' : 'text';

  return (
    <InputField
      name="username"
      label="Username"
      inputProps={{ value: password, onChange: handleChange, type: fiedType }}
      icons={icons}
    />
  );
};

export default PasswordField;
```

## Conclusion

Nous avons maintenant 2 composants spécialisés réalisés avec de la composition. Ils peuvent être améliorés, nous pouvons ajouter une aide si un champ est vide lors de la soumission ou le comparer avec un mot de passe simulé pour afficher une erreur. Ils sont facilement réutilisables dans d'autres parties d'un projet.

Si votre formulaire est plus complexe, ce sera une bonne idée d'utiliser l'API contextuelle.

Voulez-vous jouer avec ce formulaire ou l'améliorer ?

Clonez le [dépôt](https://github.com/Humch/Blog-S01E11), lancez le projet et partagez vos résultats sur [Twitter](https://twitter.com/fabienschlegel) !
