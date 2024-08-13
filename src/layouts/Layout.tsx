import React, { FC } from 'react';

import Head from 'next/head';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

import { Poppins } from 'next/font/google';

import { APP_DESCRIPTION, APP_NAME } from '@/contants';
import { cn } from '@/lib/utils';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const Layout: FC<LayoutProps> = ({
  id,
  children,
  className,
  pageTitle = `${APP_NAME}`,
  pageDescription = `${APP_DESCRIPTION}`,
  navbar = true,
  footer = true,
}) => (
  <>
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/assets/logo.png" />

      <meta property="og:title" content={pageTitle} key="ogtitle" />
      <meta property="og:description" content={pageDescription} key="ogdesc" />
      <meta property="og:image" content="/assets/logo.png" key="ogimage" />
      <meta property="og:url" content="/" key="ogurl" />
      <meta name="twitter:card" content="summary" key="twcard" />
      <meta name="twitter:image" content="/assets/logo.png" key="twimage" />
      <meta name="twitter:creator" content="@username" key="twhandle" />
    </Head>
    <main id={id} className={cn(className, poppins.className)}>
      {navbar && <Navbar />}
      {children}
      {footer && <Footer />}
    </main>
  </>
);

export default Layout;
