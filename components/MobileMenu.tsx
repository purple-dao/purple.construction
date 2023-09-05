import { NextPage } from "next";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Link from "next/link";

interface MobileMenuProps {}

const MobileMenu: NextPage<MobileMenuProps> = (props) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const closeMenu = () => {
    setExpanded(false);
  };

  return (
    <>
      {expanded ? (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50">
          <div className="flex justify-end p-4">
            <button onClick={closeMenu}>Close</button>
          </div>
          <ul className="flex flex-col gap-2 p-3 md:gap-5 md:p-5">
            <li className="block mb-2 md:mb-3">
              <Link href="/">
                <p className="text-xl font-bold pb-2">Your Link 1</p>
              </Link>
              <div className="flex flex-col">
                <p className="font-bold leading-none	">
                  {/* Ξ {isMounted() && treasuryBalance ? Math.floor(+treasuryBalance?.formatted) : <Skeleton />} */}
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
              <Link href="/activity">Activity</Link>
            </li>
            <li className="block">
              <Link
                href="https://nouns.build/dao/0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60"
                rel="noopener"
                className="external"
              >
                DAO
              </Link>
            </li>
            {/* Add any other links or menu items from your original nav */}
          </ul>
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