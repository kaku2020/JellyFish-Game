import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className='header'>
        <img className='header__image' src ='https://static.scientificamerican.com/sciam/cache/file/B7E980C5-B182-4A2E-80369F2AC535EB35_source.jpg'/>
      <h1 className='header__text'>Jellyfish Game</h1>
    </div>
  )
}

export default Header
