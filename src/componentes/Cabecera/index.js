import React, { useContext, useEffect, useState } from 'react'

// Dependencias
import { useHistory, useLocation } from 'react-router-dom'

// Componentes
import {
    CabeceraEstilos,
    HistoricoEstilos,
    WrapperEstilos,
} from './styledComponents'

const Cabecera = () => {
    /* ------------------------------------------------------------------- */
    /* -------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* ------------------------------------------------------------------- */
    /*const { usuarioAutenticado } = useContext(LoginContext)

    if (!usuarioAutenticado) return*/
    const history = useHistory()
    const location = useLocation()
    const [historialNavegacion, setHistorialNavegacion] = useState([])

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleClick = pantalla => {
        console.log(pantalla.ruta)
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
        }
    }, [location])

    return (
        <WrapperEstilos>
            <CabeceraEstilos>
                <img
                    src='static/img/logo-horiz-nn-rgb-amarillo.svg'
                    alt='Logo'
                />
                <div>
                    {/* <i className="fas fa-user"></i> {usuarioAutenticado.CONCEP} */}
                    <span>Cerrar Sesión</span>
                </div>
            </CabeceraEstilos>
            <HistoricoEstilos>
                {historialNavegacion &&
                    historialNavegacion.length > 0 &&
                    historialNavegacion.map(pantalla => (
                        <li
                            key={pantalla.ruta}
                            onClick={() => handleClick(pantalla)}
                        >
                            {pantalla.nombre}
                        </li>
                    ))}
                {/* <span>Lista de Solares</span> / <span>Formulario</span> /{' '}
                <span>Detalle del Solar</span> */}
            </HistoricoEstilos>
        </WrapperEstilos>
    )
}

export default Cabecera
