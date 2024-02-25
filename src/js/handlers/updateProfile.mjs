import { getProfile, updateProfile } from "../api/profiles/index.mjs";

import { load } from "../storage/index.mjs";

export async function setUpdateProfileListener() {
  const form = document.querySelector("#editProfile");
  const emailContainer = document.querySelector("#emailContainer")
  const nameContainer = document.querySelector("#nameContainer")
  // const bannerContainer = document.querySelector("#bannerContainer")
  const avatarContainer = document.querySelector("#avatarContainer")

  if (form) {
    
    const { name, email } = load("profile")
    form.name.value = name;
    form.email.value = email;

    const button = form.querySelector("button");
    button.disabled = true;

    const profile = await getProfile(name);

    form.banner.value = profile.banner;
    form.avatar.value = profile.avatar;

    button.disabled = false;

    form.addEventListener("submit", (event) => {
      event.preventDefault()
      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries())

      profile.name = name;
      profile.email = email;
      
      updateProfile(profile)
    })
    nameContainer.innerText = profile.name;
    emailContainer.innerText = profile.email;
    // bannerContainer.innerText = profile.banner;
    avatarContainer.innerText = profile.avatar;
  }
}