import React from 'react'

// Componentes
import { CabeceraEstilos, WrapperEstilos } from './styledComponents'

const Cabecera = () => {
    /* ------------------------------------------------------------------- */
    /* -------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* ------------------------------------------------------------------- */
    /*const { usuarioAutenticado } = useContext(LoginContext)

    if (!usuarioAutenticado) return*/

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
        </WrapperEstilos>
    )
}

export default Cabecera
