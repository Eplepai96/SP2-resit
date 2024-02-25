import { LISTINGS_URL } from "../endpoints.mjs";
import { getData } from "../callEndpoints.mjs";
import { authFetch } from "../authFetch.mjs"


export async function getPosts() {
    console.log('Posts called')
  const postURL = `${LISTINGS_URL}`;
  
  const response = await getData(postURL)

  return await response.json();
}

export async function getPost(id) {
  
  const queryString = document.location.search;

  const params = new URLSearchParams(queryString);

  const postID = params.get("id");

  const getPostURL = `${LISTINGS_URL}/${postID}`;
  
  const response = await authFetch(getPostURL)

  console.log(getPostURL)

  return await response.json();
}