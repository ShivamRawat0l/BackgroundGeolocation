/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import BackgroundGeolocation from 'react-native-background-geolocation';
const BACKEND_URL = 'http://192.168.1.76:9000';

const headlessTask = (eventName)=>{
    console.log(eventName.name)
    switch(eventName.name){
      case "http": break;
    }
}

BackgroundGeolocation.registerHeadlessTask(headlessTask)

BackgroundGeolocation.onHttp(response => {
  console.log(response);
  console.log('RESPONSE RECEIVED');
});
BackgroundGeolocation.onLocation(() => {
  console.log('Location send');
});
BackgroundGeolocation.ready({
  desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
  distanceFilter: 20,
  stopTimeout: 10,
  debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
  logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
  stopOnTerminate: false,
  startOnBoot: true,
  url: BACKEND_URL,
  batchSync: true, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
  autoSync: false, // <-- [Default: true] Set true to sync each location to server as it arrives.
});
AppRegistry.registerComponent(appName, () => App);
