import { NextPage } from 'next';

import Casts from '@/components/casts';
import Page from '@/components/page';
import PageBody from '@/components/page-body';
import PageHeader from '@/components/page-header';

const CastsPage: NextPage = () => {
  return(
    <Page>
      <PageHeader pageName="Casts" />
      <PageBody>
        <Casts />
      </PageBody>
    </Page>
  )
};

export default CastsPage;