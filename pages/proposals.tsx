import { NextPage } from "next";
import Layout from "../components/Layout";
import Link from "next/link";
import { ProposalList, useDao } from "nouns-builder-components";

const Proposals: NextPage = () => {
  const dao = useDao();
  return (
    <Layout>
      {dao && (
        <>
          <ProposalList
            dao={dao}
            opts={{
              theme: "base",
            }}
          />
          <div className="italic p-4 mt-2 pb-0 text-center">
            <Link href="https://prop.house/purple">
              <button className="bg-[#8A63D2] border border-white/80 p-3 md:p-5 rounded-lg hover:shadow-md shadow-none transition-shadow">
                <p className="text-white font-semibold">
                  View funding rounds on Prop House
                </p>
              </button>
            </Link>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Proposals;
