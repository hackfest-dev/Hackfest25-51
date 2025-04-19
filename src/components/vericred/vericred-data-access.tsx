'use client'

import { getVericredProgram, getVericredProgramId } from '@project/anchor'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useVericredProgram() {
  const {publicKey}=useWallet();
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getVericredProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getVericredProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['vericred', 'all', { cluster }],
    queryFn: () => program.account.vericred.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['vericred', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize("1").accounts({ vericred: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useVericredProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useVericredProgram()

  const accountQuery = useQuery({
    queryKey: ['vericred', 'fetch', { cluster, account }],
    queryFn: () => program.account.vericred.fetch(account),
  })
  return {
    accountQuery,
  }
}
