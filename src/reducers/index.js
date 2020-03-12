import {combineReducers} from 'redux';
import productosReducer from '../reducers/productosReducer';
import alertaReducer from '../reducers/alertaReducer';

export default combineReducers({
    productos: productosReducer,
    alerta: alertaReducer
});