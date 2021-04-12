import styled from 'styled-components'

export const Main = styled.main`
    margin: 0 auto;
    margin-top: 3rem;
    /*min-height: calc(100vh - 4rem); */
    background-color: var(--background);
    color: var(--font-color);
`

export const HistoricoEstilos = styled.div`
    position: fixed;
    top: 3rem;
    height: 3rem;
    right: 1rem;

    ul {
        display: flex;
        justify-content: flex-end;
        color: var(--primary-blue);
        margin-top: 1rem;
        margin-bottom: 0;
        /* margin-right: 1rem; */
        font-style: italic;
        transition: all 0.3s ease;

        li {
            font-size: 1.1rem;
            margin-left: 0.25rem;
            margin-right: 0.25rem;
        }

        li:hover {
            cursor: pointer;
            color: var(--primary-green);
            font-weight: bold;
        }
    }
`
