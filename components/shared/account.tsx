import cx from 'classnames';
import { Hex } from 'viem';
import { useEnsName } from 'wagmi';

import type { DaoInfo } from '@/lib/builder/types';
import { trunc } from '@/lib/builder/utils';

import { Avatar } from './avatar';
import { MiniAppLink } from '../mini-app-link';

type AccountConfig = {
  address: string;
  chainId: DaoInfo['chainId'] | undefined;
  hideAvatar?: boolean;
};

export const Account = ({ address, chainId, hideAvatar = false }: AccountConfig) => {
  const { data: ensName } = useEnsName({ address: address as Hex });

  return (
    <MiniAppLink
      href={`https://etherscan.io/address/${address}`}
      className="inline-flex flex-row items-center"
    >
      {!hideAvatar === true && (
        <span className="absolute mr-2 h-6 w-6">
          <Avatar address={address} chainId={chainId} />
        </span>
      )}
      <span
        className={cx(
          'w-full overflow-hidden overflow-ellipsis font-bold',
          !hideAvatar === true && 'pl-7',
        )}
      >
        {ensName || trunc(address)}
      </span>
    </MiniAppLink>
  );
};
