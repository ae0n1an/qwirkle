import React from "react";
import {useEffect, useState} from 'react';
import { Token } from "./classes/token";
import { Position } from "./classes/position";
import DisplayPosition from "./DisplayPosition";

type TokenHolderProps = {
  tokens: Token[];
}

function TokenHolder(props: TokenHolderProps) {
  const [highlighted, setHighlighted] = useState(-1);
  const { tokens } = props;

  const renderedOutput = []

  for (let i = 0; i < tokens.length; i++) { // add tokens to the token holder
    const position = new Position()
    position.placeToken(tokens[i])
    const handleClick = () => {
      tokens[i].notify()
      setHighlighted(tokens[i].getHighlighted()? i : -1);
    };
    console.log(highlighted)
    renderedOutput.push(<DisplayPosition position={position} highlighted={tokens[i].getHighlighted()} onClick={handleClick}></DisplayPosition>)
  }

  const wrapper = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
    transition: '300ms',
    margin: '4%'
  };

  return (
    <>
    <div style={wrapper}>
        {renderedOutput}
    </div>
    </>
  );
}

export default TokenHolder