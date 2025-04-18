import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair } from '@solana/web3.js'
import { Vericred } from '../target/types/vericred'

describe('vericred', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Vericred as Program<Vericred>

  const vericredKeypair = Keypair.generate()

  it('Initialize Vericred', async () => {
    await program.methods
      .initialize("1")
      .accounts({
        vericred: vericredKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([vericredKeypair])
      .rpc()

    const currentCount = await program.account.vericred.fetch(vericredKeypair.publicKey)

    expect(currentCount.cid).toEqual("1")
  })

})
