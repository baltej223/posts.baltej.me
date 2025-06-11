// This scripts reads the ./storage and genrate the posts in ../app folder.

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const URLS_IN_ONE_FILE = 10;

// Here I am reading the all the files in ./storage folder and then filtering out the ones which are not posts.json
const filenames = readdirSync("./storage").filter(file => file != "posts.json");

// For Debuggin:
// console.log(filenames);

// A helper function which will return the path from inside of storage directory
function inStorage(path) {
    return "./storage/" + path;
}

// A helper function which returns the absoluete path of the app directory and if any argument is provided then, 
// it joines the provided path with the aboluete path of app dir. 
function inApp(_path = "") {
    // Path to app [relative] is
    let appPath = "../app"
    return path.join(path.resolve(__dirname, appPath), path.normalize(_path));
}

function inPublic(_path = "") {
    // Path to app [relative] is
    let appPath = "../public"
    return path.join(path.resolve(__dirname, appPath), path.normalize(_path));
}

function inPostDir(_path = "") {
    return path.join(inPublic("posts"), path.normalize(_path));
}

const months = { 0: "Jan", 1: "Feb", 2: "March", 3: "April", 4: "May", 5: "June", 6: "July", 7: "Aug", 8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec" }

filenames.forEach((file) => {
    let dt = new Date(file.replace(".mdx", ""));
    let year = dt.getFullYear();
    let month = months[dt.getMonth()];
    let day = dt.getDate(); // the date\

    // For Debuggin:
    console.log(year, month, day, inStorage(file));

    let filePath = `${month}-${year}/${day}`; // The filepath of the note in App dir
    let mdxFile = readFileSync(inStorage(file), "utf-8"); // The content of the mdx file in ./storage
    let name = JSON.parse(readFileSync(inStorage("posts.json")))[dt];
    mdxFile = `export const metadata = {
title:"${name.replace(/-/g, " ")}",
description: "With love and passion by Baltej Singh",
}

${mdxFile}
    `
    console.log(name);

    checkAndWrite(inApp(filePath + "/" + name + "/" + "page.mdx"), mdxFile);

    // Add the new post's URL to the appropriate JSON file inside /public/posts/
    // Structure:
    // /public/posts/
    // ├─ posts.json            --> Index file containing URLs of all post list files (e.g., posts1.json, posts2.json)
    // ├─ posts1.json           --> Contains 10–15 post URLs
    // ├─ posts2.json
    // ├─ posts3.json
    // └─ posts4.json           --> The latest post's URL should go here [basically the last one]

    // Notes:
    // - Each postsX.json file holds a batch of post URLs.
    // - posts.json acts as a master index, listing all postsX.json files.
    // - New posts go into the latest postsX.json (e.g., posts4.json).

    // So clearly for finding the latest post, The Browser should first fetch post.json at "/posts/posts.json"
    // Then browser will find out the latest JSON file [the one which have to latest post, as latest posts will be displayed at the top]
    // It will be done by itrating over an array, whose first element will be the latest one. first for optimisation.
    // Then the browser will fetch the latest JSON file and display all the post URLs.
    // Even If the user want to search all the posts, It can be accompalished by fetching JSON files one by one.
    // And the best part is that No DB needed, as DB needs money, And I am broke. :0

    // Clearly first we have to create posts.json file is not exists.
    // First create post dir

    if (!existsSync(inPostDir())){
        mkdirSync(inPostDir());
    }

    const posts_json = {
        create: (number = "", callback=()=>{}) => {
            try {
                if (!existsSync(inPostDir(`posts${number}.json`))){
                    writeFileSync(inPostDir(`posts${number}.json`), number==""?'{"posts":[]}':'{"urls":[]}', "utf-8");
                    callback();
                }
                else{
                    console.log("File already exists.");
                    callback();
                }
            }
            catch(e){
                throw new Error(e);
            }
        },
        read:(number="")=>{
            return JSON.parse(readFileSync(inPostDir(`posts${number}.json`), "utf-8"));
        },
        write:(number=1, obj)=>{
            let jsn;
            try {jsn = JSON.stringify(obj);}
            catch(e){throw new Error("The object provided for writing, is not serilisable.", e);}
            writeFileSync(inPostDir(`posts${number}.json`), jsn);
        }
    }
    // Makes posts.json file if not exists.
    posts_json.create(); // It will create posts.json in folder posts
    
    // Now read the posts.json file to find all the URL [postsX.json] files
    let postsFiles = posts_json.read().posts;
    // We created the posts.json file, if not exists and in that case var postsFiles will have an object cointaing an empty array
    // console.log(postsFiles);
    // { posts: [...elements] }
    // example: { posts: [4,3,2,1] }
    // The first link will be the latest one.
    let latest = postsFiles[0] // The latest one. 
    if (latest == undefined){
        // Means there are no files. May be using for the first time.
        posts_json.create(1);
        let post_index_file = posts_json.read();
        post_index_file.posts.unshift(1)
        posts_json.write("",post_index_file);
    }
    // So till now, We ensured that the public/posts dir exists, and if not created. Then created posts.json if not exists and then created posts1.json if none of the file exists. 
    // Now our original goal was to add the entry for freshly built mdx files in app dir.
    latest = posts_json.read().posts[0];
    // Reading the latest file.
    let latest_json_file = posts_json.read(latest);
    let latest_json_file_URLs = latest_json_file.urls;
    // Now checking if there are already ${URLS_IN_ONE_FILE}, [10] entries in the latest_json_file then create a new one.
    // The following code block will be dedicated for this perpose only.
    if (latest_json_file_URLs.length >= URLS_IN_ONE_FILE){
        // Now creating newfile for which 'postX.json', X = last_X + 1;
        // For which I need the read the file which have the URLs of the postX files.
        // Clearly I can reuse the variable latest.
        posts_json.create(latest+1);
        // It will create a new file.
        // Now I have to add it to posts.json file and also shift the latest varible to post the freshly created file.
        let post_index_file = posts_json.read(); // will read the posts.json file.
        post_index_file.posts.unshift(latest+1);
        posts_json.write(1, post_index_file);
    }
    latest = posts_json.read().posts[0];
    // Now finally writting the newly built post to the latest postsX.json file
    latest_json_file = posts_json.read(latest);
    console.log(latest_json_file);
    let entry = `/${filePath}/${name}/`;
    if (!latest_json_file.urls.includes(entry)){
        latest_json_file.urls.unshift(`/${filePath}/${name}/`);
        posts_json.write(latest, latest_json_file)
    }
});

// A helper function which can create files which have deeply nested URLS. 
function checkAndWrite(filePath, content) {
    const dir = path.dirname(filePath);

    // Create directory tree if it doesn't exist
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
        console.log('Directory created:', dir);
    }

    // Write file if it doesn't exist
    if (!existsSync(filePath)) {
        writeFileSync(filePath, content, 'utf8');
        console.log('File created:', filePath);
    } else {
        console.log('File already exists:', filePath);
    }
}