import { ChainId, Currency, HARMONY } from '@venomswap/sdk'
import { Blockchain, BLOCKCHAIN_SETTINGS } from '../src'

describe('BlockchainSettings', () => {
  it('can correctly determine blockchain settings', () => {
    const settings = BLOCKCHAIN_SETTINGS[ChainId.HARMONY_MAINNET]
    expect(settings.chainId).toEqual(ChainId.HARMONY_MAINNET)
    expect(settings.hexChainId()).toEqual('0x63564c40')
    expect(settings.blockchain).toEqual(Blockchain.HARMONY)
    expect(settings.name).toEqual('Harmony Mainnet')
    expect(settings.rpcURLs).toHaveLength(3)
    expect(settings.rpcURLs?.[0]).toEqual('https://api.harmony.one/')
    expect(settings.rpcAPIKey).toBeUndefined()
    expect(settings.explorerURL).toEqual('https://explorer.harmony.one/')
    expect(settings.blockTime).toEqual(2)
    expect(settings.randomRpcURL()).not.toBeUndefined()

    expect(settings.currency).not.toBeNull()
    expect(settings.currency).toBeInstanceOf(Currency)
    expect(settings.currency).toEqual(HARMONY)
  })
})
