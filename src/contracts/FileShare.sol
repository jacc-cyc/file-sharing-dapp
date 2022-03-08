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
    //string ipfsURI = "https://ipfs.infura.io/ipfs/QmQawtxnXrqT1QyodQnSVj6Hwqaib97GNMrqk7c44Cadwf"; 

    //event for token and NFT minting
    event NftMint(address indexed addr, uint256 itemID);
    event TokenMint(address indexed addr, uint256 amount);

    //pass as constructor argument deployed Token contract
    constructor(Token _token, NFT _nft) public {
      //assign token deployed contract to variable
      token = _token;
      nft = _nft;
    }

    //minting NFT to an account
    function mintNFT(address addr, string memory ipfsURI) public{
        itemID = nft.mintNFT(addr, ipfsURI);
        emit NftMint(addr, itemID);
    }

    //minting "FILO" token to an account
    function mintToken(address addr, uint256 amount) public{
        amount *= 10**18;
        token.mint(addr, amount);
        emit TokenMint(addr, amount);
    }

    //check balance of "FILO" token
    function balanceOfFILO(address addr) public view returns (uint256){
        return token.balanceOf(addr);
    }

    //check balance of "FileShareNFT" NFT token
    function balanceOfNFT(address addr) public view returns (uint256){
        return nft.balanceOf(addr);
    }

    //check NFT tokenURI with its unique id
    function checkURI(uint256 tokenId) public view returns (string memory){
        return nft.tokenURI(tokenId);
    }

    //check nft owner with its unique id
    function checkOwner(uint256 tokenId) public view returns (address){
        return nft.ownerOf(tokenId);
    }
}