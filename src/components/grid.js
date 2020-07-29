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
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Controls = styled.div`
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
  console.log(rows);
  return rows;
};

function Grid() {
  // Set up slices of state
  const [grid, setGrid] = useState(() => {
    return createEmptyGrid();
  });
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

  console.log(Object.keys(cache).length);
  console.log(cache);
  console.log(count);

  return (
    <GridContainer>
      <MainGrid
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
              backgroundColor: grid[i][j] ? 'rgb(31,199,66)' : undefined,
              border: 'solid 1px rgba(191,191,191,0.2)'
            }}
          />
        ))
      )}
      </MainGrid>
      <Buttons>
        <button 
          onClick={() => {
            setRunning(!running);
            if(!running){
              runningRef.current = true;
              simulation();
            }
          }}
        >
          {!running ? 'Start' : 'Stop'}
        </button>
        <button
          onClick={() => {
            const rows = [];
            for(let i = 0; i < gridRows; i++){
              rows.push(Array.from(Array(gridColumns), () => (Math.random() > 0.5 ? 1 : 0)));
            }
            setGrid(rows);
          }}
        >
          Random
        </button>
        <button
          onClick={() => {
            setGrid(createEmptyGrid());
            setCount(1);
          }}
        >
          Clear
        </button>
      </Buttons>
      <Controls>
        <button
          onClick={gridDown}
        ><span
          role='img'
          aria-label='emoji two arrows pointing to the left'
        >⏪</span></button>
        <p>{`Generation ${count}`}</p>
        <button
          onClick={gridUp}
        ><span
          role='img'
          aria-label='emoji two arrows pointing to the right'
        >⏩</span></button>
        <select 
          onChange={handleTimeChange}
        >
          <option value='50'>50ms</option>
          <option value='100'>100ms</option>
          <option value='200'>200ms</option>
          <option value='500'>500ms</option>
          <option value='1000'>1000ms</option>
        </select>
        {/* Input below works too! onChange not onClick */}
        {/* <input type='range' min='50' max='1000' value={runTime} step='50' onChange={handleTimeChange}></input> */}
      </Controls>
  </GridContainer>
  )
}

export default Grid;