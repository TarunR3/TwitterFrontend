//@ts-nocheck

'use client'
import React, { useState, useRef } from 'react'
import {
    PhotoIcon,
    GifIcon,
    FaceSmileIcon,
    CalendarIcon,
    MapPinIcon,
    QueueListIcon,
    XMarkIcon
} from '@heroicons/react/24/solid'

interface TweetProps {
    content: string;
    image: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    setImage: React.Dispatch<React.SetStateAction<string>>;
    handleCreatePost: React.MouseEventHandler<HTMLButtonElement>;
}

function TweetBox({ content, image, setContent, setImage, handleCreatePost }: TweetProps) {
    const fileInputRef = useRef(null);

    const handleClearImage = (e) => {
        e.preventDefault();
        setImage('');
    };

    const handleButtonClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const image = URL.createObjectURL(file);
        setImage(image);
    };

    return (
        <div className="flex space-x-2 p-2 border-b border-t border-neutral-700">
            <img className="h-10 w-10 mb-14 object-cover rounded-full mt-4" src="https://links.papareact.com/gll" alt=""></img>
            <div className="flex flex-1 items-center pl-2 bg-black">
                <form className="flex flex-1 flex-col">
                    <input value={content} onChange={(e) => setContent(e.target.value)} className="h-16 w-full text-xl bg-black text-white placeholder:text-textgray focus:outline-none" type="text" placeholder="What is Happening?!"></input>
                    {image && (
                        <div className="flex">
                            <img className="py-2 pr-8 max-h-[580px] max-w-[580px]" src={image} alt="Uploaded" />
                            <button onClick={handleClearImage}>
                                <XMarkIcon className="h-8 w-8 text-twtblue" />
                            </button>
                        </div>
                    )}
                    <div className="flex justify-between items-=">
                        <div className="flex space-x-2 text-twtblue">
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <button onClick={handleButtonClick}>
                                    <PhotoIcon className="h-8 w-8 p-[5px] hover:bg-twtgray rounded-full" />
                                </button>
                            </div>
                            <QueueListIcon className="h-8 w-8 p-[5px] hover:bg-twtgray rounded-full" />
                            <GifIcon className="h-8 w-8 p-[5px] hover:bg-twtgray rounded-full" />
                            <FaceSmileIcon className="h-8 w-8 p-[5px] hover:bg-twtgray rounded-full" />
                            <CalendarIcon className="h-8 w-8 p-[5px] hover:bg-twtgray rounded-full" />
                            <MapPinIcon className="h-8 w-8 p-[5px] hover:bg-twtgray rounded-full" />
                        </div>
                        <button onClick={handleCreatePost} disabled={!content} className="bg-twtblue px-5 py-2 font-bold hover:bg-blue-500 text-white rounded-full disabled:opacity-40 disabled:hover:bg-twtblue">
                            Tweet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TweetBox;