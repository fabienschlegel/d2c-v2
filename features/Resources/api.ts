import { getAllResultsFromNotion, NotionQueryResults } from 'core/notion/notionRequests';

import { CATEGORIES_DATABASE_ID, RESOURCES_DATABASE_ID, TAGS_DATABASE_ID } from './constants';

export async function getResourcesData(): Promise<NotionQueryResults> {
  return getAllResultsFromNotion({
    databaseId: RESOURCES_DATABASE_ID,
    filters: {
      property: 'published',
      checkbox: {
        equals: true,
      },
    },
  });
}

export async function getCategoriesData(): Promise<NotionQueryResults> {
  return getAllResultsFromNotion({ databaseId: CATEGORIES_DATABASE_ID });
}

export async function getTagsData(): Promise<NotionQueryResults> {
  return getAllResultsFromNotion({ databaseId: TAGS_DATABASE_ID });
}
