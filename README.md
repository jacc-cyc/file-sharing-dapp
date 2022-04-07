<div align="center">
  <h1>FileShare</h1>
</div>

## What is FileShare?
FileShare is a decentralized file-sharing platform based on blockchain technologies, and it aims to:
- **Provide a file-sharing platform without middle-man involved**
- **Improve data privacy and security with blockchain and InterPlanetary File System (IPFS)**
- **Ensure user file ownership with Non-Fungible Token (NFT)**

It offers two ways of file-sharing:
- **Personal Sharing**: Share your unique IPFS file link to someone
- **Public Sharing**: Minting your file as an NFT, and share to everyone in the platform

## Tech Stack
Frontend:
- **React / Redux**
- **Material UI**
- **Web3.js**
- [**IPFS HTTP API**](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client#readme)
- [**MetaMask Ethereum Provider API**](https://docs.metamask.io/guide/ethereum-provider.html#ethereum-provider-api)

Backend:
- **Ethereum Blockchain (Truffle + Ganache)**
- **Solidity**
- **ERC-20 Token ("FILO")**
- **ERC-721 Token ("NFT")**
- [**@openzeppelin/contracts**](https://github.com/OpenZeppelin/openzeppelin-contracts)

## Application UI
![HomePage01](https://i.imgur.com/Hz7QGif.jpeg)
<div align="center" style="font-style:italic;">
  Home Page
</div>
<br>

![HomePage02](https://i.imgur.com/297YgMk.png)
<div align="center" style="font-style:italic;">
  Home Page - Personal Sharing
</div>
<br>

![ExplorePage01](https://i.imgur.com/v8vHpfC.png)
<div align="center">
  Explore Page - Public Sharing
</div>
<br>

![ExplorePage02](https://i.imgur.com/dMRjwsz.png)
<div align="center">
  Explore Page - Items
</div>