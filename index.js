/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {notificationOnBackgroundListener} from '@libraries/notification';

notificationOnBackgroundListener();

AppRegistry.registerComponent(appName, () => App);
