import { NextPage } from "next";
import Layout from "../components/Layout";
import Link from "next/link";

const About: NextPage = (props) => {
    return(
        <Layout>
            {/* <div className="w-[100%] p-3 border-b border-gray-400 flex flex-row gap-2">
                <p className="pl-3 text-xl">About</p>
            </div> */}
            <div className="w-[100%] h-auto p-4 pl-7">
                <p className="text-lg font-medium pb-2">WTF?</p>
                <p className="pb-7">Purple is a DAO whose goal is to proliferate and expand the Farcaster protocol and ecosystem. 
                We will fund small grants via <Link href="https://prop.house">Prop House</Link> and larger on-chain proposals which proliferate Farcaster and/or build on top of the protocol. </p>

                <p className="text-lg font-medium pb-2">How do I participate?</p>
                <p className="pb-7">There are two levels of participation: DAO Members & the Purple Community.
                <br/><br/>
                You become a DAO Member by purchasing a <Link href="https://nouns.build/dao/0xa45662638E9f3bbb7A6FeCb4B17853B7ba0F3a60">Purple</Link> token at Auction. DAO members have a governance vote, can submit proposals, and can vote on Prop House grants. 
                <br/><br/>
                You are a Purple Community member if you <Link href="https://warpcast.com/~/channel/purple">join our Warpcast channel</Link>, build on the protocol, cast about the DAO or help propose, organize, and execute on small grants and proposals.
                <br/><br/>
                Purple is a permissionless DAO – all you need to do is organize your squad and make something happen. </p>

                <p className="text-lg font-medium pb-2">Summary</p>
                <p className="whitespace-pre-wrap pb-7">
                    <ul className="flex flex-col gap-2">
                        <li>
                            - Purples artwork is based on Farcaster purple.
                        </li>
                        <li>    
                            - One Purple token is auctioned off every 24 hours, forever.
                        </li>
                        <li>
                            - 100% of Purple auction proceeds are automatically sent to the Purple treasury.
                        </li>
                        <li>
                            - Purple uses a nouns.build, a protocol for building Nouns DAO forks.
                        </li>
                        <li>
                            - One Purple token is equal to one vote.
                        </li>
                        <li>
                            - The treasury is controlled exclusively by Purple token holders.
                        </li>
                        <li>
                            - PurpDAO.eth receive rewards in the form of Purple (10% of supply until 2050). More on this under “How does Founder Allocation work?” below.
                        </li>
                        <li>
                            - Farcaster.eth receives rewards in the form of Purple (10% of supply until 2050).
                        </li>
                        <li>
                            - NounsDAO receives rewards in the form of Purple (1% of supply until 2050).
                        </li>
                    </ul>
                </p>

                <p className="text-lg font-medium pb-2">How do auctions work?</p>
                <p>
                    Once the auction was started on October 25, 2022, it will run forever. A new Purple token is put up for auction every 24 hours.
                </p>
                <p className="italic pt-1 pb-7">
                    100% of auction sales go to the DAO Treasury and is governed by the community
                </p>

                <p className="text-lg font-medium pb-2">How does founder allocation work?</p>
                <p>
                    Once the auction was started on October 25, 2022, it will run forever. A new Purple token is put up for auction every 24 hours.
                </p>
                <p className="italic pt-1 pb-7">
                    100% of auction sales go to the DAO Treasury and is governed by the community
                </p>

                <p className="text-lg font-medium pb-2">What is the relationship between Farcaster & Purple?</p>
                <p className="pb-7">
                Purple is an independent ecosystem DAO. Our goal is to proliferate and expand the Farcaster protocol and ecosystem. Our treasury will be used to fund those kinds of projects. We have no governance rights to the Farcaster protocol or client. <br/> <br/>

                <Link href="https://merklemanufactory.com/">Merkle Manufactory</Link> is the company behind the Farcaster protocol and official client, Warpcast. <br/><br/>

                We have (permissionlessly) allocated 10% of our token to farcaster.eth, which is owned by Merkle Manufactory, as a good stewards of both the Farcaster protocol and Purple. <br/><br/>

                <span className="italic">tldr; there is no official connection to the company that makes Farcaster, this is a permissionless builder DAO on top of an open protocol.</span>
                </p>

                <p className="text-lg font-medium pb-2">Can I donate to the Purple treasury on an L2?</p>
                <p>
                    The official treasury only exists on Ethereum mainnet, but we have unofficial community multi-sig addresses set up on Optimism and Base. You can send funds to 0xb55d9d5d5Af1C2B5e1834dcd41306b02e751c411 on those networks and they will periodically be bridged back to the main treasury.
                </p>
            </div>
        </Layout>
    )
}

export default About;
