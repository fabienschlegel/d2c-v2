import { SOCIAL_SHARE_URLS } from 'features/Marketing/constants';

import { IShareToTwitter, IUrlBuilderParameter } from 'features/Marketing/types';

export function buildShareUrl(url: string, ...params: IUrlBuilderParameter[]) {
  const myUrlWithParams = new URL(url);

  params.forEach((param) => myUrlWithParams.searchParams.append(param.name, param.value));

  return myUrlWithParams;
}

export function shareToTwitter({ text, url, via }: IShareToTwitter) {
  const params: IUrlBuilderParameter[] = [];

  if (text && text.length > 0) params.push({ name: 'text', value: text });

  if (url && url.length > 0) params.push({ name: 'url', value: url });

  if (via && via.length > 0) params.push({ name: 'via', value: via });

  return buildShareUrl(SOCIAL_SHARE_URLS.twitter, ...params).href;
}

export function shareToLinkedIn(url: string) {
  return buildShareUrl(SOCIAL_SHARE_URLS.linkedIn, { name: 'url', value: url }).href;
}

export function shareToFacebook(url: string) {
  return buildShareUrl(SOCIAL_SHARE_URLS.facebook, { name: 'u', value: url }).href;
}

export function shareToVK(url: string) {
  return buildShareUrl(SOCIAL_SHARE_URLS.vk, { name: 'url', value: url }).href;
}
