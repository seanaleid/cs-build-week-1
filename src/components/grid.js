import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';
import styled from 'styled-components';

const GridContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const MainGrid = styled.div`
  margin: 2%;
  display: flex;
  justify-content:center;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const gridRows = 25;
const gridColumns = 25;

const coordinates = [
    [1,-1],
    [1,0],
    [1,1],
    [0,1],
    [-1,1],
    [-1,0],
    [-1,-1],
    [0,-1]
];

const createEmptyGrid = () => {
    const rows = [];
    for(let i = 0; i < gridRows; i++){
        rows.push(Array.from(Array(gridColumns), () => 0));
    };
    return rows;
};

function Grid() {
  // Set up slices of state
  const [grid, setGrid] = useState(() => {
    return createEmptyGrid();
  });
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const simulation = useCallback(() => {
    if(!runningRef.current){
        return;
    };
  
    setGrid(g => {
      return produce(g, gridCopy => {
      for(let i = 0; i < gridRows; i++){
        for(let j = 0; j < gridColumns; j++){
          let neighbors = 0;
          coordinates.forEach(([x,y]) => {
            const newI = i + x;
            const newJ = j + y;
            if(newI >= 0 && newI < gridRows && newJ >= 0 && newJ < gridColumns){
                neighbors += g[newI][newJ];
            }
          });

        if(neighbors < 2 || neighbors > 3){
          gridCopy[i][j] = 0;
        }else if(g[i][j] === 0 && neighbors === 3){
          gridCopy[i][j] = 1;
        }
        }
      }
      });
    });
    setTimeout(simulation, 100);
  }, [])

  return (
    <GridContainer>
      <MainGrid
        class='Main-Grid'
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridColumns}, 20px)`
        }}
      >
      {grid.map((rows, i) => 
        rows.map((col, j) => (
          <div
            key={`${i}-${j}`}
            onClick={() => {
              const newGrid = produce(grid, gridCopy => {
                gridCopy[i][j] = grid[i][j] ? 0 : 1;
              });
              setGrid(newGrid);
            }}
            style={{
              width: 20,
              height: 20,
              backgroundColor: grid[i][j] ? 'blue' : undefined,
              border: 'solid 1px black'
            }}
          />
        ))
      )}
      </MainGrid>
      <Buttons>
        <button 
          class='Button1'
          onClick={() => {
            setRunning(!running);
            if(!running){
              runningRef.current = true;
              simulation();
            }
          }}
        >
          {running ? 'Stop' : 'Start'}
        </button>
        <button
          class='Button2'
          onClick={() => {
            const rows = [];
            for(let i = 0; i < gridRows; i++){
              rows.push(Array.from(Array(gridColumns), () => (Math.random() > 0.7 ? 1 : 0)));
            }
            setGrid(rows);
          }}
        >
          Random
        </button>
        <button
          class='Button3'
          onClick={() => {
            setGrid(createEmptyGrid());
          }}
        >
          Clear
        </button>
      </Buttons>
  </GridContainer>
  )
}

export default Grid;