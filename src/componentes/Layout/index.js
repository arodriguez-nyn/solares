import React, { useEffect, useContext } from 'react'

// Componentes
import Cabecera from '../Cabecera'
import { Main } from './styledComponents'

// Contexto
import AppContext from '../../context/AppContext'

const Container = ({ children }) => {
    const { guardaRegistroActual, guardaRegistroDetalleActual } = useContext(
        AppContext
    )

    useEffect(() => {
        /* Recuperamos el registro actual del localstorage en el caso de que se
           refresque el navegador */
        const registroString = localStorage.getItem('solares-cafiso')
        const registro = JSON.parse(registroString)
        guardaRegistroActual(registro)

        const registroDetalleString = localStorage.getItem('solares-defiso')
        const registroDetalle = JSON.parse(registroDetalleString)
        guardaRegistroDetalleActual(registroDetalle)
    }, [])

    return (
        <>
            <Cabecera />
            <Main>{children}</Main>
        </>
    )
}

export default Container
