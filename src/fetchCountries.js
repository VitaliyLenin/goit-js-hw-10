const BASE_URL = 'https://restcountries.com/v3.1/';

export function fetchCountries(name) {
  fetch(
    '${BASE_URL}/name/${name}?fields=name,capital,pupulation,flags.languages'
  )
    .then(response => {
      return response.json();
    })
    .then(name => {
      console.log(name);
    })
    .catch(error => {
      console.log(error);
    });
}
