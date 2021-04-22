import React from 'react'

// Componentes
import FormularioCafiso from '../pages/FormularioCafiso'
import TablaCafiso from '../pages/TablaCafiso'
import Layout from '../componentes/Layout'
import TablaDefiso from '../pages/TablaDefiso'
import FormularioDefiso from '../pages/FormularioDefiso'
import Login from '../pages/Login'

// Dependencias
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Contexto
import { AppContextProvider } from '../context/AppContext'

const MainApp = () => {
    return (
        <AppContextProvider>
            <Router>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route exact path='/login' component={Login} />
                    <Layout>
                        <Route
                            exact
                            path='/formulario'
                            component={FormularioCafiso}
                        />
                        <Route
                            exact
                            path='/formulario-detalle'
                            component={FormularioDefiso}
                        />
                        <Route exact path='/lista' component={TablaCafiso} />
                        <Route
                            exact
                            path='/lista-detalle'
                            component={TablaDefiso}
                        />
                    </Layout>
                </Switch>
            </Router>
        </AppContextProvider>
    )
}

export default MainApp
