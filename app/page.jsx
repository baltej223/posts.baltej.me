"use client";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";
import PostHandler from "@/hooks/postsJsonHandler";

function LoadPosts() {
    let [content, setContent] = useState(<Loader />);
    let [json, setJson] = useState({});
    useEffect(() => {
        const posts_handler = new PostHandler();

        (async () => {
            let postsJson0 = await posts_handler.getAllJsonFiles();
            let latest = postsJson0.posts[0];
            console.log(latest);
        })();

        (async () => {
            let postsJsonX = await posts_handler.getLatestJsonFile();
            console.log(await postsJsonX);
        })();

        setTimeout(() => {
            (async () => {
                let postsJsonX = await posts_handler.getPreviousJsonFile();
                console.log(await postsJsonX);
            })();

        }, 2000);

        setTimeout(()=>{
            setContent(<A_post/>);
        }, 1000);
    }, []);

    return (<>
        {content}
    </>)
}

export default function Page() {
    return (
        <>
            {/* <Squares
                speed={0.5}
                squareSize={40}
                direction='diagonal' // up, down, left, right, diagonal
                borderColor='#fff'
                hoverFillColor='#222'
            /> */}
            <LoadPosts />
        </>)
}

function PostViewer({json}){
    let [posts, setPosts] = useState([]); // [{title:"Some post tilte", date:"21-08-26"}]
}

function A_post({title, date, isLast=0}){
    return (
    <>
    <div className="flex flex-row justify-center item-center pb-5">
        <div className="w-[80%]">
            <div className="flex flex-row justify-between">
                <div className="text-2xl font-bold">
                    Title
                </div>
                <div className="text-xl">
                    date
                </div>
            </div>
        </div>
    </div>
    {isLast?"":<hr className="h-0.5 w-full border-0 bg-gradient-to-r from-transparent via-white to-transparent" />}
    </>
    )
}