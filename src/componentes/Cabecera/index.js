import React, { useContext } from 'react'

// Dependencias
import styled from 'styled-components'

//import LoginContext from 'context/login/LoginContext'

/* ------------------------------------------------------------------- */
/* ------------------------- STYLED COMPONENTS ----------------------- */
/* ------------------------------------------------------------------- */
const CabeceraEstilos = styled.header`
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: space-between;
    top: 0;
    width: 100%;
    height: 3rem;
    background-color: var(--primary-green);
    color: #fff;
    padding-left: 5px;
    padding-right: 10px;
    user-select: none;

    img {
        width: 180px;
        height: auto;
    }

    span {
        margin-left: 20px;
    }

    span:hover {
        cursor: pointer;
    }
`

const Cabecera = () => {
    /* ------------------------------------------------------------------- */
    /* -------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* ------------------------------------------------------------------- */
    /*const { usuarioAutenticado } = useContext(LoginContext)

    if (!usuarioAutenticado) return*/

    return (
        <CabeceraEstilos>
            <img src='static/img/logo-horiz-nn-rgb-amarillo.svg' alt='Logo' />
            <div>
                {/* <i className="fas fa-user"></i> {usuarioAutenticado.CONCEP} */}
                <span>Cerrar Sesión</span>
            </div>
        </CabeceraEstilos>
    )
}

export default Cabecera
