'use client';

import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Londrina_Solid } from 'next/font/google';
import { ReactNode, useState } from 'react';
import { http } from 'viem';
import { createConfig, WagmiProvider } from 'wagmi';
import { mainnet, base } from 'wagmi/chains';
import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector";

import { BuilderDAO } from '@/lib/builder';
import { DAO_CONFIG } from '@/lib/config';
import { env } from '@/lib/env';
import MiniAppProvider from '@/components/providers/mini-app-provider';

const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: 15 * 60 * 1000,
      staleTime: 30 * 60 * 1000,
    },
  },
};

const londrinaSolid = Londrina_Solid({
  weight: '900',
  subsets: ['latin'],
  variable: '--font-londrina-solid',
  display: 'swap',
});

export const wagmiConfig = createConfig({
  connectors: [farcasterMiniApp()],
  chains: [mainnet, base],
  transports: {
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
    [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${env.NEXT_PUBLIC_ALCHEMY_API_KEY}`)
  },
});

function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions));

  return (
    <div className={`${londrinaSolid.variable}`}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: '#8465CB',
              accentColorForeground: 'white',
            })}
          >
            <BuilderDAO collection={DAO_CONFIG.token} chain="BASE">
              <MiniAppProvider>
                {children}
              </MiniAppProvider>
            </BuilderDAO>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}

export default Providers;
