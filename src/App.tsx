import './App.css';
import { Game } from "./classes/game";
import { Routes, Route } from 'react-router-dom';
import DisplayGame from './DisplayGame';
import CreateGame from './CreateGame';
import Home from './Home';

function App() {

  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/createGame' element={<CreateGame/> }> </Route>
        <Route path='/game' element={<DisplayGame game = {new Game()}/>}> </Route>
      </Routes>
    </div>
  );
}

export default App;
