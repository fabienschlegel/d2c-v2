import { isFullPage } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import {
  getTitleProperty,
  getUniqueRelationProperties,
  getMultipleRelationProperties,
  getRichTextProperty,
  getExternalFileUrl,
} from 'core';

import { getCategoriesData, getResourcesData, getTagsData } from './api';

import { Category, Resource, Tag } from './types';
import {
  ExternalFilesProperty,
  RelationProperty,
  RichTextProperty,
  TitleProperty,
} from 'core/notion/types';

export function populateCategory(id: string, properties: PageObjectResponse['properties']) {
  return {
    id,
    name: getTitleProperty(properties.name as TitleProperty),
  };
}

export function populateTag(id: string, properties: PageObjectResponse['properties']) {
  return {
    id,
    name: getTitleProperty(properties.name as TitleProperty),
  };
}

export function populateResource(
  id: string,
  properties: PageObjectResponse['properties'],
  categories: Category[],
  tags: Tag[]
) {
  return {
    id,
    category: getUniqueRelationProperties(properties.categories as RelationProperty, categories),
    tags: getMultipleRelationProperties(properties.tags as RelationProperty, tags),
    title: getRichTextProperty(properties.meta_title as RichTextProperty),
    description: getRichTextProperty(properties.meta_description as RichTextProperty),
    imageUrl: getExternalFileUrl(properties.meta_image as ExternalFilesProperty),
  };
}

export async function getCategories() {
  const categoriesData = await getCategoriesData();

  const categories = [] as Category[];

  await categoriesData.map((category) => {
    if (isFullPage(category)) categories.push(populateCategory(category.id, category.properties));
  });

  return categories;
}

export async function getTags() {
  const tagsData = await getTagsData();

  const tags = [] as Tag[];

  await tagsData.map((tag) => {
    if (isFullPage(tag)) tags.push(populateTag(tag.id, tag.properties));
  });
  return tags;
}

export async function getResources() {
  const resourcesData = await getResourcesData();
  const categories = await getCategories();
  const tags = await getTags();

  const resources = [] as Resource[];

  await resourcesData.map((resource) => {
    if (isFullPage(resource))
      resources.push(populateResource(resource.id, resource.properties, categories, tags));
  });

  return resources;
}
