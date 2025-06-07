export default class PostHandler{
    latestFile = 1;
    async getAllJsonFiles(){
        try{
            let postJsonFile = await fetch("/posts/posts.json");
            return await postJsonFile.json();
        }
        catch(e){
            return {
                success:false,
                message:"There has been some problem with fetching the posts.",
                error:e
            }
        }
    }
    async getLatestJsonFile() {
        try {
            let latestFile = await this.getAllJsonFiles();
            latestFile = latestFile.posts[0];
            this.latestFile = latestFile;
            let latestJsonFileContent = (await fetch(`/posts/posts${latestFile.toString()}.json`)).json();
            return latestJsonFileContent;
        }
        catch (e) {
            return {
                success: false,
                message: "There has been some problem with fetching the latest JSON file.",
                error: e
            }
        }
    }
    async getPreviousJsonFile() {
        try {
            let latestFile = this.latestFile;
            if (latestFile == 1){
                throw new Error("getPreviousJsonFile can't be called before calling getLatestJsonFile method.");
            }
            let previousJsonFileContent = (await fetch(`/posts/posts${latestFile-1}.json`)).json();
            return previousJsonFileContent;
        }
        catch (e) {
            return {
                success: false,
                message: "There has been some problem with fetching the prevoius JSON file.",
                error: e
            }
        }
    }
}