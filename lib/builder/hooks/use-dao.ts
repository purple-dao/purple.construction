'use client';

import { daoOGMetadataRequest } from '@buildeross/sdk/subgraph';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

import { PURPLE_DAO } from '@/lib/purple-dao';

import { DaoContext } from '../builder-context';
import type { DaoInfo } from '../types';

export const useDao = (): DaoInfo | null => {
  const ctx = useContext(DaoContext);
  const { collection, chain } = ctx;

  const { data } = useQuery({
    queryKey: ['dao-og-metadata', collection, chain],
    queryFn: async () => {
      if (!collection || chain !== 'BASE') return null;
      return daoOGMetadataRequest(PURPLE_DAO.chainId, collection as `0x${string}`);
    },
    enabled: !!collection && chain === 'BASE',
  });

  if (!data) return null;

  return {
    name: data.name,
    symbol: 'PURPLE',
    description: data.description,
    imageUrl: data.contractImage,
    external_url: undefined,
    owners: data.ownerCount,
    totalSupply: data.totalSupply,
    chain,
    chainId: 8453,
    contracts: {
      auction: data.auctionAddress,
      collection: data.tokenAddress,
      governor: data.governorAddress,
      metadata: data.metadataAddress,
      treasury: data.treasuryAddress,
    },
  };
};
