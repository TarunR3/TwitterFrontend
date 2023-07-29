//@ts-nocheck
"use client";
import TweetBox from 'components/TweetBox'
import { useSession } from "next-auth/react";
import TweetFeed from 'components/TweetFeed/TweetFeed'
import { ChangeEvent, SetStateAction, useState, useEffect } from "react";

export default function Home({ email }) {
  const { data: session } = useSession();

  const [content, setContent] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [posts, setPosts] = useState<string>('')
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/posts`);
      const data = await response.json();
      setPosts(data)
      console.log(data);
      console.log(session?.user)
    }
    fetchPosts();
  }, [likes, session]);

  const handleCreatePost = () => {
    const a = {
      content: content,
      image: image,
      likes: 0,
      retweets: 0,
      comments: 0,
      userId: session?.user?.userId,
      username: session?.user.displayname,
      handle: session?.user.handle
    }
    console.log(JSON.stringify(a))
    console.log(content)
    console.log(session?.user?.token)
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/tweet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.user?.token}`
      },
      body: JSON.stringify(a)
    })
  };

  return (
    <main className="col-span-7 flex-col min-h-screen h-max pb-[1px] flex bg-black mx-4 w-[95%] border-x  border-neutral-700">
      <div className="flex">
        <h1 className="text-white text-xl font-semibold pt-2 pb-4 px-4">Home</h1>
      </div>
      <div>
        <TweetBox content={content} image={image} setContent={setContent} setImage={setImage} handleCreatePost={handleCreatePost} />
      </div>
      <div>
        {posts &&
          <TweetFeed posts={posts} handleLike = {handleLike} />
        }
      </div>
      <button className="text-twtblue items-center justify-center flex p-2 border-b border-neutral-700 hover:text-blue-500">More Tweets</button>
    </main>
  )
}

/*
      <div className="w-[25%] flex flex-col items-center bg-red-500">
        <img className="h-[10%] w-[10%]" src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg" alt="Twitter Logo"></img>
        <h1 className="text-white font-medium text-lg py-2">Home</h1>
        <h1 className="text-white font-medium text-lg py-2">Explore</h1>
        <h1 className="text-white font-medium text-lg py-2">Notifications</h1>
        <h1 className="text-white font-medium text-lg py-2">Messages</h1>
        <h1 className="text-white font-medium text-lg py-2">More</h1>
        <button className="bg-blue-400 hover:bg-blue-500 py-2 w-[40%] text-white rounded-full px-4">
          Tweet
        </button>
      </div>
      <div className="w-[50%] bg-green-500"></div>
      <div className="w-[25%] bg-blue-500"></div>
      */