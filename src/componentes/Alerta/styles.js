// Dependencias
import styled from 'styled-components'

/* ------------------------------------------------------------------- */
/* ------------------------- STYLED COMPONENTS ----------------------- */
/* ------------------------------------------------------------------- */

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
    font-size: 1rem;
`
