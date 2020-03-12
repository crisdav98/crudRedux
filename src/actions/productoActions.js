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
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

//crear nuevos productos
export function crearNuevoProductoAction(producto) {
  return async dispatch => {
    dispatch(agregarProducto());

    try {
      setTimeout(async () => {
        // insertar en la API
        await clienteAxios.post("/productos", producto);
        dispatch(agregadoExito(producto));
        // Mostrar mensaje de agregado correctamente
        Swal.fire("Correcto", "El producto se agrego correctamente", "success");
      }, 2500);
    } catch (error) {
      console.log(error);
      dispatch(agregadoError(true));
      Swal.fire({
        icon: "error",
        title: "Se produjo un Error",
        text: "Error al insertar, intente de nuevo"
      });
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO
});

const agregadoExito = producto => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
});

const agregadoError = bandera => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: bandera
});

// Funcion que descarga los productos de la bd
export function obtenerProductosAction() {
  return async dispatch => {
    dispatch(descargaProductos());
    try {
      setTimeout(async () => {
        const respuesta = await clienteAxios.get("/productos");
        dispatch(descargaExitosa(respuesta.data));
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(descargaError());
    }
  };
}

const descargaProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS
});
const descargaExitosa = productos => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos
});
const descargaError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR
});

// Función para eliminar un producto
export function eliminarProductoAction(id) {
  return async dispatch => {
    dispatch(obtenerProductoEliminar(id));
    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());
      Swal.fire(
        "Eliminado !",
        "El producto se eliminó correctamente",
        "success"
      );
    } catch (error) {
      console.log(error);
      dispatch(eliminarProductosError());
      Swal.fire({
        icon: "error",
        title: "Se produjo un Error",
        text: "Error al eliminar, intente de nuevo"
      });
    }
  };
}

const obtenerProductoEliminar = id => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id
});

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINAR_EXITO
});

const eliminarProductosError = () => ({
  type: PRODUCTO_ELIMINAR_ERROR
});

// colocar producto en edición

export function obtenerProductoEditar(producto) {
  return dispatch => {
    dispatch(obtenerProductoAction(producto));
  };
}

const obtenerProductoAction = producto =>({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto
})

// Editar un registro en la api y state
export function editarProductoAction(producto){
  return async dispatch =>{
    dispatch(comenzarEdicion());
    try {
      await clienteAxios.put(`/productos/${producto.id}`, producto);
      dispatch(edicionExito(producto));
      // mostrar alerta 
      Swal.fire("Actualización con Éxito", "El producto se actualizó correctamente", "success");
    } catch (error) {
      console.log(error);
      dispatch(edicionError());
      Swal.fire({
        icon: "error",
        title: "Se produjo un Error",
        text: "Error al actualizar, intente de nuevo"
      });
    }
  }
}

const comenzarEdicion= ()=>({
  type: COMENZAR_EDICION_PRODUCTO
});

const edicionError= () =>({
  type: PRODUCTO_EDITAR_ERROR
});

const edicionExito = (producto)=>({
  type: PRODUCTO_EDITAR_EXITO,
  payload: producto
})
