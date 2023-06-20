import React from "react";
import {useEffect, useState} from 'react';
import { Token } from "./classes/token";
import DisplayPosition from "./DisplayPosition";

type TokenHolderProps = {
  tokens: Token[];
}

function TokenHolder(props: TokenHolderProps) {
  const [highlighted, setHighlighted] = useState(-1);
  const { tokens } = props;

  const renderedOutput = []

  for (let i = 0; i < tokens.length; i++) { // add tokens to the token holder
    const handleClick = () => {
      tokens[i].notify()
      setHighlighted(tokens[i].getHighlighted()? i : -1);
    };
    renderedOutput.push(<DisplayPosition token={tokens[i]} onClick={handleClick}></DisplayPosition>)
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