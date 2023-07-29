//@ts-nocheck
'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
    BellIcon,
    HashtagIcon,
    BookmarkIcon,
    EnvelopeIcon,
    HomeIcon,
    EllipsisHorizontalCircleIcon,
} from '@heroicons/react/24/solid'
import SidebarRow from './SidebarRow'
import AuthOverlay from './auth/AuthOverlay'

function Sidebar() {
    const { data: session } = useSession();

    const [showOverlay, setShowOverlay] = useState(false);

    const [currUser, setCurrUser] = useState<>();

    useEffect(() => {
        async function getUser() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${session?.user?.email}`)
            const data = await response.json();
            setCurrUser(data)
            console.log(data);
        }
        getUser();
    }, [session]);

    const handleButtonClick = () => {
        setShowOverlay(true);
    };

    const closeOverlay = () => {
        setShowOverlay(false);
    };

    const handleLogout = () => {
        signOut();
    };

    return (
        <div className="pl-[13%]">
            <img className="pl-4 pt-1 h-14 w-15 bg-black" src="https://links.papareact.com/drq" alt="" />
            <Link href="/">
                <SidebarRow Icon={HomeIcon} title="Home" />
            </Link>
            <SidebarRow Icon={HashtagIcon} title="Explore" />
            <SidebarRow Icon={BellIcon} title="Notifications" />
            <SidebarRow Icon={EnvelopeIcon} title="Messages" />
            <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
            <SidebarRow Icon={EllipsisHorizontalCircleIcon} title="More" />
            <button className="bg-twtblue hover:bg-blue-500 w-[95%] text-white font-medium rounded-full ml-2 mt-2 py-2">
                Tweet
            </button>
            {session?.user ? (
                <div className = "flex">
                    <a href={`${session.user.handle}`}>
                        <div className="flex ml-3 mt-3 items-center">
                            <img className="mt-1 h-10 w-10 rounded-full" src="https://links.papareact.com/gll"
                                alt=""
                                loading="lazy">
                            </img>
                            <div className="flex-col px-2 pr-5">
                                <h1 className="text-white font-medium">{currUser && currUser.displayname}</h1>
                                <h1 className="text-textgray text-sm">@{currUser && currUser.handle}</h1>
                            </div>
                        </div>
                    </a>

                    <button onClick={handleLogout}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="white"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                        </svg>
                    </button>
                </div>
            ) :
                (
                    <div>
                        <button className="bg-neutral-400 mt-4 hover:bg-neutral-500 w-[95%] text-white font-medium rounded-full ml-2 py-2" onClick={handleButtonClick}>
                            Sign Up Now
                        </button>
                    </div>
                )
            }
            {
                showOverlay && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
                        <AuthOverlay showOverlay={showOverlay} setOverlay={setShowOverlay} />
                    </div>
                )
            }
        </div >
    )
}

export default Sidebar;