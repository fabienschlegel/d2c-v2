import { uppercaseFirst } from 'core';

interface UseMetaPropertiesProps {
  pageTitle: string;
  pageImagePath: string;
  pageMetaDescription: string;
}

interface UseMetaProperties {
  title: string;
  imageSrc: string;
  metaDescription: string;
  siteUrl: string;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

const useMetaProperties = ({
  pageTitle,
  pageImagePath,
  pageMetaDescription,
}: UseMetaPropertiesProps): UseMetaProperties => {
  const title = uppercaseFirst(pageTitle);

  const imageSrc = `${siteUrl}${pageImagePath}`;

  const metaDescription = pageMetaDescription;

  return { title, imageSrc, metaDescription, siteUrl };
};

export default useMetaProperties;
