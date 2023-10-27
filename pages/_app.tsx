import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { env } from "@/lib/env";
import type { AppProps } from "next/app";
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { Londrina_Solid } from "next/font/google";
import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { BuilderDAO } from "nouns-builder-components";

const londrinaSolid = Londrina_Solid({
  weight: "900",
  subsets: ["latin"],
  variable: "--font-londrina-solid",
  display: "swap",
});

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: "Purple DAO",
  projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${londrinaSolid.variable}`}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            accentColor: "#8465CB",
            accentColorForeground: "white",
          })}
        >
          <BuilderDAO
            collection="0xa45662638E9f3bbb7A6FeCb4B17853B7ba0F3a60"
            chain="MAINNET"
          >
            <Component {...pageProps} />
          </BuilderDAO>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default MyApp;
