import { LISTINGS_URL } from "../endpoints.mjs";

import { authFetch } from "../authFetch.mjs"


const method = "post";

export async function createPost(postData) {
  const createPostURL = LISTINGS_URL;
  
  const response = await authFetch(createPostURL, {
    method,
    body: JSON.stringify(postData)
  })

  return await response.json();
}