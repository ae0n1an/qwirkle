import React from 'react'
import { Player } from './classes/player';
import CategoryIcon from '@mui/icons-material/Category';
import DisplayPlayer from './DisplayPlayer';

type PlayerDisplayProps = {
  players: Player[];
}

function PlayersDisplay(props: PlayerDisplayProps) {
  const { players } = props;

  const renderedOutput: JSX.Element[] = []

  players.forEach((player) => {
    renderedOutput.push(<DisplayPlayer name={player.getName()} score={0}></DisplayPlayer>)
  });

  return (
    <div className="mdl-list">
      {renderedOutput}
    </div>
  )
}

export default PlayersDisplay