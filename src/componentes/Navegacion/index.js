import React, { useEffect, useState } from 'react'

// Componentes
import { NavegacionEstilos } from './styledComponents'
import { Selector, BotonNavegacion } from '../../componentes/UI'

// Estilos CSS
import './styles.css'

const Navegacion = ({
    campoOrdenacion,
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
    mostrarNumeroLineas = true,
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
        <header className='navegacion'>
            <span className='navegacion__bloque'>
                {`Página ${paginaActual} de ${numeroPaginas}`}
                {mostrarNumeroLineas && (
                    <>
                        <label
                            className='bloque__label'
                            htmlFor='cafiso-lineas'
                        >
                            Líneas por pág.
                        </label>

                        <select
                            className='selector'
                            id='potiag-lineas'
                            onChange={handleLineas}
                        >
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                        </select>
                    </>
                )}
            </span>
            {ordenacion && ordenacion.length > 0 && (
                <span className='navegacion__bloque'>
                    <label className='bloque__label' htmlFor='cafiso-ordenar'>
                        Ordenar por:
                    </label>
                    <select
                        className='selector'
                        id='cafiso-ordenar'
                        onChange={handleOrdenacion}
                        value={
                            campoOrdenacion ? campoOrdenacion.descripcion : ''
                        }
                    >
                        {ordenacion.map(campo => (
                            <option key={campo}>{campo}</option>
                        ))}
                    </select>
                </span>
            )}
            <span>
                <button
                    className='boton-navegacion'
                    size={buttonSize}
                    onClick={handlePrimero}
                >
                    <i className='fas fa-caret-left fa-lg'></i>
                    <i className='fas fa-caret-left fa-lg'></i>
                </button>
                <button
                    className='boton-navegacion'
                    size={buttonSize}
                    onClick={handleAnterior}
                >
                    <i className='fas fa-caret-left fa-lg'></i>
                </button>
                <button
                    className='boton-navegacion'
                    size={buttonSize}
                    onClick={handleSiguiente}
                >
                    <i className='fas fa-caret-right fa-lg'></i>
                </button>
                <button
                    className='boton-navegacion'
                    size={buttonSize}
                    onClick={handleUltimo}
                >
                    <i className='fas fa-caret-right fa-lg'></i>
                    <i className='fas fa-caret-right fa-lg'></i>
                </button>
            </span>
        </header>
    )
}

export default Navegacion
