import React from 'react';
import styled from 'styled-components'

import Header from './components/header.js';
import Grid from './components/grid.js';
import Rules from './components/rules.js';
import Footer from './components/footer.js';

const Mid = styled.div`
  display: flex;
  margin: 3%;
  justify-content: space-evenly;
`;

function App() {
  return (
    <>
      <Header />
      <Rules />
      <Mid>
        <Grid />
      </Mid>
      <Footer />
    </>
  );
}

export default App;
