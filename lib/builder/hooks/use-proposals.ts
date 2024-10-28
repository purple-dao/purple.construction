'use client';

import { useQuery } from '@tanstack/react-query';
import { pick } from 'lodash';

import { fetchProposals } from '@/lib/builder/queries';
import type { DaoInfo } from '@/lib/builder/types';

export const useProposals = (dao: DaoInfo | undefined) => {
  const { chain, contracts } = pick(dao, ['chain', 'contracts']);
  const { collection } = pick(contracts, ['collection']);

  return useQuery({
    queryKey: ['proposals', dao],
    queryFn: () => {
      if (!collection || !chain) return null;
      return fetchProposals({ collection, chain });
    },
    enabled: !!collection && !!chain,
  });
};
