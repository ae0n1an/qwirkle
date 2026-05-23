import '../App.css';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePlayers } from '../contexts/PlayersProvider';
import { useSocket } from '../contexts/SocketProvider';
import { useGame } from '../contexts/GameProvider';

const COLOR_OPTIONS = [
  { name: 'Green',  hex: '#22B14C' },
  { name: 'Red',    hex: '#ED1C24' },
  { name: 'Blue',   hex: '#00A2E8' },
  { name: 'Orange', hex: '#FF7F27' },
  { name: 'Purple', hex: '#A349A4' },
  { name: 'Yellow', hex: '#FFF200' },
];

function Home({ nickname, setNickname, avatar, setAvatar }: {
  nickname: string;
  setNickname: (v: string) => void;
  avatar: string;
  setAvatar: (v: string) => void;
}) {
  const { createLobby, joinLobby, leaveLobby, lobbyId } = usePlayers();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [errorMessage] = useState(location.state?.errorMessage || '');
  const [room, setRoom] = useState(searchParams.get('lobby') ?? '');
  const socket = useSocket();
  const { startGame } = useGame();

  useEffect(() => {
    if (socket !== undefined && lobbyId !== '') {
      leaveLobby();
    }
  }, [socket]);

  const canPlay = avatar !== '' && nickname.trim() !== '';
  const canJoin  = canPlay && room.trim() !== '';

  function handleHostLobby() {
    createLobby(nickname, avatar);
  }

  function handleJoinLobby() {
    joinLobby(room, nickname, avatar);
  }

  function handleStartGame(e: React.MouseEvent) {
    e.preventDefault();
    startGame([]);
  }

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1 className="home-title">QWIRKLE</h1>
        <p className="home-subtitle">The colorful tile-matching game</p>
      </div>

      <div className="home-card">
        <input
          className="home-input"
          type="text"
          placeholder="Enter nickname…"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
        />

        <div className="home-color-row">
          {COLOR_OPTIONS.map(({ name, hex }) => (
            <button
              key={hex}
              className={`color-swatch${avatar === hex ? ' selected' : ''}`}
              style={{ backgroundColor: hex }}
              title={name}
              onClick={() => setAvatar(hex)}
            />
          ))}
        </div>

        <Link
          to="/lobby"
          className={`home-btn home-btn-primary${!canPlay ? ' disabled' : ''}`}
          onClick={handleHostLobby}
        >
          Host Game
        </Link>

        <div className="home-divider">or join existing</div>

        <input
          className="home-input"
          type="text"
          placeholder="Enter lobby code…"
          value={room}
          onChange={e => setRoom(e.target.value)}
        />

        <Link
          to="/lobby"
          className={`home-btn home-btn-secondary${!canJoin ? ' disabled' : ''}`}
          onClick={handleJoinLobby}
        >
          Join Game
        </Link>

        <div className="home-divider">or</div>

        <Link to="/game" className="home-btn home-btn-local" onClick={handleStartGame}>
          Play Locally with 4 players
        </Link>
      </div>

      {errorMessage && <p className="home-error">{errorMessage}</p>}
    </div>
  );
}

export default Home;
