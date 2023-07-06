import './App.css';
import { Game } from "./classes/game";
import { Routes, Route } from 'react-router-dom';
import GamePage from './pages/GamePage';
import CreateGame from './pages/CreateGamePage';
import Home from './pages/HomePage';

function App() {

  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/createGame' element={<CreateGame/>}> </Route>
        <Route path='/game' element={<GamePage/>}> </Route>
      </Routes>
    </div>
  );
}

export default App;
