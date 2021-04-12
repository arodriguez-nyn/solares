// Dependencias
import styled from 'styled-components'

/* ------------------------------------------------------------------- */
/* ------------------------- STYLED COMPONENTS ----------------------- */
/* ------------------------------------------------------------------- */
export const ModalEstilos = styled.div`
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
        top: 25%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid var(--primary-green);
        border-radius: 0.2rem;
        background-color: #fff;
        z-index: 40;

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
                justify-content: space-between;
                margin-top: 1rem;
                color: var(--font-color);
                font-size: 0.9rem;
                font-style: italic;
            }
        }
    }
`
