import { Amplify } from 'aws-amplify';
import 'react-native-get-random-values';

Amplify.configure({
  Auth: {
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_nz7PMeqVN',
    userPoolWebClientId: '454g63o4rv3e65tsshgjhr7h0e',
    authenticationFlowType: 'CUSTOM_AUTH',
  },
  API: {
    endpoints: [
      {
          "name": "accountMicroserviceAPI",
          "endpoint": "https://ih5epnwh2j.execute-api.eu-west-1.amazonaws.com/production",
          "region": "eu-west-1"
      },
      {
          "name": "chatroomMicroserviceAPI",
          "endpoint": "https://5mewv9nhqd.execute-api.eu-west-1.amazonaws.com/production",
          "region": "eu-west-1"
      },
      {
          "name": "customerMicroserviceAPI",
          "endpoint": "https://1poqg1k640.execute-api.eu-west-1.amazonaws.com/production",
          "region": "eu-west-1"
      },
      {
          "name": "dealershipMicroserviceAPI",
          "endpoint": "https://ro07sph60i.execute-api.eu-west-1.amazonaws.com/production",
          "region": "eu-west-1"
      },
      {
          "name": "deviceMicroserviceAPI",
          "endpoint": "https://rqcj0emijj.execute-api.eu-west-1.amazonaws.com/production",
          "region": "eu-west-1"
      },
      {
          "name": "favoritesMicroserviceAPI",
          "endpoint": "https://72ybjhh37j.execute-api.eu-west-1.amazonaws.com/production",
          "region": "eu-west-1"
      },
      {
          "name": "googleMicroserviceAPI",
          "endpoint": "https://802vk3cqbj.execute-api.eu-west-1.amazonaws.com/production",
          "region": "eu-west-1"
      },
      {
          "name": "scheduleMicroserviceAPI",
          "endpoint": "https://l3us26jmad.execute-api.eu-west-1.amazonaws.com/production",
          "region": "eu-west-1"
      },
      {
          "name": "sellerMicroserviceAPI",
          "endpoint": "https://wcu337pvx8.execute-api.eu-west-1.amazonaws.com/production",
          "region": "eu-west-1"
      },
      {
          "name": "smsMicroServiceAPI",
          "endpoint": "https://3cvzyn91e7.execute-api.eu-west-1.amazonaws.com/production",
          "region": "eu-west-1"
      },
      {
          "name": "transunionMicroserviceAPI",
          "endpoint": "https://bvuqdb4kne.execute-api.eu-west-1.amazonaws.com/production",
          "region": "eu-west-1"
      },
      {
          "name": "vehicleMetadataMicroserviceAPI",
          "endpoint": "https://ptbow1wfp5.execute-api.eu-west-1.amazonaws.com/production",
          "region": "eu-west-1"
      },
      {
          "name": "vehicleMicroServiceAPIv2",
          "endpoint": "https://2uvdlx2vw4.execute-api.eu-west-1.amazonaws.com/production",
          "region": "eu-west-1"
      },
      {
          "name": "vehicleMicroserviceAPI",
          "endpoint": "https://bnilumi6m9.execute-api.eu-west-1.amazonaws.com/production",
          "region": "eu-west-1"
      },
      {
          "name": "verifyMicroserviceAPI",
          "endpoint": "https://u7lo7q7gv5.execute-api.eu-west-1.amazonaws.com/production",
          "region": "eu-west-1"
      },
      {
          "name": "imageMicroserviceAPI",
          "endpoint": "https://8w8v5st2m8.execute-api.eu-west-1.amazonaws.com/production",
          "region": "eu-west-1"
      }
    ]
  }
});