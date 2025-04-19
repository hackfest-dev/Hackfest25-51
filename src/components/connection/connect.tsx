"use client";
import { PhantomWalletName } from "@solana/wallet-adapter-phantom";
import { ConnectionContext, ConnectionProvider, useWallet, WalletContext, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { useEffect, useMemo } from "react";

export default function Connect({ children }: { children: React.ReactNode }) {
    const endpoint = clusterApiUrl("devnet");
    const wallets = useMemo(() => [], []);
    const { select,connect } = useWallet();
    select(PhantomWalletName);
  
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                    <WalletMultiButton/>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
        // <ConnectionProvider endpoint={endpoint}>
        //       <WalletProvider wallets={[]} onError={onError} autoConnect={true}>
        //         <WalletMultiButton/>
        //         <ClusterUiSelect/>
        //         <WalletModalProvider>{children}</WalletModalProvider>
        //       </WalletProvider>
        //     </ConnectionProvider>
    )
}