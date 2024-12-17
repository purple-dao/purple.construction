'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import { useIsMounted } from 'usehooks-ts';
import { useAccount, useBalance } from 'wagmi';

import { DAO_CONFIG } from '@/lib/config';

const MobileMenu: NextPage = () => {
  const [expanded, setExpanded] = useState(false);
  const { isConnected } = useAccount();
  const isMounted = useIsMounted();

  const { data: treasuryBalance } = useBalance({
    address: DAO_CONFIG.treasury as `0x${string}`,
    chainId: 8453
  });

  const closeMenu = () => {
    setExpanded(false);
  };

  const menuLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/casts', label: 'Casts' },
    { href: '/proposals', label: 'Proposals' },
    { 
      href: 'https://nouns.build/dao/ethereum/0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60/proposal/create', 
      label: 'Create Proposal',
      visibleWhen: isConnected 
    },
    { 
      href: 'https://nouns.build/dao/0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60', 
      label: 'DAO',
      external: true 
    }
  ];

  return (
    <>
      {expanded ? (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50">
          <div className="flex flex-row justify-between items-start sm:px-5 px-4 sm:pt-5 pt-6">
            <div className="flex justify-start w-full">
              <ul className="flex flex-col gap-2 p-2 pt-0 md:gap-5 text-left w-full">
                <li className="block mb-2 md:mb-3">
                  <Link href="/" onClick={closeMenu}>
                    <p className="text-2xl font-bold pb-2">Purple</p>
                  </Link>
                  <div className="flex flex-col pb-2">
                    <p className="font-bold leading-none">
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
                {menuLinks.map((link) => (
                  (!link.visibleWhen || link.visibleWhen) && (
                    <li key={link.href} className="block">
                      <Link 
                        href={link.href} 
                        onClick={closeMenu}
                        {...(link.external ? { target: '_blank', rel: 'noopener' } : {})}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                ))}
                <li className="block pt-1">
                  <ConnectButton />
                </li>
              </ul>
            </div>
            <button 
              onClick={closeMenu} 
              className="absolute top-4 right-4 text-xl font-bold"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <div className="pr-3 cursor-pointer">
          <FaBars onClick={() => setExpanded(true)} />
        </div>
      )}
    </>
  );
};

export default MobileMenu;
