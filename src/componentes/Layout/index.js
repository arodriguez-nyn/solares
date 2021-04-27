import React, { useEffect, useContext, useState } from 'react'

// Dependencias
import { useHistory, useLocation } from 'react-router-dom'

// Componentes
import Cabecera from '../Cabecera'
import { Main } from './styledComponents'
import { HistoricoEstilos } from './styledComponents'

// Contexto
import AppContext from '../../context/AppContext'

const Container = ({ children }) => {
    const {
        usuario,
        guardaRegistroActual,
        guardaRegistroDetalleActual,
        guardaOrdenacion,
        guardaUsuario,
    } = useContext(AppContext)

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
            case '/lista':
                setHistorialNavegacion([])
                break
            case '/formulario':
                setHistorialNavegacion([
                    {
                        ruta: '/lista',
                        nombre: 'Lista de Solares',
                    },
                ])
                break
            case '/lista-detalle':
                setHistorialNavegacion([
                    {
                        ruta: '/lista',
                        nombre: 'Lista de Solares /',
                    },
                    {
                        ruta: '/formulario',
                        nombre: 'Formulario',
                    },
                ])
                break
            case '/formulario-detalle':
                setHistorialNavegacion([
                    {
                        ruta: '/lista',
                        nombre: 'Lista de Solares /',
                    },
                    {
                        ruta: '/formulario',
                        nombre: 'Formulario /',
                    },
                    {
                        ruta: '/lista-detalle',
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

        // const autenticacionString = localStorage.getItem('solares-sesion')
        // const autenticacion = JSON.parse(autenticacionString)
        // autenticarUsuario(autenticacion)

        const ordenacionString = localStorage.getItem('solares-ordenacion')
        const ordenacion = JSON.parse(ordenacionString)
        guardaOrdenacion(ordenacion)

        const usuarioString = localStorage.getItem('solares-usuario')
        const usuario = JSON.parse(usuarioString)
        guardaUsuario(usuario)
    }, [])

    useEffect(() => {
        if (usuario) history.push('/lista')
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
