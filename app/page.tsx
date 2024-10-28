import { AuctionHero } from '@/components/auction-hero';

const Home = () => {
  return (
    <div id="auction" className="p-2 md:p-20 col-span-2 w-full">
      <div className="flex justify-center">
        <AuctionHero opts={{ theme: 'base' }} />
      </div>
    </div>
  );
};

export default Home;
