/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

const defaultExclude = require('@istanbuljs/schema/default-exclude');
const extraExclude = ['data/optimize/**', 'src/core/server/**', '**/{test, types}/**/*'];

module.exports = {
  'temp-dir': process.env.COVERAGE_TEMP_DIR
    ? process.env.COVERAGE_TEMP_DIR
    : 'target/kibana-coverage/functional',
  'report-dir': 'target/kibana-coverage/functional/merge',
  reporter: ['json'],
  exclude: extraExclude.concat(defaultExclude),
};
