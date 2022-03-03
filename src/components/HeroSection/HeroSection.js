import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

//CSS styles
import '../../App.css';
import '../Button/Button.css';
import './HeroSection.css';


function HeroSection() {
  
  //file input ref
  let inputRef;

  //states
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

  //callback function when value changed
  useEffect(()=>{
    console.log('fileUploaded status: ', fileUploaded)
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
