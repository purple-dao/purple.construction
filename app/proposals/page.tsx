import { NextPage } from 'next';

import { ProposalList } from '@/components/proposal-list';

const Proposals: NextPage = () => {
  return <ProposalList opts={{ theme: 'base' }} />;
};

export default Proposals;
