// Dependencias
import styled from 'styled-components'

export const Campo = styled.input`
    color: var(--font-color);
    padding: 0.15rem 0.55rem;
    border: none;
    border-bottom: 1px solid #d2d6de;
    border-radius: 2px;
    margin-bottom: 0.8rem;
    line-height: 1.42857143;
    width: ${props => props.width || '100%'};
    text-align: ${props => props.alineacion || 'left'};

    :focus {
        outline: none;
        border-bottom: 3px solid var(--secondary-blue);
        box-shadow: 0 0 2px #c3c3c3 inset;
        background-color: var(--background-focus);
        color: var(--font-color);
    }
`

export const CampoError = styled.input`
    color: var(--font-color);
    padding: 0.15rem 0.55rem;
    border: none;
    border-bottom: 1px solid #d2d6de;
    border-radius: 2px;
    margin-bottom: 0.8rem;
    line-height: 1.42857143;
    width: ${props => props.width || '100%'};

    :focus {
        outline: none;
        border-bottom: 3px solid var(--primary-error);
        box-shadow: 0 0 2px #c3c3c3 inset;
        background-color: #f9e7e7a1;
        color: var(--font-color);
    }
`

export const CampoObligatorio = styled.span`
    color: #db0e0e;
    font-weight: bold;
    margin-left: 0.3rem;
`

export const Boton = styled.button`
    width: ${props => props.width || '100px'};
    border: 1px solid var(--primary-yellow);
    color: var(--primary-yellow);
    text-transform: uppercase;
    font-family: ElliotPro;
    letter-spacing: 2.4px;
    background-color: transparent;
    transition: all 0.3s ease;
    border-radius: 4px;
    padding: 0.25rem 1.2rem;
    font-size: 14px;
    user-select: none;
    margin-left: 0.5rem;

    :hover {
        background-color: var(--primary-yellow);
        cursor: pointer;
        color: #fff;
    }

    :focus {
        outline: none;
    }
`

export const BotonDisabled = styled.button`
    width: ${props => props.width || '100px'};
    border: 1px solid #c2c2c2;
    color: #c2c2c2;
    text-transform: uppercase;
    font-family: ElliotPro;
    letter-spacing: 2.4px;
    background-color: var(--secondary-yellow);
    border-radius: 4px;
    padding: 0.25rem 1.2rem;
    font-size: 14px;
    user-select: none;
    margin-left: 0.5rem;

    :hover {
        cursor: not-allowed;
    }
`

export const IconoBuscar = styled.button`
    width: 20px;
    height: 20px;
    margin-left: 0.25rem;
    border: none;
    background-color: transparent;
    color: var(--font-color);

    :hover {
        cursor: pointer;
    }

    :focus {
        outline: none;
    }
`

export const IconoBorrar = styled.button`
    font-size: 1.5rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-left: 0.5rem;
    line-height: 0.8;
    border: none;
    background-color: transparent;
    color: var(--font-color);

    :hover {
        cursor: pointer;
    }

    :focus {
        outline: none;
    }
`

export const BotonNavegacion = styled.button`
    width: ${props => (props.size ? props.size : '25px')};
    height: ${props => (props.size ? props.size : '25px')};
    border: none;
    border: 1px solid var(--primary-green);
    margin-left: 0.25rem;
    background-color: transparent;
    color: var(--primary-green);
    border-radius: 0.25rem;
    transition: all 0.3s ease;

    :hover {
        cursor: pointer;
        background-color: var(--primary-green);
        color: #fff;
    }

    :focus {
        outline: none;
    }
`
export const ContenedorModalAyuda = styled.div`
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    color: var(--font-color);

    div {
        position: relative;
        margin: 0 auto;
        top: 4rem;
        background-color: var(--background);
        color: var(--font-color);
        padding: 1rem;
        border: 1px solid var(--primary-green);
        border-radius: 0.2rem;
        background-color: #fff;
        z-index: 20;

        h1 {
            border-bottom: 2px solid var(--primary-green);
            padding: 0.5rem;
            font-size: 1.1rem;
        }

        main {
            display: flex;
            height: 80%;
            flex-direction: column;
            justify-content: space-between;
            padding: 1rem;

            footer {
                display: flex;
                justify-content: flex-end;
            }
        }
    }
`

export const WrapperAyuda = styled.div`
    background-color: #fff;
    padding: 0.4rem;
    width: 50%;
    height: auto;

    h2 {
        font-size: 1.2rem;
        text-align: left;
        padding: 0.5rem;
        padding-left: 0;
        padding-bottom: 0;
        border-bottom: 2px solid var(--primary-green);
        margin-bottom: 0.5rem;
    }

    footer {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
        color: var(--font-color);
        font-size: 0.9rem;
        font-style: italic;
    }
`

export const TablaAyuda = styled.table`
    display: block;
    border: 1px solid #d6e9c6;
    padding: 0.4rem;
    margin: 0 auto;
    width: 100%;
    height: 300px;
    border-radius: 0.2rem;
    border-spacing: 0;
    overflow: hidden;
    padding-bottom: 0.5rem;
    margin-top: 0.5rem;

    thead {
        margin: 0.4rem;
        color: var(--primary-blue);
    }

    tr {
        transition: all 0.3s ease;
    }

    tr:nth-child(odd) {
        background-color: var(--background);
    }

    tr:hover {
        cursor: pointer;
        background-color: var(--primary-blue);
        color: #fff;
    }

    td {
        padding: 0.25rem;
        border: 1px solid var(--background);
        font-size: 0.85rem;
    }

    th {
        padding: 0.45rem;
        background-color: #fff;
        border-left: 1px solid var(--background);
    }

    th:first-child {
        border-left: none;
    }

    tr td:first-child {
        width: 1%;
    }
`

export const ContenedorTabla = styled.section`
    margin: 0 auto;
    margin-top: 3rem;
    min-height: calc(100vh - 3rem);
    background-color: var(--background);
    color: var(--font-color);
    padding: 1rem;

    h1 {
        font-size: 1.6rem;
        text-align: left;
        padding: 0.5rem;
        padding-left: 0;
    }
`

export const WrapperTabla = styled.div`
    background-color: #fff;
    padding: 0.4rem;
    border-top: 3px solid var(--primary-green);

    h2 {
        font-size: 1.2rem;
        text-align: left;
        padding: 0.5rem;
        padding-left: 0;
    }

    footer {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
        color: var(--font-color);
        font-size: 0.9rem;
        font-style: italic;
    }
`

export const TablaEstilos = styled.table`
    border: 1px solid #d6e9c6;
    padding: 0.4rem;
    margin: 0 auto;
    width: 100%;
    border-radius: 0.2rem;
    border-spacing: 0;

    thead {
        margin: 0.4rem;
        color: var(--primary-blue);
    }

    tr {
        transition: all 0.3s ease;
    }

    tbody {
        tr:nth-child(odd) {
            background-color: var(--background);
        }

        tr:hover {
            cursor: pointer;
            background-color: var(--primary-blue);
            color: #fff;
        }
    }

    td {
        padding: 0.25rem;
        border: 1px solid var(--background);
        font-size: 0.9rem;
    }

    th {
        padding: 0.45rem;
        font-size: 1rem;
        background-color: #fff;
        border-left: 1px solid var(--background);
    }

    th:first-child {
        border-left: none;
    }
`
export const Editor = styled.textarea`
    color: var(--font-color);
    padding: 0.15rem 0.55rem;
    border: none;
    border: 1px solid #d2d6de;
    border-radius: 2px;
    line-height: 1.42857143;
    width: ${props => props.width || '100%'};

    :focus {
        outline: none;
        border: 3px solid var(--secondary-blue);
        box-shadow: 0 0 2px #c3c3c3 inset;
        background-color: var(--background-focus);
        color: var(--font-color);
    }
`
