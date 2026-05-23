type PlayersDisplayProps = {
  name: string;
  score: number;
  color: string;
}

function DisplayPlayer({ name, score, color }: PlayersDisplayProps) {
  return (
    <div className="sidebar-player">
      <div className="sidebar-player-avatar" style={{ backgroundColor: color }}>
        {name.charAt(0).toUpperCase()}
      </div>
      <span className="sidebar-player-name">{name}</span>
      <span className="sidebar-player-score">{score}</span>
    </div>
  );
}

export default DisplayPlayer;
