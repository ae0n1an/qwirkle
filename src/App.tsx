import './App.css';
import { Game } from "./classes/game";
import { Routes, Route } from 'react-router-dom';
import GamePage from './pages/GamePage';
import LobbyPage from './pages/LobbyPage';
import Home from './pages/HomePage';
import JoinPage from './pages/JoinPage';
import { SocketProvider } from './contexts/SocketProvider';
import useLocalStorage from './hooks/useLocalStorage';
import { v4 as uuidV4 } from 'uuid';

function App() {
  const [id, setId] = useLocalStorage('id', uuidV4());

  return (
    <div className="app">
      <SocketProvider id={id}>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/lobby' element={<LobbyPage/>}> </Route>
          <Route path='/game' element={<GamePage/>}> </Route>
          <Route path='/join' element={<JoinPage/>}> </Route>
        </Routes>
      </SocketProvider>
    </div>
  );
}

export default App;
