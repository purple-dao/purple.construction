'use client';

import { useDaoAuction } from '@buildeross/hooks/useDaoAuction';
import { auctionAbi } from '@buildeross/sdk/contract';
import { useQueryClient } from '@tanstack/react-query';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { formatEther, parseEther } from 'viem';
import { useReadContracts, useWatchContractEvent } from 'wagmi';

import { PURPLE_DAO } from '@/lib/purple-dao';

import type { AuctionData, DaoInfo } from '../types';

const defaultData = {
  minBid: parseEther('0.05'),
  minPctIncrease: 10n,
};

export const useAuction = (dao: DaoInfo | undefined) => {
  const queryClient = useQueryClient();
  const [userBid, setUserBid] = useState<string>('');
  const [isValidUserBid, setIsValidUserBid] = useState<boolean>(false);

  const handleUserBidChange = (event: FormEvent<HTMLInputElement>) => {
    setUserBid(event.currentTarget.value);
  };

  const daoAuction = useDaoAuction({
    collectionAddress: PURPLE_DAO.tokenAddress,
    auctionAddress: PURPLE_DAO.auctionAddress,
    chainId: PURPLE_DAO.chainId,
  });

  const { data: contractData } = useReadContracts({
    contracts: [
      {
        address: PURPLE_DAO.auctionAddress,
        chainId: PURPLE_DAO.chainId,
        abi: auctionAbi,
        functionName: 'minBidIncrement',
      },
      {
        address: PURPLE_DAO.auctionAddress,
        chainId: PURPLE_DAO.chainId,
        abi: auctionAbi,
        functionName: 'reservePrice',
      },
    ],
  });
  const [minPctIncrease, reservePrice] = [contractData?.[0]?.result, contractData?.[1]?.result] as [
    bigint | undefined,
    bigint | undefined,
  ];

  const auctionData: AuctionData | undefined = useMemo(() => {
    if (daoAuction.isLoading || daoAuction.tokenId === undefined) return undefined;
    const tokenIdNum = Number(daoAuction.tokenId);
    const endMs = daoAuction.endTime ? Number(daoAuction.endTime) * 1000 : 0;
    const startMs = daoAuction.startTime ? Number(daoAuction.startTime) * 1000 : 0;

    return {
      auctionId: tokenIdNum,
      chain: dao?.chain ?? 'BASE',
      startTime: startMs,
      endTime: endMs,
      highestBid: daoAuction.highestBid ?? null,
      highestBidder: daoAuction.highestBidder ?? null,
      minBid: null,
      minPctIncrease: minPctIncrease ? String(minPctIncrease) : undefined,
    };
  }, [dao?.chain, daoAuction, minPctIncrease]);

  const minBid = useMemo(() => {
    if (!auctionData?.auctionId || minPctIncrease === undefined) return defaultData.minBid;
    const localMinPctIncrease = minPctIncrease || defaultData.minPctIncrease;
    const { highestBid } = auctionData;

    if (!highestBid || Number(highestBid) < 0) {
      return reservePrice !== undefined ? formatEther(reservePrice) : formatEther(defaultData.minBid);
    }

    const bid = parseEther(highestBid);
    if (bid < 0n || !localMinPctIncrease) return defaultData.minBid;
    const min = bid + bid / localMinPctIncrease;
    return formatEther(min);
  }, [auctionData?.auctionId, auctionData?.highestBid, minPctIncrease, reservePrice]);

  useEffect(() => {
    if (!auctionData?.endTime || Date.now() >= auctionData.endTime) setIsValidUserBid(false);
    else if (!userBid || Number(userBid) < 0 || !Number.isInteger(auctionData.auctionId))
      setIsValidUserBid(false);
    else {
      const bid = parseEther(userBid);
      const min = parseEther(minBid?.toString() || '0');
      setIsValidUserBid(bid >= min);
    }
    return () => setIsValidUserBid(false);
  }, [auctionData?.endTime, auctionData?.auctionId, minBid, userBid]);

  const invalidateAuctionReads = () => {
    void queryClient.invalidateQueries({ queryKey: ['readContract'] });
  };

  useWatchContractEvent({
    address: PURPLE_DAO.auctionAddress,
    chainId: PURPLE_DAO.chainId,
    abi: auctionAbi,
    eventName: 'AuctionBid',
    onLogs: invalidateAuctionReads,
  });

  useWatchContractEvent({
    address: PURPLE_DAO.auctionAddress,
    chainId: PURPLE_DAO.chainId,
    abi: auctionAbi,
    eventName: 'AuctionCreated',
    onLogs: invalidateAuctionReads,
  });

  useWatchContractEvent({
    address: PURPLE_DAO.auctionAddress,
    chainId: PURPLE_DAO.chainId,
    abi: auctionAbi,
    eventName: 'AuctionSettled',
    onLogs: invalidateAuctionReads,
  });

  return {
    auctionData: auctionData && {
      ...auctionData,
      minBid,
      minPctIncrease,
    },
    formData: {
      attributes: {},
      input: {
        value: userBid,
        min: minBid,
        step: 'any',
        type: 'number',
        placeholder: `${minBid} or more`,
        onChange: handleUserBidChange,
      },
      btn: {
        disabled: !isValidUserBid,
      },
      addMinBid: () => setUserBid(minBid?.toString() || ''),
    },
  };
};
