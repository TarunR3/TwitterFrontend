//@ts-nocheck
'use client'
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import TweetFeed from 'components/TweetFeed/TweetFeed'
import { parseArgs } from "util";

function ProfilePage() {
    const { data: session } = useSession();
    const router = usePathname();
    const userHandle = router.replace("/", "");

    const [posts, setPosts] = useState<string>('')
    const [user, setUser] = useState<string>('')
    const [likes, setLikes] = useState({});

    const handleLike = (postId) => {
        // Send a request to the backend API to increment the likes count
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${postId}/like`, {
            method: 'POST',
        })
            .then((response) => response.json())
            .then((data) => {
                // Update the likes count in the local state
                setLikes((prevLikes) => ({
                    ...prevLikes,
                    [postId]: data.likes,
                }));
            })
            .catch((error) => {
                console.error('Error liking post:', error);
            });
    };

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/handle/${userHandle}`);
            const data = await response.json();
            setPosts(data)
            console.log(router)
        }
        async function fetchUser(){
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/handle/${userHandle}`);
            const data = await response.json();
            setUser(data)
        }
        fetchPosts();
        fetchUser();
    }, [likes,session]);

    return (
        <div className="min-h-screen h-full flex flex-col items-start justify-start pb-[1px] bg-black mx-4 w-[95%] border-x  border-neutral-700">
            <div className=" text-white p-2 flex">
                <svg className="w-5 h-5 mb-2 mr-4 mt-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <div className="">
                    <h1 className="font-bold text-lg ml-1">{user && user?.displayname}</h1>
                    <h1 className="text-textgray text-sm">{posts && posts.length} tweets</h1>
                </div>
            </div>
            <div style={{ position: 'relative' }}>
                <img
                    className="w-[685px]"
                    src="https://pbs.twimg.com/profile_banners/813286/1633800288/1500x500"
                    alt=""
                />
                <img
                    className="ml-4 mt-28 h-36 w-36 rounded-full border-4 border-black"
                    src="https://links.papareact.com/gll"
                    alt=""
                    loading="lazy"
                    style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }}
                />
            </div>
            <div className="ml-auto p-3">
                <button className="rounded-full bg-gray-100 text-black font-semibold text-sm px-5 py-2">
                    Follow
                </button>
            </div>
            <h1 className="text-white font-bold text-xl mt-4 pl-5">{user && user?.displayname}</h1>
            <h1 className="text-textgray text-sm pl-4">@{user && user?.handle}</h1>
            <div className="pt-3 w-full">
                {posts &&
                    <TweetFeed posts={posts} handleLike={handleLike} />
                }
            </div>
        </div>
    )
}

export default ProfilePage;