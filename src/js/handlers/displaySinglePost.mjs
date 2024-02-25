import { getPost } from "../api/posts/read.mjs";
import { renderPostTemplate } from "../templates/index.mjs";


export async function setDisplayListingListener() {
    const post = await getPost();
    const postContainer = document.querySelector('#viewPost');
    renderPostTemplate(post, postContainer);
}
