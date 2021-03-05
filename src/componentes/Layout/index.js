import React from 'react'

// Componentes
import Cabecera from '../Cabecera'

const Container = ({ children }) => {
    return (
        <>
            <Cabecera />
            {children}
        </>
    )
}

export default Container
