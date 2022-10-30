/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  sentry: {
    hideSourceMaps: true,
  },
  redirects: async () => {
    return [
      // * Blog version 1 paths redirections
      {
        source: '/five-tips-about-react-hooks',
        destination: '/blog/five-tips-about-react-hooks',
        permanent: true,
      },
      {
        source: '/automate-prettier-in-precommit-hook',
        destination: '/blog/automate-prettier-in-precommit-hook',
        permanent: true,
      },
      {
        source: '/become-a-developer-at-37',
        destination: '/blog/become-a-developer-at-37',
        permanent: true,
      },
      {
        source: '/five-reasons-to-use-django',
        destination: '/blog/five-reasons-to-use-django',
        permanent: true,
      },
      {
        source: '/how-to-test-react-hooks',
        destination: '/blog/how-to-test-react-hooks',
        permanent: true,
      },
      {
        source: '/introduction-to-jwt',
        destination: '/blog/introduction-to-jwt',
        permanent: true,
      },
      {
        source: '/le-python-pew',
        destination: '/blog/le-python-pew',
        permanent: true,
      },
      {
        source: '/understand-and-use-composition-in-react',
        destination: '/blog/understand-and-use-composition-in-react',
        permanent: true,
      },
      {
        source: '/publish-my-own-blog-start-of-content-creator',
        destination: '/blog/publish-my-own-blog-start-of-content-creator',
        permanent: true,
      },
      {
        source: '/how-to-easily-create-forms-in-react',
        destination: '/blog/how-to-easily-create-forms-in-react',
        permanent: true,
      },
      {
        source: '/testing-your-react-app-with-mocks',
        destination: '/blog/testing-your-react-app-with-mocks',
        permanent: true,
      },
      {
        source: '/begin-react-with-typescript',
        destination: '/blog/begin-react-with-typescript',
        permanent: true,
      },
      {
        source: '/how-to-use-props-and-state-in-react',
        destination: '/blog/how-to-use-props-and-state-in-react',
        permanent: true,
      },
      {
        source: '/conditional-rendering-of-your-react-components',
        destination: '/blog/conditional-rendering-of-your-react-components',
        permanent: true,
      },
      {
        source: '/working-with-rest-apis-in-react',
        destination: '/blog/working-with-rest-apis-in-react',
        permanent: true,
      },
      {
        source: '/setup-jwt-react-django-app',
        destination: '/blog/setup-jwt-react-django-app',
        permanent: true,
      },
      {
        source: '/tests-quality-ep0',
        destination: '/blog/tests-quality-ep0',
        permanent: true,
      },
      {
        source: '/tests-quality-ep1',
        destination: '/blog/tests-quality-ep1',
        permanent: true,
      },
      {
        source: '/tests-quality-ep2',
        destination: '/blog/tests-quality-ep2',
        permanent: true,
      },
      {
        source: '/tests-quality-ep3',
        destination: '/blog/tests-quality-ep3',
        permanent: true,
      },
      {
        source: '/tests-quality-ep4',
        destination: '/blog/tests-quality-ep4',
        permanent: true,
      },
      {
        source: '/why-i-create-my-first-npm-package',
        destination: '/blog/why-i-create-my-first-npm-package',
        permanent: true,
      },
      // * Bad tags redirections
      {
        source: '/tag/Typescript',
        destination: '/tag/typescript',
        permanent: true,
      },
      {
        source: '/tag/React',
        destination: '/tag/react',
        permanent: true,
      },
      {
        source: '/tag/Python',
        destination: '/tag/python',
        permanent: true,
      },
    ];
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
