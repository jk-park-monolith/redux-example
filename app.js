import { createStore } from './redux.js';
import { reducer } from './reducer.js';
import * as Actions from './actions.js';
import { ASYNC_INCREASE, SET_COUNTER } from './action-type.js';
import { logger } from './logger.js';

const asyncRouter = jobs => store => next => action => {
    const matchJob = Object.entries(jobs).find(([type]) => action.type === type);

    if(matchJob){
        matchJob[1](store, action);
    }else{
        next(action);
    }
}

const asyncJobs = {
    [ASYNC_INCREASE]: function (store, action){
        store.dispath(Actions.asyncRequest());
        setTimeout(() => {
            store.dispath(Actions.increase(20));
            store.dispath(Actions.asyncResponse());
        }, 3000);
    },
};


const store = createStore(reducer, [logger, asyncRouter(asyncJobs)]);

const counterDisplay = document.querySelector('#counter');
const loadingMessage = document.querySelector('#loading');
const btnIncrease = document.querySelector('#btn-increase');
const btnAsyncIncrease = document.querySelector('#btn-async-increase');
const btnDecrease = document.querySelector('#btn-decrease');
const btnReset = document.querySelector('#btn-reset');

store.subscribe(function(){
    const { counter, request } = store.getState();

    loadingMessage.style.visibility = request ? 'visible' : 'hidden';
    counterDisplay.textContent = counter;
})

store.dispath(Actions.setCounter(0));

btnReset.addEventListener('click', () => {
    store.dispath(Actions.setCounter(0));
});


btnIncrease.addEventListener('click', () => {
    store.dispath(Actions.increase());
});


btnDecrease.addEventListener('click', () => {
    store.dispath(Actions.decrease());
});


btnAsyncIncrease.addEventListener('click', () => {
    store.dispath(Actions.asyncIncrease({ url: '/async-increase' }));
});
