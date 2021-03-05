import React from 'react'

// Componentes
import { NavegacionEstilos } from './styledComponents'
import { BotonNavegacion } from '../../componentes/UI'

const Navegacion = ({
    buttonSize,
    paginaActual,
    numeroPaginas,
    handlePrimero,
    handleAnterior,
    handleSiguiente,
    handleUltimo,
}) => {
    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <NavegacionEstilos>
            <span>{`Página ${paginaActual} de ${numeroPaginas}`}</span>
            <span>
                <BotonNavegacion size={buttonSize} onClick={handlePrimero}>
                    <i className='fas fa-caret-left fa-lg'></i>
                    <i className='fas fa-caret-left fa-lg'></i>
                </BotonNavegacion>
                <BotonNavegacion size={buttonSize} onClick={handleAnterior}>
                    <i className='fas fa-caret-left fa-lg'></i>
                </BotonNavegacion>
                <BotonNavegacion size={buttonSize} onClick={handleSiguiente}>
                    <i className='fas fa-caret-right fa-lg'></i>
                </BotonNavegacion>
                <BotonNavegacion size={buttonSize} onClick={handleUltimo}>
                    <i className='fas fa-caret-right fa-lg'></i>
                    <i className='fas fa-caret-right fa-lg'></i>
                </BotonNavegacion>
            </span>
        </NavegacionEstilos>
    )
}

export default Navegacion
