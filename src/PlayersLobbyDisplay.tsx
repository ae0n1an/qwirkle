import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

export interface IApplicationProps {
  players: { id: string; name: string; avatar: string }[];
  isHost: boolean;
}

const PlayersLobbyDisplay: React.FunctionComponent<IApplicationProps> = ({ players, isHost }) => {
  return (
    <div className="lobby-player-list">
      {players.map((player, index) => (
        <div className="lobby-player" key={index}>
          <div className="lobby-player-avatar" style={{ backgroundColor: player.avatar }}>
            {player.name.charAt(0).toUpperCase()}
          </div>
          <span className="lobby-player-name">{player.name}</span>
          {index === 0 ? (
            <span className="lobby-player-badge">Host</span>
          ) : isHost ? (
            <button className="lobby-kick-btn" title="Kick" onClick={() => console.log('kick')}>
              <CloseIcon fontSize="small" />
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default PlayersLobbyDisplay;
