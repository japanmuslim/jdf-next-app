import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import NotFoundImage from '@/assets/images/not-found/404.svg'

export default function NotFound() {

    const router = useRouter();
    const [count, setCount] = useState(3);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (count > 0) {
                setCount(count - 1);
            } else {
                router.push('/');
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, [count, router]);

    return (
        <>
            <Head>
                <title>404 | Not Found</title>
                <meta name="description" content="Page not found" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className="flex flex-col gap-10 justify-start items-center h-screen">
                <div>
                    <h1 className="text-2xl font-bold text-center mb-2">Page not found</h1>
                    <p className="text-center">Redirecting to home page in <strong>{count}</strong> seconds...</p>
                </div>
                <Image src={NotFoundImage} alt="404" width={300} height={300} />
            </main>
        </>
    )
}
