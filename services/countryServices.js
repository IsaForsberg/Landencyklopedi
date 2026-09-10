import {
  renderCountry,
  renderEmptyCountry,
  renderRegionList,
  showLoading,
  hideLoading,
  showError,
  hideError,
  updateLastSearchLabel
} from "../ui/render.js";

const API_KEY = "rc_live_261b0bd9cf664c0990236dc6613824d0";
const BASE_URL = "https://api.restcountries.com/countries/v5";
// Hämta ett land
export async function fetchCountry(name) {
  try {
    if (!name) {
      showError("Sökfältet är tomt. Skriv in ett land.");
      return;
    }
    showLoading();
    hideError();
     const res = await fetch(
      `${BASE_URL}/name?q=${encodeURIComponent(name)}`,
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    if (!res.ok) throw new Error("Något gick fel mot API:et.");

    const data = await res.json();
    const country = data.data.objects[0];

    if (!country) throw new Error("Inget land hittades med de

    renderCountry(country);

    localStorage.setItem("lastSearch", name);
    updateLastSearchLabel(name);

  } catch (err) {
    renderEmptyCountry();
    showError(err.message);
  } finally {
    hideLoading();
  }
} 

// Hämta region
export async function fetchRegion(region) {
  try {
    showLoading();
    hideError();

    const res = await fetch(
      `${BASE_URL}/region/${encodeURIComponent(region)}`,
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    if (!res.ok) throw new Error("Kunde inte hämta länder för vald världsdel.");

    const data = await res.json();
    const countries = data.data.objects;

    renderRegionList(countries);

    localStorage.setItem("lastRegion", region);

    return countries; // Viktigt för sortering i app.js

  } catch (err) {
    showError(err.message);
  } finally {
    hideLoading();
  }
}
