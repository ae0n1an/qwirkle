import React from 'react'
import { Player } from './classes/player';
import CategoryIcon from '@mui/icons-material/Category';

type PlayersDisplayProps = {
  name: string;
  score: number;
  color: string
}

function DisplayPlayer(props: PlayersDisplayProps) {
  const { name, score, color } = props;

  return (
    <div className="mdl-list__item">
      <span className="mdl-list__item-primary-content">
          <i className="material-icons mdl-list__item-avatar" style={{color: color}}>person</i>
          <span>{name}</span>
      </span>
      <div className="mdl-list__item-secondary-action">{score}</div>
    </div>
  )
}

export default DisplayPlayer