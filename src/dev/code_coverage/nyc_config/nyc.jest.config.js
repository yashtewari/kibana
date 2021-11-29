/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

const path = require('path');

module.exports = {
  'temp-dir': process.env.COVERAGE_TEMP_DIR
    ? path.resolve(process.env.COVERAGE_TEMP_DIR, 'jest')
    : 'target/kibana-coverage/jest',
  'report-dir': 'target/kibana-coverage/jest-combined',
  reporter: ['html', 'json-summary'],
  collectCoverageFrom: [
    '**/*.{js,mjs,jsx,ts,tsx}',
    '!**/{__test__,__snapshots__,__examples__,*mock*,tests,test_helpers,integration_tests,types}/**/*',
    '!**/*mock*.{ts,tsx}',
    '!**/*.test.{ts,tsx}',
    '!**/*.d.ts',
    '!**/index.{js,ts,tsx}',
  ],
};
