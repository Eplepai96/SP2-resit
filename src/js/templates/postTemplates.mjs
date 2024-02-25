import { getProfile } from "../api/profiles/read.mjs";
import { load } from "../storage/index.mjs";

export function postsTemplate(data) {
  console.log('PostsTemplate called');

  const card = document.createElement("div");
  card.classList.add("card"); 
  card.style.width = "18rem"; 

  const img = document.createElement("img");
  img.src = data.media || "/images.img/heather-ford-5gkYsrH_ebY-unsplash.jpg";
  img.alt = `image from ${data.title}`;
  img.classList.add("card-img-top"); 
  card.append(img);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body"); 

  if (data.title) {
    const title = document.createElement("h5");
    title.classList.add("card-title"); 
    title.innerText = data.title;
    cardBody.append(title);
  }

  if (data.description) {
    const description = document.createElement("p");
    description.classList.add("card-text"); 
    description.innerText = data.description;
    cardBody.append(description);
  } else {
    const description = document.createElement("p");
    description.classList.add("card-text"); 
    description.innerText = "This post has no description";
    cardBody.append(description);
  }

  if (data.endsAt) {
    const endsAtDate = new Date(data.endsAt);
    const currentDate = new Date();
    const hasEnded = endsAtDate < currentDate;

    const endsHeader = document.createElement("h5");
    endsHeader.innerText = "Ends:";

    const time = document.createElement("p");
    time.innerText = endsAtDate.toISOString().split('T')[0];

    const timeDifference = (endsAtDate - currentDate) / (1000 * 60 * 60 * 24);

    if (hasEnded) {
        time.style.textDecoration = "line-through";
        time.style.color = "#686868"; 
        time.style.opacity = "0.8";

        const endedText = document.createElement("span");
        endedText.innerText = " Ended";
        endedText.style.fontWeight = "bold";
        time.appendChild(endedText);
    } else if (timeDifference < 1) {
        time.classList.add("text-secondary");
        const endsSoonText = document.createElement("span");
        endsSoonText.innerText = " Ends soon";
        endsSoonText.style.fontWeight = "bold";
        time.appendChild(endsSoonText);
    } else {
        time.style.color = "green";
    }

    cardBody.append(endsHeader, time);
}

  const link = document.createElement("a");
  link.href = `/listings/listing/?id=${data.id}`;
  link.classList.add("btn", "btn-primary", "w-100", "my-2"); 
  link.innerText = 'View listing';

  cardBody.append(link);

  card.append(cardBody);

  console.log(data);
  return card;
}

async function fetchBidsForItem(itemId) {
  const url = `https://api.noroff.dev/api/v1/auction/listings/${itemId}?_bids=true`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Response was not ok:', response);
      throw new Error(`Network response was not ok, status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Bids data:', data); 
    if (data.bids && data.bids.length > 0) {
      const highestBid = data.bids.reduce((max, bid) => bid.amount > max ? bid.amount : max, data.bids[0].amount);
      return highestBid;
    } else {
      return null; 
    }
  } catch (error) {
    console.error('Failed to fetch bids:', error);
    return null; 
  }
}


export function editTemplate(data) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.width = "18rem";

  const img = document.createElement("img");
  img.src = data.media || "/images.placeholder/img/heather-ford-5gkYsrH_ebY-unsplash.jpg";
  img.alt = `Image of ${data.title}`;
  img.classList.add("card-img-top");
  card.append(img);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  if (data.title) {
    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.innerText = data.title;
    cardBody.append(title);
  }

  const bidCountInfo = document.createElement("p");
  bidCountInfo.classList.add("bid-count-info");
  if (data._count && data._count.bids > 0) {
    bidCountInfo.innerText = `Number of bids: ${data._count.bids}`;
  } else {
    bidCountInfo.innerText = "Number of bids: 0";
  }
  cardBody.append(bidCountInfo);

  const bidsInfo = document.createElement("p");
  bidsInfo.classList.add("bids-info");
  cardBody.append(bidsInfo);

  if (data.id) {
    fetchBidsForItem(data.id).then(highestBid => {
      if (highestBid !== null) {
        bidsInfo.innerText = `Highest bid: $${highestBid}`;
      } else {
        bidsInfo.innerText = "This post has no bids";
      }
    }).catch(error => {
      console.error('Error fetching bids:', error);
      bidsInfo.innerText = "Error loading bids";
    });
  }

  const link = document.createElement("a");
  link.href = `edit/listing/?id=${data.id}`;
  link.classList.add("btn", "btn-primary", "w-100", "my-2");
  link.innerText = 'Edit listing';
  cardBody.append(link);

  card.append(cardBody);

  return card;
}

export async function postTemplate(data) {
  const imageContainer = document.querySelector("#imageContainer");
  imageContainer.innerHTML = ''; // Clear existing content
  const descriptionContainer = document.createElement("div");

  if (data.title) {
    const title = document.createElement("h1");
    title.innerText = data.title;
    descriptionContainer.append(title);
  }

  if (data.media) {
    const img = document.createElement("img");
    img.src = data.media;
    img.alt = `image from ${data.title}`;
    img.style.height = "350px";
    img.style.objectFit = "cover";
    img.classList.add("col-12", "col-md-6", "img-fluid", "w-100", "post-image");
    imageContainer.append(img);
  }

  if (data.description) {
    const descriptionHeader = document.createElement("h3");
    descriptionHeader.innerText = "Description:";
    const description = document.createElement("p");
    description.innerText = data.description;
    description.classList.add("mb-5");
    descriptionContainer.append(descriptionHeader, description);
  } else {
    const descriptionHeader = document.createElement("h2");
    descriptionHeader.innerText = "Description:";
    const description = document.createElement("p");
    description.innerText = "This post has no description";
    descriptionContainer.append(descriptionHeader, description);
  }

  const timeElement = document.createElement("p");
  if (data.endsAt) {
      const endsAtDate = new Date(data.endsAt);
      const currentDate = new Date();
      const hasEnded = endsAtDate < currentDate;
  
      timeElement.innerText = `Ends: ${endsAtDate.toISOString().split('T')[0]}`;
      const timeDifference = (endsAtDate - currentDate) / (1000 * 60 * 60 * 24);
  
      if (hasEnded) {
          timeElement.style.textDecoration = "line-through";
          timeElement.style.color = "#686868";
          timeElement.style.opacity = "0.8";
  
          const endedText = document.createElement("span");
          endedText.innerText = " Ended";
          endedText.style.fontWeight = "bold";
          timeElement.appendChild(endedText);
      } else if (timeDifference < 1) {
          timeElement.classList.add("text-secondary");
          const endsSoonText = document.createElement("span");
          endsSoonText.innerText = " Ends soon";
          endsSoonText.style.fontWeight = "bold";
          timeElement.appendChild(endsSoonText);
      } else {
          timeElement.style.color = "green";
      }
  }
  descriptionContainer.append(timeElement);
  

  if (data.id) {
    const bidInput = document.querySelector("#bidInput");
    try {
      const response = await fetch(`https://api.noroff.dev/api/v1/auction/listings/${data.id}?_bids=true`);
      if (response.ok) {
        const listingData = await response.json();
        const highestBid = listingData.bids && listingData.bids.length > 0 ? Math.max(...listingData.bids.map(bid => bid.amount)) : 0; 
        if (highestBid !== null) {
          const bid = document.createElement("p");
          bid.innerText = `Highest bid: ${highestBid}`;
          bid.classList.add("mb-4");
          descriptionContainer.append(bid);

          if (bidInput) {
            bidInput.placeholder = `Your bid (min $${highestBid + 1})`;
            if (new Date(data.endsAt) < new Date()) {
              bidInput.disabled = true;
            }
          }
        }
      } else {
        console.error("Failed to fetch highest bid", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching highest bid:", error);
    }
  }

  const userProfile = load("profile");
  if (userProfile) {
    try {
      const profile = await getProfile(userProfile.name);
      if (profile.credits) {
        const credits = document.createElement("p");
        credits.innerText = `Your credits: ${profile.credits}`;
        credits.classList.add("text-secondary", "fw-bold");
        descriptionContainer.append(credits);
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
    }
  }

  descriptionContainer.classList.add("col-md-6");
  imageContainer.parentElement.append(descriptionContainer);
  return descriptionContainer;
}



export function renderPostTemplate(data, parent) {
  postTemplate(data).then(post => parent.append(post));
}

export function renderPostTemplates (dataList, parent) {
  parent.append(...dataList.map(postsTemplate))
};


export function renderEditTemplates (dataList, parent) {
  parent.append(...dataList.map(editTemplate))
};