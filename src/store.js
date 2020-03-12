import {createStore, applyMiddleware, compose} from 'redux';
// Thunk permite utilizar funciones asíncronas 
import thunk from 'redux-thunk';
import reducer from './reducers';

const store = createStore(
    reducer,
    compose(applyMiddleware(thunk),
        // código para poder usar redux development tools
        // y para que la palicación funcione asi no este instalado react devtools
        typeof window ==='object' &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
            window.__REDUX_DEVTOOLS_EXTENSION__(): f => f
    )
);

export default store;