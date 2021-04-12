// Dependencias
import styled from 'styled-components'

/* ------------------------------------------------------------------- */
/* ------------------------- STYLED COMPONENTS ----------------------- */
/* ------------------------------------------------------------------- */
export const EstilosFiltro = styled.section`
    margin-bottom: 1rem;
    color: var(--font-color);
    border: 1px solid var(--light-green);
    padding: 0.5rem;

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1rem;
        margin-top: 0.75rem;
        margin-bottom: 0.75rem;

        h1 {
            font-size: 1.1rem;
            color: var(--primary-blue);
        }

        span {
            color: var(--font-color);
            transition: all 0.3s ease;
        }

        span:hover {
            color: var(--light-green);
            cursor: pointer;
        }
    }

    form {
        main {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
            padding: 0.5rem;
            font-size: 0.8rem;

            section:first-of-type {
                width: 50%;
            }
        }

        footer {
            display: flex;
            justify-content: flex-end;
            margin-top: 0;
            border-bottom: 2px solid var(--primary-green);
            padding-bottom: 1rem;
        }
    }
`
