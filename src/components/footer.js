import React from 'react';
import styled from 'styled-components';

const Foot = styled.div`
  width: 100%;
  margin-top: 0;
  display: flex;
  justify-content: center;
`;

const NewTab = styled.a`
  text-decoration: none;
  color: black;
  &:hover {
    color: rgba(31,199,66,1);
  }
`;

function Footer() {
  return (
    <Foot>
      <h6>Coded by <NewTab href='https://www.seanaleid.com/' target='_blank'>Sean Naleid</NewTab></h6>
    </Foot>
  )
}

export default Footer;