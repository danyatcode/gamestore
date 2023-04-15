import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { setGames, setQuery } from '../redux/actions/game-actions';
import  { FiSearch } from 'react-icons/fi'
import { State } from '../redux/constants/types'
import React from 'react';
import axios, { AxiosResponse } from 'axios';

const Header = (): JSX.Element => {
  
    const dispatch = useDispatch();
    
    const queryValue: string = useSelector<State>(
      (state) => state.query.searchQuery 
    ) as string;

    const page = useLocation().pathname;
    const query = useSelector<State>((state) => state.query.searchQuery)

    const fetchData = async() => {
      try{
          const res = await axios.get("https://api.rawg.io/api/games?search="+ query +"&key=242593db55b54d9089bab37814ec14a4") as AxiosResponse;    
          const data = res.data;

          dispatch(setGames(data));
      } catch(error){
          console.error(error)
      }
  }
    const handleClick = () => {
      if(page.includes("/games/search")){
        fetchData()
      }
    }

  return (
    <div className='header'>
      <nav className='nav'>
        <ul className='menu'>
            <div className='menu-links'>
              <Link to='/' ><li className='link'>Home</li></Link>
              <li className='label'>
                <a className='label-link'>
                  <span className='link'>Games</span>
                </a>
                <ul className='subgames'>
                  <li className='placeholder'>placeholder</li>
                  <li className='placeholder'>placeholder</li>
                  <li className='placeholder'>placeholder</li>
                  <li className='by-genre'>By Genre:
                    <div className='genre-links'>
                        <Link to="games/genre/4" className='genre-link'>
                          Action
                        </Link>
                        <Link to="games/genre/5" className='genre-link'>
                          Adventure
                        </Link>               
                        <Link to="games/genre/51" className='genre-link'>
                          Indie
                        </Link>
                    </div>
                  </li>
                </ul>
              </li>
                
              
            </div>
            <div className='search'>
              <input 
                id='input' 
                className='input' 
                placeholder='Search game' 
                type='text' 
                value={queryValue}
                onChange={(e) => dispatch(setQuery(e.target.value))}
              />
              <Link className='search-loop' to="games/search" onClick={handleClick}><FiSearch /></Link>
            </div>
            
        </ul>
      </nav>
    </div>
  )
}

export default Header
