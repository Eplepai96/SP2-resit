import { getProfile, getProfilePosts } from "../api/profiles/index.mjs";
import { renderEditTemplates } from "../templates/postTemplates.mjs";
import { load } from "../storage/index.mjs";

export async function setDisplayProfileListener() {
  const profilePostsContainer = document.querySelector("#profilePostsContainer");
  const nameContainer = document.querySelector("#nameContainer");
  const avatarContainer = document.querySelector("#avatarContainer");
  const creditsContainer = document.querySelector("#creditsContainer");

  try {
    const userProfile = load("profile");

    if (!userProfile || !userProfile.name) {
      console.error("Profile information or username not found in local storage");
      return;
    }

    const { name: username } = userProfile;

    const profile = await getProfile(username);
    const img = document.createElement("img");
    img.src = profile.avatar
    img.alt = profile.name
    img.classList.add("profile-img", "d-flex", "justify-content-center"); 
    avatarContainer.append(img);
    nameContainer.innerText = profile.name;

    creditsContainer.innerText = profile.credits;

    console.log(profile)
    const profilePosts = await getProfilePosts(username);
    renderEditTemplates(profilePosts, profilePostsContainer);
  } catch (error) {
    console.error("Error fetching profile:", error.message);
  }
}
