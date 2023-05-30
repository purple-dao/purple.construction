/* eslint-disable @next/next/no-img-element */
import { useContractReads, useEnsName } from 'wagmi';
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { tokenContract } from '../config';
import { BigNumber } from 'ethers';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useIsMounted } from 'usehooks-ts';
type NftProps = {
  tokenId: number;
};

const Nft = (props: NftProps) => {
  const isMounted = useIsMounted();
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: tokenContract.address,
        abi: tokenContract.abi,
        functionName: 'tokenURI',
        args: [BigNumber.from(props.tokenId)],
      },
      {
        address: tokenContract.address,
        abi: tokenContract.abi,
        functionName: 'ownerOf',
        args: [BigNumber.from(props.tokenId)],
      },
    ],
  })

  const [tokenURI, ownerOf] = data || [];
  const [currentTokenData, setCurrentTokenData] = useState<{ image: string, name: string }>();

  useEffect(() => {
    if (tokenURI) {
      const clean: string = tokenURI?.substring(29);
      const json = Buffer.from(clean, "base64").toString();
      const result = JSON.parse(json);
      setCurrentTokenData(result);
    }
  }, [tokenURI])

  const ensName = useEnsName({
    address: ownerOf,
  }).data


  return (
    <div>
      <a
        href={`https://nouns.build/dao/0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60/${props.tokenId}`}
        rel="noopener"
        className='no-underline'
      >
        {isMounted() && currentTokenData ? (
          <img src={currentTokenData.image} alt="" className="rounded-md" />
        ) : (
          <Skeleton containerClassName="w-full h-full aspect-square" className='w-full h-full' />
        )}

        <p className="text-md text-gray-700 font-bold">Purple #{props.tokenId}</p>
        <p className="text-md text-gray-700 opacity-70 truncate font-medium">
          {isMounted() && ensName || ownerOf ? ensName || ownerOf : <Skeleton width={100} />}
        </p>
      </a>
    </div>
  );
};

export default Nft;
