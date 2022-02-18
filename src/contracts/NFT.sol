// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

//the ECR721 Non-Fungible Token in FileShare platform
contract NFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    //event for minter change
    //event MinterChanged(address indexed from, address to);

    //declare the name and symbol of our platform NFTs
    constructor() public ERC721("FileShareNFT", "NFT") {}

    //function for passing the minter role to another address
    function passMinterRole(address addr) public onlyOwner returns (bool){
        transferOwnership(addr);
        //emit MinterChanged(msg.sender, addr);
        //Ownable.transferOwnership() already emitted OwnershipTransferred event

        return true;
    }

    //mint NFT to an account with the item URI
    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256){
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
