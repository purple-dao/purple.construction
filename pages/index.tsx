/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-img-element */
import { useDao, AuctionHero } from "nouns-builder-components";
import { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";

const Home: NextPage = (props) => {
  const dao = useDao();

  return (
    <Layout>
      {dao && (
        <div id="auction" className="p-2 md:p-20 col-span-2 w-full">
          <div className="flex justify-center">
            <AuctionHero
              dao={dao}
              opts={{
                theme: "base",
              }}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Home;
