//import { NavigationActions } from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
    navigator = navigatorRef;
}

function navigate(routeName, params) {
    
}

export default {
    navigate,
    setTopLevelNavigator,
};
