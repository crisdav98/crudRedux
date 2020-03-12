import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Productos from "./components/Productos";
import NuevoProducto from "./components/NuevoProducto";
import EditarProducto from "./components/EditarProducto";

//Redux tiene su propio Provider
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <div className="container mt-5">
          {/* Todo lo que esta fuera del Switch se va a cargar en todas
       las páginas y lo uq esta adentro es lo que se va a cargar en cada una */}
          <Switch>
            <Route exact path="/" component={Productos} />
            <Route exact path="/productos/nuevo" component={NuevoProducto} />
            <Route
              exact
              path="/productos/editar/:id"
              component={EditarProducto}
            />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
