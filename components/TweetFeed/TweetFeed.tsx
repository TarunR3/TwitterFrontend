//@ts-nocheck
import {
    ChatBubbleLeftIcon,
    ArrowPathRoundedSquareIcon,
    HeartIcon,
} from '@heroicons/react/24/solid'

interface PostsProp {
    posts: Post[];
    handleLike: (e: { preventDefault: () => void }) => void;
}

interface Post {
    id: number;
    userId: number;
    username: string;
    handle: string;
    image: string;
    content: string;
    comments: number;
    retweets: number;
    likes: number;
}

function TweetFeed({ posts, handleLike }: PostsProp) {
    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} className="px-3 pt-2 pb-1 border-b border-t border-neutral-700">
                    <div className="flex">
                        <div className="flex">
                            <img className="h-10 w-10 rounded-full" src="https://links.papareact.com/gll" alt=""></img>
                            <div className="flex-col">
                                <a href={`${post.handle}`}>
                                    <div className="group flex">
                                        <h3 className="pl-2 pr-1 text-md bg-black font-medium text-white">{post.username}</h3>
                                        <h3 className="text-md bg-black group-hover:underline text-textgray">@{post.handle}</h3>
                                    </div>
                                </a>
                                <h3 className="pl-2 w-full text-md bg-black text-white">{post.content}</h3>
                                {post.image && <img className="ml-2 max-h-[580px] max-w-[580px] rounded-lg" src={post.image} alt=""></img>}
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-2 py-1 px-16 text-twtblue items-center justify-between">
                        <button className="flex items-center group">
                            <ChatBubbleLeftIcon className="h-6 w-6 p-[3px] text-textgray group-hover:bg-twtgray group-hover:text-twtblue rounded-full" />
                            <h1 className="text-textgray text-sm group-hover:text-twtblue">{post.comments}</h1>
                        </button>
                        <button className="flex items-center group">
                            <ArrowPathRoundedSquareIcon className="h-6 w-6 p-[3px] text-textgray group-hover:bg-twtgray group-hover:text-green-500 rounded-full" />
                            <h1 className="text-textgray text-sm group-hover:text-green-500">{post.retweets}</h1>
                        </button>
                        <button
                            className="flex items-center group"
                            onClick={() => handleLike(post.id)}
                        >
                            <HeartIcon
                                className="h-6 w-6 p-[3px] text-textgray group-hover:bg-twtgray group-hover:text-red-500 rounded-full"
                            />
                            <h1 className="text-textgray text-sm group-hover:text-red-500">
                                {post.likes}
                            </h1>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TweetFeed;