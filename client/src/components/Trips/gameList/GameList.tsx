import { GameType } from '../../../Type';
import Game from '../game/Game';
import './gameList.component.css'

export default function GameList({ nextGames }: { nextGames: GameType[] }) {

  // const nextGamesRendered = nextGames.map((nextGame) )
  return (
    <div className="d-flex align-items-center flex-column mb-5 text-small" >
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