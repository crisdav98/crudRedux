import {MOSTRAR_ALERTA, OCULTAR_ALERTA} from '../types';

export function mostrarAlertaAction(alerta){
    return dispatch =>{
        dispatch(mostrarAlerta(alerta));
        setTimeout(()=>{
            dispatch(ocultarAlerta());
        },3000);
    }
}

const mostrarAlerta = alerta =>({
    type: MOSTRAR_ALERTA,
    payload: alerta
});
const ocultarAlerta = ()=>({
    type: OCULTAR_ALERTA
});