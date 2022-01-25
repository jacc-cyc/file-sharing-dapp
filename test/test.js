const { assert } = require('chai')

const Token = artifacts.require('Token')

require('chai').use(require('chai-as-promised')).should()

contract('Token', () => {
    let token

    before(async () => {
        token = await Token.new()
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
        })
      })
})