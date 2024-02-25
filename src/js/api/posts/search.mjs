import { renderPostTemplates } from "../../templates/postTemplates.mjs";

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
  
  export function setupSearch(listings) {
    const searchInput = document.querySelector("form#search input[type='search']");
    const listingsContainer = document.querySelector("#all-posts");
  
    const performSearch = () => {
      listingsContainer.innerHTML = "";
      
      const searchTerm = searchInput.value.toLowerCase();
      
      const filteredListings = listings.filter(listing => {
        const title = listing.title?.toLowerCase() ?? "";
        const body = listing.body?.toLowerCase() ?? "";
        const tagsMatch = listing.tags?.some(tag => tag.toLowerCase().includes(searchTerm));
        
        return title.includes(searchTerm) || body.includes(searchTerm) || tagsMatch;
      });

      renderPostTemplates(filteredListings, listingsContainer);
    };

    const debouncedSearch = debounce(performSearch, 300);
  
    if (searchInput) {
      searchInput.addEventListener("input", debouncedSearch);
    }
  }
  