import './App.css';
import { Game } from "./classes/game";
import { Routes, Route } from 'react-router-dom';
import GamePage from './pages/GamePage';
import LobbyPage from './pages/LobbyPage';
import Home from './pages/HomePage';
import JoinPage from './pages/JoinPage';

function App() {

  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/lobby' element={<LobbyPage/>}> </Route>
        <Route path='/game' element={<GamePage/>}> </Route>
        <Route path='/join' element={<JoinPage/>}> </Route>
      </Routes>
    </div>
  );
}

export default App;
