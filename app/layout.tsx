import 'react-loading-skeleton/dist/skeleton.css';
import '@neynar/react/dist/style.css';

import Script from 'next/script';
import { type ReactNode } from 'react';

import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { DAO_CONFIG, FRAME } from '@/lib/config';
import { env } from '@/lib/env';
import Providers from '@/components/providers';
import PageProvider from '@/components/providers/page-provider';

interface LayoutProps {
  children?: ReactNode;
}

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

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <title>{DAO_CONFIG.title}</title>
        <meta name={DAO_CONFIG.title} content={DAO_CONFIG.description} />
        <link rel="icon" href="/purple/favicon.ico" />

        <Script src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ""}`} />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', '${env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ""}');
          `}
        </Script>
      </head>

      <body className="w-full">
        <Providers>
          <div className="flex flex-col md:flex-row w-full">
            <Nav />
            <main className="h-auto flex-col gap-8 w-full">
              <div className="flex flex-row gap-0 px-0 md:px-10 w-full justify-center">
                <PageProvider>
                  {children}
                </PageProvider>
              </div>
            </main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default Layout;