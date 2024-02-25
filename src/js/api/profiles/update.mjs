import { PROFILES_URL } from "../endpoints.mjs";
import { authFetch } from "../authFetch.mjs";

const method = "put";

export async function updateProfile(profileData) {
  if (!profileData.name) {
    throw new Error("Update requires a name");
  }

  const updateProfileURL = `${PROFILES_URL}/${profileData.name}/media`;

  try {
    const response = await authFetch(updateProfileURL, {
      method,
      body: JSON.stringify(profileData),
    });
    if (response.ok) {
      alert("Profile updated successfully!");
    } else {
      const errorData = await response.json();
      alert(`Failed to update profile: ${errorData.message || "An error occurred."}`);
    }
    setTimeout(() => {
      window.location.href = "/profile"; 
    }, 1000);

    return await response.json();
  } catch (error) {

    alert(`An error occurred: ${error.message}`);
    throw error; 
  }
}
