import { createPost } from "../api/posts/index.mjs";

export function setCreatePostFormListener() {
  const form = document.querySelector("#createPost");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = event.target;
      const title = formData.title.value;
      const description = formData.description.value;
      const endsAt = formData.endsAt.value;
      const tags = formData.tags.value.split(',').map(tag => tag.trim());
      const media = formData.media.value.split(',').map(mediaItem => mediaItem.trim());

      const createData = {
        title,
        description,
        tags,
        media,
        endsAt
      };

      createPost(createData).then(response => {
        alert("Post published successfully!");

        setTimeout(() => {
          window.location.href = '/profile';
        }, 300);
      }).catch(error => {
        console.error("Failed to publish the post:", error);
        alert("Failed to publish the post. Please try again.");
      });
    });
  }
}
