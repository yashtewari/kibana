#!/usr/bin/env bash

set -euo pipefail

source .buildkite/scripts/common/util.sh

is_test_execution_step

.buildkite/scripts/bootstrap.sh

echo '--- Jest coverage'

.buildkite/scripts/steps/code_coverage/jest_parallel.sh

echo "--- Merging code coverage for a thread"
yarn nyc report --nycrc-path src/dev/code_coverage/nyc_config/nyc.jest_merge.config.js