import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import { walletSnippet } from '@buildeross/utils/helpers';

dayjs.extend(relativeTime);

export const logWarning = (type: string, collection: string, chain: string = 'MAINNET') => {
  console.warn(
    `BUILDER: ${type}. Double check that the collection address and chain are correct or retry the query.\n\ncollection: ${collection}\nchain: ${chain}`,
  );
};

export const relative = (timestamp: number) => {
  if (!timestamp) return '';
  return dayjs.unix(timestamp / 1000).fromNow(false);
};

/** @deprecated Prefer `walletSnippet` from `@buildeross/utils` */
export const trunc = (address: string) => walletSnippet(address, 4);
