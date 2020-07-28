import React from 'react';
import './App.css';
import styled from 'styled-components'

import Grid from './components/grid.js';

const Home = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 2.5fr 1.2fr 0.1fr;
  grid-template-rows: 0.2fr 2.6fr 0.2fr;
  gap: 1px 1px;
  grid-template-areas: ". . . ." ". . . ." ". . . .";
`;

function App() {

  return (
    <Home >
      <Grid />
    </Home>
  );
}

export default App;
