import { GameType } from '../../Type';
import Game from './Game';

export default function GameList({ nextGames }: { nextGames: GameType[] }) {

  // const nextGamesRendered = nextGames.map((nextGame) )
  return (
    <div className="d-flex flex-column">
      {nextGames ?
        nextGames.map((nextGame, key: number) => (
          <Game nextGame={nextGame} key={key} />
        ))
        :
        ""
      }
    </div>
  )
}