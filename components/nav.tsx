'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import { useIsMounted } from 'usehooks-ts';
import { useAccount, useBalance } from 'wagmi';

import { DAO_CONFIG } from '@/lib/config';

export const Nav = () => {
  const isMounted = useIsMounted();
  const { isConnected } = useAccount();

  const { data: treasuryBalance } = useBalance({
    address: DAO_CONFIG.treasury as `0x${string}`,
    chainId: 8453,
  });

  return (
    <div className="invisible md:visible w-0 md:w-1/6 h-auto mt-5">
      <nav>
        <ul className="flex flex-col gap-2 p-3 md:gap-5 md:p-5">
          <li className="block mb-2 md:mb-3">
            <Link href="/" className="block text-xl font-bold pb-2">
              {DAO_CONFIG.title}
            </Link>
            <div className="flex flex-col">
              <p className="font-bold leading-none	">
                Ξ{' '}
                {isMounted() && treasuryBalance ? (
                  Math.floor(+treasuryBalance?.formatted)
                ) : (
                  <Skeleton />
                )}
              </p>
              <p className="text-sm text-gray-700 opacity-60 leading-none whitespace-nowrap">
                treasury balance
              </p>
            </div>
          </li>
          <li className="block">
            <Link href="/about">About</Link>
          </li>
          <li className="block">
            <Link href="/proposals">Proposals</Link>
          </li>
          {isMounted() && isConnected && (
            <li className="block">
              <a
                href={`https://nouns.build/dao/base/${DAO_CONFIG.token}/proposal/create`}
                target="_blank"
              >
                Create Proposal
              </a>
            </li>
          )}
          <li className="block">
            <a href={`https://nouns.build/dao/base/${DAO_CONFIG.token}`} target="_blank">
              DAO
            </a>
          </li>
          {/* Social Media Icons(to add back in) */}
          {/* {daoConfig.discordLink && (
                  <li className="flex items-center">
                    <a href={daoConfig.discordLink} rel="noopener">
                      <FaDiscord />
                    </a>
                  </li>
                )}
                {daoConfig.twitterLink && (
                  <li className="flex items-center">
                    <a href={daoConfig.twitterLink} rel="noopener">
                      <FaTwitter />
                    </a>
                  </li>
                )}
                {daoConfig.farcasterLink && (
                  <li className="flex items-center">
                    <a href={daoConfig.farcasterLink} rel="noopener">
                      <img
                        src="/img/logo-farcaster.svg"
                        alt="Farcaster logo"
                        className="w-4"
                      />
                    </a>
                  </li>
                )} */}
          {/* TODO; Add these icons back in, as well as GH link */}
          <div className="max-w-[5vw]">
            <ConnectButton
              showBalance={{
                smallScreen: false,
                largeScreen: false,
              }}
              chainStatus="none"
              accountStatus="avatar"
              label="Connect"
            />
          </div>
        </ul>
      </nav>
    </div>
  );
};
