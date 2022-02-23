import React, {useState, useEffect} from 'react';
import '../../App.css';
//import { Button } from '../Button/Button';
import '../Button/Button.css';
//import Button from '@material-ui/core/Button';
import './HeroSection.css';
import { Link } from 'react-router-dom';


function HeroSection() {
  
  //file input ref
  let inputRef;

  //state
  const [fileUploaded, setFileUploaded] = useState(false)

  //"Upload" button click event: upload user's file to IPFS and mint as NFT
  const uploadFile = (event) =>{
    event.preventDefault()

    setFileUploaded(true)
    //console.log('fileUploaded:', fileUploaded)

    console.log('onChange: File is captured')
    console.log(event.target.files[0])

    //Notes: remember to check if the event.target.file is 'undefined', maybe user click upload then 'X' the window
  }

  //callback function, it will be called when fileUploaded value changed
  useEffect(()=>{
    console.log('fileUploaded: value changed', fileUploaded)
  }, [fileUploaded])


  return (
    <div className='hero-container'>
      
      {/* Description text */}

      <h1>Decentralized File-Sharing Platform</h1>
      <p>Own your files & Share them privately!</p>

      <div className='hero-btns'>

      {/* File upload Button */}

      <input
        type="file"
        hidden={true}
        ref={refParam => inputRef = refParam}
        onChange={uploadFile}
      />

        <button 
          className='btn btn--outline btn--large'
          onClick={() => inputRef.click()}
        >
          Upload
        </button>


        {/* Explore Button, link to Explore page */}

        <Link to='/explore'>
        <button 
          className='btn btn--primary btn--large'
        >
          Explore <i className='far fa-play-circle' />
        </button>
        </Link>

      </div>
    </div>
  );
}

export default HeroSection;
