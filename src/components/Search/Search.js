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
	const suggestionsContainer = document.getElementById(
		"suggestions-container"
	);

	// const api_key = "AIzaSyDEopPHQsewia3a5VX42xOX8nQNEqeYeEo";

	const autocompleteService = new google.maps.places.AutocompleteService();

	searchInput.addEventListener("input", async () => {
		const inputValue = searchInput.value.trim();

		if (inputValue === "") {
			suggestionsContainer.innerHTML = "";
			return;
		}

		autocompleteService.getPlacePredictions(
			{
				input: inputValue,
				types: ["(cities)"],
			},
			(predictions, status) => {
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					const citySuggestions = predictions.map((prediction) => {
						return prediction.description;
					});
					displaySuggestions(citySuggestions);
				} else {
					console.error("Error fetching suggestions:", status);
				}
			}
		);
	});

	function displaySuggestions(suggestions) {
		const suggestionsHTML = suggestions.map((suggestion) => {
			return `<div class=suggestion>${suggestion}</div>`;
		}).join('');

		suggestionsContainer.innerHTML = suggestionsHTML;
	}

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
