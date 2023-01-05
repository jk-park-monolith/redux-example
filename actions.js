import { INCREASE, DECREASE, SET_COUNTER, ASYNC_INCREASE, ASYNC_REQUEST, ASYNC_RESPONSE } from './action-type.js';
import { actionCreator } from './redux.js';

export const increase = actionCreator(INCREASE);
export const asyncIncrease = actionCreator(ASYNC_INCREASE);
export const decrease = actionCreator(DECREASE); 
export const setCounter = actionCreator(SET_COUNTER); 
export const asyncRequest = actionCreator(ASYNC_REQUEST); 
export const asyncResponse = actionCreator(ASYNC_RESPONSE); 