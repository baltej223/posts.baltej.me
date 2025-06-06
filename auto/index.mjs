import express from "express";
import { fstat, readFile, readFileSync, writeFileSync } from "fs";

let app = express();
app.use(express.json());


const Req_logger = (type, data) => {
    if (type.toLowerCase() == "get" || type.toLowerCase() == "g"){
        console.log("GET %s at %s", data?.url || "", new Date().toLocaleTimeString());
    }
    else if (type.toLowerCase() == "post" || type.toLowerCase() == "p"){
        console.log("POST %s at %s", data?.url || "", new Date().toLocaleTimeString());
    }
}

app.get("/",(req, res)=>{
    Req_logger('g', {url:"/"});
    res.header("content-type", "text/html; charset=utf-8");
    let html = readFile("index.html", "utf-8", (err, data)=>{
        err ? new Error("Error Readind index.html file") : res.send(data);
    });
});

app.post('/', (req, res) => {
    console.log(req.body);
    const { name, content } = req.body;
    // console.log('Received MDX content:\n', content);
    let date = new Date();
    writeFileSync(`./storage/${date}.mdx`, content);
    let postNames = JSON.parse(readFileSync("./storage/posts.json"));
    postNames[date] = name.replace(/ /g, "-");
    writeFileSync("./storage/posts.json", JSON.stringify(postNames));
    res.json({ success: true, message: 'Post received!' });
  });
  

app.listen(4245);