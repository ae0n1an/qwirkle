import React from 'react'
import DisplayToken from './DisplayToken';
import { Position } from './position';
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
  playerById: boolean;
  playerId: string
}

function DisplayPosition(props: PositionProps) {
  const { position, highlighted, setBoard, setPlayer, game, onClick, playerById, playerId} = props;
  const token = position.getToken();

  const handleClick = () => {
    onClick();
    game.update();
    setBoard({board: game.getBoard()})
    setPlayer(playerById ? {player: game.getPlayerById(playerId)} : {player: game.getActivePlayer()})
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