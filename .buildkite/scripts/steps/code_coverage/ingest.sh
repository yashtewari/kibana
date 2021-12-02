#!/usr/bin/env bash

set -euo pipefail

source .buildkite/scripts/common/util.sh

is_test_execution_step

export CODE_COVERAGE=1

.buildkite/scripts/bootstrap.sh

node scripts/build_kibana_platform_plugins.js --no-cache

# download coverage arctifacts
#buildkite-agent artifact download "kibana-jest-coverage.tar.gz" . --build "${KIBANA_BUILD_ID:-$BUILDKITE_BUILD_ID}"
buildkite-agent artifact download target/kibana-coverage/jest/* . --build "${KIBANA_BUILD_ID:-$BUILDKITE_BUILD_ID}"
buildkite-agent artifact download target/kibana-coverage/functional/* . --build "${KIBANA_BUILD_ID:-$BUILDKITE_BUILD_ID}"

export COVERAGE_TEMP_DIR=$KIBANA_DIR/target/kibana-coverage
echo "--- Jest: coverage json files stored in $COVERAGE_TEMP_DIR/jest"
sed -i "s|/opt/local-ssd/buildkite/builds/kb-[[:alnum:]\-]\{20,27\}/elastic/kibana-code-coverage-main/kibana|${KIBANA_DIR}|g" $COVERAGE_TEMP_DIR/jest/*.json
echo "--- Jest: merge json files and generate combined report"
yarn nyc report --nycrc-path src/dev/code_coverage/nyc_config/nyc.jest.config.js
echo "--- Archive combined jest report"
tar -czf kibana-jest-coverage.tar.gz target/kibana-coverage/jest-combined && rm -rf target/kibana-coverage/jest-combined

# echo "### Functional: coverage json files stored in $COVERAGE_TEMP_DIR"
# sed -i "s|/opt/local-ssd/buildkite/builds/kb-cigroup-4d-[[:xdigit:]]\{16\}/elastic/kibana-code-coverage-main/kibana|${KIBANA_DIR}|g" $COVERAGE_TEMP_DIR/functional/*.json
# echo "### Functional: merge json files and generate combined report"
# yarn nyc report --nycrc-path src/dev/code_coverage/nyc_config/nyc.functional.config.js

#tar -czf kibana-functional-ciGroup-coverage.tar.gz $COVERAGE_TEMP_DIR && rm -rf $COVERAGE_TEMP_DIR
# echo "--- Archive combined functional report"
# tar -czf kibana-functional-coverage.tar.gz target/kibana-coverage/functional-combined && rm -rf target/kibana-coverage/functional-combined

# # process HTML Links
# .buildkite/scripts/steps/code_coverage/ingest/prokLinks.sh
# # collect VCS Info
# .buildkite/scripts/steps/code_coverage/ingest/collectVcsInfo.sh
# # merge coverage reports
# . src/dev/code_coverage/shell_scripts/extract_archives.sh
# . src/dev/code_coverage/shell_scripts/merge_functional.sh
# . src/dev/code_coverage/shell_scripts/copy_jest_report.sh
# # zip functional combined report
# tar -czf kibana-functional-coverage.tar.gz target/kibana-coverage/functional-combined/*

# ls -laR target/kibana-coverage/
# buildkite-agent artifact upload 'kibana-functional-coverage.tar.gz'
# upload coverage static site
#.buildkite/scripts/steps/code_coverage/ingest/uploadStaticSite.sh
#ingest results to Kibana stats cluster
#. src/dev/code_coverage/shell_scripts/generate_team_assignments_and_ingest_coverage.sh '${jobName}' ${buildNum} '${buildUrl}' '${previousSha}' '${teamAssignmentsPath}'
