import { NextPage } from 'next';

import Page from '@/components/page';
import PageBody from '@/components/page-body';
import PageHeader from '@/components/page-header';
import { DAO_CONFIG } from '@/lib/config';

const About: NextPage = () => {
  return (
    <Page>
      <PageHeader pageName="About" />
      <PageBody>
        <p className="text-lg font-medium pb-2">WTF?</p>
        <p className="pb-7">
          Purple is a DAO whose goal is to proliferate and expand the Farcaster protocol and
          ecosystem. We will fund small grants via{' '}
          <a href="https://rounds.wtf/purple" target="_blank">
            Rounds.wtf
          </a>{' '}
          and larger on-chain proposals which proliferate Farcaster and/or build on top of the
          protocol.
        </p>

        <p className="text-lg font-medium pb-2">How do I participate?</p>
        <p className="pb-7">
          There are two levels of participation: DAO Members & the Purple Community.
          <br />
          <br />
          You become a DAO Member by purchasing a{' '}
          <a
            href={`https://nouns.build/dao/base/${DAO_CONFIG.token}`}
            target="_blank"
          >
            Purple
          </a>{' '}
          token at Auction. DAO members have a governance vote, can submit proposals, and can vote on
          Rounds.wtf grants.
          <br />
          <br />
          You are a Purple Community member if you{' '}
          <a href="https://warpcast.com/~/channel/purple" target="_blank">
            join our Warpcast channel
          </a>
          , build on the protocol, cast about the DAO or help propose, organize, and execute on small
          grants and proposals.
          <br />
          <br />
          Purple is a permissionless DAO – all you need to do is organize your squad and make
          something happen.
        </p>

        <p className="text-lg font-medium pb-2">Summary</p>
        <ul className="flex flex-col gap-2 whitespace-pre-wrap pb-7">
          <li>- Purple&apos;s artwork is based on Farcaster purple.</li>
          <li>- One Purple token is auctioned off every 24 hours, forever.</li>
          <li>- 100% of Purple auction proceeds are automatically sent to the Purple treasury.</li>
          <li>- Purple uses a nouns.build, a protocol for building Nouns DAO forks.</li>
          <li>- One Purple token is equal to one vote.</li>
          <li>- The treasury is controlled exclusively by Purple token holders.</li>
          <li>- Farcaster.eth receives rewards in the form of Purple (1% of supply until 2050).</li>
          <li>- NounsDAO receives rewards in the form of Purple (1% of supply until 2050).</li>
        </ul>

        <p className="text-lg font-medium pb-2">How do auctions work?</p>
        <p>
          Once the auction was started on October 25, 2022, it will run forever. A new Purple token is
          put up for auction every 24 hours.
        </p>
        <p className="italic pt-1 pb-7">
          100% of auction sales go to the DAO Treasury and is governed by the community
        </p>

        <p className="text-lg font-medium pb-2">How does founder allocation work?</p>
        <p>
          Once the auction was started on October 25, 2022, it will run forever. A new Purple token is
          put up for auction every 24 hours.
        </p>
        <p className="italic pt-1 pb-7">
          100% of auction sales go to the DAO Treasury and is governed by the community
        </p>

        <p className="text-lg font-medium pb-2">
          What is the relationship between Farcaster & Purple?
        </p>
        <p className="pb-7">
          Purple is an independent ecosystem DAO. Our goal is to proliferate and expand the Farcaster
          protocol and ecosystem. Our treasury will be used to fund those kinds of projects. We have
          no governance rights to the Farcaster protocol or client.
          <br />
          <br />
          <a href="https://merklemanufactory.com/" target="_blank">
            Merkle Manufactory
          </a>{' '}
          is the company behind the Farcaster protocol and official client, Warpcast.
          <br />
          <br />
          We have (permissionlessly) allocated 10% of our token to farcaster.eth, which is owned by
          Merkle Manufactory, as a good stewards of both the Farcaster protocol and Purple. <br />
          <br />
          <span className="italic">
            tldr; there is no official connection to the company that makes Farcaster, this is a
            permissionless builder DAO on top of an open protocol.
          </span>
        </p>

        <p className="text-lg font-medium pb-2">Can I donate to the Purple treasury on an L2?</p>
        <p>
          The official treasury only exists on Ethereum mainnet, but we have unofficial community
          multi-sig addresses set up on{' '}
          <a
            href="https://optimistic.etherscan.io/address/0xb55d9d5d5Af1C2B5e1834dcd41306b02e751c411"
            target="_blank"
          >
            Optimism
          </a>{' '}
          and{' '}
          <a
            href="https://basescan.org/address/0xb55d9d5d5Af1C2B5e1834dcd41306b02e751c411"
            target="_blank"
          >
            Base
          </a>
          . You can send funds to 0xb55d9d5d5Af1C2B5e1834dcd41306b02e751c411 on those networks and
          they will periodically be bridged back to the main treasury.
        </p>
      </PageBody>
    </Page>
  );
};

export default About;
