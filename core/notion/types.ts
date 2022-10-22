import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

export interface RelationValue {
  id: string;
  name: string;
}

export interface RelationProperty {
  type: 'relation';
  relation: Array<{
    id: string;
  }>;
  id: string;
}

export interface TitleProperty {
  type: 'title';
  title: Array<RichTextItemResponse>;
  id: string;
}

export interface RichTextProperty {
  type: 'rich_text';
  rich_text: Array<RichTextItemResponse>;
  id: string;
}

export interface ExternalFilesProperty {
  type: 'files';
  files: Array<{
    external: {
      url: string;
    };
    name: string;
    type?: 'external';
  }>;
  id: string;
}

export type Properties = Record<string, RelationProperty | TitleProperty | RichTextProperty>;
