'use client';

import { tokenAbi } from '@buildeross/sdk/contract';
import { useMemo } from 'react';
import { useReadContracts } from 'wagmi';

import { PURPLE_DAO } from '@/lib/purple-dao';

import type { DaoInfo, TokenData } from '../types';

const ipfsGateway = 'https://gateway.pinata.cloud/ipfs/';

function decodeTokenUri(uri: string | undefined): Omit<TokenData, 'owner' | 'chain'> | null {
  if (!uri || !uri.startsWith('data:application/json;base64,')) return null;
  const json = JSON.parse(window.atob(uri.split(',')[1] ?? ''));
  const image = json?.image?.replace?.('ipfs://', ipfsGateway) ?? json?.image;
  return {
    id: 0,
    name: json?.name ?? '',
    description: json?.description ?? '',
    imageUrl: image ?? '',
    attributes: (json?.properties as Record<string, unknown>) ?? {},
  };
}

export const useToken = (id: number | undefined, dao: DaoInfo | undefined): TokenData => {
  const chain = dao?.chain ?? 'BASE';

  const { data } = useReadContracts({
    contracts: [
      {
        address: PURPLE_DAO.tokenAddress,
        chainId: PURPLE_DAO.chainId,
        abi: tokenAbi,
        functionName: 'tokenURI',
        args: [BigInt(id ?? 0)],
      },
      {
        address: PURPLE_DAO.tokenAddress,
        chainId: PURPLE_DAO.chainId,
        abi: tokenAbi,
        functionName: 'ownerOf',
        args: [BigInt(id ?? 0)],
      },
    ],
    query: {
      enabled: typeof id === 'number' && id >= 0,
    },
  });

  return useMemo(() => {
    const tokenUri = data?.[0]?.result as string | undefined;
    const owner = (data?.[1]?.result as `0x${string}` | undefined) ?? '';

    const decoded = decodeTokenUri(tokenUri);
    if (!decoded || id === undefined) {
      return {} as TokenData;
    }

    return {
      ...decoded,
      id,
      owner,
      chain,
    };
  }, [data, id, chain]);
};
