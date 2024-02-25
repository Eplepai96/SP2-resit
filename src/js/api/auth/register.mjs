import { REGISTER_URL } from "../endpoints.mjs";

const method = "post";

export async function register(profile) {
  const registerURL = REGISTER_URL;
  const body = JSON.stringify(profile);

  const response = await fetch(registerURL, {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body
  })

  const result = await response.json()
  alert("You are now registered")
  return result
}
