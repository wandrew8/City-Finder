const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

//We can use the builtin javascript method to return ajax calls using fetch method rather than axios package or other sources
const cities = [];

fetch(endpoint)
    .then(response => response.json())
    .then(data => cities.push(...data))
console.log(cities)

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {

    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex)

  })
}

//Sets up large number with commas
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayValues() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="h1">${this.value}</span>`)
    const stateName = place.state.replace(regex, `<span class="h1">${this.value}</span>`)
    
    return `
      <a class="link" href="https://en.wikipedia.org/wiki/${place.city}">
      <li>
      <strong><span class="rank"># ${place.rank}</span></strong>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li></a>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
searchInput.addEventListener('change', displayValues);
searchInput.addEventListener('keyup', displayValues);