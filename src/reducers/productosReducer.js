import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINAR_EXITO,
  PRODUCTO_ELIMINAR_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  PRODUCTO_EDITAR_EXITO,
  PRODUCTO_EDITAR_ERROR,
  COMENZAR_EDICION_PRODUCTO
} from "../types";

// Cada reducer tiene su propio state
const initialState = {
  productos: [],
  error: null,
  loading: false,
  idProductoEliminar: null,
  productoEditar: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AGREGAR_PRODUCTO:
    case COMENZAR_DESCARGA_PRODUCTOS:
      case COMENZAR_EDICION_PRODUCTO:
      return {
        ...state,
        loading: true
      };
    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        productos: [...state.productos, action.payload],
        loading: false,
        error: null
      };
    case AGREGAR_PRODUCTO_ERROR:
    case DESCARGA_PRODUCTOS_ERROR:
    case PRODUCTO_ELIMINAR_ERROR:
    case  PRODUCTO_EDITAR_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case DESCARGA_PRODUCTOS_EXITO:
      return {
        ...state,
        productos: action.payload,
        error: null,
        loading: false
      };
    case OBTENER_PRODUCTO_ELIMINAR:
      return {
        ...state,
        idProductoEliminar: action.payload
      };
    case PRODUCTO_ELIMINAR_EXITO:
      return {
        ...state,
        productos: state.productos.filter(
          producto => producto.id !== state.idProductoEliminar
        ),
        idProductoEliminar: null
      };
    case OBTENER_PRODUCTO_EDITAR:
      return{
        ...state,
        productoEditar: action.payload
      }
    case PRODUCTO_EDITAR_EXITO:
      return{
        ...state,
        productos: state.productos.map(producto =>producto.id ===action.payload.id ? action.payload : producto),
        error: null,
        loading: false,
        productoEditar: null
      }
    default:
      return state;
  }
}
