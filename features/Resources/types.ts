import { RelationValue } from 'core/notion/types';

export type Category = RelationValue;

export type Tag = RelationValue;

export interface Resource {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: Category | null;
  tags: Tag[];
}
