import { Client } from "@notionhq/client";

import {
  PageObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";

export type NotionQueryResults = Array<
  PageObjectResponse | PartialPageObjectResponse
>;

export interface NotionQueryParameters {
  databaseId: string;
  partialResults?: NotionQueryResults;
  sorts?: QueryDatabaseParameters["sorts"];
  filters?: QueryDatabaseParameters["filter"];
  nextCursor?: string;
}

const notionClient = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_KEY });

export async function getAllResultsFromNotion({
  databaseId,
  filters,
  sorts,
  nextCursor,
  partialResults = [],
}: NotionQueryParameters): Promise<NotionQueryResults> {
  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: filters,
    start_cursor: nextCursor,
  });

  const responseResults = response.results;

  const results = [...partialResults, ...responseResults];

  const responseHasMore = response.has_more;
  const responseNextCursor: string | undefined =
    response.next_cursor || undefined;

  if (responseHasMore)
    return getAllResultsFromNotion({
      databaseId,
      filters,
      sorts,
      partialResults: results,
      nextCursor: responseNextCursor,
    });

  return results;
}
