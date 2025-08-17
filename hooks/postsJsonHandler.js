
export default class PostHandler{
    // constructor(){
    //     this.setLatestJsonFile();
    //     this.latestFile = 2;
    //     this.currentJSON_File = this.latestFile;
    // }

    // async setLatestJsonFile(input){
    //     if (!input){
    //     let postsFile = await this.getAllJsonFiles();
    //     this.latestFile = postsFile[0];
    //     this.currentJSON_File = this.latestFile;
    //     }
    //     else{
    //         this.latestFile = input;
    //     }
    // }
    
    // moveToPreviousFile(){
    //     console.log("The current file is ", this.currentJSON_File);
    //     let currfile = this.currentJSON_File;
    //     if (currfile!=1){
            
    //         this.currentJSON_File = currfile-1;
    //     }
    // }

    // moveToNextFile(){
    //     let currFile = this.currentJSON_File;
    //     this.currentJSON_File = currFile+1;
    // }

    // async getAllJsonFiles(){
    //     try{
    //         let postJsonFile = await fetch("/posts/posts.json");
    //         return await postJsonFile.json();
    //     }
    //     catch(e){
    //         return {
    //             success:false,
    //             message:"There has been some problem with fetching the posts.",
    //             error:e
    //         }
    //     }
    // }

    // async getCurrentJsonFile() {
    //     try {
    //         let latestJsonFileContent = (await fetch(`/posts/posts${this.currentJSON_File.toString()}.json`)).json();
    //         return latestJsonFileContent;
    //     }
    //     catch (e) {
    //         return {
    //             success: false,
    //             message: "There has been some problem with fetching the latest JSON file.",
    //             error: e
    //         }
    //     }
    // }

    // async getLatestJsonFile() {
    //     try {
    //         let latestFile = await this.getAllJsonFiles();
    //         latestFile = latestFile.posts[0];
    //         this.setLatestJsonFile(latestFile);
    //         let latestJsonFileContent = (await fetch(`/posts/posts${latestFile.toString()}.json`)).json();
    //         return latestJsonFileContent;
    //     }
    //     catch (e) {
    //         return {
    //             success: false,
    //             message: "There has been some problem with fetching the latest JSON file.",
    //             error: e
    //         }
    //     }
    // }

    // async getPreviousJsonFile() {
    //     try {
    //         let latestFile = this.latestFile;
    //         if (latestFile == 1){
    //             throw new Error("getPreviousJsonFile can't be called before calling getLatestJsonFile method.");
    //         }
    //         let previousJsonFileContent = (await fetch(`/posts/posts${latestFile-1}.json`)).json();
    //         return previousJsonFileContent;
    //     }
    //     catch (e) {
    //         return {
    //             success: false,
    //             message: "There has been some problem with fetching the prevoius JSON file.",
    //             error: e
    //         }
    //     }
    // }

    // constructor
}