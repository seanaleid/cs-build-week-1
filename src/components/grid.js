import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  display: 'grid',
  gridTemplateColumns: repeat(gridColumns), 20px),
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlusMinus = styled.div`
  background-color: none;
  color: rgba(31,199,66,1);
  font-weight: 600;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 1rem;
  font-family: 'Orbitron', sans-serif;
`;

const Button = styled.button`
  font-family: 'Orbitron', sans-serif;
  margin: 0% 5% 0%;
`;

const Generation = styled.p`
  color: rgba(31,199,66,1);
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
`;

const Select = styled.select`
  border-radius: 10%;
  height: 50%;
  font-family: 'Orbitron', sans-serif;
`;

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

function Grid({createEmptyGrid, grid, setGrid, gridRows, gridColumns, color, setColor}) {
  // Set up slices of state
  const gridRef = useRef(grid);
  gridRef.current = grid;
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;
  const [runTime, setRunTime] = useState(50);
  let runTimeRef = useRef(runTime);
  runTimeRef.current = runTime;
  const [count, setCount] = useState(1);
  let countRef = useRef(count);
  countRef.current = count;
  const [cache, setCache] = useState({});

  useEffect(() => {
    setCache({
      ...cache,
      [countRef.current]: gridRef.current
    });
  }, [gridRef.current]);

  const handleTimeChange = (e) => {
    setRunTime(e.target.value);
  }

  const simulation = useCallback(() => {
    if(!runningRef.current){
        return;
    };

    setGrid(g => {
      return produce(g, (gridCopy) => {
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
    setCount(countRef.current+=1);
    setTimeout(simulation, runTimeRef.current);
  }, [runTime])

  const gridDown = () => {
    if (count > 1) {
      setCount(count-1);
      setGrid(cache[count-1]);
    } else {
      return;
    }
  }

  const gridUp = () => {
    if (count > Object.keys(cache).length-1){
      return;
    } else {
      setCount(count+1);
      setGrid(cache[count+1]);
    }
  }

  return (
    <GridContainer>
      <Controls>
        <PlusMinus onClick={gridDown}> - </PlusMinus>
        <Generation>{`Generation ${count}`}</Generation>
        <PlusMinus onClick={gridUp}> + </PlusMinus>
        <Select onChange={handleTimeChange}>
          <option value='50'>50ms</option>
          <option value='100'>100ms</option>
          <option value='200'>200ms</option>
          <option value='500'>500ms</option>
          <option value='1000'>1000ms</option>
        </Select>
        {/* Input below works too! onChange not onClick */}
        {/* <input type='range' min='50' max='1000' value={runTime} step='50' onChange={handleTimeChange}></input> */}
      </Controls>
      <Controls>
        <Button 
          onClick={() => {
            setRunning(!running);
            if(!running){
              runningRef.current = true;
              simulation();
            }
          }}
        >
          {!running ? 'Start' : 'Stop'}
        </Button>
        <Button
          onClick={() => {
            const rows = [];
            for(let i = 0; i < gridRows; i++){
              rows.push(Array.from(Array(gridColumns), () => (Math.random() > 0.5 ? 1 : 0)));
            }
            setGrid(rows);
          }}
        >
          Random
        </Button>
        <Button
          onClick={() => {
            setGrid(createEmptyGrid());
            setCount(1);
            setColor('rgba(31,199,66,1)');
          }}
        >
          Clear
        </Button>
      </Controls>
      <MainGrid
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridColumns}, 20px)`,
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
              backgroundColor: grid[i][j] ? color : undefined,
              border: 'solid 1px rgba(191,191,191,0.2)',
              borderRadius: '5px',
              
            }}
          />
        ))
      )}
      </MainGrid>
  </GridContainer>
  )
}

export default Grid;