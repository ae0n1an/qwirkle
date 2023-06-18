import './App.css';
import DisplayBoard from './DisplayBoard';
import TokenHolder from "./TokenHolder";
import { Game } from "./classes/game";


function App() {
  const game = new Game()

  console.log(game.getBoard().getTokenBoard())

  return (
    <div className="App">
      <div className="center">
        <DisplayBoard board={game.getBoard().getTokenBoard()}></DisplayBoard>
        <TokenHolder tokens={game.getActivePlayersTokens()}></TokenHolder>
      </div>
    </div>
  );
}

export default App;
