//@ts-nocheck
"use client";
import TweetBox from 'components/TweetBox'
import { useSession } from "next-auth/react";
import TweetFeed from 'components/TweetFeed/TweetFeed'
import { ChangeEvent, SetStateAction, useState, useEffect } from "react";

export default function Home() {
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
