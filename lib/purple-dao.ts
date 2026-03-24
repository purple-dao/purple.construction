import { CHAIN_ID } from '@buildeross/types';

import { DAO_CONFIG } from './config';

/** Single-DAO (Purple) Nouns Builder configuration for Base mainnet. */
export const PURPLE_DAO = {
  chainId: CHAIN_ID.BASE,
  tokenAddress: DAO_CONFIG.token as `0x${string}`,
  auctionAddress: DAO_CONFIG.auction as `0x${string}`,
  treasuryAddress: DAO_CONFIG.treasury as `0x${string}`,
  v1Token: DAO_CONFIG.v1Token as `0x${string}`,
} as const;
