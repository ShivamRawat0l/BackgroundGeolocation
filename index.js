/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import BackgroundGeolocation from 'react-native-background-geolocation';
export const BACKEND_URL = 'http://192.168.1.27:8239';

const headlessTask = eventName => {
	console.log(eventName.name);
	switch (eventName.name) {
		case 'http':
			break;
	}
};

//BackgroundGeolocation.registerHeadlessTask(headlessTask);

// BackgroundGeolocation.onHttp(response => {
//   console.log(response);
//   console.log('RESPONSE RECEIVED');
// });
// BackgroundGeolocation.onLocation(() => {
//   console.log('Location send');
//   const currentTime = new Date();
//   const currentHour = currentTime.getHours();
//   // NOTE: Change the scheduled hours
//   if( currentHour > 20) // here 20 is 8:00 PM 
//   {
//     BackgroundGeolocation.stopSchedule(); 
//   }
// });
// BackgroundGeolocation.ready({
//   desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
//   distanceFilter: 20,
//   stopTimeout: 10,
//   //schedule: "1-7 05:00-20:00",
//   debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
//   logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
//   stopOnTerminate: false,
//   startOnBoot: true,
//   url: BACKEND_URL,
//   batchSync: true, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
//   autoSync: false, // <-- [Default: true] Set true to sync each location to server as it arrives.
// });
startListeners()
AppRegistry.registerComponent(appName, () => App);
registerHeadlessTask()


function registerHeadlessTask() {
	const BackgroundGeolocationHeadlessTask = async event => {
		const params = event.params;
		// NOTE: This only runs for android in killed start
		if (event.name === "http") {
			console.log("RUNNING",params)

		}
	};
	BackgroundGeolocation.registerHeadlessTask(
		BackgroundGeolocationHeadlessTask
	);
}

function startListeners() {
	BackgroundGeolocation.onHttp(response => {
		// NOTE: This only runs for iOS in killed start
		console.log("RUNNING",response)
		
	});

	BackgroundGeolocation.onLocation(() => {
		console.log("ON Location ")
		const currentTime = new Date();
		const currentHour = currentTime.getHours();
		// NOTE: Here 20 represents 08:00 ( 24 hour clock )
		if (currentHour > 20) {
			this.stopBackgroundGeolocation();
		}
	});

	BackgroundGeolocation.ready({
		enableHeadless: true,
		desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
		distanceFilter: 200, // NOTE: 1 miles = 1609 meter
		stopOnTerminate: false,
		startOnBoot: true,
		schedule: [
			"1-7 05:00-23:59" // Sun-Sat: 5:00am to 8:00pm
		],
		url: BACKEND_URL,
		allowIdenticalLocations: true,
		disableStopDetection: true,
		disableLocationAuthorizationAlert: true,
		locationAuthorizationRequest: "Always",
		batchSync: true,
		autoSync: false,
		debug: true,
		logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
		desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
	});
}

export function start() {
	console.log("Start")
	BackgroundGeolocation.startSchedule();
}

export async function stopBackgroundGeolocation() {
	console.log("STOPP")
	await BackgroundGeolocation.stopSchedule().then(state => {
		if (state.enabled) {
			BackgroundGeolocation.stop();
		}
	});
}
