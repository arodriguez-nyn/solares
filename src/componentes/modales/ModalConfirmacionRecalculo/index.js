import React from 'react'

// Componentes
import { Boton } from '../../UI'

import { ModalEstilos } from './styledComponents'

const ModalConfirmacionRecalculo = ({
    mostrarModal,
    handleAceptarConfirmacionRecalculo,
    handleCancelarConfirmacionRecalculo,
}) => {
    const handleSubmit = e => {
        e.preventDefault()

        handleAceptarConfirmacionRecalculo()
    }

    const handleCancel = () => {
        handleCancelarConfirmacionRecalculo()
    }

    return (
        <>
            {mostrarModal && (
                <ModalEstilos>
                    <div>
                        <h1>Mensaje de Confirmación</h1>
                        <main>
                            <p>
                                El precio total no coincide con la suma de los
                                precios bajo rasante y sobre rasante. ¿Desea que
                                el sistema lo recalcule?
                            </p>
                            <footer>
                                <Boton
                                    width='120px'
                                    type='button'
                                    onClick={handleSubmit}
                                >
                                    Sí
                                </Boton>
                                <Boton
                                    width='120px'
                                    type='button'
                                    onClick={handleCancel}
                                >
                                    No
                                </Boton>
                            </footer>
                        </main>
                    </div>
                </ModalEstilos>
            )}
        </>
    )
}

export default ModalConfirmacionRecalculo
