'use client';

import { useQuery } from '@tanstack/react-query';
import { map, pick } from 'lodash';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { formatEther, parseEther } from 'viem';
import { useReadContracts, useWatchContractEvent } from 'wagmi';

import { AuctionABI } from '../abis';
import { fetchAuctionData } from '../queries';
import type { AuctionData, DaoInfo } from '../types';

const defaultData = {
  auction: {} as AuctionData,
  minBid: parseEther('0.05'),
  minPctIncrease: 10n,
};

export const useAuction = (dao: DaoInfo | undefined) => {
  const [userBid, setUserBid] = useState<string>('');
  const [isValidUserBid, setIsValidUserBid] = useState<boolean>(false);

  const handleUserBidChange = (event: FormEvent<HTMLInputElement>) => {
    setUserBid(event.currentTarget.value);
  };
  const { chain } = pick(dao, ['chain']);
  const { contracts } = pick(dao, ['contracts']);
  const { auction, collection } = pick(contracts, ['auction', 'collection']);

  const { data: auctionData } = useQuery({
    queryKey: ['auction', collection, chain],
    queryFn: () => {
      if (!collection || !chain) return;
      return fetchAuctionData({ collection, chain });
    },
    enabled: !!collection && !!chain,
  });

  const { data: contractData } = useReadContracts({
    contracts: [{
      address: auction as `0x${string}`,
      chainId: 8453,
      abi: AuctionABI,
      functionName: 'minBidIncrement',
    },
    {
      address: auction as `0x${string}`,
      chainId: 8453,
      abi: AuctionABI,
      functionName: 'reservePrice',
    },
    ],
  });
  const [minPctIncrease, reservePrice] = map(contractData, 'result');


  // calculate minimum bid
  const minBid = useMemo(() => {
    if (!auctionData?.auctionId || !minPctIncrease) return defaultData.minBid;
    const localMinPctIncrease = minPctIncrease || defaultData.minPctIncrease;
    const { highestBid } = auctionData;

    if (!highestBid || Number(highestBid) < 0) return reservePrice || 0n;

    const bid = parseEther(highestBid);
    if (bid < 0n || !localMinPctIncrease) return defaultData.minBid;
    const min = bid + bid / localMinPctIncrease;
    return formatEther(min);

  }, [auctionData?.auctionId, auctionData?.highestBid, minPctIncrease]);

  // confirm if user bid is valid
  useEffect(() => {
    if (!auctionData?.endTime || Date.now() >= auctionData?.endTime) setIsValidUserBid(false);
    else if (!userBid || Number(userBid) < 0 || !Number.isInteger(auctionData.auctionId))
      setIsValidUserBid(false);
    else {
      const bid = parseEther(userBid);
      const min = parseEther(minBid?.toString() || '0');
      const isValid = bid >= min;
      setIsValidUserBid(isValid);
    }
    return () => setIsValidUserBid(false);
  }, [auctionData?.endTime, minBid, userBid]);

  // listen for new bids
  useWatchContractEvent({
    address: auction as `0x${string}`,
    chainId: 8453,
    abi: AuctionABI,
    eventName: 'AuctionBid',
    onLogs() {

      // TODO invalidate queries
    },
  });

  // listen for new auction
  useWatchContractEvent({
    address: auction as `0x${string}`,
    chainId: 8453,
    abi: AuctionABI,
    eventName: 'AuctionCreated',
    onLogs() {

      // TODO invalidate queries
    },
  });

  return {
    auctionData: {
      auctionId: auctionData?.auctionId,
      chain: dao?.chain || 'BASE',
      startTime: auctionData?.startTime,
      endTime: auctionData?.endTime,
      highestBid: auctionData?.highestBid || '0',
      highestBidder: auctionData?.highestBidder,
      minBid,
      minPctIncrease,
    },
    formData: {
      attributes: {},
      input: {
        value: userBid || 0n,
        min: minBid,
        step: 'any',
        type: 'number',
        placeholder: `${formatEther(BigInt(minBid || 0n))} or more`,
        onChange: handleUserBidChange,
      },
      btn: {
        disabled: !isValidUserBid,
      },
      addMinBid: () => setUserBid(minBid?.toString() || ''),
    },
  };
};
