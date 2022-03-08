import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

//redux
import { useSelector  } from 'react-redux';

//Web3, smart contracts
import Web3 from 'web3';
import FileShare from '../../abis/FileShare.json'

//CSS styles
import '../../App.css';
import '../Button/Button.css';
import './HeroSection.css';

//Material UI Components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function HeroSection() {
  //ipfs instance
  const ipfsClient = require('ipfs-http-client')

  const ipfs = ipfsClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
  })

  //redux states
  const walletAddress = useSelector(state => state.walletAddress);
  const walletIsConnected = useSelector(state => state.walletIsConnected);

  //Web3 instance
  const web3 = new Web3(window.ethereum)
  
  //file input ref
  let inputRef;

  //states
  const [fileUploaded, setFileUploaded] = useState(false)
  const [fileBuffer, setFileBuffer] = useState(null)
  const [uploadedToIPFS, setUploadedToIPFS] = useState(false)
  const [ipfsURI, setIpfsURI] = useState('undefined')
  const [mintedAsNFT, setMintedAsNFT] = useState(false)

  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)

  //reset state
  const resetState = () =>{
    console.log('resetting state...')
    setFileUploaded(false)
    setUploadedToIPFS(false)
    setFileBuffer(null)
    setMintedAsNFT(false)
  }

  //handle dialogs actions
  const openDialog = () => {
    setOpen(true)
  }

  const closeDialog = () => {
    //Case "Not minting file as NFT": close the upload file to IPFS process, reset the states for next upload action
    setOpen(false)
    resetState()
  }

  const openDialog2 = () => {
    setOpen2(true)
  }

  const closeDialog2 = () => {
    //Case "Minting file as NFT": close the whole file upload and nft minting process, reset the states for next upload action
    setOpen2(false)
    resetState()
  }

  const openDialog3 = () => {
    setOpen3(true)
  }

  const closeDialog3 = () => {
    //Case "Minting file as NFT, but wallet is not connected": close the whole file upload and nft minting process, 
    //and reset the states for next upload action
    setOpen3(false)
    resetState()
  }

  //"Upload" button click event: upload user's file to IPFS and mint as NFT
  const uploadFile = (event) =>{
    event.preventDefault()
    setFileUploaded(true)

    console.log('onChange: File is captured')
    console.log(event.target.files[0])

    //process uploaded file
    const file = event.target.files[0]
    const reader = new window.FileReader()

    reader.readAsArrayBuffer(file)

    reader.onloadend = () =>{
      //buffer = Buffer(reader.result)
      setFileBuffer(Buffer(reader.result))
    }

    //add to IPFS, and mint as NFT
    //addToIPFS()
    //mintAsNFT()
  }

  //add file to IPFS
  const addToIPFS = () =>{
    console.log("Adding the file to IPFS...")
    ipfs.add(fileBuffer, (err, res) => {
      if(err) console.error("Error: ", err)

      console.log('IPFS result: ', res)
      const hash = res[0].hash
      setIpfsURI('https://ipfs.infura.io/ipfs/' + hash)
      setUploadedToIPFS(true)
    })
  }

  //mint the file NFT to a specific wallet address
  const mintAsNFT = async () =>{
    //close the ipfs upload information box
    setOpen(false)

    //check if wallet is connected  
    if(walletIsConnected){
      console.log("minting file as NFT...")

      //get net id of blockchain network
      const netId = await web3.eth.net.getId()
      console.log('net id: ', netId)

      //initialze FileShare contract instance
      const fileShare = new web3.eth.Contract(FileShare.abi, FileShare.networks[netId].address)

      /* await fileShare.methods.mintToken(walletAddress, 100).send({
        from: walletAddress
      }) */

      //"ETH" and "FILO" token balance check
      const ethBal = await web3.eth.getBalance(walletAddress);
      const tokenBal = await fileShare.methods.balanceOfFILO(walletAddress).call()
      console.log('FILO token balance: ', web3.utils.fromWei(tokenBal))
      console.log('ETH balance: ', web3.utils.fromWei(ethBal))

      //NFT minting
      await fileShare.methods.mintNFT(walletAddress, ipfsURI).send({
        from: walletAddress
      })


      setMintedAsNFT(true)
    }else{
      console.log('wallet is not connected, cannot mint NFT')
      setOpen3(true)
    }

    
  }

  //callback function when value changed
  useEffect(()=>{
    console.log('fileUploaded status: ', fileUploaded)
  }, [fileUploaded])

  useEffect(()=>{
    console.log('File Buffer: ', fileBuffer)
    if(fileUploaded){
      //open "File Upload" information box, after user uploaded file
      openDialog()
      addToIPFS()
    }
  }, [fileBuffer])

  useEffect(() => {
    console.log('uploadedToIPFS status: ', fileUploaded)
    if(fileUploaded){
      //openDialog()
      //resetState()
    }
  }, [uploadedToIPFS])

  useEffect(() => {
    console.log('IPFS URI: ', ipfsURI)
  }, [ipfsURI])

  useEffect(() => {
    console.log('Minted As NFT: ', mintedAsNFT)
    if(uploadedToIPFS){
      openDialog2()
    }
  }, [mintedAsNFT])


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

        {/* "File Uploaded Successfully" Information Box */}
          
        <Dialog
            open={open}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          
          {uploadedToIPFS ?
          <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{ fontSize: "16px", fontWeight: "bold", color: "black" }}>
              {'Share your unique IPFS link to your friend!'}
            </DialogContentText>

            {/* rgb(128, 128, 226) #43688B */}
            <DialogContentText id="alert-dialog-description" style={{ wordWrap: "break-word", fontWeight: "bold", color: "#43688B" }}>
              {ipfsURI}
            </DialogContentText>
          </DialogContent> :

            <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{ fontSize: "16px", fontWeight: "bold", color: "black" }}>
              {'Uploading your file to IPFS...'}
            </DialogContentText>
          </DialogContent>}

          { uploadedToIPFS ? 
          <DialogActions>
            <Button onClick={closeDialog} color="primary" autoFocus>
              Next Time
            </Button>
            <Button onClick={mintAsNFT} color="primary" autoFocus>
              Mint As NFT
            </Button>
          </DialogActions> : 

          <DialogActions>
            <Button onClick={closeDialog} color="primary" autoFocus>
              
            </Button>
          </DialogActions>}

        </Dialog>

        {/* "Mint as NFT" Information Box*/}
        
        <Dialog
            open={open2}
            onClose={closeDialog2}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">{"Congrat! Your file is minted as a FileShareNFT to your wallet address!"}</DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{ fontWeight: "bold", color: "#43688B" }}>
              {'Wallet address: ' + walletAddress}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description" style={{ wordWrap: "break-word", fontWeight: "bold", color: "#43688B" }}>
              {'URI: ' + ipfsURI}
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={closeDialog2} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>

        </Dialog>

        {/* "Wallet is not connected" Information Box*/}
        
        <Dialog
            open={open3}
            onClose={closeDialog3}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">{"Action Rejected!"}</DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{ fontWeight: "bold", color: "#BF9D1F", fontSize: "18px" }}>
              {"Please connect your MetaMask Wallet to our platform before minting a NFT. Thanks."}
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={closeDialog3} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>

        </Dialog>

      </div>
    </div>
  );
}

export default HeroSection;
