import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function NotFound() {

    const { push } = useRouter()

    useEffect(() => {
        const timeOut = setTimeout(() => {
            push('/')
        }, 3000)

        return () => clearTimeout(timeOut)
    }, [push])

    return (
        <>
            <Head>
                <title>404 | Not Found</title>
                <meta name="description" content="Page not found" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className="container flex justify-center items-center h-screen">
                <h1 className="text-4xl font-semibold text-center">404 | Not Found</h1>
            </main>
        </>
    )
}
