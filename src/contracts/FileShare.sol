// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;

import "./Token.sol";
import "./NFT.sol";

//Controller & Data Storage contract
contract FileShare {
    //event for token and NFT minting
    event NftMint(address indexed addr, uint256 itemID);
    event TokenMint(address indexed addr, uint256 amount);
    event NFTtransfer(address indexed from, address indexed to, uint256 itemID);

    //File data item
    struct fileItem{
        uint id;
        uint nftId;
        string ownerAddress;
        string fileURI;
        string name;
        string fileType;
        string shortDescription;
        string longDescription;
    }

    mapping(uint => fileItem) private items;

    //File data item count
    uint256 private itemCount;

    //Item id for a unique NFT
    uint256 private itemID;

    //assign Token and NFT contract to variable
    Token private token;
    NFT private nft;

    //Example IPFS URI for NFT minting test
    //string ipfsURI = "https://ipfs.infura.io/ipfs/QmQawtxnXrqT1QyodQnSVj6Hwqaib97GNMrqk7c44Cadwf"; 

    //pass as constructor argument deployed Token contract
    constructor(Token _token, NFT _nft) public {
      //assign token deployed contract to variable
      token = _token;
      nft = _nft;

      //initialze item count and NFT item id to zero
      itemCount = 0;
      itemID = 0;
    }

    // ------------------------------------------------- File Data Items Operations -------------------------------------------- //

    //get the file data item count
    function getCount() public view returns (uint256){
        return itemCount;
    }

    //add new file data item, mint the new file as NFT & give 30 FILO token to user
    function addItem(string memory owner, string memory uri, string memory name, string memory fileType, string memory short, string memory long) public{
        itemCount++;
        itemID = nft.mintNFT(msg.sender, uri);
        uint256 amount = 30 * 10**18;
        token.mint(msg.sender, amount);
        items[itemCount] = fileItem(itemCount, itemID, owner, uri, name, fileType, short, long);

        emit NftMint(msg.sender, itemID);
        emit TokenMint(msg.sender, amount);
    }

    //get a single file item
    function getItem(uint id) public view returns (fileItem memory){
        return items[id];
    }

    //get all file data items
    function getItems() public view returns (fileItem[] memory){
        fileItem[] memory tmpItems = new fileItem[](itemCount+1);
        for (uint i=0; i<=itemCount; i++){
            fileItem storage tmpitem = items[i];
            tmpItems[i] = tmpitem;
        }
        return tmpItems;
    }

    //delete a file data item
    // **delete in solidity smart contract means setting all value to 0 or '' (empty string)
    function deleteItem(uint id) public{
        delete(items[id]);
    }

    // ------------------------------------------------- FILO Token and NFT Operations -------------------------------------------- //

    //minting NFT to an account, return the NFT id
    function mintNFT(address addr, string memory ipfsURI) public{
        itemID = nft.mintNFT(addr, ipfsURI);
        //nft.approve(address(this), itemID);
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

    //get the current NFT Item id
    function getNFTId() public view returns (uint256){
        return itemID;
    }

    //check NFT tokenURI with its unique id
    function checkURI(uint256 tokenId) public view returns (string memory){
        return nft.tokenURI(tokenId);
    }

    //check nft owner with its unique id
    function checkOwner(uint256 tokenId) public view returns (address){
        return nft.ownerOf(tokenId);
    }

    //after user "Get" the shared file, transfer the NFT to the user and reward the sharer, also delete the data item
    function transferNFT(address from, address to, uint256 id, uint256 nftid) public{
        nft.transferFrom(from, to, nftid);
        delete(items[id]);

        uint256 amount = 100 * 10**18;
        token.mint(from, amount);

        emit NFTtransfer(from, to, nftid);
        emit TokenMint(from, amount);
    }
}