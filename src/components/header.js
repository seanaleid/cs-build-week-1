import React from 'react';
import styled from 'styled-components';

const Nav = styled.div`
    width: 100%;
    margin-top: 0;
    display: flex;
    justify-content: center;
    background-color: blue;
    color: white;
`;


function Header() {
    return (
        <Nav >
            <h1>Conway's Game of Life</h1>
        </Nav>
    )
}

export default Header;