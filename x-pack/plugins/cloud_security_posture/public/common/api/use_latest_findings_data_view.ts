/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { useQuery } from 'react-query';
import { useKibana } from '@kbn/kibana-react-plugin/public';
import { CSP_LATEST_FINDINGS_DATA_VIEW } from '../../../common/constants';
import { CspClientPluginStartDeps } from '../../types';

/**
 *  TODO: use perfected kibana data views
 */
export const useLatestFindingsDataView = () => {
  const {
    data: { dataViews },
  } = useKibana<CspClientPluginStartDeps>().services;

  // TODO: use `dataViews.get(ID)`
  const findDataView = async () => (await dataViews.find(CSP_LATEST_FINDINGS_DATA_VIEW))?.[0];

  return useQuery(['latest_findings_dataview'], findDataView);
};
