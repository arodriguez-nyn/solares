import React from 'react'

// Componentes
import Cabecera from '../Cabecera'
import { Main } from './styledComponents'

const Container = ({ children }) => {
    return (
        <>
            <Cabecera />
            <Main>{children}</Main>
        </>
    )
}

export default Container
