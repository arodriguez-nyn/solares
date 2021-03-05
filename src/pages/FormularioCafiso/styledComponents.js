// Dependencias
import styled from 'styled-components'

/* ------------------------------------------------------------------- */
/* ------------------------- STYLED COMPONENTS ----------------------- */
/* ------------------------------------------------------------------- */
export const FormularioEstilos = styled.form`
    margin: 0 auto;
    margin-top: 3rem;
    min-height: calc(100vh - 3rem);
    background-color: var(--background);
    color: var(--font-color);
    padding: 1rem;
    font-size: 0.85rem;

    h1 {
        font-size: 1.6rem;
        text-align: left;
        padding: 0.5rem;
        padding-left: 0;
    }

    section {
        display: grid;
        height: auto;
        row-gap: 0.5rem;
        background-color: #ffffff;
        border-radius: 0 0 0.4rem 0.4rem;
        border-top: 2px solid var(--primary-green);
        padding: 0.5rem;
        margin-bottom: 1rem;

        h2 {
            font-size: 1.2rem;
            border-bottom: 1px solid var(--light-gray);
            margin-bottom: 1rem;
        }
    }

    article {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        width: 100%;
        margin: 0 auto;
        font-size: 0.9rem;

        div {
            label {
                display: block;
            }
        }
    }

    footer {
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
    }
`

export const BloqueCampo = styled.div`
    display: flex;
    align-items: flex-start;
`
