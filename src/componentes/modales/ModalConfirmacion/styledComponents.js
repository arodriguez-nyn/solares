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

    > div {
        position: relative;
        top: 25%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        height: 150px;
        border: 1px solid var(--primary-green);
        border-radius: 0.2rem;
        background-color: #fff;
        z-index: 20;
        animation: mostrar-modal 0.8s;

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

        @keyframes mostrar-modal {
            from {
                top: 0;
                left: 50%;
                transform: translate(-50%, 0);
            }
            to {
                top: 25%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }
`
