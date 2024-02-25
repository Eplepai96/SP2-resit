import { PROFILES_URL } from "../endpoints.mjs";
import { authFetch } from "../authFetch.mjs"


export async function getProfiles() {
  const updateProfileURL = `${PROFILES_URL}`;
  
  const response = await authFetch(updateProfileURL)

  return await response.json();
}

export async function getProfile(name) {
  if (!name) {
    throw new Error("Get requires a name");
  }

  const getProfileURL = `${PROFILES_URL}/${name}`;
  
  const response = await authFetch(getProfileURL, name)

  return await response.json();
}

export async function getProfilePosts(name) {
  if (!name) {
    throw new Error("Get requires a name");
  }

  const getProfilePostsURL = `${PROFILES_URL}/${name}/listings`;
  
  const response = await authFetch(getProfilePostsURL)

  return await response.json();
}