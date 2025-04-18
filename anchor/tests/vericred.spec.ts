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
      .initialize()
      .accounts({
        vericred: vericredKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([vericredKeypair])
      .rpc()

    const currentCount = await program.account.vericred.fetch(vericredKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Vericred', async () => {
    await program.methods.increment().accounts({ vericred: vericredKeypair.publicKey }).rpc()

    const currentCount = await program.account.vericred.fetch(vericredKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Vericred Again', async () => {
    await program.methods.increment().accounts({ vericred: vericredKeypair.publicKey }).rpc()

    const currentCount = await program.account.vericred.fetch(vericredKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Vericred', async () => {
    await program.methods.decrement().accounts({ vericred: vericredKeypair.publicKey }).rpc()

    const currentCount = await program.account.vericred.fetch(vericredKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set vericred value', async () => {
    await program.methods.set(42).accounts({ vericred: vericredKeypair.publicKey }).rpc()

    const currentCount = await program.account.vericred.fetch(vericredKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the vericred account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        vericred: vericredKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.vericred.fetchNullable(vericredKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
