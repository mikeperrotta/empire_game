import * as Amplitude from 'expo-analytics-amplitude';
import { Secrets } from './Secrets';

let isInitialized = false;

export const events = {
  APP_START: "APP_START",
  APP_QUIT: "APP_QUIT",
  APP_MINIMIZE: "APP_MINIMIZE",
  APP_UNMINIMIZE: "APP_UNMINIMIZE",
  PAGE_CHANGE: "PAGE_CHANGE",
  PAGE_BACK: "PAGE_BACK",
  SET_NUMBER_PLAYERS: "SET_NUMBER_PLAYERS",
  SET_NUMBER_FAKES: "SET_NUMBER_FAKES",
  SELECT_QUESTION: "SELECT_QUESTION",
  SUBMIT_ANSWER_TRY: "SUBMIT_ANSWER_TRY",
  SUBMIT_ANSWER_SUCCESS: "SUBMIT_ANSWER_SUCCESS",
  DETECTED_DUPLICATE: "DETECTED_DUPLICATE",
  DETECTED_PREVIOUS_DUPLICATE: "DETECTED_PREVIOUS_DUPLICATE",
  START_GAME: "START_GAME",
  TOGGLE_LIST: "TOGGLE_LIST",
  OPEN_END_GAME_MODAL: "OPEN_END_GAME_MODAL",
};

export function initialize(): void {
  if (isInitialized) {
    return;
  }
  Amplitude.initialize(__DEV__ ? 
    Secrets.AMPLITUDE_DEV_API : Secrets.AMPLITUDE_API);
  isInitialized = true;
}

export function logEvent(event: string, properties: string=null): void {
  initialize();
  console.log(event);
  if (properties) {
    Amplitude.logEventWithProperties(event, properties);
    console.log(properties);
  } else {
    Amplitude.logEvent(event);
  }
}

export default {
  events,
  initialize,
  logEvent,
};
