'use client';

import { getProposals, ProposalVoteSupport } from '@buildeross/sdk/subgraph';
import { useQuery } from '@tanstack/react-query';

import { PURPLE_DAO } from '@/lib/purple-dao';

import { proposalStateLabel } from '../proposal-state';
import type { DaoInfo, ProposalData, ProposalVote } from '../types';

function mapVoteSupport(support: ProposalVoteSupport): string {
  switch (support) {
    case ProposalVoteSupport.For:
      return 'For';
    case ProposalVoteSupport.Against:
      return 'Against';
    case ProposalVoteSupport.Abstain:
      return 'Abstain';
    default:
      return 'Unknown';
  }
}

export const useProposals = (dao: DaoInfo | undefined) => {
  const chain = dao?.chain;
  const collection = dao?.contracts.collection;

  return useQuery({
    queryKey: ['proposals', PURPLE_DAO.chainId, collection],
    queryFn: async () => {
      if (!collection || chain !== 'BASE') return [];
      const { proposals } = await getProposals(PURPLE_DAO.chainId, collection, 100);
      return proposals.map(
        (p): ProposalData => ({
          id: String(p.proposalId),
          number: p.proposalNumber,
          created: Number(p.timeCreated) * 1000,
          proposer: String(p.proposer),
          title: p.title ?? '',
          description: p.description ?? '',
          status: p.state,
          statusLabel: proposalStateLabel(p.state),
          quorum: Number(p.quorumVotes),
          voteStart: Number(p.voteStart) * 1000,
          voteEnd: Number(p.voteEnd) * 1000,
          tally: {
            for: p.forVotes,
            against: p.againstVotes,
            abstain: p.abstainVotes,
          },
          votes:
            p.votes?.map(
              (v): ProposalVote => ({
                voter: v.voter,
                weight: v.weight,
                support: mapVoteSupport(v.support),
                reason: v.reason ?? '',
              }),
            ) ?? [],
        }),
      );
    },
    enabled: !!collection && chain === 'BASE',
  });
};
