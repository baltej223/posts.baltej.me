import { readFileSync, writeFileSync, existsSync, unlinkSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "node:path";
console.log("**********Starting Optimise Script**********");
console.log("at", new Date().toLocaleTimeString());
console.time("Time Taken for optimisation");
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// First check that all the file in the storage are already built or not.
function inStorage(_path) {
  let Storage_location = "./storage";
  return path.join(path.resolve(__dirname, Storage_location), _path);
}
function inAppDirectory(_path) {
  return path.normalize(
    path.join(path.resolve(__dirname, "../app"), path.normalize(_path)),
  );
}
// First read post.json
let posts;
try {
  posts = JSON.parse(readFileSync(inStorage("posts.json"), "utf-8"));
} catch (e) {
  throw new Error("Unable to parse JSON.");
}
// I got the posts, Now we have to check that if all of them are built or not
console.log("-------Entries in posts.json:-----\n");
Object.keys(posts).forEach((time, index) => {
  let filename = posts[time];
  console.log(`${index} : ${filename}.mdx`);
});
console.log("-------------------------------------");
// Checking if they are built.
let postKeys = Object.keys(posts);
function isBuilt(time) {
  let filename = posts[time];
  // console.log(filename);
  // let fileLoc = "";
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let dt = new Date(time);
  let year = dt.getFullYear();
  let month = months[dt.getMonth()];
  let day = dt.getDate();
  let fileLocation = `${month}-${year}/${day}/${filename}/page.mdx`; // File Location in app directory
  let absFileLocation = inAppDirectory(fileLocation);
  // console.log("64",absFileLocation);
  // console.log("65", existsSync(absFileLocation));
  if (existsSync(absFileLocation)) {
    console.log(
      "\nLog: File :",
      filename,
      "is built at location:",
      absFileLocation,
      "\n",
    );
    return true;
  } else {
    console.log(
      "\nLog: File :",
      filename,
      "is **not** built at location:",
      absFileLocation,
      "\n",
    );
    return false;
  }
}
postKeys.forEach((time_of_creation) => {
  let filename = time_of_creation;
  // console.log("[%d]\nFileName : %s\nLocation:'%s'\nexists?:%s",index, filename, inStorage(filename)+".mdx", existsSync(inStorage(filename)+".mdx").toString(), "\n");
  if (!(existsSync(inStorage(filename)) + ".mdx")) {
    // May be someone deleted the file manually from storage and may be already built, checking if it is built or not.
    console.log(
      `The File: ${posts[filename]}'s entry is found in posts.json but it doesn't seems to be present in storage.\n`,
    );
    console.log("Checking if it is built or not.\n");
    if (isBuilt(filename)) {
      console.log("File is already built, safely ignoring posts.json\n");
    } else {
      console.log(
        "Built file not found. Someone seems to manually edited the posts.json file, and forgot to delete the entry.\n",
      );
    }
  }
  if (!isBuilt(filename)) {
    throw new Error(
      `Error: File entry in posts.json from name "${posts[filename]}" is not built. Run "npm run build-posts;"`,
    );
  }
  // Now clear the posts.json file and also delete all the files in storage except posts.json file.
});
postKeys.forEach((filename) => {
  unlinkSync(inStorage(`${filename}.mdx`));
  console.log("Deleted file" + posts[filename]);
  writeFileSync(inStorage("posts.json"), "{}");
  console.log("Cleared posts.json file\n");
});
console.timeEnd("Time Taken for optimisation");
