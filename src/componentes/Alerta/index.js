import React from 'react'

// Componentes
import { CajaAlerta } from './styles'

const Alerta = ({ mensaje, tipo }) => {
    return <CajaAlerta error={tipo === 'error'}>{mensaje}</CajaAlerta>
}

export default Alerta
