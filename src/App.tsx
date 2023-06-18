import './App.css';
import DisplayBoard from './DisplayBoard';
import TokenHolder from "./TokenHolder";
import { Game } from "./classes/game";


function App() {
  const game = new Game()

  console.log(game.getBoard().getTokenBoard())

  return (
    <div className="App">
      <div className="center mdl-grid">
        <div className="mdl-cell mdl-cell--6-col">
          <DisplayBoard board={game.getBoard().getTokenBoard()}></DisplayBoard>
        </div>
        <div className="mdl-cell mdl-cell--6-col">
        <TokenHolder tokens={game.getActivePlayersTokens()}></TokenHolder>
        </div>
      </div>
    </div>
  );
}

export default App;
