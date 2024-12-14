import { AuctionHero } from '@/components/auction-hero';
import { DAO_CONFIG, FRAME } from '@/lib/config';

export function generateMetadata() {
  return {
    title: DAO_CONFIG.title,
    description: DAO_CONFIG.description,
    openGraph: {
      title: DAO_CONFIG.title,
      description: DAO_CONFIG.description,
      url: DAO_CONFIG.url,
      siteName: DAO_CONFIG.title,
      images: [
        {
          url: DAO_CONFIG.shareGraphic,
          width: 500,
          height: 500,
          alt: `${DAO_CONFIG.title} share graphic`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: DAO_CONFIG.url,
      creator: "",
    },
    other: {
      "fc:frame": JSON.stringify(FRAME)
    }
  }
};

export default function Home() {
  return (
    <div id="auction" className="p-2 md:p-20 col-span-2 w-full">
      <div className="flex justify-center">
        <AuctionHero />
      </div>
    </div>
  );
};
