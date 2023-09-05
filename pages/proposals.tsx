import { NextPage } from "next";
import Layout from "../components/Layout";
import Link from "next/link";
import { ProposalList, useDao } from "nouns-builder-components";

const Proposals: NextPage = (props) => {
    const dao = useDao();
    return(
        <Layout>
          {dao &&
            <>
                <ProposalList
                        dao={dao}
                        opts={{
                        theme: "base",
                        }}
                    />
                <div className="italic p-4 mt-2 pb-0 text-center">
                    <Link href="https://prop.house/purple">
                        <p>Be sure to also view our Prop House</p>
                    </Link>
                </div>
            </>
          }
        </Layout>
    )
}

export default Proposals;