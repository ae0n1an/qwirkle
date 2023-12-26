import './App.css';
import { Game } from "./classes/game";
import { Routes, Route } from 'react-router-dom';
import GamePage from './pages/GamePage';
import LobbyPage from './pages/LobbyPage';
import Home from './pages/HomePage';
import JoinPage from './pages/JoinPage';
import { SocketProvider, useSocket } from './contexts/SocketProvider';
import { PlayersProvider, usePlayers } from './contexts/PlayersProvider';
import useLocalStorage from './hooks/useLocalStorage';
import { v4 as uuidV4 } from 'uuid';
import { useEffect } from 'react';

function App() {
  const [id, setId] = useLocalStorage('id', uuidV4());
  const [nickname, setNickname] = useLocalStorage("userName", "");
  const [avatar, setAvatar] = useLocalStorage("avatar", "");
  const {lobbyId} = usePlayers();

  return (
    <div className="app">
      <SocketProvider id={id}>
        <PlayersProvider id={id}>
          <Routes>
            <Route path='/' element={<Home nickname={nickname} setNickname={setNickname} avatar={avatar} setAvatar={setAvatar}/>}> </Route>
            <Route path='/lobby' element={<LobbyPage/>}> </Route>
            <Route path='/game' element={<GamePage id={id}/>}> </Route>
            <Route path='/join' element={<JoinPage nickname={nickname} avatar={avatar}/>}> </Route>
          </Routes>
        </PlayersProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
