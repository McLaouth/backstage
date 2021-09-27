## API Report File for "@backstage/integration-react"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
/// <reference types="react" />

import { ApiFactory } from '@backstage/core-plugin-api';
import { ApiRef } from '@backstage/core-plugin-api';
import { AuthRequestOptions } from '@backstage/core-plugin-api';
import { BackstageIdentityApi } from '@backstage/core-plugin-api';
import { Config } from '@backstage/config';
import { OAuthApi } from '@backstage/core-plugin-api';
import { OpenIdConnectApi } from '@backstage/core-plugin-api';
import { ProfileInfoApi } from '@backstage/core-plugin-api';
import { ScmIntegrationRegistry } from '@backstage/integration';
import { SessionApi } from '@backstage/core-plugin-api';

// @public
export class ScmAuth implements ScmAuthApi {
  static createDefaultApiFactory(): ApiFactory<
    ScmAuthApi,
    ScmAuthApi,
    {
      github: OAuthApi & ProfileInfoApi & BackstageIdentityApi & SessionApi;
      gitlab: OAuthApi & ProfileInfoApi & BackstageIdentityApi & SessionApi;
      azure: OAuthApi &
        OpenIdConnectApi &
        ProfileInfoApi &
        BackstageIdentityApi &
        SessionApi;
    }
  >;
  static forAuthApi(
    authApi: OAuthApi,
    options: {
      host: string;
      scopeMapping: {
        default: string[];
        repoWrite: string[];
      };
    },
  ): ScmAuth;
  static forAzure(
    microsoftAuthApi: OAuthApi,
    options?: {
      host?: string;
    },
  ): ScmAuth;
  static forBitbucket(
    bitbucketAuthApi: OAuthApi,
    options?: {
      host?: string;
    },
  ): ScmAuth;
  static forGithub(
    githubAuthApi: OAuthApi,
    options?: {
      host?: string;
    },
  ): ScmAuth;
  static forGitlab(
    gitlabAuthApi: OAuthApi,
    options?: {
      host?: string;
    },
  ): ScmAuth;
  // (undocumented)
  getCredentials(options: ScmAuthTokenOptions): Promise<ScmAuthTokenResponse>;
  isUrlSupported(url: URL): boolean;
  static merge(...providers: ScmAuth[]): ScmAuthApi;
}

// @public
export interface ScmAuthApi {
  getCredentials(options: ScmAuthTokenOptions): Promise<ScmAuthTokenResponse>;
}

// @public
export const scmAuthApiRef: ApiRef<ScmAuthApi>;

// @public (undocumented)
export interface ScmAuthTokenOptions extends AuthRequestOptions {
  additionalScope?: {
    repoWrite?: boolean;
  };
  url: string;
}

// @public (undocumented)
export interface ScmAuthTokenResponse {
  headers: {
    [name: string]: string;
  };
  token: string;
}

// Warning: (ae-missing-release-tag) "ScmIntegrationIcon" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export const ScmIntegrationIcon: ({
  type,
}: {
  type?: string | undefined;
}) => JSX.Element;

// Warning: (ae-missing-release-tag) "ScmIntegrationsApi" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export class ScmIntegrationsApi {
  // (undocumented)
  static fromConfig(config: Config): ScmIntegrationRegistry;
}

// Warning: (ae-missing-release-tag) "scmIntegrationsApiRef" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export const scmIntegrationsApiRef: ApiRef<ScmIntegrationRegistry>;
```