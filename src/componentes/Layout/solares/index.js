import React, { useEffect, useContext, useState } from 'react'

// Dependencias
import { useHistory, useLocation } from 'react-router-dom'

// Componentes
import Cabecera from '../../../componentes/Cabecera'
import { Main } from './styledComponents'
import { HistoricoEstilos } from './styledComponents'

// Contexto
import AppContext from '../../../context/AppContext'
import SolaresContext from '../../../context/SolaresContext'

const Container = ({ children }) => {
    const {
        guardaRegistroActual,
        guardaRegistroDetalleActual,
        guardaOrdenacion,
    } = useContext(SolaresContext)

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
            case '/cafiso':
                setHistorialNavegacion([])
                break
            case '/cafiso/formulario':
                setHistorialNavegacion([
                    {
                        ruta: '/cafiso',
                        nombre: 'Lista de Solares',
                    },
                ])
                break
            case '/defiso':
            case '/cafiso/documentacion':
                setHistorialNavegacion([
                    {
                        ruta: '/cafiso',
                        nombre: 'Lista de Solares /',
                    },
                    {
                        ruta: '/cafiso/formulario',
                        nombre: 'Formulario',
                    },
                ])
                break
            case '/defiso/formulario':
                setHistorialNavegacion([
                    {
                        ruta: '/cafiso',
                        nombre: 'Lista de Solares /',
                    },
                    {
                        ruta: '/cafiso/formulario',
                        nombre: 'Formulario /',
                    },
                    {
                        ruta: '/defiso',
                        nombre: 'Lista del Detalle de Solares',
                    },
                ])
                break
        }
    }, [location])

    useEffect(() => {
        /* Recuperamos el registro actual del localstorage en el caso de que se
           refresque el navegador */
        const registroString = localStorage.getItem('solares-cafiso')
        const registro = JSON.parse(registroString)
        guardaRegistroActual(registro)

        const registroDetalleString = localStorage.getItem('solares-defiso')
        const registroDetalle = JSON.parse(registroDetalleString)
        guardaRegistroDetalleActual(registroDetalle)

        const ordenacionString = localStorage.getItem('cafiso-ordenacion')
        const ordenacion = JSON.parse(ordenacionString)
        guardaOrdenacion(ordenacion)
    }, [])

    useEffect(() => {
        //if (usuario) history.push('/solares/cafiso/lista')
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
