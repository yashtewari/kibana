#!/usr/bin/env bash

set -euo pipefail

source .buildkite/scripts/steps/functional/common.sh

node scripts/build_kibana_platform_plugins.js --no-cache

export CI_GROUP=${CI_GROUP:-$((BUILDKITE_PARALLEL_JOB+1))}
export JOB=kibana-oss-ciGroup${CI_GROUP}

echo "--- OSS CI Group $CI_GROUP"
echo " -> Running Functional tests with code coverage"
export NODE_OPTIONS=--max_old_space_size=8192
export CODE_COVERAGE=1

# echo " -> making hard link clones"
# cd ..
# cp -RlP kibana "kibana${CI_GROUP}"
# cd "kibana${CI_GROUP}"

#echo " -> running tests from the clone folder"
node scripts/functional_tests \
  --include-tag "ciGroup$CI_GROUP" \
  --exclude-tag "skipCoverage" || true

yarn nyc report --nycrc-path src/dev/code_coverage/nyc_config/nyc.functional_merge.config.js

#mkdir -p ../kibana/target/kibana-coverage/functional/merge
#mv target/kibana-coverage/functional/merge/coverage-final.json "../kibana/target/kibana-coverage/functional/merge/oss-${CI_GROUP}-coverage.json" || echo "copying coverage file failed"
mv target/kibana-coverage/functional/merge/coverage-final.json "target/kibana-coverage/functional/merge/xpack-${CI_GROUP}-coverage.json"
# echo " -> moving junit output, silently fail in case of no report"
# mkdir -p ../kibana/target/junit
# mv target/junit/* ../kibana/target/junit/ || echo "copying junit failed"

# echo " -> copying screenshots and html for failures"
# cp -r test/functional/screenshots/* ../kibana/test/functional/screenshots/ || echo "copying screenshots failed"
# cp -r test/functional/failure_debug ../kibana/test/functional/ || echo "copying html failed"