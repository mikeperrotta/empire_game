import * as Amplitude from 'expo-analytics-amplitude';
import { Secrets } from './Secrets';

let isInitialized = false;

export const events = {
  TEST_EVENT: 'TEST_EVENT',
};

export function initialize(): void {
  if (isInitialized) {
    return;
  }
  Amplitude.initialize(Secrets.AMPLITUDE_API);
  isInitialized = true;
}

export function logEvent(event: string): void {
  initialize();
  Amplitude.logEvent(event);
}

export default {
  events,
  initialize,
  logEvent,
};
