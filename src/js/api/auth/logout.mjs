import { LOGIN_URl } from "../endpoints.mjs";
import * as storage from "../../storage/index.mjs";

const method = "get";

export async function logout(profile) {
  console.log('signoutButton clicked')
  const loginURL = LOGIN_URl;
  const body = JSON.stringify(profile);

  const response = await fetch(loginURL, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });

  const { accessToken, ...user } = await response.json();

  storage.remove("token", accessToken);

  storage.remove("profile", user);

  setTimeout(() => {
    window.location = ("/profile/login")
  }, 1000);
  alert("You are now logged out");
}