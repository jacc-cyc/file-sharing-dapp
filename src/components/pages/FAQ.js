import React from 'react';
import '../../App.css';
import Footer from '../Footer/Footer';

export default function FAQ() {
  return (
    <div>
      <div className='faq'>

      <h2>Frequently Asked Questions:</h2>
      
      <h3>What is FileShare? Do I need to create an account for it?</h3>
      <p>FileShare is a decentralized file-sharing platform for everyone. We utilzed Ethereum Blockchain and IPFS to perform file-sharing
        in a secured and distributed way. You don't need to create/register an account in FileShare, all you need is a MetaMask wallet
        to connect with FileShare. </p>

      <h3>How is this decentralized? Where are my files stored?</h3>
      <p>Instead of a traditional database, FileShare use IPFS to store your files, and Ethereum Blockchain to record the file transaction and user 
        infromation (e.g wallet address). Thus, there is no central authorities behind the platform, everything is 
        transparent and public-verified. </p>

      <h3>How can I be the unique owner to my file?</h3>
      <p>Every file uploaded to FileShare will become a NFT and minted to your wallet address. For receiving shared-file from others, the corresponding
         NFT will be transferred to your address automatically.
      </p>

      <h3>Do FileShare own any of my data?</h3>
      <p>No.</p>

      </div>

      <Footer />
    </div>
  

  );
}
