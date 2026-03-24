# AGENTS.md

## Project overview

purple.construction is the official site for [Purple DAO](https://purple.construction), a Nouns Builder DAO on Base whose goal is to proliferate the [Farcaster](https://farcaster.xyz) ecosystem. The site displays live auction data, proposal listings, and DAO information.

## Tech stack

- **Framework:** Next.js 16 (Turbopack) with static export (`output: 'export'`)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Blockchain:** wagmi 2 + viem 2 + RainbowKit 2 (Base mainnet)
- **DAO SDK:** [BuilderOSS](https://github.com/BuilderOSS/nouns-builder) (`@buildeross/sdk`, `@buildeross/hooks`, `@buildeross/types`, etc.)
- **Data fetching:** TanStack React Query
- **Farcaster:** `@farcaster/miniapp-sdk` for mini app / frame support

## Project structure

```
app/                    # Next.js App Router pages
  layout.tsx            # Root layout (server component, uses ClientProviders)
  page.tsx              # Home — auction hero
  about/                # About page
  proposals/            # Proposals listing
  .well-known/          # Farcaster manifest

components/
  providers/
    index.tsx           # Wagmi + RainbowKit + QueryClient + BuilderDAO providers
    client-providers.tsx # Client-only wrapper (dynamic import, ssr: false)
    mini-app-provider.tsx
    page-provider.tsx
  auction-hero.tsx      # Main auction display
  bid-form.tsx          # Bid / settle auction form
  proposal-list.tsx     # Governance proposals
  nav.tsx / footer.tsx  # Layout chrome

lib/
  builder/              # BuilderOSS integration layer
    builder-context.tsx  # React context for DAO config
    hooks/               # useDao, useAuction, useToken, useProposals
    types.ts             # DaoInfo, AuctionData, ProposalData, etc.
    utils.ts
  config.ts             # DAO_CONFIG (addresses, metadata) and MINIAPP config
  purple-dao.ts         # PURPLE_DAO constants (chainId, contract addresses)
  env.ts                # Type-safe env vars via @t3-oss/env-nextjs
```

## Key patterns

- **Static export:** The site builds as fully static HTML (`output: 'export'`). All blockchain data is fetched client-side. Because of this, browser-only libraries (RainbowKit, wagmi) must not run during prerender — the `ClientProviders` wrapper handles this via `next/dynamic` with `ssr: false`.
- **Single DAO:** The site is hardcoded to Purple DAO on Base (chain ID 8453). Contract addresses live in `lib/config.ts` and `lib/purple-dao.ts`.
- **BuilderOSS SDK:** DAO metadata comes from `@buildeross/sdk/subgraph`, auction state from `@buildeross/hooks/useDaoAuction`, and contract ABIs from `@buildeross/sdk/contract`. Docs: https://docs.nouns.build/developers/overview/
- **Null guards:** `useDao()` returns `null` until data loads. Any component consuming `dao` must handle the null case before accessing `dao.contracts`.

## Environment variables

```
NEXT_PUBLIC_ALCHEMY_API_KEY       # Alchemy RPC key (required)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID  # WalletConnect project ID (required)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID   # Google Analytics (optional)
```

## Commands

```bash
npm install              # Install dependencies (may need --legacy-peer-deps)
npm run dev              # Dev server (Turbopack)
npm run build            # Static export build
npm run build:webpack    # Build with webpack instead of Turbopack
npm start                # Serve production build
npm run lint             # ESLint with auto-fix
```
