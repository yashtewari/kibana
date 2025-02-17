/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type * as estypes from '@elastic/elasticsearch/lib/api/typesWithBodyKey';
import { FieldFormatsStart } from '@kbn/field-formats-plugin/public';
import { KBN_FIELD_TYPES } from '@kbn/data-plugin/public';
import { DataView, DataViewField } from '@kbn/data-views-plugin/public';
import { FieldFormatsContentType } from '@kbn/field-formats-plugin/common/types';

/**
 * Formats the value of a specific field using the appropriate field formatter if available
 * or the default string field formatter otherwise.
 *
 * @param value The value to format
 * @param hit The actual search hit (required to get highlight information from)
 * @param dataView The data view if available
 * @param field The field that value was from if available
 * @returns An sanitized HTML string, that is safe to be applied via dangerouslySetInnerHTML
 */
export function formatFieldValue(
  value: unknown,
  hit: estypes.SearchHit,
  fieldFormats: FieldFormatsStart,
  dataView?: DataView,
  field?: DataViewField,
  contentType?: FieldFormatsContentType | undefined
): string {
  const usedContentType = contentType ?? 'html';
  if (!dataView || !field) {
    // If either no field is available or no data view, we'll use the default
    // string formatter to format that field.
    return fieldFormats
      .getDefaultInstance(KBN_FIELD_TYPES.STRING)
      .convert(value, usedContentType, { hit, field });
  }

  // If we have a data view and field we use that fields field formatter
  return dataView.getFormatterForField(field).convert(value, usedContentType, { hit, field });
}
