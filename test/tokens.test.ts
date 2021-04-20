import { ChainId, Token } from '@venomswap/sdk'
import { Tokens, TOKENS } from '../src/'

describe('Tokens', () => {

  describe('Without specifying a chain id', () => {
    it('can correctly parse tokens from token lists', () => {
      const tokens = new Tokens().tokens
      expect(tokens?.length).toBeGreaterThan(0)
    })

    it('can correctly parse token details', () => {
      const tokens = new Tokens().tokens
      const token = tokens?.[0]
      expect(token).toBeInstanceOf(Token)
      expect(token?.name).toEqual('Cardano Token')
      expect(token?.symbol).toEqual('ADA')
      expect(token?.decimals).toEqual(18)
      expect(token?.chainId).toEqual(ChainId.BSC_MAINNET)
      expect(token?.address).toEqual('0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47')
    })
  
    it('can correctly find a token by its symbol', () => {
      const token = new Tokens().firstBySymbol('LINK')
      expect(token).toBeInstanceOf(Token)
      expect(token?.name).toEqual('ChainLink Token')
      expect(token?.symbol).toEqual('LINK')
      expect(token?.decimals).toEqual(18)
      expect(token?.chainId).toEqual(ChainId.BSC_MAINNET)
      expect(token?.address).toEqual('0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD')
    })

    it('can correctly find all tokens matching a specific symbol', () => {
      const busdTokens = new Tokens().bySymbol('BUSD')
      expect(busdTokens).toBeInstanceOf(Array)
      expect(busdTokens).toHaveLength(3)
    })
  })

  describe.only('Specifying a chain id', () => {
    it('can correctly parse tokens from token lists with a specified chain id', () => {
      const tokens = new Tokens(ChainId.HARMONY_MAINNET).tokens
      expect(tokens?.length).toBeGreaterThan(0)
    })

    it('can correctly parse token details', () => {
      const tokens = new Tokens(ChainId.HARMONY_MAINNET).tokens
      const token = tokens?.[0]
      expect(token).toBeInstanceOf(Token)
      expect(token?.name).toEqual('1INCH Token')
      expect(token?.symbol).toEqual('11INCH')
      expect(token?.decimals).toEqual(18)
      expect(token?.chainId).toEqual(ChainId.HARMONY_MAINNET)
      expect(token?.address).toEqual('0x58f1b044d8308812881a1433d9Bbeff99975e70C')
    })
  
    it('can correctly find a token by its symbol', () => {
      const token = new Tokens(ChainId.HARMONY_MAINNET).firstBySymbol('LINK')
      expect(token).toBeInstanceOf(Token)
      expect(token?.name).toEqual('ChainLink Token')
      expect(token?.symbol).toEqual('LINK')
      expect(token?.decimals).toEqual(18)
      expect(token?.chainId).toEqual(ChainId.HARMONY_MAINNET)
      expect(token?.address).toEqual('0x218532a12a389a4a92fC0C5Fb22901D1c19198aA')
    })

    it('correctly only identifies one instance of a token per chain id', () => {
      const busdTokens = new Tokens(ChainId.HARMONY_MAINNET).bySymbol('BUSD')
      expect(busdTokens).toBeInstanceOf(Array)
      expect(busdTokens).toHaveLength(1)
    })
  })

  describe('Using TOKENS constant', () => {
    it('can correctly parse tokens from token lists with a specified chain id', () => {
      const tokens = TOKENS[ChainId.HARMONY_MAINNET].tokens
      expect(tokens?.length).toBeGreaterThan(0)
    })

    it('can correctly parse token details', () => {
      const tokens = TOKENS[ChainId.HARMONY_MAINNET].tokens
      const token = tokens?.[0]
      expect(token).toBeInstanceOf(Token)
      expect(token?.name).toEqual('1INCH Token')
      expect(token?.symbol).toEqual('11INCH')
      expect(token?.decimals).toEqual(18)
      expect(token?.chainId).toEqual(ChainId.HARMONY_MAINNET)
      expect(token?.address).toEqual('0x58f1b044d8308812881a1433d9Bbeff99975e70C')
    })
  
    it('can correctly find a token by its symbol', () => {
      const token = TOKENS[ChainId.HARMONY_MAINNET].firstBySymbol('LINK')
      expect(token).toBeInstanceOf(Token)
      expect(token?.name).toEqual('ChainLink Token')
      expect(token?.symbol).toEqual('LINK')
      expect(token?.decimals).toEqual(18)
      expect(token?.chainId).toEqual(ChainId.HARMONY_MAINNET)
      expect(token?.address).toEqual('0x218532a12a389a4a92fC0C5Fb22901D1c19198aA')
    })

    it('correctly only identifies one instance of a token per chain id', () => {
      const busdTokens = TOKENS[ChainId.HARMONY_MAINNET].bySymbol('BUSD')
      expect(busdTokens).toBeInstanceOf(Array)
      expect(busdTokens).toHaveLength(1)
    })
  })

})
