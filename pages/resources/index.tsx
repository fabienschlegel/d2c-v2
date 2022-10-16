import type { NextPage } from "next";

import { PrimaryLayout } from "features/Layout";

import { SITE_NAME, SITE_IMAGE } from "core/constants";

interface ResourcesPageProps {
  resources: unknown;
}

const ResourcesPage: NextPage<ResourcesPageProps> = ({ resources }) => {
  return (
    <PrimaryLayout
      pageTitle="List of resources"
      pageMetaDescription={`List of resources from the blog ${SITE_NAME}`}
      pageImagePath={SITE_IMAGE}
    >
      <div>Resources Page</div>
    </PrimaryLayout>
  );
};

export default ResourcesPage;
