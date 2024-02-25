import { LISTINGS_URL } from "../endpoints.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/bids";
const method = "post";

export async function bidOnPost(amount) {
  try {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const postID = params.get("id");

    if (!postID) {
      throw new Error("Post ID not found in query parameters.");
    }

    console.log("Post ID:", postID);

    const bidURL = `${LISTINGS_URL}/${postID}/bids`;

    console.log("Bid URL:", bidURL);
    console.log("Bid Amount:", amount);

    const response = await authFetch(bidURL, {
      method,
      body: JSON.stringify({ amount }),
    });

    const jsonResponse = await response.json();
    console.log("Server Response:", jsonResponse);

    return jsonResponse;
  } catch (error) {
    console.error("Error while processing bid:", error.message);
    throw error;
  }
}


