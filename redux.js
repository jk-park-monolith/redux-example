export const actionCreator = type => payload => ({
        type,
        payload,
    });

export function createStore(reducer, middlewares = []){
    let state;
    let handlers = [];

    function dispath(action){
        state = reducer(state, action);
        handlers.forEach(handler => handler());
    }

    function subscribe(handler){
        handlers.push(handler);
    }

    function getState(){
        return state;
    }

    const store = {
        dispath, 
        getState,
        subscribe,
    };

    middlewares = Array.from(middlewares).reverse();
    let lastDispatch = dispath;

    middlewares.forEach(middleware => {
        lastDispatch = middleware(store)(lastDispatch);
    });

    store.dispath = lastDispatch;

    return store;
}

