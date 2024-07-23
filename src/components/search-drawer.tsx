import React, { FC, memo, useCallback, useState } from 'react'

import { cn } from '@/lib/utils'
import { FaChevronRight } from 'react-icons/fa6'
import { FaSearch } from 'react-icons/fa'

interface SearchDrawerProps {
    children?: React.ReactNode
}

const SearchDrawer: FC<SearchDrawerProps> = ({ children }) => {

    const [openSheet, setOpenSheet] = useState(false)

    const handleOpenSheet = useCallback(() => {
        setOpenSheet(prev => !prev)
        document.body.style.overflow = openSheet ? 'auto' : 'hidden'
    }, [openSheet])

    return (
        <>
            <button
                type="button"
                className={cn(
                    'fixed top-28 rounded-full rounded-l-none p-4 bg-primary flex items-center gap-1 cursor-pointer transition-all duration-200 delay-100 ease-in-out hover:-translate-x-1 z-[998] shadow shadow-black',
                    openSheet ? 'left-[314px]' : '-left-2'
                )}
                onClick={handleOpenSheet}
            >
                {openSheet ? (
                    <>
                        <FaChevronRight className="text-gray-500 text-[8px] rotate-180" />
                        <FaSearch className="text-white" />
                    </>
                ) : (
                    <>
                        <FaSearch className="text-white" />
                        <FaChevronRight className="text-gray-500 text-[8px]" />
                    </>
                )}
            </button>
            {openSheet && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-60 z-[997]"
                    onClick={handleOpenSheet}
                ></div>
            )}
            <div
                className={cn(
                    'fixed inset-0 w-80 h-full bg-primary shadow-md shadow-black transition-all duration-200 delay-100 ease-in-out transform z-[999]',
                    openSheet ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className="py-8 px-4">
                    {children}
                </div>
            </div>
        </>
    )
}

export default memo(SearchDrawer)