import React from 'react';
import './Cards.css';
import CardItem from '../CardItem/CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Why our platform? Check out the features!</h1>
      <div className='cards__container'>

        <div className='cards__wrapper'>
          {/* feature items */}

          <ul className='cards__items'>
            <CardItem
              src='images/blockchain.jpg'
              text='Ethereum Blockchain Network'
              description='It act as our backebone instead of traditional database. No central server. No intermediaries. Share your files directly to someone!'
              label='Feature#1'
              path='/services'
            />
            
            <CardItem
              src='images/cyber-security.jpg'
              text='Ensure Data Privacy and Security'
              description="Secured by blcokchain technologies. Everything is distributed, immutable and public-verified. We don't own your data."
              label='Feature#2'
              path='/services'
            />
          </ul>

          <ul className='cards__items'>
          <CardItem
              src='images/IPFS.jpg'
              text='InterPlanetary File System (IPFS)'
              description='Peer-to-peer distributed file storage protocol. It is being used to store your files in a decentralized way.'
              label='Feature#3'
              path='/services'
            />

            <CardItem
              src='images/NFT.jpg'
              text='Non-Fungible Token (NFT)'
              description='It represent the ownership of unique file items. Thus you are the unique owner of your file.'
              label='Feature#4'
              path='/services'
            />

            <CardItem
              src='images/ERC20.jpg'
              text='Platform Token "FILO"'
              description="FileShare's ERC-20 platform token, for rewarding user who share their files in our platform."
              label='Feature#5'
              path='/products'
            />
          </ul>

        </div>
      </div>
    </div>
  );
}

export default Cards;
