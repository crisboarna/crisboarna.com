import { IBaseStackProps } from '../utils/interfaces';
import { OpenIdConnectProviderProps } from 'aws-cdk-lib/aws-iam/lib/oidc-provider';

//===ACM===
export type IACMConfig = IDomainConfig & {
  readonly domainZoneId: string;
  readonly domainCertParamName: string;
};

//===API===
export type IDomainConfig = {
  readonly domainName: string;
};

export type IAPIProps = IDomainConfig;

//===CI===
export type CIProps = OpenIdConnectProviderProps & {
  readonly owner: string;
};

//===CDN===
export type ICDNProps = {
  readonly apiIdParamName: string;
  readonly apiRegion: string;
  readonly domainCertParamName: string;
  readonly domainName: string;
  readonly cdnParamName: string;
};

export type CIStackProps = CIProps & IBaseStackProps;
export type ACMStackProps = IACMConfig & IBaseStackProps;
export type ACMCloudfrontStackProps = IACMConfig & IBaseStackProps;
export type APIStackProps = IAPIProps & IBaseStackProps;
export type CDNStackProps = ICDNProps & IBaseStackProps;
export type S3StackProps = IBaseStackProps;
export type MonitoringBaseStackProps = IBaseStackProps;
export type MonitoringWrapperStackProps = IBaseStackProps;
