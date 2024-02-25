import { LISTINGS_URL } from "../endpoints.mjs";
import { authFetch } from "../authFetch.mjs";

const method = "delete";

export async function removePost(id) {
  if (!id) {
    throw new Error("Delete requires a postID");
  }

  const updatePostURL = `${LISTINGS_URL}/${id}`;
  
  const response = await authFetch(updatePostURL, { method });

  if (!response.ok) {
    throw new Error(`Error deleting post: ${response.statusText}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
}
