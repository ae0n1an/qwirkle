import '../App.css';
import { Game } from "../classes/game";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayersLobbyDisplay from '../PlayersLobbyDisplay';
import { usePlayers } from '../contexts/PlayersProvider';
import { useSocket } from '../contexts/SocketProvider';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useGame } from '../contexts/GameProvider';

function LobbyPage() {
  const { players, lobbyId, isHost } = usePlayers()
  const { startGame } = useGame()
  const socket = useSocket()
  const navigate = useNavigate(); // Use the useNavigate hook here

  const handleCopyClick = () => {
    // Create a temporary textarea to copy the text
    const textarea = document.createElement('textarea');
    textarea.value = lobbyId;
    document.body.appendChild(textarea);
    textarea.select();

    // Execute the copy command
    document.execCommand('copy');

    // Remove the temporary textarea
    document.body.removeChild(textarea);
  };

  const handleStartGame = (e: any) => {
    e.preventDefault()
    startGame(players)
  };

  return (
    <div className="HostGame">
        <h3>Lobby Code:</h3>
        <h3>
          <strong>{lobbyId}</strong>
          <button title="Copy" className="mdl-button mdl-js-button mdl-button--icon" onClick={handleCopyClick}>
            <ContentCopyIcon/>
          </button>
        </h3>
        <PlayersLobbyDisplay players={players} isHost={isHost}/>
        <br></br>
        {isHost ? <><Link to="/game" onClick={handleStartGame} style={{pointerEvents: players.length > 1 ? 'all' : 'none'}}>Start Game</Link> <br></br>or<br></br></> : <></>}
        <Link to="/">Go Back</Link>
    </div>
  );
}

export default LobbyPage;
