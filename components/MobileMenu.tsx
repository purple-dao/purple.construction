import { NextPage } from "next";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Link from "next/link";
import { useIsMounted } from "usehooks-ts";
import { useAccount, useBalance } from "wagmi";
import Skeleton from "react-loading-skeleton";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface MobileMenuProps {}

const MobileMenu: NextPage<MobileMenuProps> = () => {
  const [expanded, setExpanded] = useState(false);
  const { isConnected } = useAccount();
  const isMounted = useIsMounted();

  const treasuryBalance = useBalance({
    address: "0xeB5977F7630035fe3b28f11F9Cb5be9F01A9557D",
    watch: true,
  }).data;

  const closeMenu = () => {
    setExpanded(false);
  };

  return (
    <>
      {expanded ? (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50">
          <div className="flex flex-row justify-between items-start sm:pl-5 pl-10 sm:pr-5 pr-10 sm:pt-5 pt-10">
            <div className="flex justify-start pl-10">
              <ul className="flex flex-col gap-2 p-3 pt-0 md:gap-5 md:p-5 text-left">
                <li className="block mb-2 md:mb-3">
                  <Link href="/">
                    <p className="text-2xl font-bold pb-3">Purple</p>
                  </Link>
                  <div className="flex flex-col pb-2">
                    <p className="font-bold leading-none">
                      Ξ{" "}
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
                {isConnected && (
                  <li className="block">
                    <Link href="https://nouns.build/dao/ethereum/0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60/proposal/create">
                      Create Proposal
                    </Link>
                  </li>
                )}
                <li className="block">
                  <Link
                    href="https://nouns.build/dao/0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60"
                    rel="noopener"
                    className="external"
                  >
                    DAO
                  </Link>
                </li>
                <li className="block pt-1">
                  <ConnectButton />
                </li>
              </ul>
            </div>
            <button onClick={closeMenu}>Close</button>
          </div>
        </div>
      ) : (
        <div className="pr-3">
          <FaBars onClick={() => setExpanded(true)} />
        </div>
      )}
    </>
  );
};

export default MobileMenu;
