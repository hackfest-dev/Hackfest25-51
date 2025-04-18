// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import VericredIDL from '../target/idl/vericred.json'
import type { Vericred } from '../target/types/vericred'

// Re-export the generated IDL and type
export { Vericred, VericredIDL }

// The programId is imported from the program IDL.
export const VERICRED_PROGRAM_ID = new PublicKey(VericredIDL.address)

// This is a helper function to get the Vericred Anchor program.
export function getVericredProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...VericredIDL, address: address ? address.toBase58() : VericredIDL.address } as Vericred, provider)
}

// This is a helper function to get the program ID for the Vericred program depending on the cluster.
export function getVericredProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Vericred program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return VERICRED_PROGRAM_ID
  }
}
