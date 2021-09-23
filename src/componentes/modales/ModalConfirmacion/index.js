import React from 'react'

// Componentes
import { Boton } from '../../UI'

import { ModalEstilos } from './styledComponents'

import './styles.css'

const ModalConfirmacion = ({
    mostrarModal,
    handleAceptarConfirmacion,
    handleCancelarConfirmacion,
}) => {
    const handleSubmit = e => {
        e.preventDefault()

        handleAceptarConfirmacion()
    }

    const handleCancel = () => {
        handleCancelarConfirmacion()
    }

    return (
        <>
            {mostrarModal && (
                <div className='contenedor-confirmacion'>
                    <div className='wrapper-confirmacion'>
                        <h1 className='wrapper-confirmacion__h1'>
                            Mensaje de Confirmación
                        </h1>
                        <main className='wrapper-confirmacion__main'>
                            <p>
                                ¿Está seguro de que desea eliminar este
                                registro?
                            </p>
                            <footer className='wrapper-confirmacion__footer'>
                                <button
                                    className='btn'
                                    width='120px'
                                    type='button'
                                    onClick={handleSubmit}
                                >
                                    Aceptar
                                </button>
                                <button
                                    className='btn'
                                    type='button'
                                    onClick={handleCancel}
                                >
                                    Cancelar
                                </button>
                            </footer>
                        </main>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalConfirmacion
