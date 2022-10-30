---
title: 'Automate Prettier in a pre-commit hook'
date: '2021-06-04'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: 'Prettier is a wonderful tool. It  works in many editors and supports many languages. But opinionated is his best feature and the first reason to use it.'
tags: ['prettier', 'git']
---

[Prettier](https://prettier.io/) is a wonderful tool. It works in many editors and supports many languages.

But opinionated code formatter is his best feature and the first reason to use it.

When you begin with a new team, the first pain is define the style guide for the project. More the language is permissive, harder is the debate.

With Prettier, debate is closed, because most of the decisions are taken. He has few options, so it's easy to configure. All you need is a json file named `.prettierrc.json`.

That's mine, for example :

```json
{
  "useTabs": false,
  "printWidth": 90,
  "tabWidth": 2,
  "singleQuote": true,
  "jsxBracketSameLine": false
}
```

If you use Visual Studio Code, add the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and enable format on save feature. Each time you save a file, Prettier will run and autoformat. It's convenient.

If you don't know what is a pre-commit or a post-commit, they're scripts which execute during the workflow of a commit with git.

All you need is define a precommit file like this one.

```bash
#!/bin/sh
FILES=$(git diff --cached --name-only --diff-filter=ACMR "*.js" "*.ts" "*.tsx" "*.scss" | sed 's| |\\ |g')
[ -z "$FILES" ] && exit 0

# Prettify all selected files
echo "$FILES" | xargs ./node_modules/.bin/prettier --write

# Add back the modified/prettified files to staging
echo "$FILES" | xargs git add

exit 0
```

This file is for a TypeScript project with SCSS, so you can update file extensions to fit yours.

It's run Prettier and add updated files to staging.

And a post commit to update index.

```bash
#!/bin/sh

git update-index -g
```

Create a `.githooks` folder at the root of your project and put a `pre-commit` and `post-commit` files inside with the content above.

The last commands to type is to tell git the folder of hooks and make them executable. Execute them in your terminal.

```shell
git config core.hooksPath .githooks
chmod +x .githooks/*
```

This post is short but it's everything you need to work with Prettier.

Another tools exists to create hooks, like [Husky](https://typicode.github.io/husky/#/).
