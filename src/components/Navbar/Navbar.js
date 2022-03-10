import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//Web3
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

//redux
import { useDispatch, useSelector  } from 'react-redux';
import { connectWallet, updateAddress } from "../../redux/actions";

//CSS styles
import './Navbar.css';
import '../Button/Button.css';

//Material UI Components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function Navbar() {
  //redux actions
  const dispatch = useDispatch();

  //redux states
  const walletAddress = useSelector(state => state.walletAddress);
  const walletIsConnected = useSelector(state => state.walletIsConnected);

  //Web3 instance
  const web3 = new Web3(window.ethereum)
  let netId = 0
  //let trimmedWalletAddress = '0x0'
  
  //states
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [trimmedWalletAddress, setTrimmedWalletAddress] = useState('0x00')

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  //handle dialog actions
  const openDialog = () => {
    closeMobileMenu()
    if(walletIsConnected){
      setOpen2(true)
    }else{
      setOpen(true)
    }
  }

  const closeDialog = () => {
    setOpen(false)
    console.log('connect wallet later')
  }

  const closeDialog2 = () => {
    setOpen2(false)
  }

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  //value changed listener
  useEffect(() => {
    showButton()
  }, [])

  useEffect(()=>{
    console.log('wallet address updated: ', walletAddress)
  }, [walletAddress])

  useEffect(()=>{
    console.log('wallet connection status: ', walletIsConnected)
  }, [walletIsConnected])

  window.addEventListener('resize', showButton);

  //"Connect Wallet" button click event: connect user MetaMask wallet
  const connectMetaMaskWallet = async () => {
    setOpen(false)

    //Metamask provider instance
    const provider = await detectEthereumProvider()

    //Get network id
    netId = await web3.eth.net.getId()
    console.log('net id: ', netId)

    if (provider) {
      console.log('Good. MetaMask is installed.')

      //Get the MetaMask Account
      const accts = await provider.request({
        method: 'eth_requestAccounts'
      })

      //update wallet connection status, and wallet address
      setTrimmedWalletAddress(accts[0].substring(0,5) + '...' + accts[0].substring(38, 42))
      dispatch(connectWallet)
      dispatch(updateAddress(accts[0]))

    } else {
      //If MetaMask is not installed
      console.log('Please install MetaMask!')
    }

    //console.log(window.ethereum, netId)
    
  }


  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>

          {/* Platform Title and Logo */}

          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <i class="fa-regular fa-file"></i>
            FileShare
          </Link>

          {/* Menu Items */}

          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>

            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/explore'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Explore
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/faq'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                FAQ
              </Link>
            </li>

            <li>
              <div
                className='nav-links-mobile'
                onClick={openDialog}
              >
                { walletIsConnected ? trimmedWalletAddress : 'Connect Wallet'}
              </div>
            </li>

          </ul>

          {/* Connect Wallet Button */}

          {button && <button 
            className='btn btn--outline btn--medium'
            onClick={openDialog}
          >
            { walletIsConnected ? trimmedWalletAddress : 'Connect Wallet'}
          </button>}

          {/* Connect Wallet Confrimation Box */}
          
          <Dialog
            open={open}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title" style={{ fontWeight: "bold", color: "black"}}>{"Connect your MetaMask Wallet?"}</DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{ fontWeight: "bold", color: "#43688B" }}>
              By connecting your MetaMask wallet, you can become an user of FileShare and enjoy the
               file-sharing services from our platform. 
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={closeDialog} color="primary">
              Later
            </Button>
            <Button onClick={connectMetaMaskWallet} color="primary" autoFocus>
              Connect
            </Button>
          </DialogActions>

          </Dialog>

          {/* "Wallet is connected" Alert Box */}
          
          <Dialog
            open={open2}
            onClose={closeDialog2}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">{"MetaMask wallet is connected successfully!"}</DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{ fontWeight: "bold", color: "#43688B" }}>
              {'Wallet address: ' + walletAddress}
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={closeDialog2} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>

          </Dialog>
          
        </div>
      </nav>
    </>
  );
}

export default Navbar;
