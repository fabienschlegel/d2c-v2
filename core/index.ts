import { lowercaseArrayOfStrings } from './helpers/arrayHelpers';
import { isProduction } from './helpers/systemHelpers';
import { textEllipsis, uppercaseFirst } from './helpers/textHelpers';

import { getAllResultsFromNotion } from './notion/notionRequests';
import {
  getTitleProperty,
  getUniqueRelationProperties,
  getMultipleRelationProperties,
  getRichTextProperty,
  getExternalFileUrl,
} from './notion/notionService';

export {
  lowercaseArrayOfStrings,
  isProduction,
  textEllipsis,
  uppercaseFirst,
  getAllResultsFromNotion,
  getTitleProperty,
  getUniqueRelationProperties,
  getMultipleRelationProperties,
  getRichTextProperty,
  getExternalFileUrl,
};
