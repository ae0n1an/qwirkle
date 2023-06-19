import React from 'react'
import DisplayToken from './DisplayToken';
import { Token } from './classes/token';

type PositionProps = {
  token?: Token;
}

function DisplayPosition(props: PositionProps) {
  const { token } = props;
  if (token === undefined) {
    return (
      <div className='tile empty'>
        <div className='shape empty'></div>
      </div>
    )
  } else {
    return (
      <div className='tile'>
        <DisplayToken shape = {token.getShape()} colour= {token.getColour()}></DisplayToken>
      </div>
    )
  }
}

export default DisplayPosition