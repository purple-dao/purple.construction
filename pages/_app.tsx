import "../styles/globals.scss";
import "../styles/app.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { RainbowKitProvider, darkTheme, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { BuilderDAO } from "nouns-builder-components";
import { config } from "process";
import { tokenContract } from "../config";

const { chains, provider } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Purple DAO",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme({
        accentColor: '#8465CB',
        accentColorForeground: 'white',
      })}>
        <BuilderDAO collection={tokenContract.address} chain="MAINNET">
          <Component {...pageProps} />
        </BuilderDAO>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
