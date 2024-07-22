import Image from 'next/image'
import React from 'react'

const Icon = () => (
    <div className="rounded-full p-2 bg-gradient-to-b from-slate-50 to-slate-200 border-destructive border-4">
        <Image src="/mosque.png" alt="logo" width={50} height={50} className="lg:w-8 w-4 lg:h-8 h-4" />
    </div>
)

export default Icon