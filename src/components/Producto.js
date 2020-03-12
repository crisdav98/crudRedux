import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

// redux
import { useDispatch } from "react-redux";
import { eliminarProductoAction, obtenerProductoEditar } from "../actions/productoActions";

const Producto = ({ producto }) => {
  const dispatch = useDispatch();
  const history = useHistory(); // Habilitar history para redirección

  const confirmarEliminar = id => {
    // Preguntar al usuario
    Swal.fire({
      title: "Acción Eliminar",
      text: `¿Seguro de Eliminar el producto: ${producto.nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.value) {
        //pasar al action
        dispatch(eliminarProductoAction(id));
      }
    });
  };

  // función que redirige de forma programada
  const redireccionarEdicion = producto =>{
    dispatch(obtenerProductoEditar(producto));
    history.push(`/productos/editar/${producto.id}`);
  }
  return (
    <tr>
      <td>{producto.nombre}</td>
      <td>
        <span className="font-weight-bold">$ {producto.precio}</span>
      </td>
      <td className="acciones text-center">
        <button
          type="button"
          onClick={()=>redireccionarEdicion(producto)}
          className="btn btn-primary mr-2"
        >
          Editar
        </button>
        <button
          className="btn btn-danger"
          onClick={() => confirmarEliminar(producto.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
