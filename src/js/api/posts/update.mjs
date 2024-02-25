import { LISTINGS_URL } from "../endpoints.mjs";

import { authFetch } from "../authFetch.mjs"

const method = "put";

export async function updatePost(postData) {
  console.log('updatePost called')
  if (!postData.id) {
    throw new Error("Update requires a postID");
  }

  const updatePostURL = `${LISTINGS_URL}/${postData.id}`;
  
  const response = await authFetch(updatePostURL, {
    method,
    body: JSON.stringify(postData)
  })

  return await response.json();
}