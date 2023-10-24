import { useDao, AuctionHero } from "nouns-builder-components";
import { NextPage } from "next";
import Layout from "../components/Layout";

const Home: NextPage = () => {
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
