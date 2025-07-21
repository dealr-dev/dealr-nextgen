import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_nz7PMeqVN',
    userPoolWebClientId: '454g63o4rv3e65tsshgjhr7h0e',
    authenticationFlowType: 'CUSTOM_AUTH',
  },
});
