import React from 'react';
import '../../App.css';
import { Button } from '../Button/Button';
import './HeroSection.css';
import { Link } from 'react-router-dom';


function HeroSection() {
  return (
    <div className='hero-container'>
      
      <h1>Decentralized File-Sharing Platform</h1>
      <p>Own your files & Share them privately!</p>
      <i class="fa-solid fa-files"></i>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Upload
        </Button>

        <Link to='/explore'>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          Explore <i className='far fa-play-circle' />
        </Button>
        </Link>

      </div>
    </div>
  );
}

export default HeroSection;
