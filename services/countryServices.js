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
      `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=false`
    );

    if (!res.ok) throw new Error("Inget land hittades med den sökningen.");

    const data = await res.json();
    const country = data[0];

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
      `https://restcountries.com/v3.1/region/${encodeURIComponent(region)}`
    );

    if (!res.ok) throw new Error("Kunde inte hämta länder för vald världsdel.");

    const data = await res.json();

    renderRegionList(data);

    localStorage.setItem("lastRegion", region);

    return data; // Viktigt för sortering i app.js

  } catch (err) {
    showError(err.message);
  } finally {
    hideLoading();
  }
}
