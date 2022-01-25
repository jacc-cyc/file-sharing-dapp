// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//the FileShare platform ERC-20 token, used as an incentive for platform user
contract Token is ERC20 {
  //add minter variable
  address public minter;

  //add minter changed event
  event MinterChanged(address indexed from, address to);

  constructor() public payable ERC20("FileShare Platform Token", "FILO") {
    //asign initial minter
    minter = msg.sender;
  }

  //pass minter role to another address
  function passMinterRole(address addr) public returns (bool){
    require(msg.sender == minter, 'Error, msg sender is not the minter');
    minter = addr;

    emit MinterChanged(msg.sender, addr);
    return true;
  }

  //mint token to an account
  function mint(address account, uint256 amount) public {
    //check if msg.sender have minter role
    require(msg.sender == minter, 'Error, msg sender is not the minter');
	_mint(account, amount);
  }

}