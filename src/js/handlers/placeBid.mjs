import { bidOnPost } from "../api/posts/bid.mjs";

export async function setBidListener() {
  const form = document.querySelector(".bidForm form");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const bidInput = document.querySelector("#bidInput");
      const rawAmount = bidInput.value.trim(); 
      const amount = parseFloat(rawAmount); 

      console.log(`Raw Input: '${bidInput.value}'`); 
      console.log(`Trimmed Input: '${rawAmount}'`); 
      console.log(`Parsed Amount: ${amount}`);

      if (isNaN(amount) || amount <= 0) {
        console.error("Invalid bid amount. Please enter a valid number greater than 0.");
        alert("Invalid bid amount. Please enter a valid number greater than 0."); 
        return; 
      }

      try {
        await bidOnPost(amount);
      } catch (error) {
        console.error("Error while processing bid:", error.message);
      }
    });
  }
}

