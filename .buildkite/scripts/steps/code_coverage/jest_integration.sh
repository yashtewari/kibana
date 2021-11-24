#!/usr/bin/env bash

set -euo pipefail

source .buildkite/scripts/common/util.sh

is_test_execution_step

.buildkite/scripts/bootstrap.sh

echo '--- Jest Integration Tests with coverage'
node --max-old-space-size=5120 scripts/jest_integration  --ci --coverage --coverageReporters json || true