const { assert } = require('chai')

const Token = artifacts.require('Token')
const NFT = artifacts.require('NFT')
const FileShare = artifacts.require('FileShare')

require('chai').use(require('chai-as-promised')).should()

contract('FileShare Platform', ([deployer, user]) => {
    const EVM_REVERT = 'VM Exception while processing transaction: revert'
    let token, nft, fs
    let uri = "https://ipfs.infura.io/ipfs/QmQawtxnXrqT1QyodQnSVj6Hwqaib97GNMrqk7c44Cadwf"
    let accts, ac, ac2

    before(async () => {
        accts = await web3.eth.getAccounts()
        ac = accts[9]
        ac2= accts[8]

        token = await Token.new()
        nft = await NFT.new()
        fs = await FileShare.new(token.address, nft.address)

        await token.passMinterRole(fs.address, {from: deployer})
        await nft.passMinterRole(fs.address, {from: deployer})
    })

    describe('testing token contract...', () => {
        describe('success', () => {
          it('checking token name', async () => {
            expect(await token.name()).to.be.eq('FileShare Platform Token')
          })
    
          it('checking token symbol', async () => {
            expect(await token.symbol()).to.be.eq('FILO')
          })
    
          it('checking token initial total supply', async () => {
            expect(Number(await token.totalSupply())).to.eq(0)
          })

          it('FileShare should have Token minter role', async () => {
            expect(await token.minter()).to.eq(fs.address)
          })

          it('FileShare should have Token minter role', async () => {
            expect(await token.minter()).to.eq(fs.address)
          })

          it('passing Token minter role should be rejected', async () => {
            await token.passMinterRole(user, {from: deployer}).should.be.rejectedWith(EVM_REVERT)
          })
    
          it('tokens minting should be rejected', async () => {
            await token.mint(user, '1', {from: deployer}).should.be.rejectedWith(EVM_REVERT) //unauthorized minter
          })
        })
    })

    describe('testing NFT contract...', () => {
      describe('success', () => {
        it('checking NFT name', async () => {
          expect(await nft.name()).to.be.eq('FileShareNFT')
        })
  
        it('checking NFT symbol', async () => {
          expect(await nft.symbol()).to.be.eq('NFT')
        })

        it('FileShare should have NFT minter role', async () => {
          //Ownable.sol's owner()
          expect(await nft.owner()).to.eq(fs.address)
        })

        it('passing NFT minter role should be rejected', async () => {
          await nft.passMinterRole(user, {from: deployer}).should.be.rejectedWith(EVM_REVERT)
        })
  
        it('NFT minting should be rejected', async () => {
          await nft.mintNFT(user, uri, {from: deployer}).should.be.rejectedWith(EVM_REVERT) //unauthorized minter
        })
      })
    })

    describe('testing FileShare contract...', () => {
      let tokenBal, nftid
      let item, items

      beforeEach(async () => {
        await fs.mintToken(user, 1, {from: deployer})
        await fs.mintNFT(user, uri, {from: deployer})
        tokenBal = await fs.balanceOfFILO(user)
        nftid = await fs.getNFTId()
        //nftBal = await fs.balanceOfNFT(user)

        await fs.addItem(user, uri, "filename", "pdf", "short des", "long des", {from: user})
        item = await fs.getItem(1)
        items = await fs.getItems()
      })

      describe('success', () => {        
        it('checking FILO Platform Token minting', async () => {
          expect(await tokenBal.toString()).to.eq('1000000000000000000')
        })

        it('checking FileShareNFT minting', async () => {
          expect(Number(await fs.balanceOfNFT(user))).to.be.above(0)
        })

        it('checking file data item adding', async () => {
          expect(Number(await fs.getCount())).to.be.above(0)
        })

        it('checking of getting a single file data item', async () => {
          expect(Number(item.id)).to.eq(1)
        })

        it('checking of getting all file data item', async () => {
          expect(Number(items.length)).to.be.above(0)
        })

        it('checking NFT file URI after minting', async () => {
          expect(await fs.checkURI(nftid)).to.eq(uri)
        })

        it('checking NFT ownership after minting', async () => {
          expect(await fs.checkOwner(nftid)).to.eq(user)
        })

        it('checking of NFT direct transferral inside NFT.sol', async () => {
          await nft.transferFrom(user, ac, nftid, {from: user})
          expect(await fs.checkOwner(nftid)).to.eq(ac)
        })

        it('checking of NFT transferral with pre-approval', async () => {
          await nft.setPlatformApproval(fs.address, nftid, {from: user})
          await fs.transferNFT(user, ac, 1, nftid, {from: deployer})
          expect(await fs.checkOwner(nftid)).to.eq(ac)
        })

        it('NFT transferral without pre-approval should be rejected', async () => {          
          await fs.transferNFT(user, ac, 1, nftid, {from: deployer}).should.be.rejectedWith(EVM_REVERT)
        })
      })

    })
})