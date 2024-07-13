import React, { FC } from 'react'

import Head from 'next/head'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

import { APP_DESCRIPTION, APP_NAME } from '@/contants'

const Layout: FC<LayoutProps> = ({
    children,
    pageTitle = `${APP_NAME}`,
    pageDescription = `${APP_DESCRIPTION}`,
    navbar = true,
    footer = true
}) => (
    <>
        <Head>
            <title>{pageTitle}</title>
            <meta name="description" content={pageDescription} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <meta property="og:title" content={pageTitle} key="ogtitle" />
            <meta property="og:description" content={pageDescription} key="ogdesc" />
            <meta property="og:image" content="/favicon.ico" key="ogimage" />
            <meta property="og:url" content="/" key="ogurl" />
            <meta name="twitter:card" content="summary" key="twcard" />
            <meta name="twitter:image" content="/favicon.ico" key="twimage" />
            <meta name="twitter:creator" content="@username" key="twhandle" />
        </Head>
        {navbar && <Navbar />}
        <main>{children}</main>
        {footer && <Footer />}
    </>
)

export default Layout