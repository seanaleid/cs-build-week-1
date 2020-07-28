import React from 'react';
import styled from 'styled-components';

const Foot = styled.div`
    width: 100%;
    margin-top: 0;
    display: flex;
    justify-content: center;
`;

function Footer() {
    return (
        <Foot>
            <h2>Footer</h2>
        </Foot>
    )
}

export default Footer;