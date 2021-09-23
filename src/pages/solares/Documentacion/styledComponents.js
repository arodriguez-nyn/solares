// Dependencias
import styled from 'styled-components'

/* ------------------------------------------------------------------- */
/* ------------------------- STYLED COMPONENTS ----------------------- */
/* ------------------------------------------------------------------- */
export const FormularioEstilos = styled.form`
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

export const InputFile = styled.div`
    width: 210px;
    background-color: #fff;
    color: var(--primary-yellow);
    border: 1px solid var(--primary-yellow);
    padding: 0.35rem 0.65rem;
    border-radius: 3px;
    letter-spacing: 2.4px;
    text-transform: uppercase;
    line-height: 1.5rem;
    font-size: 0.8rem;
    text-align: center;

    label {
        display: block;
    }

    label:hover {
        cursor: pointer;
    }

    input {
        display: none;
    }

    :hover {
        background-color: var(--primary-yellow);
        color: #fff;
    }
`

export const ContenedorTabla = styled.div`
    width: 100%;
    min-height: 100px;
    background-color: #fff;
    color: var(--font-color);
    padding: 1rem;

    h2 {
        font-size: 1.2rem;
        text-align: left;
        padding: 0.5rem;
        padding-left: 0;
        margin: 0;
    }

    h3 {
        text-align: left;
        padding: 0.5rem;
        padding-left: 0.5rem;
        margin: 0;
        margin-bottom: 0.5rem;
        color: var(--primary-blue);
        font-style: italic;
    }

    h3:hover {
        cursor: pointer;
        color: var(--primary-green);
    }
`

export const WrapperTabla = styled.div`
    background-color: #fff;
    padding: 0.4rem;
    border-top: 3px solid var(--primary-green);

    footer {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
        color: var(--font-color);
        font-size: 0.9rem;
        font-style: italic;
    }
`
