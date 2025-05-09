'use client';
import Head from 'next/head';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

import { Poppins } from 'next/font/google';

import { APP_DESCRIPTION, APP_NAME } from '@/contants';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const AosInit = dynamic(() => import('@/components/aos'), {
  ssr: false,
});

const Layout = ({
  id,
  children,
  className,
  pageTitle = `${APP_NAME}`,
  pageDescription = `${APP_DESCRIPTION}`,
  navbar = true,
  footer = true,
  keywords = 'Japan Dahwa Foundation, JDF, Japan, Dahwa, Foundation, Japan Dahwa Foundation, JDF, Japan, Dahwa, Foundation, Japan Dahwa Foundation, JDF, Japan, Dahwa, Foundation',
  metaDesc = 'Japan Dahwa Foundation, JDF, Japan, Dahwa, Foundation, Japan Dahwa Foundation, JDF, Japan, Dahwa, Foundation, Japan Dahwa Foundation, JDF, Japan, Dahwa, Foundation',
}: LayoutProps) => (
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

      <meta name="keywords" content={keywords} />
      <meta name="description" content={metaDesc} />
    </Head>
    <main id={id} className={cn(className, poppins.className)}>
      <AosInit />
      <Navbar isOpen={navbar} />
      {children}
      {footer && <Footer />}
    </main>
  </>
);

export default Layout;
