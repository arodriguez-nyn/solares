import styled from 'styled-components'

/* ------------------------------------------------------------------- */
/* ------------------------- STYLED COMPONENTS ----------------------- */
/* ------------------------------------------------------------------- */
export const PantallaLogin = styled.div`
    width: 100%;
    height: 100vh;
    background-color: var(--primary-green);
    padding-top: 7%;
    color: var(--gray);
`

export const CajaLogin = styled.div`
    width: 360px;
    font-weight: 300;
    margin: 0 auto;
    color: var(--font-color);

    h2 {
        font-size: 1.2rem;
        margin-bottom: 2rem;
    }

    form {
        background-color: #fff;
        border-radius: 2px;
        padding: 1.5rem;
        margin-top: 1.5rem;
        text-align: center;

        button {
            margin-top: 1.5rem;
            margin-left: 0;
            margin-bottom: 0.5rem;
        }
    }
`

export const CampoAgrupado = styled.div`
    position: relative;

    svg {
        position: absolute;
        color: var(--font-color);
        right: 10px;
        top: 5px;
        z-index: 10;
        pointer-events: none;
    }
`
