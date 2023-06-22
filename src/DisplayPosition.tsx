import React from 'react'
import DisplayToken from './DisplayToken';
import {useEffect, useState} from 'react';
import { Token } from './classes/token';
import { Position } from './classes/position';
import { Game } from './classes/game';
import { Board } from './classes/board';
import { Player } from './classes/player';

type PositionProps = {
  position: Position;
  highlighted: boolean;
  setBoard: React.Dispatch<React.SetStateAction<{board: Board;}>>
  setPlayer: React.Dispatch<React.SetStateAction<{player: Player;}>>;
  game: Game;
  onClick: () => void;
}

function DisplayPosition(props: PositionProps) {
  const { position, highlighted, setBoard, setPlayer, game, onClick} = props;
  const token = position.getToken();

  const handleClick = () => {
    onClick();
    game.update();
    setBoard({board: game.getBoard()})
    setPlayer({player: game.getActivePlayer()})
  };

  if (token !== undefined) {
    return (
      <div className={'tile' + (highlighted ? ' highlighted' : '')} onClick={handleClick}>
        <DisplayToken token = {token} ></DisplayToken>
      </div>
    )
  } else {
    return (
      <div className={'tile empty' + (highlighted ? ' highlighted' : '')} onClick={handleClick}>
        <div className='shape empty'></div>
      </div>
    )
  }
}
export default DisplayPosition