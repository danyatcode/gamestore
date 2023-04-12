import React from 'react'
import { Link } from 'react-router-dom'

const Header = (): JSX.Element => {
  return (
    <div className='header'>
      <nav className='nav'>
        <ul className='menu'>
            <Link to='/'><li className='link'>Home</li></Link>
            <Link to='/games'><li className='link'>Games</li></Link>
        </ul>
      </nav>
    </div>
  )
}

export default Header
