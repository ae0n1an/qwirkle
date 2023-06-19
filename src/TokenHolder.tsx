import React from "react";
import { Token } from "./classes/token";
import DisplayPosition from "./DisplayPosition";

type TokenHolderProps = {
  tokens: Token[];
}

function TokenHolder(props: TokenHolderProps) {
  const { tokens } = props;

  const renderedOutput = []

  for (let i = 0; i < tokens.length; i++) { // add tokens to the token holder
    renderedOutput.push(<DisplayPosition token={tokens[i]}></DisplayPosition>)
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