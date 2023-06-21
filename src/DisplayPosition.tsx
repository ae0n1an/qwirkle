import React from 'react'
import DisplayToken from './DisplayToken';
import { Token } from './classes/token';
import { Position } from './classes/position';

type PositionProps = {
  position: Position;
  highlighted: boolean;
  onClick: () => void;
}

function DisplayPosition(props: PositionProps) {
  const { position, highlighted, onClick } = props;
  const token = position.getToken();

  if (token !== undefined) {
    return (
      <div className={'tile' + (highlighted ? ' highlighted' : '')} onClick={onClick}>
        <DisplayToken token = {token} ></DisplayToken>
      </div>
    )
  } else {
    return (
      <div className={'tile empty' + (highlighted ? ' highlighted' : '')} onClick={onClick}>
        <div className='shape empty'></div>
      </div>
    )
  }
}
export default DisplayPosition