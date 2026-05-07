import { fetchCountry, fetchRegion } from "./services/countryServices.js";
import { renderRegionList } from "./ui/render.js";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const regionButtons = document.querySelectorAll("#regions button");
const sortByNameBtn = document.getElementById("sortByNameBtn");
const regionList = document.getElementById("regionList");

let currentRegionCountries = [];

// Sortering
function sortCurrentRegionByName() {
  if (!currentRegionCountries.length) return;

  currentRegionCountries.sort((a, b) =>
    a.name.common.localeCompare(b.name.common, "sv")
  );

  renderRegionList(currentRegionCountries);
}

// Event: sök
searchBtn.addEventListener("click", () => {
  fetchCountry(searchInput.value.trim());
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchCountry(searchInput.value.trim());
  }
});

// Event: regionknappar
regionButtons.forEach(btn => {
  btn.addEventListener("click", async () => {
    const region = btn.dataset.region;
    currentRegionCountries = await fetchRegion(region) || [];
  });
});

// Event: sortering
sortByNameBtn.addEventListener("click", () => {
  sortCurrentRegionByName();
});

// Event: klick på landkort
regionList.addEventListener("click", (e) => {
  const card = e.target.closest(".country-card");
  if (!card) return;

  const name = card.dataset.country;
  fetchCountry(name);
});

// Init
(function init() {
  const lastSearch = localStorage.getItem("lastSearch");
  const lastRegion = localStorage.getItem("lastRegion");

  if (lastSearch) fetchCountry(lastSearch);
  if (lastRegion) {
    fetchRegion(lastRegion).then(data => {
      currentRegionCountries = data || [];
    });
  }
})();
