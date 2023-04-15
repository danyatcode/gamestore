import React from 'react'
import { DataProps } from '../../../redux/constants/types'
import { Link } from 'react-router-dom'
import { selectedGame } from '../../../redux/actions/game-actions'
import { AnyAction, Dispatch } from 'redux'
import { IoStarSharp } from 'react-icons/io5'


type Game = {
    genres: string[][],
    platforms: (JSX.Element | undefined)[],
    game: DataProps,
    handleImageLoad: () => void,
    dispatch: Dispatch<AnyAction>,
    loadedImg: number,
    totalImages: number
}


const ListItem = ({game, platforms, dispatch, genres, handleImageLoad}: Game) => {

  return (
    <div className='item'>
                <div className='item-img-div'>
                    <Link to={`/game/${game.id}`} onClick={() => dispatch(selectedGame(game))}>
                        <img className='item-img' src={`${game.background_image}`} onLoad={handleImageLoad}/>
                    </Link>
                </div>
                <div className='item-info'>

                    <Link to={`/game/${game.id}`} onClick={() => dispatch(selectedGame(game))}>
                        <h4 className='item-title'>{game?.name}</h4>
                    </Link>

                    <span className='item-genres'>{genres?.join(', ')?.toUpperCase()}</span>

                    <p style={{display: 'flex', alignItems: "center", fontSize: "24px"}}>
                        <IoStarSharp style={{marginRight: "15px", fontSize: "24px"}} />
                        {game.rating}
                    </p>

                    <span className='item-platforms'>{platforms}</span>
                </div>
            </div>
  )
}


export default ListItem
