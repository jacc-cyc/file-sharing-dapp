const Token = artifacts.require("Token");
const NFT = artifacts.require("NFT");
const FileShare = artifacts.require("FileShare");

module.exports = async function(deployer) {
  //deploy Token Contract
	await deployer.deploy(Token);

  //deploy NFT Contract
	await deployer.deploy(NFT);

	//assign token and NFT into variable to get it's address
	const token = await Token.deployed();
  const nft = await NFT.deployed();

  //deploy FileShare Platform Contract
	await deployer.deploy(FileShare, token.address, nft.address);

  //assign dBank contract into variable to get it's address
	const fileShare = await FileShare.deployed();

  //change token's owner/minter from deployer to FileShare Platform
	await token.passMinterRole(fileShare.address);
  await nft.passMinterRole(fileShare.address);
};
