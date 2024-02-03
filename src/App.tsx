import './App.css';
import { Routes, Route } from 'react-router-dom';
import GamePage from './pages/GamePage';
import LobbyPage from './pages/LobbyPage';
import Home from './pages/HomePage';
import { SocketProvider } from './contexts/SocketProvider';
import { PlayersProvider } from './contexts/PlayersProvider';
import useLocalStorage from './hooks/useLocalStorage';
import { v4 as uuidV4 } from 'uuid';
import { GameProvider } from './contexts/GameProvider';

function App() {
  const [id] = useLocalStorage('id', uuidV4());
  const [nickname, setNickname] = useLocalStorage("userName", "");
  const [avatar, setAvatar] = useLocalStorage("avatar", "");

  return (
    <div className="app">
      <SocketProvider id={id}>
        <GameProvider id={id}>
          <PlayersProvider id={id}>
            <Routes>
              <Route path='/lobby' element={<LobbyPage/>}> </Route>
              <Route path='/game' element={<GamePage id={id}/>}> </Route>
              <Route path='/' element={<Home nickname={nickname} setNickname={setNickname} avatar={avatar} setAvatar={setAvatar}/>}> </Route>
            </Routes>
          </PlayersProvider>
        </GameProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
