import React, { useEffect, useContext, useState } from 'react'

// Dependencias
import { useHistory, useLocation } from 'react-router-dom'

// Componentes
import Cabecera from '../../../componentes/Cabecera'
import { Main } from './styledComponents'
import { HistoricoEstilos } from './styledComponents'

// Contexto
import AppContext from '../../../context/AppContext'
import SACContext from '../../../context/SACContext'

const Container = ({ children }) => {
    const { guardaRegistroActual, guardaOrdenacion } = useContext(SACContext)
    const { usuario } = useContext(AppContext)

    /* ------------------------------------------------------------------- */
    /* -------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* ------------------------------------------------------------------- */
    const history = useHistory()
    const location = useLocation()
    const [historialNavegacion, setHistorialNavegacion] = useState([])

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleClick = pantalla => {
        history.push(pantalla.ruta)
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        const { pathname } = location
        switch (pathname) {
            case '/potiag':
                setHistorialNavegacion([])
                break
            case '/potiag/formulario':
                setHistorialNavegacion([
                    {
                        ruta: '/potiag',
                        nombre: 'Lista de Recordatorios',
                    },
                ])
                break
        }
    }, [location])

    useEffect(() => {
        /* Recuperamos el registro actual del localstorage en el caso de que se
           refresque el navegador */
        const registroString = localStorage.getItem('sac-potiag')
        const registro = JSON.parse(registroString)
        guardaRegistroActual(registro)

        const ordenacionString = localStorage.getItem('potiag-ordenacion')
        const ordenacion = JSON.parse(ordenacionString)
        guardaOrdenacion(ordenacion)
    }, [])

    useEffect(() => {
        //if (usuario) history.push('/potiag')
    }, [usuario])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <Cabecera />
            <HistoricoEstilos>
                {historialNavegacion && historialNavegacion.length > 0 && (
                    <ul>
                        {historialNavegacion.map(pantalla => (
                            <li
                                key={pantalla.ruta}
                                onClick={() => handleClick(pantalla)}
                            >
                                {pantalla.nombre}
                            </li>
                        ))}
                    </ul>
                )}
            </HistoricoEstilos>
            <Main>{children}</Main>
        </>
    )
}

export default Container
