'use client';

/* eslint-disable @typescript-eslint/no-unused-expressions */
import { isEmpty, keys } from 'lodash';
import React, { useEffect, useState } from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import { zeroAddress } from 'viem';

import { useAuction, useDao, useToken } from '@/lib/builder';
import type { ComponentConfig } from '@/lib/builder/types';

import { BidForm } from './bid-form';
import { Account } from './shared/account';
import { ComponentWrapper } from './shared/component-wrapper';
import { TokenImage } from './shared/token-image';

export const AuctionHero = ({ opts = {} }: ComponentConfig) => {
  const theme = opts?.theme;
  const dao = useDao();
  const { auctionData, formData } = useAuction(dao || undefined);
  const [latestTokenId, setLatestTokenId] = useState<number>();
  const [tokenId, setTokenId] = useState<number>();
  const [showCountdown, toggleCountdown] = useState<boolean>(true);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const token = useToken(tokenId, dao || undefined);

  useEffect(() => {
    auctionData && !isEmpty(keys(auctionData)) && setIsDataLoaded(true);

    const currentAuctionToken = auctionData?.auctionId;
    if (currentAuctionToken !== undefined) {
      if (!Number.isInteger(tokenId)) setTokenId(currentAuctionToken);
      if (!Number.isInteger(latestTokenId) || tokenId === latestTokenId) {
        setTokenId(currentAuctionToken);
        setLatestTokenId(currentAuctionToken);
      } else setLatestTokenId(currentAuctionToken);
    }
  }, [auctionData]);

  const date = auctionData?.endTime && new Date(auctionData.endTime).toLocaleDateString('en-US');
  const time = auctionData?.endTime && new Date(auctionData.endTime).toLocaleTimeString('en-US');

  const countdownRenderer = (props: CountdownRenderProps) => {
    if (props.completed) {
      // Render a completed state
      return <p>Auction has ended</p>;
    } else {
      // Render a countdown
      return (
        <span>
          {props.hours}h {props.minutes}m {props.seconds}s
        </span>
      );
    }
  };
  return (
    <ComponentWrapper isDataLoaded={isDataLoaded}>
      {isDataLoaded && !auctionData?.auctionId && (
        <div id="auction">
          <div className="mx-auto flex justify-center">
            <div className="flex h-full w-full flex-col items-center text-center md:flex-row md:gap-10">
              <p className="w-full p-4 md:p-10">No auction found</p>
            </div>
          </div>
        </div>
      )}
      {isDataLoaded && auctionData?.auctionId ? (
        <div id="auction">
          <div className="mx-auto flex justify-center">
            <div className="flex w-full flex-col items-center md:flex-row md:gap-10">
              <div className="aspect-square md:w-3/5">
                {token?.imageUrl && <TokenImage imageUrl={token.imageUrl} />}
              </div>
              <div className="mt-10 mb-5 w-full sm:w-3/4 md:w-2/5">
                <div className="mb-3 flex w-full flex-row items-center gap-2 md:mb-6">
                  <button
                    className="text-md aspect-square rounded-full bg-gray-400 py-1 px-2 text-base font-bold leading-none opacity-70 hover:opacity-100 disabled:opacity-25"
                    disabled={!tokenId || tokenId <= 0}
                    onClick={() => {
                      tokenId !== undefined && tokenId >= 0 && setTokenId(tokenId - 1);
                    }}
                  >
                    ←
                  </button>
                  <button
                    className="text-md aspect-square rounded-full bg-slate-400 py-1 px-2 text-base font-bold leading-none opacity-70 hover:opacity-100 disabled:opacity-25"
                    disabled={tokenId === auctionData?.auctionId}
                    onClick={() => {
                      !!tokenId &&
                        !!auctionData?.auctionId &&
                        tokenId < auctionData?.auctionId &&
                        setTokenId(tokenId + 1);
                    }}
                  >
                    →
                  </button>
                </div>
                <h1 className="text-4xl font-bold md:text-5xl">
                  {token?.name ? token?.name : <></>}
                </h1>
                {auctionData?.auctionId === tokenId ? (
                  <>
                    <div className="flex gap-5">
                      <div className="my-5">
                        <p className="text-md text-text-base opacity-40">highest bid</p>
                        <p className="text-3xl font-bold text-text-base">
                          Ξ {auctionData?.highestBid}
                        </p>
                      </div>
                      <div className="my-5">
                        <p className="text-md text-text-base opacity-40">auction ends</p>
                        <button
                          className="text-left font-bold text-text-base"
                          onClick={() => {
                            toggleCountdown(!showCountdown);
                          }}
                        >
                          {showCountdown ? (
                            auctionData?.endTime && (
                              <span className="text-3xl">
                                <Countdown
                                  renderer={countdownRenderer}
                                  daysInHours={true}
                                  date={auctionData.endTime}
                                />
                              </span>
                            )
                          ) : (
                            <>
                              <span className="text-left text-lg">
                                {date} {time}
                              </span>
                              <span className="text-left text-lg"></span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {auctionData?.highestBidder && (
                      <div className="my-5">
                        <p className="text-md text-text-base opacity-40">owned by</p>
                        <p className="w-full max-w-[300px] truncate text-3xl font-bold text-text-base">
                          <Account address={token.owner} chainId={dao?.chainId} />
                        </p>
                      </div>
                    )}
                  </>
                )}
                {tokenId && tokenId === auctionData?.auctionId && (
                  <>
                    <BidForm
                      auctionData={auctionData}
                      formData={formData}
                      dao={dao}
                      theme={theme}
                    />
                    {auctionData?.highestBidder && auctionData?.highestBidder !== zeroAddress && (
                      <div className="my-5">
                        <p className="text-1xl flex w-full max-w-[300px] flex-row justify-between gap-3 truncate font-bold text-text-base">
                          <Account address={auctionData?.highestBidder} chainId={dao?.chainId} />
                          <span className="text-md text-text-base opacity-40">
                            Ξ {auctionData.highestBid}
                          </span>
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </ComponentWrapper>
  );
};
