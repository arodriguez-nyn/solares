import React, { useState, useContext, useEffect } from 'react'

// Componentes
import { CampoFiltro, Boton } from '../../componentes/UI'
import { EstilosFiltro } from './styledComponents'

// Hooks
import useNavegacion from '../../hooks/useNavegacion'

// Dependencias
import NumberFormat from 'react-number-format'

// Contexto
import AppContext from '../../context/AppContext'

const FiltroTablaCafiso = ({ obtenerRegistros }) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [filtroExpandido, setFiltroExpandido] = useState(false)
    const { guardaFiltroActual, camposFiltro, setCamposFiltro } = useContext(
        AppContext
    )
    const [inputFiltro, setInputFiltro] = useState(
        camposFiltro
            ? {
                  carpeta: camposFiltro.FICGEN,
                  direccion: camposFiltro.DIRECC,
                  poblacion: camposFiltro.LOCALI,
                  propietario: camposFiltro.PROSOL,
              }
            : {
                  carpeta: 0,
                  direccion: '',
                  poblacion: '',
                  propietario: '',
              }
    )
    const { carpeta, direccion, poblacion, propietario } = inputFiltro
    const tabla = 'cafiso'

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    /* Declaramos esta función porque la pide el hook */
    const handleSubmit = e => {
        e.preventDefault()

        // Montamos los filtros
        const filtroCarpeta =
            inputFiltro.carpeta === '' || inputFiltro.carpeta === 0
                ? ''
                : `FICGEN = ${inputFiltro.carpeta
                      .toString()
                      .replace(',', '')
                      .replace(
                          '.',
                          ''
                      )}` /* El servicio REST no interpreta los , y .  */

        const filtroDireccion =
            inputFiltro.direccion === ''
                ? ''
                : `DIRECC MATCHES '*${inputFiltro.direccion}*'`
        const filtroPoblacion =
            inputFiltro.poblacion === ''
                ? ''
                : `LOCALI MATCHES '*${inputFiltro.poblacion}*'`
        const filtroPropietario =
            inputFiltro.propietario === ''
                ? ''
                : `PROSOL MATCHES '*${inputFiltro.propietario}*'`

        let ablFilter = ''
        if (filtroCarpeta !== '') {
            ablFilter = `${filtroCarpeta} `
        }

        if (filtroDireccion !== '') {
            ablFilter =
                ablFilter === ''
                    ? filtroDireccion
                    : `${ablFilter} AND ${filtroDireccion}`
        }

        if (filtroPoblacion !== '') {
            ablFilter =
                ablFilter === ''
                    ? filtroPoblacion
                    : `${ablFilter} AND ${filtroPoblacion}`
        }

        if (filtroPropietario !== '') {
            ablFilter =
                ablFilter === ''
                    ? filtroPropietario
                    : `${ablFilter} AND ${filtroPropietario}`
        }

        // Guardamos en el contexto para recuperarlo al reentrar en la pantalla
        setCamposFiltro({
            FICGEN: inputFiltro.carpeta,
            DIRECC: inputFiltro.direccion,
            LOCALI: inputFiltro.poblacion,
            PROSOL: inputFiltro.propietario,
        })

        setAblFilter(ablFilter)
        guardaFiltroActual(ablFilter)
    }

    const handleChange = e => {
        setInputFiltro({
            ...inputFiltro,
            [e.target.name]: e.target.value,
        })
    }

    const handleLimpiar = () => {
        setInputFiltro({
            carpeta: 0,
            direccion: '',
            poblacion: '',
            propietario: '',
        })
        setAblFilter('')
        guardaFiltroActual('')
    }

    const { setAblFilter } = useNavegacion({
        tabla,
        obtenerRegistros,
    })

    useEffect(() => {
        camposFiltro &&
            setInputFiltro({
                carpeta: camposFiltro.FICGEN,
                direccion: camposFiltro.DIRECC,
                poblacion: camposFiltro.LOCALI,
                propietario: camposFiltro.PROSOL,
            })
    }, [camposFiltro])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <EstilosFiltro>
            <header>
                <h1>Filtros</h1>
                <span onClick={() => setFiltroExpandido(!filtroExpandido)}>
                    <i className='fas fa-bars fa-lg'></i>
                </span>
            </header>
            {filtroExpandido && (
                <form onSubmit={handleSubmit}>
                    <main>
                        <section>
                            <div>
                                <label htmlFor='filtro-carpeta'>Carpeta</label>
                                <NumberFormat
                                    alineacion='right'
                                    allowNegative={false}
                                    thousandSeparator={true}
                                    id='filtro-carpeta'
                                    name='carpeta'
                                    value={carpeta}
                                    onChange={handleChange}
                                    customInput={alineacion => (
                                        <CampoFiltro alineacion={alineacion} />
                                    )}
                                    customInput={CampoFiltro}
                                />
                            </div>
                        </section>
                        <section>
                            <label htmlFor='filtro-direccionion'>
                                Dirección
                            </label>
                            <CampoFiltro
                                id='filtro-direccionion'
                                name='direccion'
                                type='text'
                                value={direccion}
                                onChange={handleChange}
                            />
                        </section>
                        <section>
                            <label htmlFor='filtro-poblacion'>Población</label>
                            <CampoFiltro
                                id='filtro-poblacion'
                                name='poblacion'
                                type='text'
                                value={poblacion}
                                onChange={handleChange}
                            />
                        </section>
                        <section>
                            <label htmlFor='carpeta'>Propietario</label>
                            <CampoFiltro
                                id='filtro-propietario'
                                name='propietario'
                                type='text'
                                value={propietario}
                                onChange={handleChange}
                            />
                        </section>
                    </main>
                    <footer>
                        <Boton width='120px' type='submit'>
                            Aplicar
                        </Boton>
                        <Boton
                            width='120px'
                            type='button'
                            onClick={handleLimpiar}
                        >
                            Limpiar
                        </Boton>
                    </footer>
                </form>
            )}
        </EstilosFiltro>
    )
}

export default FiltroTablaCafiso
