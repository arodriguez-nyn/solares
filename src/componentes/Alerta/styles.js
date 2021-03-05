// Dependencias
import styled from 'styled-components'

/* ------------------------------------------------------------------- */
/* ------------------------- STYLED COMPONENTS ----------------------- */
/* ------------------------------------------------------------------- */
// export const CajaAlertaError = styled.div`
//     border: 1px solid #db0e0e;
//     padding: 0.5rem;
//     background-color: #fa2d2da1;
//     color: #fff;
//     border-radius: 0.25rem;
//     margin-top: 0.25rem;
//     margin-bottom: 0.5rem;
// `
// export const CajaAlertaExito = styled.div`
//     border: 1px solid #069308;
//     padding: 0.5rem;
//     background-color: #12a11ba1;
//     color: #fff;
//     border-radius: 0.25rem;
//     margin-top: 0.25rem;
//     margin-bottom: 0.5rem;
// `

export const CajaAlerta = styled.div`
    border: 1px solid
        ${props =>
            props.error ? 'var(--primary-error)' : 'var(--primary-success)'};
    padding: 0.45rem;
    background-color: ${props =>
        props.error ? 'var(--secondary-error)' : 'var(--secondary-success)'};
    color: #fff;
    border-radius: 0.25rem;
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
`
