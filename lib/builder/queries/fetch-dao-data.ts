import { gql } from 'graphql-request';
import { pick } from 'lodash';

import type { DaoConfig, DaoInfo } from '../types';
import { fetchDataWithQuery, logWarning } from '../utils';

type FetchDaoOpts = {
  collection: string;
  chain: DaoConfig['chain'];
};

export const fetchDaoData = async ({ collection, chain }: FetchDaoOpts) => {
  const response = await fetchDataWithQuery(query, { collection, chain });
  if (!response) {
    logWarning('no_data_from_api', collection, chain);
    return null;
  }

  const data = formatQueryData(response, chain);
  if (!data) return null;

  return data;
};

const formatQueryData = (data: any, chain: DaoConfig['chain']): Partial<DaoInfo> | null => {
  const { data: result, errors } = data;
  const dao = result?.dao;
  const {
    name,
    symbol,
    auctionAddress,
    governorAddress,
    metadataAddress,
    tokenAddress,
    treasuryAddress,
    ownerCount,
    totalSupply,
  } = pick(dao, [
    'name',
    'symbol',
    'auctionAddress',
    'governorAddress',
    'metadataAddress',
    'tokenAddress',
    'treasuryAddress',
    'ownerCount',
    'totalSupply',
  ]);

  if (errors) {
    // console.log(errors);
    logWarning('query_error', '', chain);
    return null;
  }

  return {
    name,
    symbol,
    owners: ownerCount,
    totalSupply,
    contracts: {
      auction: auctionAddress,
      collection: tokenAddress,
      governor: governorAddress,
      metadata: metadataAddress,
      treasury: treasuryAddress,
    },
    chain,
    chainId: 8453, // chain === 'MAINNET' ? 1 : 5,
  };
};

const query = gql`
  query GetDAO($collection: String!) {
    dao(id: $collection) {
      name
      symbol
      totalSupply
      ownerCount
      auctionAddress
      governorAddress
      metadataAddress
      treasuryAddress
      tokenAddress
    }
  }
`;
