import { LOGIN_URl } from "../endpoints.mjs";
import * as storage from "../../storage/index.mjs";

export async function login(profile) {
  try {
    const loginURL = LOGIN_URl;
    const body = JSON.stringify(profile);

    const response = await fetch(loginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!response.ok) {
      throw new Error('Please enter a valid email and password');
    }

    const { accessToken, ...user } = await response.json();

    storage.save("token", accessToken);
    storage.save("profile", user);

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);

    alert("You are now logged in");
  } catch (error) {
    alert(error.message);
  }
}
