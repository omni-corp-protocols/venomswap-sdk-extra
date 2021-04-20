import DEFAULT_TOKEN_LIST from '@venomswap/default-token-list'
import COMMUNITY_TOKEN_LIST from '@venomswap/community-token-list'
import { Token } from '@venomswap/sdk'

export interface TokenListToken {
  chainId: number
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI: string
}

export class TokenUtility {
  public static all(chainId: number | undefined): Token[] | undefined {
    if (!chainId) return undefined
  
    const defaultTokens = DEFAULT_TOKEN_LIST.tokens.filter((token: any) => token.chainId == chainId)
    const communityTokens = COMMUNITY_TOKEN_LIST.tokens.filter((token: any) => token.chainId == chainId)
    const matchingTokens = [...defaultTokens, ...communityTokens]
  
    if (!matchingTokens || matchingTokens.length == 0) {
      return undefined
    }
  
    return this.converToSDKTokens(matchingTokens)
  }

  public static find(tokens: Token[] | undefined, key: string, value: string): Token[] | undefined {
    if (tokens === undefined) return undefined
  
    switch (key) {
      case 'name':
        return tokens.filter((token) => token?.name?.toLowerCase() == value.toLowerCase())
      case 'symbol':
        return tokens.filter((token) => token?.symbol?.toLowerCase() == value.toLowerCase())
      case 'address':
        return tokens.filter((token) => token?.address?.toLowerCase() == value.toLowerCase())
      default:
        return tokens.filter((token) => token?.name?.toLowerCase() == value.toLowerCase())
    }
  }

  public static first(tokens: Token[] | undefined, key: string, value: string): Token | undefined {
    return this.find(tokens, key, value)?.[0]
  }
  
  public static converToSDKTokens(tokens: TokenListToken[]): Token[] {
    const sdkTokens: Token[] = []
  
    for (const token of tokens) {
      const sdkToken = this.convertToSDKToken(token)
      sdkTokens.push(sdkToken)
    }
  
    return sdkTokens
  }
  
  public static convertToSDKToken(token: TokenListToken): Token {
    return new Token(token.chainId, token.address, token.decimals, token.symbol, token.name)
  }
}
