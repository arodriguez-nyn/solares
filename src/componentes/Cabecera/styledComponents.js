import styled from 'styled-components'

export const WrapperEstilos = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    height: 4rem;
    user-select: none;
`

export const CabeceraEstilos = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 3rem;
    padding-left: 5px;
    padding-right: 10px;
    background-color: var(--primary-green);
    color: #fff;
    img {
        width: 180px;
        height: auto;
    }

    span {
        margin-left: 20px;
    }

    span:hover {
        cursor: pointer;
    }
`
