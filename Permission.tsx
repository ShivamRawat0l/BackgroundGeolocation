import {request, PERMISSIONS} from 'react-native-permissions';
import {Platform} from 'react-native';

export const MOTION_PERMISSION =
  Platform.OS === 'ios'
    ? PERMISSIONS.IOS.MOTION
    : PERMISSIONS.ANDROID.BODY_SENSORS;

export enum PermissionStatus {
  Unavailable = 'unavailable',
  Blocked = 'blocked',
  Denied = 'denied',
  Granted = 'granted',
  Limited = 'limited',
}
