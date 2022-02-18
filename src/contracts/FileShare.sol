// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16;

import "./Token.sol";
import "./NFT.sol";

contract FileShare {
    //assign Token and NFT contract to variable
    Token private token;
    NFT private nft;

    //Item id for a unique NFT
    uint256 private itemID;

    //Example IPFS URI for NFT minting test
    string ipfsURI = "https://ipfs.infura.io/ipfs/QmQawtxnXrqT1QyodQnSVj6Hwqaib97GNMrqk7c44Cadwf"; 

    //event for token and NFT minting
    event NftMint(address indexed addr, uint256 itemID);
    event TokenMint(address indexed addr, uint256 amount);

    //pass as constructor argument deployed Token contract
    constructor(Token _token, NFT _nft) public {
      //assign token deployed contract to variable
      token = _token;
      nft = _nft;
    }

    //function for minting NFT to an account
    function mintNFT(address addr) public{
        itemID = nft.mintNFT(addr, ipfsURI);
        emit NftMint(addr, itemID);
    }

    //function for minting "FILO" token to an account
    function mintToken(address addr, uint256 amount) public{
        token.mint(addr, amount);
        emit TokenMint(addr, amount);
    }

}