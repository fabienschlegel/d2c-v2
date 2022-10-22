import {
  RelationValue,
  RelationProperty,
  TitleProperty,
  RichTextProperty,
  ExternalFilesProperty,
} from './types';

export function getUniqueRelationProperties(
  relationProperty: RelationProperty,
  relationValues: RelationValue[]
) {
  const relationId = relationProperty.relation[0].id;

  return relationValues.find((value) => value.id === relationId) || null;
}

export function getMultipleRelationProperties(
  relationProperty: RelationProperty,
  relationValues: RelationValue[]
) {
  const relationsId = relationProperty.relation.map((relation) => relation.id);

  return relationsId.reduce((acc, currentValue) => {
    const relation = relationValues.find((value) => value.id === currentValue);
    if (relation) return [...acc, relation];
    return acc;
  }, [] as RelationValue[]);
}

export function getTitleProperty(titleProperty: TitleProperty) {
  return titleProperty.title[0].plain_text;
}

export function getRichTextProperty(richTextProperty: RichTextProperty) {
  return richTextProperty.rich_text[0].plain_text;
}

export function getExternalFileUrl(externalFiles: ExternalFilesProperty) {
  return externalFiles.files[0].external.url;
}
