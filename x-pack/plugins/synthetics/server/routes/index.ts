/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { getServiceLocationsRoute } from './synthetics_service/get_service_locations';
import { deleteSyntheticsMonitorRoute } from './monitor_cruds/delete_monitor';
import {
  disableSyntheticsRoute,
  enableSyntheticsRoute,
  getSyntheticsEnablementRoute,
} from './synthetics_service/enablement';
import {
  getAllSyntheticsMonitorRoute,
  getSyntheticsMonitorRoute,
} from './monitor_cruds/get_monitor';
import { runOnceSyntheticsMonitorRoute } from './synthetics_service/run_once_monitor';
import { getServiceAllowedRoute } from './synthetics_service/get_service_allowed';
import { testNowMonitorRoute } from './synthetics_service/test_now_monitor';
import { installIndexTemplatesRoute } from './synthetics_service/install_index_templates';
import { editSyntheticsMonitorRoute } from './monitor_cruds/edit_monitor';
import { addSyntheticsMonitorRoute } from './monitor_cruds/add_monitor';
import { UMRestApiRouteFactory } from '../legacy_uptime/routes';

export const syntheticsAppRestApiRoutes: UMRestApiRouteFactory[] = [
  addSyntheticsMonitorRoute,
  getSyntheticsEnablementRoute,
  deleteSyntheticsMonitorRoute,
  disableSyntheticsRoute,
  editSyntheticsMonitorRoute,
  enableSyntheticsRoute,
  getServiceLocationsRoute,
  getSyntheticsMonitorRoute,
  getAllSyntheticsMonitorRoute,
  installIndexTemplatesRoute,
  runOnceSyntheticsMonitorRoute,
  testNowMonitorRoute,
  getServiceAllowedRoute,
];
