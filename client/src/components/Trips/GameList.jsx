import Game from './Game';

export default function GameList({nextGames, setNextgames}) {
  console.log("nextGames", nextGames);

  // const nextGamesRendered = nextGames.map((nextGame) )
  return (
    <>
    <div className="d-flex flex-column">
     {nextGames ?
     nextGames.map((nextGame, key)=>(
     <Game nextGame={nextGame} key={key}/>
     ))
     :
     ""
    } 
    </div>
    </>
  )
}
