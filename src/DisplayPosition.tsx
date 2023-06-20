import React from 'react'
import DisplayToken from './DisplayToken';
import { Token } from './classes/token';

type PositionProps = {
  token?: Token;
  onClick: () => void;
}

function DisplayPosition(props: PositionProps) {
  const { token, onClick } = props;

  if (token === undefined) {
    return (
      <div className='tile empty'>
        <div className='shape empty'></div>
      </div>
    )
  } else {

    return (
      <div className={'tile' + (token.getHighlighted() ? ' highlighted' : '')} onClick={onClick}>
        <DisplayToken token = {token} ></DisplayToken>
      </div>
    )
  }
}

export default DisplayPosition