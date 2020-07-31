import React, {useState} from 'react';
import styled from 'styled-components';

import Grid from './components/grid.js';
import Rules from './components/rules.js';
import Footer from './components/footer.js';

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
`;

const Mid = styled.div`
  display: flex;
  margin: 3%;
  justify-content: space-evenly;
`;

const gridRows = 25;
const gridColumns = 25;

const createEmptyGrid = () => {
  const rows = [];
  for(let i = 0; i < gridRows; i++){
    rows.push(Array.from(Array(gridColumns), () => 0));
  };
  console.log(rows);
  return rows;
};

function App() {
  const [grid, setGrid] = useState(() => {
    return createEmptyGrid();
  });
  const [color, setColor] = useState('rgba(31,199,66,1)')

  return (
    <>
      <Container>
        <Mid>
          <Grid 
            createEmptyGrid={createEmptyGrid} 
            grid={grid}
            setGrid={setGrid}
            gridRows={gridRows}
            gridColumns={gridColumns}
            color={color}
            setColor={setColor}
          />
          <Rules
            grid={grid}
            setGrid={setGrid}
            setColor={setColor}
          />
        </Mid>
        <Footer />
      </Container>
    </>
  );
}

export default App;
