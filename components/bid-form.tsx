'use client';

import React, { useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { useWriteContract } from 'wagmi';

import { AuctionABI } from '@/lib/builder/abis';
// import { applyTheme } from '../themes/utils';

export const BidForm = ({
  auctionData,
  formData,
  dao,
}: {
  auctionData: any;
  formData: any;
  dao: any;
}) => {
  // const ref = useRef(null);
  const { writeContractAsync } = useWriteContract();

  const [isComplete, setIsComplete] = useState<boolean>(false);

  const settleAuction = async () => {
    await writeContractAsync({
      address: dao.contracts.auction as `0x${string}`,
      chainId: 8543, // dao.chainId,
      abi: AuctionABI,
      functionName: 'settleCurrentAndCreateNewAuction',
    });
  };

  const placeBid = async () => {
    writeContractAsync({
      address: dao.contracts.auction as `0x${string}`,
      chainId: 8543, // dao.chainId,
      abi: AuctionABI,
      functionName: 'createBid',
      args: [BigInt(String(auctionData.auctionId))],
      value: parseEther(formData.input.value || '0'),
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (isComplete) settleAuction();
    else placeBid();
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (Date.now() >= auctionData.endTime) {
      setIsComplete(true);
      return;
    }

    setIsComplete(false);

    // update once time expires
    // eslint-disable-next-line prefer-const
    timer = setTimeout(() => {
      setIsComplete(true);
    }, auctionData.endTime - Date.now());

    return () => clearTimeout(timer);
  }, [auctionData]);

  // useEffect(() => {
  //   if (ref.current != null) {
  //     const target = ref.current as HTMLElement;
  //     applyTheme(target, theme);
  //   }
  // }, [theme, ref]);

  return (
    <form
      onSubmit={handleSubmit}
      className={'mt-4 flex w-full flex-col gap-5 font-bold sm:flex-row md:mt-8'}
      // ref={ref}
    >
      {isComplete ? (
        <button
          type="submit"
          className="mb-2 mr-2 w-full flex-shrink-0 rounded-lg border-2 border-text-base px-5 py-2.5 text-xl disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40"
        >
          Settle auction
        </button>
      ) : (
        <>
          <div className="relative mb-2 w-full flex-grow">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-lg text-gray-400">
              Ξ
            </span>
            <input
              {...formData.input}
              className="focus:shadow-outline w-full appearance-none rounded-lg border px-4 py-4 pl-7 text-xl leading-tight text-gray-700 shadow"
            />
          </div>

          <button
            type="submit"
            {...formData.btn}
            className="mb-2 mr-2 flex-shrink-0 rounded-lg border-2 border-text-base px-5 py-2.5 text-xl disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40"
          >
            Place bid
          </button>
        </>
      )}
    </form>
  );
};
