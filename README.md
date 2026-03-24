## purple.construction

![purple.construction 2024 screenshot](https://i.imgur.com/xLDigs1.png)

Official site for [Purple DAO](https://purple.construction), whose goal is to proliferate the [Farcaster](https://farcaster.xyz) ecosystem.

### About this repo

- This is a [RainbowKit](https://rainbowkit.com) + [wagmi](https://wagmi.sh) + [Next.js](https://nextjs.org/) project bootstrapped with [`create-rainbowkit`](https://github.com/rainbow-me/rainbowkit/tree/main/packages/create-rainbowkit)
- The [first version](https://github.com/ripe0x/purple.construction) of the site was created by [ripe0x](https://github.com/ripe0x) and used [Builder Components](https://buildercomponents.wtf/) to grab most of the DAO's data
- The redesign was done by [dylsteck.eth](https://warpcast.com/dylsteck.eth)
- The site now uses the [BuilderOSS SDK](https://github.com/BuilderOSS/nouns-builder) (`@buildeross/*` packages) for all DAO data, auction state, and contract interactions

### Packages

- **[Next.js](https://nextjs.org/) 16** (Turbopack) — static export
- **[React](https://react.dev/) 19** — UI framework
- **[Tailwind CSS](https://tailwindcss.com/) 4** — styling
- **[wagmi](https://wagmi.sh/) 2 + [viem](https://viem.sh/) 2** — Ethereum client
- **[RainbowKit](https://rainbowkit.com/) 2** — wallet connection
- **[BuilderOSS SDK](https://docs.nouns.build/developers/overview/)** — Nouns Builder DAO hooks, ABIs, and subgraph queries
- **[TanStack React Query](https://tanstack.com/query)** — async data fetching
- **[@farcaster/miniapp-sdk](https://github.com/farcasterxyz/miniapp-sdk)** — Farcaster mini app support
- **[TypeScript](https://typescriptlang.org/) 5** — type safety

### How to run locally

Install dependencies:

```bash
npm install
```

Copy `.env.example` to a new `.env.local` file and fill in the corresponding values:

```bash
cp .env.example .env.local
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
