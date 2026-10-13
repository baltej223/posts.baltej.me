import express from "express";
import { fstat, readFile, readFileSync, writeFileSync, readdirSync, renameSync, existsSync } from "fs";
import path from "path";


let app = express();
app.use(express.json());

const Req_logger = (type, data) => {
  if (type.toLowerCase() == "get" || type.toLowerCase() == "g") {
    console.log(
      "GET %s at %s",
      data?.url || "",
      new Date().toLocaleTimeString(),
    );
  } else if (type.toLowerCase() == "post" || type.toLowerCase() == "p") {
    console.log(
      "POST %s at %s",
      data?.url || "",
      new Date().toLocaleTimeString(),
    );
  }
};

app.get("/", (req, res) => {
  Req_logger("g", { url: "/" });
  res.header("content-type", "text/html; charset=utf-8");
  let html = readFile("index.html", "utf-8", (err, data) => {
    err ? new Error("Error Readind index.html file") : res.send(data);
  });
});

function newPOST(name, content) {
  // console.log('Received MDX content:\n', content);
  let date = new Date();
  writeFileSync(`./storage/${date}.mdx`, content);
  let postNames = JSON.parse(readFileSync("./storage/posts.json"));
  postNames[date] = name.replace(/ /g, "-");
  writeFileSync("./storage/posts.json", JSON.stringify(postNames));
}

let router = express.Router();

router.get("/all_folders_in_app", (req, res) => {
  // res.json({"crazy":"ya"});
  // It reads and send the information of all the posts 
  // in folder app so that user can edit the older posts if want
  //
  // Read the folder structure.
  try {
    let files = readdirSync("../", { recursive: true });

    // console.log(files);
    files = files.filter((element) => {
      if (element.endsWith(".mdx") && !element.includes("_page")) {
        return true;
      }
      return false;
    });

    console.log(files);

    files = files.map(file => file.replace("app/", ""));

    // console.log(files);
    res.json(files);
  }
  catch (e) {
    res.status(500).json({ error: e });
  }
});


function inApp(_path = "") {
  // Path to app [relative] is
  let appPath = "../app";
  return path.join(path.resolve(__dirname, appPath), path.normalize(_path));
}

router.get("/get_post/:monthYear/:date/:name", async (req, res) => {
  const { monthYear, date, name } = req.params;
  let json = { monthYear, date, name }
  // res.json({monthYear, date, name})
  // Now lets read the actual file 
  const file_data = await readFileSync(inApp(`${monthYear}/${date}/${name}/page.mdx`), 'utf-8');
  console.log(await file_data);
  json.data = file_data;
  res.send(json);
});

router.post("/receive_post", (req, res) => {
  let json = req.body;
  console.log(json);
  if (json == undefined || !json.monthYear || !json.date || !json.name || !json.data) {
    res.send({ error: "BAD REQUEST" });
  }

  const { monthYear, date, name, data } = json;

  const postDir = inApp(`${monthYear}/${date}/${name}`);
  const pagePath = path.join(postDir, "page.mdx");
  // const oldPagePath = path.join(postDir, "_page.mdx");

  const isNewPost = !existsSync(pagePath);

  if (isNewPost) {
    newPOST(name, data);
    res.json({ success: true, message: "Post received!" });
  }
  else {
    // Now change the content of json stored at the location 
    //
    let file_addr = inApp(`${json.monthYear}/${json.date}/${json.name}`);
    // purani file ka name _page.mdx and new file create jiska name page.mdx
    renameSync(file_addr + "/page.mdx", file_addr + "/_page.mdx");
    writeFileSync(file_addr + "/page.mdx", json.data);
    res.send({ "message": "success" })
  }
});

app.use("/api", router);

app.listen(4245, () => {
  console.log("Server Started on http://localhost:4245/");
});
