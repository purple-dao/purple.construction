import 'react-loading-skeleton/dist/skeleton.css';
import '@neynar/react/dist/style.css';

import Script from 'next/script';
import { type ReactNode } from 'react';

// import MobileMenu from './MobileMenu';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { DAO_CONFIG } from '@/lib/config';
import { env } from '@/lib/env';

import Providers from './providers';

interface LayoutProps {
  children?: ReactNode;
}

export const metadata = {
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
                <div className="w-full max-w-5xl h-auto flex flex-col items-center border-l border-r border-gray-300 pb-10">
                  {/* {(router.pathname === "/" && isMobile) ||
                    router.pathname !== "/" ? (
                      <div className="w-full p-3 pt-3 border-b border-gray-400 flex flex-row gap-2 items-center justify-between">
                        <p className="pl-3 text-xl">
                          {router.pathname === "/"
                            ? "Home"
                            : (router.pathname as string)
                                .replace("/", "")
                                .replace(/^\w/, (c) => c.toUpperCase())}
                        </p>
                        {isMobile && <MobileMenu />}
                      </div>
                    ) : (
                      <></>
                    )} */}
                  {children}
                </div>
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