import { GA_TRACKING_ID } from '../constants';

import { GTagEvent } from '../types';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const gtagPageview = (url: URL): void => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const gtagEvent = ({ action, category, label, value }: GTagEvent): void => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
