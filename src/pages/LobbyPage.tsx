import '../App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PlayersLobbyDisplay from '../PlayersLobbyDisplay';
import { usePlayers } from '../contexts/PlayersProvider';
import { useGame } from '../contexts/GameProvider';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

function LobbyPage() {
  const { players, lobbyId, isHost } = usePlayers();
  const { startGame } = useGame();
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    const joinUrl = `${window.location.origin}/?lobby=${lobbyId}`;
    navigator.clipboard.writeText(joinUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleStartGame = (e: React.MouseEvent) => {
    e.preventDefault();
    startGame(players);
  };

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1 className="home-title">QWIRKLE</h1>
        <p className="home-subtitle">Game Lobby</p>
      </div>

      <div className="home-card">
        <div className="lobby-code-section">
          <span className="lobby-code-label">Invite Link</span>
          <div className="lobby-code-row">
            <span className="lobby-code">{lobbyId}</span>
            <button
              className={`lobby-copy-btn${copied ? ' copied' : ''}`}
              onClick={handleCopyClick}
              title="Copy join link"
            >
              {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
              <span style={{ marginLeft: 4, fontSize: '0.75rem', fontWeight: 600 }}>
                {copied ? 'Copied!' : 'Copy Link'}
              </span>
            </button>
          </div>
        </div>

        <PlayersLobbyDisplay players={players} isHost={isHost} />

        {isHost && (
          <Link
            to="/game"
            className={`home-btn home-btn-primary${players.length < 2 ? ' disabled' : ''}`}
            onClick={handleStartGame}
          >
            Start Game
          </Link>
        )}

        <Link to="/" className="home-btn home-btn-local">← Go Back</Link>
      </div>
    </div>
  );
}

export default LobbyPage;
