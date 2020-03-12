import React, { useState, useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { editarProductoAction } from "../actions/productoActions";
import { mostrarAlertaAction } from "../actions/alertaAction";

const EditarProducto = ({ history }) => {
  const dispatch = useDispatch();
  // State del componente
  const [nuevoProducto, guardarNuevoProducto] = useState({
    nombre: "",
    precio: ""
  });
  const producto = useSelector(state => state.productos.productoEditar);
  const alerta = useSelector(state =>state.alerta.alerta);

  useEffect(() => {
    guardarNuevoProducto(producto);
  }, [producto]);

  const { nombre, precio } = nuevoProducto;

  // leer los datos del formulario
  const submitEditar = e => {
    e.preventDefault();

    // vadiar que los campos no esten vacíos
    if (nuevoProducto.nombre.trim() === "" || nuevoProducto.precio === 0) {
      const alerta = {
        msg: 'EXISTEN CAMPOS VACÍOS',
        classes: 'alert alert-danger text-center text-uppercase p3'
      }
      dispatch(mostrarAlertaAction(alerta));
      return;
    }

    //pasar al action
    dispatch(editarProductoAction(nuevoProducto));

    // redireccionar al principio
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>
            {alerta ? (<p className={alerta.classes}> 
              {alerta.msg}
            </p>): null}

            <form onSubmit={submitEditar}>
              <div className="form-group">
                <label>Nombre del Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del Producto"
                  name="nombre"
                  value={nombre}
                  onChange={e =>
                    guardarNuevoProducto({
                      ...nuevoProducto,
                      [e.target.name]: e.target.value
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Precio del Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio del Producto"
                  name="precio"
                  value={precio}
                  onChange={e =>
                    guardarNuevoProducto({
                      ...nuevoProducto,
                      [e.target.name]: e.target.value
                    })
                  }
                />
              </div>
              <input
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase
                                d-block w-100"
                value="Guardar Cambios"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
