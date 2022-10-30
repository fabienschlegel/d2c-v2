// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

import { isProduction } from './core';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

const SENTRY_ENV = process.env.NEXT_PUBLIC_SENTRY_ENV;

if (isProduction) {
  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 1.0,
    environment: SENTRY_ENV,
  });
}
