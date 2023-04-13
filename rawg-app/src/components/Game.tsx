import React from 'react'
import { SelectedGame } from '../redux/constants/types'

type Game = {
    gallery: JSX.Element[] | undefined,
    genres: string,
    developers: string,
    platforms: (JSX.Element | undefined)[],
    store: (JSX.Element | undefined)[],
    game: SelectedGame,
    handleImageLoad: () => void,
    loadedImg: number,
    totalImages: number
}


const Game = ({store, game, genres, developers, platforms, gallery, handleImageLoad, loadedImg, totalImages}: Game):JSX.Element => {
    
  return (
    <div className='game'>

        {loadedImg !== totalImages && <div className="loading"><div className='loader'></div></div>}

        <div className='row'>
            <div className='selected-game-img-div'>
                <img loading='lazy' alt={game.name} src={game.background_image} className='selected-game-image' onLoad={handleImageLoad}/>
            </div>
            <div className='selected-game-info'>
                <h1 className='game-title'>{game.name}</h1>
                <div className='game-genres'>
                    Genres: <span>{genres}</span>
                </div>
                <div className='game-developers'>
                    Developed: <span>{developers}</span>
                </div>
                <div className='game-released'>
                    Release: <span>{game.released}</span>
                </div>
        
                <span className='platforms-title title'>Available On Platforms</span>
                <div className='item-platforms selected-game-platforms' style={{display: "flex", justifyContent: "center"}}>
                    {platforms}
                </div>
            </div>
        </div>

        

        <h2 className='description-title title'>Description </h2>
        <p className={`selected-game-descr`}></p>

        <div className='gallery'>{gallery}</div>

        <h2 className='description-title title'>Store</h2>
        <p className={`selected-game-store`}>{store}</p>

        
    </div>
  )
}

export default Game
