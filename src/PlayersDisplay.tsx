import { Player } from './classes/player';
import DisplayPlayer from './DisplayPlayer';

type PlayerDisplayProps = {
  players: Player[];
}

function PlayersDisplay(props: PlayerDisplayProps) {
  const { players } = props;

  const renderedOutput: JSX.Element[] = []

  players.forEach((player) => {
    renderedOutput.push(<DisplayPlayer name={player.getName()} score={player.getScore()} color={player.getAvatar()}></DisplayPlayer>)
  });

  return (
    <div className="mdl-list">
      {renderedOutput}
    </div>
  )
}

export default PlayersDisplay