/* eslint-disable @next/next/no-img-element */
import { useContractRead, useContractReads, useEnsName } from "wagmi";
import { BigNumber, utils } from "ethers";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useIsMounted } from "usehooks-ts";
import { auctionContract, tokenContract, treasuryContract } from "../config";
import { useEffect, useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { useKeyPress } from "../hooks/useKeyPress";

type AuctionContentProps = {
  tokenId: number;
  auction: {
    tokenId: BigNumber;
    highestBid: BigNumber;
    highestBidder: `0x${string}`;
    startTime: number;
    endTime: number;
    settled: boolean;
  };
  setTokenId: Function;
};

const AuctionContent = (props: AuctionContentProps) => {
  const isMounted = useIsMounted();
  const [currentTokenData, setCurrentTokenData] = useState<{
    image: string;
    name: string;
  }>();
  const [currentTokenOwner, setCurrentTokenOwner] = useState<
    `0x${string}` | undefined
  >();
  const [isCountdownDisplayed, setIsCountdownDisplayed] = useState(true);
  const [isAuction, setIsAuction] = useState(true);
  const keyboardPrev: boolean = useKeyPress("ArrowLeft");
  const keyboardNext: boolean = useKeyPress("ArrowRight");

  useEffect(() => {
    if (keyboardPrev && props.tokenId && props.tokenId >= 0) {
      props.setTokenId(props.tokenId - 1);
    }
    if (
      keyboardNext &&
      props.tokenId &&
      props.tokenId < props.auction?.tokenId.toNumber()
    ) {
      props.setTokenId(props.tokenId + 1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyboardPrev, keyboardNext]);

  const tokenURI = useContractRead({
    address: tokenContract.address,
    abi: tokenContract.abi,
    functionName: "tokenURI",
    args: [BigNumber.from(props.tokenId)],
    onError(error) {
      console.log("Error", error);
    },
  }).data;

  const ownerOf = useContractRead({
    address: tokenContract.address,
    abi: tokenContract.abi,
    functionName: "ownerOf",
    args: [BigNumber.from(props.tokenId)],
    onError(error) {
      console.log("Error", error);
    },
  }).data;

  useEffect(() => {
    if (tokenURI) {
      const clean: string = tokenURI?.substring(29);
      const json = Buffer.from(clean, "base64").toString();
      const result = JSON.parse(json);
      setCurrentTokenData(result);
      setCurrentTokenOwner(ownerOf);
    }
  }, [tokenURI, ownerOf]);

  const ensName = useEnsName({
    address: currentTokenOwner,
  }).data;

  const date =
    isMounted() &&
    props.auction &&
    new Date(props.auction.endTime * 1000).toLocaleDateString("en-US");
  const time =
    isMounted() &&
    props.auction &&
    new Date(props.auction.endTime * 1000).toLocaleTimeString("en-US");

  const countdownRenderer = (props: CountdownRenderProps) => {
    if (props.completed) {
      // Render a completed state
      return <p>Auction has ended</p>;
    } else {
      // Render a countdown
      return (
        <span>
          {props.hours}h: {props.minutes}m: {props.seconds}s
        </span>
      );
    }
  };

  useEffect(() => {
    if (props.tokenId === props.auction.tokenId.toNumber()) {
      setIsAuction(true);
    } else {
      setIsAuction(false);
    }
  }, [props.tokenId, props.auction]);

  return (
    <div className="w-full md:max-w-[75vw] flex flex-col md:flex-row md:gap-10 items-center">
      <div className="md:w-3/5 aspect-square">
        {isMounted() && currentTokenData?.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={currentTokenData.image}
            className="rounded-lg w-full"
            alt=""
          />
        ) : (
          <Skeleton
            containerClassName="w-full h-full aspect-square"
            className="w-full h-full"
          />
        )}
      </div>
      <div className="my-10 w-full sm:w-3/4 md:w-2/5">
        <div className="flex flex-row items-center w-full gap-2 mb-3 md:mb-6">
          <button
            className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded-full text-sm aspect-square disabled:bg-gray-100 leading-none"
            disabled={props.tokenId <= 0}
            onClick={() => {
              props.tokenId !== undefined &&
                props.tokenId >= 0 &&
                props.setTokenId(props.tokenId - 1);
            }}
          >
            ←
          </button>
          <button
            className="bg-slate-400 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded-full text-sm aspect-square disabled:bg-gray-100 leading-none"
            disabled={props.tokenId === props.auction?.tokenId.toNumber()}
            onClick={() => {
              props.tokenId !== undefined &&
                props.tokenId < props.auction?.tokenId.toNumber() &&
                props.setTokenId(props.tokenId + 1);
            }}
          >
            →
          </button>
        </div>
        <h1 className="text-4xl md:text-5xl bold text-gray-800">
          {isMounted() && currentTokenData?.name ? (
            currentTokenData?.name
          ) : (
            <Skeleton width={200} />
          )}
        </h1>
        {isAuction ? (
          <>
            <div className="my-5">
              <p className="text-md text-gray-700 opacity-70">highest bid</p>
              <p className="text-3xl font-bold text-gray-800">
                Ξ{" "}
                {isMounted() && props.auction?.highestBid ? (
                  props.auction?.highestBid &&
                  utils.formatEther(props.auction?.highestBid)
                ) : (
                  <Skeleton />
                )}
              </p>
              <p className="text-md text-gray-700 opacity-70 truncate w-full">
                from{" "}
                {(isMounted() && ensName) || props.auction?.highestBidder ? (
                  ensName || props.auction?.highestBidder
                ) : (
                  <Skeleton width={100} />
                )}
              </p>
            </div>
            <div className="my-5">
              <p className="text-md text-gray-700 opacity-70">auction ends</p>
              <button
                className="text-3xl font-bold text-gray-800"
                onClick={() => {
                  setIsCountdownDisplayed(!isCountdownDisplayed);
                }}
              >
                {isMounted() && isCountdownDisplayed ? (
                  props.auction?.endTime ? (
                    <Countdown
                      renderer={countdownRenderer}
                      daysInHours={true}
                      date={props.auction?.endTime * 1000}
                    />
                  ) : (
                    <Skeleton width={100} />
                  )
                ) : (
                  <>
                    <p>{date}</p>
                    <p>{time}</p>
                  </>
                )}
              </button>
            </div>
            <a
              href="https://nouns.build/dao/0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60"
              className="button bg-purple-500 text-white my-15 py-2 px-6 rounded my-2 h-fit text-xl font-normal md:text-xl my-5"
            >
              Join the auction
            </a>
          </>
        ) : (
          <>
            <div className="my-5">
              <p className="text-md text-gray-700 opacity-70">owned by</p>
              <p className="text-3xl font-bold text-gray-800 truncate w-full max-w-[300px]">
                {(isMounted() && ensName) || currentTokenOwner ? (
                  ensName || currentTokenOwner
                ) : (
                  <Skeleton width={100} />
                )}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuctionContent;
