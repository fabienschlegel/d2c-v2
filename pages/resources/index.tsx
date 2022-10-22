import type { NextPage } from 'next';

import { Flex, Image } from '@chakra-ui/react';

import { PrimaryLayout } from 'features/Layout';

import { SITE_NAME, SITE_IMAGE } from 'core/constants';

import { getResources } from 'features/Resources/resourcesService';

import { Resource } from 'features/Resources/types';

interface ResourcesPageProps {
  resources: Resource[];
}

const ResourcesPage: NextPage<ResourcesPageProps> = ({ resources }) => {
  return (
    <PrimaryLayout
      pageTitle="List of resources"
      pageMetaDescription={`List of resources from the blog ${SITE_NAME}`}
      pageImagePath={SITE_IMAGE}
    >
      <div>
        <Flex>
          {resources.map((resource) => (
            <div key={resource.id}>
              <p>{resource.title}</p>
              <p>{resource.description}</p>
              <p>{resource.category?.name}</p>
              <div>
                {resource.tags.map((tag) => (
                  <p key={tag.id}>{tag.name}</p>
                ))}
              </div>
              <Image src={resource.imageUrl} alt={resource.description} />
            </div>
          ))}
        </Flex>
      </div>
    </PrimaryLayout>
  );
};

export default ResourcesPage;

export async function getStaticProps() {
  const resources = await getResources();

  return {
    props: {
      resources,
    },
  };
}
