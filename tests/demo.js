
let postsData = require("../data/posts");

async function main(){
    let posts = await postsData.getPostsByUser("6257b2085c63aa640c130918");
    console.log(posts);
}
main();