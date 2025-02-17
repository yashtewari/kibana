/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { ValidFeatureId } from '@kbn/rule-data-utils';
import { renderHook, act } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/dom';
import React from 'react';
import { TestProviders } from '../common/mock';
import { useGetFeatureIds } from './use_get_feature_ids';
import * as api from './api';

jest.mock('./api');
jest.mock('../common/lib/kibana');

describe('useGetFeaturesIds', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('inits with empty data', async () => {
    jest.spyOn(api, 'getFeatureIds').mockRejectedValue([]);
    const { result } = renderHook<string, ValidFeatureId[]>(() => useGetFeatureIds(['context1']), {
      wrapper: ({ children }) => <TestProviders>{children}</TestProviders>,
    });
    act(() => {
      expect(result.current).toEqual([]);
    });
  });

  it('fetches data and returns it correctly', async () => {
    const spy = jest.spyOn(api, 'getFeatureIds');
    const { result } = renderHook<string, ValidFeatureId[]>(() => useGetFeatureIds(['context1']), {
      wrapper: ({ children }) => <TestProviders>{children}</TestProviders>,
    });

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(
        { registrationContext: ['context1'] },
        expect.any(AbortSignal)
      );
    });

    expect(result.current).toEqual(['siem', 'observability']);
  });

  it('throws an error correctly', async () => {
    const spy = jest.spyOn(api, 'getFeatureIds');
    spy.mockImplementation(() => {
      throw new Error('Something went wrong');
    });

    const { result } = renderHook<string, ValidFeatureId[]>(() => useGetFeatureIds(['context1']), {
      wrapper: ({ children }) => <TestProviders>{children}</TestProviders>,
    });

    expect(result.current).toEqual([]);
  });
});
