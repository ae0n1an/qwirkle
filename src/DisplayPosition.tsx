import React from 'react'
import {useEffect, useState} from 'react';
import DisplayToken from './DisplayToken';
import { Token } from './classes/token';

type PositionProps = {
  token?: Token;
}

function DisplayPosition(props: PositionProps) {
  const [highlighted, setHighlighted] = useState(false);
  const { token } = props;

  if (token === undefined) {
    return (
      <div className='tile empty'>
        <div className='shape empty'></div>
      </div>
    )
  } else {

    const handleClick = () => {
      token.notify()
      setHighlighted(token.getHighlighted());
    };

    return (
      <div className={'tile' + (highlighted ? ' highlighted' : '')} onClick={handleClick}>
        <DisplayToken token = {token} ></DisplayToken>
      </div>
    )
  }
}

export default DisplayPosition