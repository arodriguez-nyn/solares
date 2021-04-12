import React, { useState, createContext } from 'react'

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const [registroActual, setRegistroActual] = useState(null)
    const [registroCreado, setRegistroCreado] = useState(false)
    const [registroBorrado, setRegistroBorrado] = useState(false)
    const [registroModificado, setRegistroModificado] = useState(false)
    const [registroDetalleActual, setRegistroDetalleActual] = useState(null)
    const [registroDetalleCreado, setRegistroDetalleCreado] = useState(false)
    const [registroDetalleBorrado, setRegistroDetalleBorrado] = useState(false)
    const [registroDetalleModificado, setRegistroDetalleModificado] = useState(
        false
    )
    const [paginaActual, setPaginaActual] = useState(null)
    const [filtroActual, setFiltroActual] = useState('')
    const [camposFiltro, setCamposFiltro] = useState({
        FICGEN: 0,
        DIRECC: '',
        LOCALI: '',
        PROSOL: '',
    })

    const guardaRegistroActual = registro => {
        setRegistroActual(registro)

        localStorage.setItem('solares-cafiso', JSON.stringify(registro))
    }

    const guardaRegistroDetalleActual = registro => {
        setRegistroDetalleActual(registro)

        localStorage.setItem('solares-defiso', JSON.stringify(registro))
    }

    const guardaFiltroActual = filtro => {
        setFiltroActual(filtro)
        //localStorage.setItem('solares-cafiso-filtro', JSON.stringify(filtro))
    }

    const guardaCamposFiltro = campos => {
        setCamposFiltro(campos)
        // localStorage.setItem(
        //     'solares-cafiso-filtro-campos',
        //     JSON.stringify(campos)
        // )
    }

    return (
        <AppContext.Provider
            value={{
                registroActual,
                registroCreado,
                registroBorrado,
                registroModificado,
                registroDetalleActual,
                registroDetalleCreado,
                registroDetalleBorrado,
                registroDetalleModificado,
                paginaActual,
                filtroActual,
                camposFiltro,
                guardaRegistroActual,
                setRegistroCreado,
                setRegistroBorrado,
                setRegistroModificado,
                guardaRegistroDetalleActual,
                setRegistroDetalleCreado,
                setRegistroDetalleBorrado,
                setRegistroDetalleModificado,
                setPaginaActual,
                guardaFiltroActual,
                guardaCamposFiltro,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContext
