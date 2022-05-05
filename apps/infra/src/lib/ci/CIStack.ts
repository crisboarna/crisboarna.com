import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CIStackProps } from '../../interfaces';
import {
  ManagedPolicy,
  Role,
  WebIdentityPrincipal,
  OpenIdConnectProvider,
} from 'aws-cdk-lib/aws-iam';

/**
 * Stack creating the Github OIDC provider for Github Actions to be able to assume role in accounts to deploy
 */
export class CIStack extends Stack {
  constructor(scope: Construct, id: string, props?: CIStackProps) {
    super(scope, id, props);

    const { clientIds, owner, projectName, stackEnv, thumbprints, url } = props;

    const githubOidcProvider = new OpenIdConnectProvider(
      this,
      `${projectName}-Github-OIDC-Provider-${stackEnv}`,
      { url: `https://${url}`, clientIds, thumbprints }
    );

    new Role(this, `${projectName}-CI-Role-${stackEnv}`, {
      roleName: `${projectName}-CI-Role-${stackEnv}`,
      description: `Role used by Github Actions`,
      assumedBy: new WebIdentityPrincipal(
        githubOidcProvider.openIdConnectProviderArn,
        {
          StringLike: {
            [`${url}:sub`]: `repo:${owner}/*:*`,
          },
          StringEquals: {
            [`${url}:aud`]: clientIds[0],
          },
        }
      ),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('PowerUserAccess'),
      ],
    });
  }
}
