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
      <h6>Coded by <a href="https://www.seanaleid.com/">Sean Naleid</a></h6>
    </Foot>
  )
}

export default Footer;