import { NextPage } from 'next';

import Page from '@/components/page';
import PageBody from '@/components/page-body';
import PageHeader from '@/components/page-header';
import { ProposalList } from '@/components/proposal-list';

const Proposals: NextPage = () => {
  return(
    <Page>
      <PageHeader pageName="Proposals" />
      <PageBody>
        <ProposalList opts={{ theme: 'base' }} />
      </PageBody>
    </Page>
  )
};

export default Proposals;
