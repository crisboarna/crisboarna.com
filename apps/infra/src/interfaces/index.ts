import { OpenIdConnectProviderProps } from 'aws-cdk-lib/aws-iam/lib/oidc-provider';
import { IBaseStackProps } from 'aws-cdk-lib-util';

//===ACM===
export type IACMConfig = IDomainConfig & {
  readonly domainZoneId: string;
  readonly domainCertParamName: string;
};

//===API===
export type IDomainConfig = {
  readonly domainName: string;
};

export type IAPIProps = IDomainConfig & { readonly authIdentitySource: string };

//===CI===
export type CIProps = OpenIdConnectProviderProps & {
  readonly owner: string;
};

//===CDN===
export type ICDNApiProps = {
  readonly apiIdParamName: string;
  readonly apiRegion: string;
  readonly apiAuthHeaderKey: string;
  readonly apiAuthHeaderValue: string;
  readonly domainCertParamName: string;
  readonly domainName: string;
  readonly cdnParamNameApi: string;
};

export type ICDNWebProps = {
  readonly artifactPathWeb: string;
  readonly artifactPathWebAuth: string;
  readonly domainCertParamName: string;
  readonly domainName: string;
  readonly cdnParamNameWeb: string;
};

export type CIStackProps = CIProps & IBaseStackProps;
export type ACMStackProps = IACMConfig & IBaseStackProps;
export type ACMCloudfrontStackProps = IACMConfig & IBaseStackProps;
export type APIStackProps = IAPIProps & IBaseStackProps;
export type CDNApiStackProps = ICDNApiProps & IBaseStackProps;
export type CDNWebStackProps = ICDNWebProps & IBaseStackProps;
export type MonitoringBaseStackProps = IBaseStackProps;
export type MonitoringWrapperStackProps = IBaseStackProps;
