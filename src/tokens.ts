import DEFAULT_TOKEN_LIST from '@venomswap/default-token-list'
import COMMUNITY_TOKEN_LIST from '@venomswap/community-token-list'
import { ChainId, Token } from '@venomswap/sdk'

export interface TokenListToken {
  chainId: number
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI: string
}

export class Tokens {
  public static all(
    chainId?: ChainId,
    tokens = [...DEFAULT_TOKEN_LIST.tokens, ...COMMUNITY_TOKEN_LIST.tokens]
  ): Token[] | undefined {
    let parsedTokens: Token[] | undefined = this.convertTokens(tokens)

    if (!parsedTokens || parsedTokens.length == 0) {
      return undefined
    }

    if (chainId) {
      parsedTokens = this.byChainId(parsedTokens, chainId)
    }
  
    return parsedTokens
  }

  public static byChainId(tokens: Token[] | undefined, chainId: ChainId): Token[] | undefined {
    if (chainId === undefined || tokens === undefined) return undefined
    return tokens.filter((token: Token) => token.chainId == chainId)
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
  
  public static convertTokens(tokens: TokenListToken[]): Token[] {
    const sdkTokens: Token[] = []
  
    for (const token of tokens) {
      const sdkToken = this.convertToken(token)
      sdkTokens.push(sdkToken)
    }
  
    return sdkTokens
  }
  
  public static convertToken(token: TokenListToken): Token {
    return new Token(token.chainId, token.address, token.decimals, token.symbol, token.name)
  }
}

export const TOKENS: { [chainId in ChainId]: Token[] | undefined } = {
  [ChainId.MAINNET]: Tokens.all(ChainId.MAINNET),
  [ChainId.ROPSTEN]: Tokens.all(ChainId.ROPSTEN),
  [ChainId.RINKEBY]: Tokens.all(ChainId.RINKEBY),
  [ChainId.GÖRLI]: Tokens.all(ChainId.GÖRLI),
  [ChainId.KOVAN]: Tokens.all(ChainId.KOVAN),
  [ChainId.BSC_MAINNET]: Tokens.all(ChainId.BSC_MAINNET),
  [ChainId.BSC_TESTNET]: Tokens.all(ChainId.BSC_TESTNET),
  [ChainId.HARMONY_MAINNET]: Tokens.all(ChainId.HARMONY_MAINNET),
  [ChainId.HARMONY_TESTNET]: Tokens.all(ChainId.HARMONY_TESTNET),
}
