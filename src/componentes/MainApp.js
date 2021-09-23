import React from 'react'

// Componentes
import FormularioCafiso from '../pages/solares/FormularioCafiso'
import TablaCafiso from '../pages/solares/TablaCafiso'
import LayoutSolares from './Layout/solares'
import LayoutSAC from './Layout/sac'
import TablaDefiso from '../pages/solares/TablaDefiso'
import FormularioDefiso from '../pages/solares/FormularioDefiso'
import TablaPotiag from '../pages/sac/TablaPotiag'
import FormularioPotiag from '../pages/sac/FormularioPotiag'
import Login from '../pages/Login'
import Documentacion from '../pages/solares/Documentacion'

// Dependencias
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Contexto
import { SolaresContextProvider } from '../context/SolaresContext'
import { SACContextProvider } from '../context/SACContext'
import { AppContextProvider } from '../context/AppContext'

const MainApp = () => {
    return (
        <AppContextProvider>
            <SolaresContextProvider>
                <SACContextProvider>
                    <Router basename={'/nynweb/'}>
                        <Switch>
                            <Route exact path='/' component={Login} />
                            <Route exact path='/login/' component={Login} />
                            <Route exact path='/cafiso/documentacion'>
                                <LayoutSolares>
                                    <Documentacion />
                                </LayoutSolares>
                            </Route>
                            <Route exact path='/cafiso/formulario'>
                                <LayoutSolares>
                                    <FormularioCafiso />
                                </LayoutSolares>
                            </Route>
                            <Route exact path='/defiso'>
                                <LayoutSolares>
                                    <TablaDefiso />
                                </LayoutSolares>
                            </Route>
                            <Route exact path='/defiso/formulario'>
                                <LayoutSolares>
                                    <FormularioDefiso />
                                </LayoutSolares>
                            </Route>
                            <Route exact path='/cafiso'>
                                <LayoutSolares>
                                    <TablaCafiso />
                                </LayoutSolares>
                            </Route>
                            <Route exact path='/potiag/formulario/'>
                                <LayoutSAC>
                                    <FormularioPotiag />
                                </LayoutSAC>
                            </Route>
                            <Route exact path='/potiag'>
                                <LayoutSAC>
                                    <TablaPotiag />
                                </LayoutSAC>
                            </Route>
                        </Switch>
                    </Router>
                </SACContextProvider>
            </SolaresContextProvider>
        </AppContextProvider>
    )
}

export default MainApp
