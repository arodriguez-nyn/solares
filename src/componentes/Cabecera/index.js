import React, { useContext } from 'react'

// Componentes
import { CabeceraEstilos, WrapperEstilos } from './styledComponents'

// Dependencias
import { useHistory } from 'react-router-dom'

// Servicios
import { cerrarSesion } from '../../services/comun'

// Contexto
import AppContext from '../../context/AppContext'

const Cabecera = () => {
    /* ------------------------------------------------------------------- */
    /* -------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* ------------------------------------------------------------------- */
    const { cierraSesion } = useContext(AppContext)
    const history = useHistory()
    /*const { usuarioAutenticado } = useContext(LoginContext)

    if (!usuarioAutenticado) return*/

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleClick = () => {
        cerrarSesion().then(respuesta => {
            console.log('respuesta logout', respuesta)
            cierraSesion()
            history.push('/')
        })
    }

    return (
        <WrapperEstilos>
            <CabeceraEstilos>
                <img
                    src='static/img/logo-horiz-nn-rgb-amarillo.svg'
                    alt='Logo'
                />
                <div>
                    {/* <i className="fas fa-user"></i> {usuarioAutenticado.CONCEP} */}
                    <span onClick={handleClick}>Cerrar Sesión</span>
                </div>
            </CabeceraEstilos>
        </WrapperEstilos>
    )
}

export default Cabecera
