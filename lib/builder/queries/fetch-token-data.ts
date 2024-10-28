import { gql } from 'graphql-request';
import { get } from 'lodash';

import type { DaoConfig, TokenData } from '../types';
import { fetchDataWithQuery, logWarning } from '../utils';

type FetchTokenOpts = {
  tokenId: number;
  collection: string;
  chain: DaoConfig['chain'];
};

export const fetchTokenData = async ({
  tokenId,
  collection,
  chain,
}: FetchTokenOpts): Promise<TokenData | null> => {
  const response = await fetchDataWithQuery(query, {
    tokenId: String(tokenId),
    collection,
  });
  if (!response) {
    logWarning('no_data_from_api', collection, chain);
    return null;
  }

  const data = formatQueryData(response, chain);
  if (!data?.name) {
    logWarning('incomplete_data_from_api', collection, chain);
    return null;
  }

  return data;
};

const formatQueryData = (data: any, chain: DaoConfig['chain']): TokenData | null => {
  const { data: result, errors } = data;
  const tokenData = get(result, 'tokens[0]');
  // const mintData = result?.token?.events[0]?.transactionInfo;
  // const marketData = result?.nouns?.nounsMarkets?.nodes[0];

  if (errors) {
    logWarning('query_error', '', chain);
    return null;
  }

  return {
    id: Number(tokenData?.tokenId),
    owner: tokenData?.owner,
    name: tokenData?.name,
    description: tokenData?.description,
    imageUrl: tokenData?.image,
    chain,
    attributes: [], // tokenData?.attributes?.map((attribute: Record<string, any>) => {
    //   return {
    //     label: attribute?.traitType,
    //     value: attribute?.value,
    //   };
    // }),
    auctionInfo: {
      tokenId: 0, // Number(marketData?.tokenId),
      winner: '0x', // marketData?.winner,
      amount: '0', // String(marketData?.highestBidPrice?.nativePrice?.decimal),
      startTime: 0, // Number(marketData?.startTime) * 1000,
      endTime: 0, // Number(marketData?.endTime) * 1000,
    },
    mintInfo: {
      blockNumber: 0, // Number(mintData?.blockNumber),
      blockTimestamp: 0, // Date.parse(mintData?.blockTimestamp),
      transactionHash: '0x', // mintData?.transactionHash,
    },
  };
};

const query = gql`
  query GetToken($tokenId: String!, $collection: String!) {
    tokens(where: { dao: $collection, tokenId: $tokenId }) {
      tokenId
      owner
      name
      image
    }
  }
`;
