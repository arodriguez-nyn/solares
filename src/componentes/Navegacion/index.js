import React from 'react'

// Componentes
import { NavegacionEstilos } from './styledComponents'
import { Selector, BotonNavegacion } from '../../componentes/UI'

const Navegacion = ({
    buttonSize,
    ordenacion,
    paginaActual,
    numeroPaginas,
    handlePrimero,
    handleAnterior,
    handleSiguiente,
    handleUltimo,
    modificaNumeroLineas,
    modificaOrdenacion,
}) => {
    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleLineas = e => {
        modificaNumeroLineas(e.target.value)
    }

    const handleOrdenacion = e => {
        modificaOrdenacion(e.target.value)
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <NavegacionEstilos>
            <span>
                {`Página ${paginaActual} de ${numeroPaginas}`}
                <label htmlFor='cafiso-lineas'>Líneas por pág.</label>

                <Selector id='cafiso-lineas' onChange={handleLineas}>
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                </Selector>
            </span>
            {ordenacion && ordenacion.length > 0 && (
                <span>
                    <label htmlFor='cafiso-ordenar'>Ordenar por:</label>
                    <Selector id='cafiso-ordenar' onChange={handleOrdenacion}>
                        {ordenacion.map(campo => (
                            <option key={campo}>{campo}</option>
                        ))}
                    </Selector>
                </span>
            )}
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
