import "./Search.css";

const Search = (element) => {
	element.innerHTML = `
  <div class="search-container">
    <label for="searchInput" id="searchLabel">Search</label>
    <input type="search" name="searchInput" id="searchInput" placeholder="Search City or Postcode">
		<div id="suggestions-container"></div>
    <button id="searchBtn">
      <i class="fi fi-rr-search-location"></i>
    </button>
  </div>
 `;

	const searchButton = document.getElementById("searchBtn");
	const searchInput = document.getElementById("searchInput");
	
	searchButton.addEventListener("click", () => {
		const searchValue = searchInput.value;

		const searchEvent = new CustomEvent("search", {
			detail: { searchValue },
		});

		document.dispatchEvent(searchEvent);
	});

	searchInput.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			const searchValue = searchInput.value;

			const searchEvent = new CustomEvent("search", {
				detail: { searchValue },
			});

			document.dispatchEvent(searchEvent);
		}
	});
};

export default Search;
