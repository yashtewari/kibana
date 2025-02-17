/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { XScaleTypes } from '../constants';
import { CommonXYDataLayerConfigResult } from '../types';

export function isTimeChart(layers: CommonXYDataLayerConfigResult[]) {
  return layers.every<CommonXYDataLayerConfigResult>(
    (l): l is CommonXYDataLayerConfigResult =>
      l.table.columns.find((col) => col.id === l.xAccessor)?.meta.type === 'date' &&
      l.xScaleType === XScaleTypes.TIME
  );
}
