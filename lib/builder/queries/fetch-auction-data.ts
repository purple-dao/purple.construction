import { gql } from 'graphql-request';
import { first, get, last } from 'lodash';

import type { AuctionData, DaoConfig } from '../types';
import { fetchDataWithQuery, logWarning } from '../utils';

type FetchAuctionOpts = {
  collection: string;
  chain: DaoConfig['chain'];
};

export const fetchAuctionData = async ({
  collection,
  chain,
}: FetchAuctionOpts): Promise<AuctionData | null> => {
  const response = await fetchDataWithQuery(query, { collection, chain });
  if (!response) {
    logWarning('no_data_from_api', collection, chain);
    return null;
  }

  const data = formatQueryData(response, chain);
  if (!data) return null;

  return data;
};

const formatQueryData = (data: any, chain: DaoConfig['chain']): AuctionData | null => {
  const { data: result, errors } = data;
  const auctionData = first(get(result, 'auctions', []));

  if (errors) {
    // console.log(errors);
    logWarning('query_error', '', chain);
    return null;
  }
  const tokenId = last(get(auctionData, 'id', '')?.split(':'));
  const startTime = get(auctionData, 'startTime', null);
  const endTime = get(auctionData, 'endTime', null);

  const auction: AuctionData = {
    auctionId: Number(tokenId),
    startTime: startTime ? Number(startTime) * 1000 : 0,
    endTime: endTime ? Number(endTime) * 1000 : 0,
    highestBid: get(auctionData, 'highestBid.amount', null),
    highestBidder: get(auctionData, 'highestBid.bidder', null),
    minPctIncrease: String(1),
    minBid: get(auctionData, 'reservePrice', null),
    chain,
  };

  return auction;
};

const query = gql`
  query GetCurrentAuction($collection: String!) {
    auctions(where: { dao: $collection }, orderBy: startTime, orderDirection: desc) {
      id
      winningBid {
        id
      }
      startTime
      endTime
      highestBid {
        amount
        bidder
      }
      bids(orderBy: bidTime, orderDirection: desc) {
        id
        bidTime
        amount
        bidder
      }
    }
  }
`;
