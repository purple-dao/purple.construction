'use client';

import { useQuery } from '@tanstack/react-query';
import { useContext, useMemo } from 'react';
import { useReadContract } from 'wagmi';

import { TokenABI } from '../abis';
import { DaoContext } from '../builder-context';
import { fetchDaoData } from '../queries';
import type { DaoInfo } from '../types';

type DaoURI = {
  name: string;
  description: string;
  imageUrl: string;
  website: string;
};

const ipfsGateway = 'https://gateway.pinata.cloud/ipfs/';

export const useDao = (): DaoInfo | null => {
  const ctx = useContext(DaoContext);
  const { collection, chain } = ctx;

  const { data: contractData } = useReadContract({
    address: collection as `0x${string}`,
    chainId: 8453,
    abi: TokenABI,
    functionName: 'contractURI',
  });

  const contractUri = useMemo(() => {
    if (!contractData) return null;
    const uri = JSON.parse(window.atob(contractData.split(',')[1]));
    if (uri?.image) uri.image = uri.image.replace('ipfs://', ipfsGateway);

    const daoUri: DaoURI = {
      name: uri?.name ?? '',
      description: uri?.description ?? '',
      imageUrl: uri?.image ?? '',
      website: uri?.external_url ?? '',
    };

    return daoUri;
  }, [contractData]);

  const { data: apiData } = useQuery({
    queryKey: ['dao', { collection, chain }],
    queryFn: () => fetchDaoData({ collection, chain }),
  });

  return contractUri && apiData ? ({ ...contractUri, ...apiData } as DaoInfo) : null;
};
