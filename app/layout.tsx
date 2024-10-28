import 'react-loading-skeleton/dist/skeleton.css';

import Script from 'next/script';
import { ReactNode } from 'react';

// import MobileMenu from './MobileMenu';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { DAO_CONFIG } from '@/lib/config';

import Providers from './providers';

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <title>{DAO_CONFIG.title}</title>
        <meta name={DAO_CONFIG.title} content={DAO_CONFIG.description} />
        <link rel="icon" href="/purple/favicon.ico" />

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-RJPL0Z2LLC" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-RJPL0Z2LLC');
          `}
        </Script>
      </head>

      <body className="w-full">
        <Providers>
          <div className="flex flex-col md:flex-row w-full">
            <Nav />

            <main className="h-auto flex-col gap-8 w-full">
              <div className="flex flex-row gap-0 pl-0 md:pl-10 pr-0 md:pr-5 w-screen">
                <div className="w-screen md:w-4/6 h-auto flex flex-col items-center border-l border-r border-gray-300 pb-10">
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

interface LayoutProps {
  children?: ReactNode;
}

// TODO handle metadata
// {/* <NextSeo
//         title={daoConfig.title}
//         description={daoConfig.description}
//         openGraph={{
//           title: daoConfig.title,
//           description: daoConfig.description,
//           url: daoConfig.url,
//           site_name: daoConfig.title,
//           images: [
//             {
//               url: daoConfig.shareGraphic,
//               width: 500,
//               height: 500,
//               alt: `${daoConfig.title} Share graphic`,
//             },
//           ],
//         }}
//         twitter={{
//           cardType: "summary_large_image",
//           site: daoConfig.url,
//           handle: "",
//         }}
//       /> */}

export default Layout;
