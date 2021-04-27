import React, { useContext, useEffect } from 'react'

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
    const history = useHistory()
    const { usuario, guardaUsuario } = useContext(AppContext)

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleClick = () => {
        cerrarSesion().then(() => {
            localStorage.removeItem('solares-usuario')
            guardaUsuario(null)
        })
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        if (!usuario) {
            history.push('/')
        }
    }, [usuario])

    return (
        <WrapperEstilos>
            <CabeceraEstilos>
                <img
                    src='static/img/logo-horiz-nn-rgb-amarillo.svg'
                    alt='Logo'
                />
                {usuario && (
                    <div onClick={handleClick}>
                        <span title='Cerrar la sesión'>
                            <i className='fas fa-user'></i> {usuario.nombre}
                        </span>
                        {/* <span>
                            <i className='fas fa-sign-out-alt'></i>
                        </span> */}
                    </div>
                )}
            </CabeceraEstilos>
        </WrapperEstilos>
    )
}

export default Cabecera
