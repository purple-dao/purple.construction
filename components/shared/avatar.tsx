import { Hex } from 'viem';
import { useEnsAvatar, useEnsName } from 'wagmi';

import type { DaoInfo } from '@/lib/builder/types';

type AvatarConfig = {
  address: string;
  chainId?: DaoInfo['chainId'];
};

export const Avatar = ({ address }: AvatarConfig) => {
  const { data: ensName } = useEnsName({ address: address as Hex });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName as string });

  return <img src={ensAvatar || undefined} className="aspect-square w-full rounded-full" />;
};
