'use client';

import { useQuery } from '@tanstack/react-query';
import { pick } from 'lodash';
import { useMemo } from 'react';
import { useReadContract } from 'wagmi';

// import { DAO_CONFIG } from '../../config';
import { TokenABI } from '../abis';
import { fetchTokenData } from '../queries';
import type { DaoInfo, TokenData } from '../types';
// import { logWarning } from '../utils';

export const useToken = (id: number | undefined, dao: DaoInfo | undefined): TokenData => {
  const { chain } = pick(dao, ['chain']);
  const { contracts } = pick(dao, ['contracts']);
  const { collection } = pick(contracts, ['collection']);

  // const getDataFromContract = async (id: number): Promise<TokenData | null> => {
  //   const tokenData = await readContract({
  //     address: DAO_CONFIG.token as `0x${string}`,
  //     abi: TokenABI,
  //     functionName: 'tokenURI',
  //     args: [BigInt(id)],
  //   });

  //   const data = JSON.parse(window.atob(tokenData.split(',')[1]));
  //   const { name, description, image, properties } = data;

  //   return {
  //     id,
  //     owner: '',
  //     name,
  //     description,
  //     imageUrl: image,
  //     attributes: properties,
  //     chain: dao.chain,
  //   };
  // };

  const { data: tokenData } = useQuery({
    queryKey: ['token', id],
    queryFn: () => {
      if (!id || !collection || !chain) return null;
      return fetchTokenData({ tokenId: id, collection, chain });
    },
    enabled: !!id,
  });

  const { data: contractData } = useReadContract({
    address: collection as `0x${string}`,
    abi: TokenABI,
    functionName: 'tokenURI',
    args: [BigInt(id || 0)],
    // enabled: !!id && !tokenData && !isLoading,
  });

  const parsedContractData = useMemo(() => {
    if (!contractData || !id) return null;
    const data = JSON.parse(window.atob(contractData.split(',')[1]));
    const { name, description, image, properties } = data;

    return {
      id,
      owner: '',
      name,
      description,
      imageUrl: image,
      attributes: properties,
      chain: dao?.chain || "BASE",
    };
  }, [contractData, id]);

  // // fetch data from zora api
  // useEffect(() => {
  //   if (!id) return;
  //   const fetchData = async (id: number) => {
  //     const { chain } = dao;
  //     const { collection } = dao.contracts;
  //     const data = await fetchTokenData({ tokenId: id, collection, chain });
  //     if (data) setTokenData(data);
  //     else {
  //       const data = await getDataFromContract(id);
  //       if (data) setTokenData(data);
  //       else {
  //         logWarning('no_data', collection, chain);
  //       }
  //     }
  //   };

  //   if (id !== undefined && dao.contracts?.collection && dao.chain) fetchData(id);
  // }, [id, dao]);

  return parsedContractData || tokenData || ({} as TokenData);
};
