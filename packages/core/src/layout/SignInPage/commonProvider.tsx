/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { InfoCard } from '../InfoCard/InfoCard';
import {
  ProviderComponent,
  ProviderLoader,
  SignInProvider,
  SignInConfig,
} from './types';
import { useApi, errorApiRef } from '@backstage/core-api';

const Component: ProviderComponent = ({ config, onResult }) => {
  const { apiRef, title, message } = config as SignInConfig;
  const authApi = useApi(apiRef);
  const errorApi = useApi(errorApiRef);

  const handleLogin = async () => {
    try {
      const identity = await authApi.getBackstageIdentity({
        instantPopup: true,
      });

      const profile = await authApi.getProfile();
      onResult({
        userId: identity!.id,
        profile: profile!,
        getIdToken: () => {
          return authApi.getBackstageIdentity().then(i => i!.idToken);
        },
        logout: async () => {
          await authApi.logout();
        },
      });
    } catch (error) {
      errorApi.post(error);
    }
  };

  return (
    <Grid item>
      <InfoCard
        title={title}
        actions={
          <Button color="primary" variant="outlined" onClick={handleLogin}>
            Sign In
          </Button>
        }
      >
        <Typography variant="body1">{message}</Typography>
      </InfoCard>
    </Grid>
  );
};

const loader: ProviderLoader = async (apis, apiRef) => {
  const authApi = apis.get(apiRef)!;

  const identity = await authApi.getBackstageIdentity({
    optional: true,
  });

  if (!identity) {
    return undefined;
  }

  const profile = await authApi.getProfile();

  return {
    userId: identity.id,
    profile: profile!,
    getIdToken: () => authApi.getBackstageIdentity().then(i => i!.idToken),
    logout: async () => {
      await authApi.logout();
    },
  };
};

export const commonProvider: SignInProvider = { Component, loader };
