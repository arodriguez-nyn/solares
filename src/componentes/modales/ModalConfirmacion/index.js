import React from 'react'

// Componentes
import { Boton } from '../../UI'

import { ModalEstilos } from './styledComponents'

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
                <ModalEstilos>
                    <div>
                        <h1>Mensaje de Confirmación</h1>
                        <main>
                            <p>
                                ¿Está seguro de que desea eliminar este
                                registro?
                            </p>
                            <footer>
                                <Boton
                                    width='120px'
                                    type='button'
                                    onClick={handleSubmit}
                                >
                                    Aceptar
                                </Boton>
                                <Boton
                                    width='120px'
                                    type='button'
                                    onClick={handleCancel}
                                >
                                    Cancelar
                                </Boton>
                            </footer>
                        </main>
                    </div>
                </ModalEstilos>
            )}
        </>
    )
}

export default ModalConfirmacion
