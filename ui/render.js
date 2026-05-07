// DOM-element
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");
const countryContainer = document.getElementById("countryContainer");
const regionList = document.getElementById("regionList");
const lastSearchLabel = document.getElementById("lastSearchLabel");

// Tom vy
export function renderEmptyCountry() {
  countryContainer.innerHTML = `
    <p>Inget land att visa. Sök efter ett land eller välj en världsdel.</p>
  `;
  countryContainer.classList.add("empty-state");
}

// Visa ett land
export function renderCountry(country) {
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map(c => `${c.name} (${c.symbol || "-"})`)
        .join(", ")
    : "Okänd";

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "Okända";

  const capital = country.capital ? country.capital.join(", ") : "Ingen uppgift";

  countryContainer.classList.remove("empty-state");

  countryContainer.innerHTML = `
    <div class="country-flag">
      <h3>${country.name.common}</h3>
      <img src="${country.flags.svg}" alt="Flagga för ${country.name.common}">
    </div>
    <div class="country-info">
      <p><strong>Officiellt namn:</strong> ${country.name.official}</p>
      <p><strong>Huvudstad:</strong> ${capital}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Subregion:</strong> ${country.subregion || "Ingen uppgift"}</p>
      <p><strong>Befolkning:</strong> ${country.population.toLocaleString("sv-SE")}</p>
      <p><strong>Valuta:</strong> ${currencies}</p>
      <p><strong>Språk:</strong> ${languages}</p>
      <p><strong>Tidszoner:</strong> ${country.timezones ? country.timezones.join(", ") : "Ingen uppgift"}</p>
    </div>
  `;
}

// Lista länder i region
export function renderRegionList(countries) {
  if (!countries || countries.length === 0) {
    regionList.innerHTML = "<p>Inga länder att visa.</p>";
    return;
  }

  const html = countries
    .map(c => `
      <div class="country-card" data-country="${c.name.common}">
        <img src="${c.flags.svg}" alt="Flagga för ${c.name.common}">
        <p>${c.name.common}</p>
      </div>
    `)
    .join("");

  regionList.innerHTML = html;
}

// UI helpers
export function showLoading() {
  loadingEl.classList.remove("hidden");
}

export function hideLoading() {
  loadingEl.classList.add("hidden");
}

export function showError(msg) {
  errorEl.textContent = msg;
  errorEl.classList.remove("hidden");
}

export function hideError() {
  errorEl.classList.add("hidden");
  errorEl.textContent = "";
}

export function updateLastSearchLabel(name) {
  lastSearchLabel.textContent = name;
}
