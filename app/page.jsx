"use client";
import { useEffect, useState, Fragment } from "react";
import Loader from "@/components/loader";
import PostHandler from "@/hooks/postsJsonHandler";

export default function Page() {
    return (
        <>
            <LoadPosts />
        </>)
}

function LoadPosts() {
    let [content, setContent] = useState(<Loader />);
    let [posts, setPosts] = useState([]);
    // [{title:"abla", date:"13-32-25"}, {title:"abla", date:"13-32-25", url:"breh"}, {title:"abla", date:"13-32-25"}]
    // [{title:"abla", date:"13-32-25"}, ...]

    function post_s() {
        // Work of this function is to edit the content state [put the required JSX] whenever posts state is changed.
        // Basically works as a bridge.
        setContent(<>
            {posts.map(
                (post, index) =>
                    <Fragment key={index}>
                        <A_post title={post.title} date={post.date} isLast={index === posts.length - 1} url={`${window.location.origin}${post.url}`}/>
                    </Fragment>
            )}

        </>
        );
    }

    // Once the page had loaded, fetch the posts and render them **Once**.
    useEffect(()=>{
        fetchAndLoadPosts(setPosts);
    },[]);

    
    useEffect(()=>{
        post_s()
    },[posts, setContent]);
    // fetchAndLoadPosts changes the post state so for trigring a rerender

    return (<>
        {content}
    </>)
}

function A_post({ title, date, key, isLast = 0, url }) {
    return (
        <>
            <div className="flex flex-row justify-center item-center pb-7 pt-7" 
            key={key}>
                <div className="w-[80%]">
                    <div className="flex flex-row justify-between">
                        <a className="text-2xl font-bold cursor-pointer" href={url}>
                            {title}
                        </a>
                        <div className="text-xl">
                            {date}
                        </div>
                    </div>
                </div>
            </div>
            {isLast ? "" : <hr className="h-0.5 w-full border-0 bg-gradient-to-r from-transparent via-white to-transparent" />}
        </>
    )
}


async function fetchAndLoadPosts(setPosts) {
    const posts_handler = new PostHandler();

    // let postsJson0 = await posts_handler.getAllJsonFiles();
    // let latest = postsJson0.posts[0];
    // console.log(latest);

    // See the first goal is to render the latest batch of URLs
    let latestXFile = await posts_handler.getLatestJsonFile();
    console.log(await latestXFile);

    // I got the Urls and now rendring them.
    // Parsing data [urls] got from latestJsonFile to get the name and date
    // {urls: ['/June-2025/7/some-random-post-name/', '/June-2025/7/The-intelligent-stupids/']}
    const regex = /^\/([A-Za-z]+)-(\d{4})\/(\d+)\/([^/]+)\/?$/;
    
    let _posts = [];

    latestXFile.urls.forEach((url, index)=>{
       const match = url.match(regex);

        if (match) {
        const [_, month, year, day, slug] = match;
        
        const date = `${day} ${month} ${year}`;    
        const name = slug.replace(/-/g, ' ');
        
        // Writing the name and date in local variable posts and in the end the posts variable will be spread into posts global state using setPosts
        // Other wise each of the URL will be parsed to render one by one. Not good.
        _posts.push({title:name, date, url});

        } else {
        console.log("No match");
        throw new Error("The URLs fetch from latest JSON file can't be parsed, Some Error when static site genrator. Frontend's clean.");
        } 
    });

    setPosts((posts)=>{
        return [..._posts]
    });
}