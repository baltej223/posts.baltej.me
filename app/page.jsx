"use client";
// import Content from "../content/index.mdx"
import { useEffect, useState } from "react";
import Loader from "@/components/loader";

function LoadPosts(){
    let [content, setContent] = useState(<Loader/>);
    useEffect(()=>{
        // let posts = post
    });
    return (<>
    {content}
    </>)
}

export default function Page(){
    return (
    <>
    <LoadPosts/>
    </>)
}