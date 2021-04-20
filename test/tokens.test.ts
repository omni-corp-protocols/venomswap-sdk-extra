import { ChainId, Token } from '@venomswap/sdk'
import { TokenUtility } from '../src/'

describe('TokenUtility', () => {
  it('can correctly parse tokens from token lists', () => {
    const tokens = TokenUtility.all(ChainId.HARMONY_MAINNET)
    expect(tokens?.length).toBeGreaterThan(0)
  })

  it('can correctly parse token details', () => {
    const tokens = TokenUtility.all(ChainId.HARMONY_MAINNET)
    const token = tokens?.[0]
    expect(token).toBeInstanceOf(Token)
    expect(token?.name).toEqual('1INCH Token')
    expect(token?.symbol).toEqual('11INCH')
    expect(token?.decimals).toEqual(18)
    expect(token?.chainId).toEqual(ChainId.HARMONY_MAINNET)
    expect(token?.address).toEqual('0x58f1b044d8308812881a1433d9Bbeff99975e70C')
  })

  it('can correctly find a token by its symbol', () => {
    const tokens = TokenUtility.all(ChainId.HARMONY_MAINNET)
    const token = TokenUtility.first(tokens, 'symbol', 'LINK')
    expect(token).toBeInstanceOf(Token)
    expect(token?.name).toEqual('ChainLink Token')
    expect(token?.symbol).toEqual('LINK')
    expect(token?.decimals).toEqual(18)
    expect(token?.chainId).toEqual(ChainId.HARMONY_MAINNET)
    expect(token?.address).toEqual('0x218532a12a389a4a92fC0C5Fb22901D1c19198aA')
  })
})
