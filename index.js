const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducer = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

// Actions
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM"; 

//Action Creator
// A function that creates an action
// Action creator to buy a cake
function buyCake() {
    return {
        type: BUY_CAKE,
        info: "Mud Cake"
    }
}

//Action creator to buy an ice cream
function buyIcecream() {
    return {
        type: BUY_ICECREAM,
        info: "Ice Cream"
    }
}

//Initial States
//Initial states for cake
const initialCakeState = {
    numOfCakes: 10,
};

//Initial states for Ice Cream
const initialIcecreamState = {
    numOfIceCreams: 20
};


//Cake Reducer
const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case BUY_CAKE: 
            return {
                ...state,
                numOfCakes: state.numOfCakes-1
            }
        default: 
            return state;
    }
}

const Icecreamreducer = (state = initialIcecreamState, action) => {
    switch(action.type) {
        case BUY_ICECREAM: 
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams-1
            }
        default: 
            return state;
    }
}

//Root Reducer
// Reducer that contains other reducers
const rootReducer = combineReducer({
    cake: cakeReducer,
    icecream: Icecreamreducer
});

// Create a store
const store = createStore(
        rootReducer,
        applyMiddleware(logger)
    );

console.log("Init state: ", store.getState());
const unsubscribe = store.subscribe(() => {});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());

unsubscribe();