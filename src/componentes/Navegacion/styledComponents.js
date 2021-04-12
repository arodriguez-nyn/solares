// Dependencias
import styled from 'styled-components'

/* ------------------------------------------------------------------- */
/* ------------------------- STYLED COMPONENTS ----------------------- */
/* ------------------------------------------------------------------- */
export const NavegacionEstilos = styled.header`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;

    span {
        color: var(--font-color);
        font-size: 0.8rem;

        label {
            margin-left: 2rem;
        }

        select {
            margin-left: 1rem;
        }
    }
`
