'use client';

import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { NeynarContextProvider, Theme } from '@neynar/react';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Londrina_Solid } from 'next/font/google';
import { ReactNode, useState } from 'react';
import { http } from 'viem';
import { createConfig, WagmiProvider } from 'wagmi';
import { mainnet, base } from 'wagmi/chains';

import { BuilderDAO } from '@/lib/builder';
import { DAO_CONFIG } from '@/lib/config';
import { env } from '@/lib/env';
import FrameProvider from '@/components/providers/frame-provider';
import { frameConnector } from '@/lib/connector';

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
  connectors: [frameConnector()],
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
            <NeynarContextProvider
              settings={{
                clientId: process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID || '',
                defaultTheme: Theme.Light,
                eventsCallbacks: {
                  onAuthSuccess: () => {},
                  onSignout() {},
                },
              }}
            >
              <BuilderDAO collection={DAO_CONFIG.token} chain="BASE">
                <FrameProvider>
                  {children}
                </FrameProvider>
              </BuilderDAO>
            </NeynarContextProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}

export default Providers;
