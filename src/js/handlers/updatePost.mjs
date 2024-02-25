import { getPost } from "../api/posts/read.mjs";
import { updatePost } from "../api/posts/update.mjs";
import { removePost } from "../api/posts/delete.mjs"; 

export async function setUpdatePostListener() {  
  console.log('setUpdatePostListener called');
  const form = document.querySelector("#updatePost");
  const deleteButton = document.querySelector("#deletePost");

  if (!form) {
    console.error("Update post form not found");
    return;
  }
  
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  if (!id) {
    console.error("Post ID not found in the URL");
    return;
  }

  try {
    const post = await getPost(id);
    if (!post) {
      console.error("Failed to fetch post data");
      return;
    }

    form.elements['title'].value = post.title || '';
    form.elements['description'].value = post.description || '';
    form.elements['tags'].value = post.tags.join(', ') || '';
    form.elements['media'].value = post.media.length > 0 ? post.media[0] : '';
    form.elements['endsAt'].value = post.endsAt ? post.endsAt.split('T')[0] : '';

    const button = form.querySelector("button[type='submit']");
    button.disabled = false;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      let updateData = Object.fromEntries(formData.entries());

      updateData.tags = updateData.tags ? updateData.tags.split(',').map(tag => tag.trim()) : [];
      updateData.media = updateData.media ? [updateData.media.trim()] : [];
      updateData.id = id;
      
      try {
        const response = await updatePost(updateData);
        console.log("Post updated successfully:", response);
        window.location.href = '/profile/';
      } catch (error) {
        console.error("Error updating post:", error);
      }
    });

    if (deleteButton) {
      deleteButton.addEventListener("click", async () => {
        if (confirm("Are you sure you want to delete this listing?")) {
          try {
            const response = await removePost(id);
            console.log("Post deleted successfully:", response);
            window.location.href = '/profile/';
          } catch (error) {
            console.error("Error deleting post:", error);
          }
        }
      });
    } else {
      console.error("Delete button not found");
    }
  } catch (error) {
    console.error("Error fetching or updating post:", error);
  }
}
