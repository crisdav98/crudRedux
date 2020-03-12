import React, { useState } from "react";
import Spinner from '../Spinner/Spinner';
// useDispatch sirve para mandar a ejecutar las acciones 
// useSelector es una forma para acceder al state dentro del componente
import {useDispatch, useSelector} from 'react-redux';
// Actions de redux
import {crearNuevoProductoAction} from '../actions/productoActions';
import { mostrarAlertaAction} from '../actions/alertaAction';
const NuevoProducto = ({history}) => {

  // state del componente
  const [nombre, guardarNombre] = useState('');
  const [precio,guardarPrecio] = useState(0);

  //ulitilizar useDispatch y devuelve una función 
  const dispatch = useDispatch();

  // acceder al state del store
  const cargando = useSelector(state=>state.productos.loading);
  const error = useSelector(state =>state.productos.error);
  const alerta = useSelector(state =>state.alerta.alerta);

  // Manda a llamar el action de ProductoAction
  const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto));

  // cuando el usuario pulse el botón de submit
  const submitNuevoProducto = e =>{
    e.preventDefault();
    // validar formulario
    if(nombre.trim()=== '' || precio <= 0){
      const alerta ={
        msg: 'Todos los campos son obligatorios',
        classes : 'alert alert-danger text-center text-uppercase p3'
      }
      dispatch(mostrarAlertaAction(alerta));
      return;
    }
    // crear el nuevo producto
    agregarProducto({
      nombre,
      precio
    });
    // redireccionar al home
    history.push('/');

  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>
            {alerta ? (<p className={alerta.classes}> 
              {alerta.msg}
            </p>): null}
            <form
             onSubmit ={submitNuevoProducto}
            >
              <div className="form-group">
                <label>Nombre del Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del Producto"
                  name="nombre"
                  value={nombre}
                  onChange={e=> guardarNombre(e.target.value)}
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
                  onChange={e=> guardarPrecio(Number(e.target.value))}
                />
              </div>
              <input
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase
                                d-block w-100"
                value="Agregar"
              />
            </form>
            {cargando ?  <Spinner /> : null}
            {error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
