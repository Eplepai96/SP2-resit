import { getPosts } from "../api/posts/read.mjs";
import { renderPostTemplates } from "../templates/postTemplates.mjs";
import { setupSearch } from "../api/posts/search.mjs";

export async function setDisplayListingsListener() {
    console.log('All posts called');
    const posts = await getPosts();
    const postContainer = document.querySelector('#all-posts');
    renderPostTemplates(posts, postContainer);

    setupSearch(posts);
}
