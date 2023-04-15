import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { setQuery } from '../redux/actions/game-actions';
import  { FiSearch } from 'react-icons/fi'
const Header = (): JSX.Element => {
  
    const dispatch = useDispatch();
    const page = useLocation();
    console.log(page) 
    const queryValue = useSelector((state) => state.query.searchQuery);


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
                value={queryValue || ""}
                onChange={(e) => dispatch(setQuery(e.target.value))}
              />
              <Link className='search-loop' to="games/search" ><FiSearch /></Link>
            </div>
            
        </ul>
      </nav>
    </div>
  )
}

export default Header
