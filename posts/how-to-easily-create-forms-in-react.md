---
title: 'How to easily create forms in React'
date: '2021-07-24'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: "As a developer, forms are a great part of our work. It's a way for users to interact with software."
tags: ['React', 'Typescript']
---

As a developer, forms are a great part of our work. It's a way for users to interact with software.

To help us to create form inputs without pain we can use composition. If you don't know what is composition, you can read [this post](/understand-and-use-composition-in-react) before.

We'll create controlled components. We'll use a _useState_ hook to store the value of the input and manage the changes of this value.

## Be lazy is useful

I'm lazy. Not in the sense that I don't like to work, but I don't like to make things twice or more.

So to help me, I made [an NPM package](https://www.npmjs.com/package/@the-sleeping-dog/react-components) with generic and basic React components.

These components are designed with [Bulma](https://bulma.io/).

First, it was private, on my Gitlab. But make it public was a piece of evidence. I want to help others.

Some of the components I used here come from this package.

For the other components, I create [a repository on Github](https://github.com/Humch/Blog-S01E11).

## The HTML input

First of all, we need a generic HTML input.

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

Look at the input type. The first part, InputProps are for Bulma. It's basic, CSS classes to design the input.

The second part is more interesting, and it's all the strength of Typescript.

The `React.InputHTMLAttributes<HTMLInputElement>` type describe what you can use as properties in the `other` property with spread syntax. You can add only props that are authorized for an input element.

Very useful, isn't it?

## The complete generic field

Now we have our generic HTML input. We can go to the next step.

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

As you can see, it's a generic field, with a label, an input, a helper if needed and the ability to add icons. Each property is defined with a type from its own component.

## Time to compose

It's time to create a specialized field with this generic input field.

### The login form

First, we create a login form component. It keeps the state hooks and the submit method.

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

### The username field

Second, An username field.

It takes a state and the setter as properties.

We defined our generic input field with a name, a label and our inputProps from the parent.

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

### The password field

Third, a password field. It's made in the same way as the previous one.

Do you see the difference?

Yes, we have a clickable icon to show or hide the password. And the icon change to help the user.

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

Now we have 2 specialized components made with composition. They can be improved, we can add a helper if a field is empty when submit or compare it with a mocked password to display an error. They're reusable easily in other parts of a project.

If your form is more complex, it'll be a good idea to use the context API.

Do you want to play with this form or improve it?

Clone the [repository](https://github.com/Humch/Blog-S01E11), launch the project and share your results on [Twitter](https://twitter.com/fabienschlegel)!
