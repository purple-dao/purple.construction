import { ProposalState } from '@buildeross/types';

const STATE_LABEL: Record<ProposalState, string> = {
  [ProposalState.Pending]: 'Pending',
  [ProposalState.Active]: 'Active',
  [ProposalState.Canceled]: 'Canceled',
  [ProposalState.Defeated]: 'Defeated',
  [ProposalState.Succeeded]: 'Succeeded',
  [ProposalState.Queued]: 'Queued',
  [ProposalState.Expired]: 'Expired',
  [ProposalState.Executed]: 'Executed',
  [ProposalState.Vetoed]: 'Vetoed',
};

export function proposalStateLabel(state: ProposalState): string {
  return STATE_LABEL[state] ?? 'Unknown';
}

/** Lowercase label for styling keys (e.g. proposal-list-item). */
export function proposalStateKey(state: ProposalState): string {
  return proposalStateLabel(state).toLowerCase();
}
