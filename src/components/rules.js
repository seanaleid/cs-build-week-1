import React from 'react';
import styled from 'styled-components';
import {hammerhead, pentadecathlon, pulsar, spaceInvader1, spaceInvader2, spaceInvader3, spaceInvader4, superMario, pacman, boo} from './examples.js';

const RulesBox = styled.div`
  width: 50%;
`;

const HowTo = styled.h1`
  color: rgba(31,199,66,1);
  font-family: 'Orbitron', sans-serif;
  margin-top: 0;
`;

const NewTab = styled.a`
  text-decoration: none;
  color: black;
  &:hover {
    color: rgba(31,199,66,1);
  }
`;

const Indent = styled.div`
  margin-left: 5%;
`;

const Bold = styled.p`
  font-weight: 1000;
  font-family: 'Roboto', sans-serif;
  text-align: justified;
  color: rgba(31,199,66,1);
`;

const P = styled.p`
  font-family: 'Roboto', sans-serif;
  text-align: justified;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 5%;
`;

const Button = styled.button`
  font-family: 'Orbitron', sans-serif;
`;

function Rules({setColor, setGrid}) {
  return(
    <RulesBox>
      <HowTo>CONWAY'S GAME OF LIFE</HowTo>
      <P>Welcome to <NewTab href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life' target='_blank'>Conway's Game of Life!</NewTab> This game is a <NewTab href='https://en.wikipedia.org/wiki/Cellular_automaton' target='_blank'>cellular automaton</NewTab>. It consists of a grid of cells that can have the state of 'on'/'off' or 'live'/'dead'. It's a 0 player game, meaning the player initializes the grid with 'live' cells and hits 'Start' to watch them move around the board.</P>
      <Bold>The rules of the game are simple:</Bold>
      <Indent>
      <P>1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.</P>
      <P>2. Any live cell with two or three live neighbors lives on to the next generation.</P>
      <P>3. Any live cell with more than three live neighbors dies, as if by overpopulation.</P>
      <P>4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</P>
      </Indent>
      <Bold>How to use the controls:</Bold>
      <P>If you're not sure where to begin? Click one of the example buttons below and hit 'Start'. You can also click the random button to generate a random grid. </P>
      <Controls>
        <Button onClick={() => {
          setGrid(hammerhead);
          setColor('rgba(31,199,66,1)');
        }}> Hammerhead </Button>
        <Button onClick={() => {
          setGrid(pentadecathlon);
          setColor('rgba(31,199,66,1)');
        }}> Pentadecathlon </Button>
        <Button onClick={() => {
          setGrid(pulsar);
          setColor('rgba(31,199,66,1)');
        }}> Pulsar </Button>
      </Controls>
      <Controls>
        <Button onClick={() => {
          setGrid(spaceInvader1);
          setColor('rgba(140, 20, 252, 1)');
        }}> Space Invader 1 </Button>
        <Button onClick={() => {
          setGrid(spaceInvader2);
          setColor('rgba(31,199,66,1)');
        }}> Space Invader 2 </Button>
      </Controls>
      <Controls>
        <Button onClick={() => {
          setGrid(spaceInvader3);
          setColor('rgba(31,199,66,1)');
        }}> Space Invader 3 </Button>
        <Button onClick={() => {
          setGrid(spaceInvader4);
          setColor('rgba(31,199,66,1)');
        }}> Space Invader 4 </Button>
      </Controls>
      <Controls>
        <Button onClick={() => {
          setGrid(superMario);
          setColor('rgba(207, 0, 15, 1)');
        }}> Super Mario </Button>
        <Button onClick={() => {
          setGrid(pacman); 
          setColor('rgba(240, 255, 0, 1)');
        }}> Pacman </Button>
        <Button onClick={() => {
          setGrid(boo);
          setColor('rgba(238, 238, 238, 1)');
        }}> Boo </Button>
      </Controls>
    </RulesBox>
  )
}

export default Rules;

