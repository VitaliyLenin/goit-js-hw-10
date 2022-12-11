import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const str = refs.input.value.trim();
  console.log(str);
}

// function createCountries(countries) {
//   if (countries.length > 2 || countries.length <= 10) {
//     makeCountryList(countries);
//     // renderReset();
//   }
//   if (countries.length === 1) {
//     MakeCountryInfo(countries);
//     // renderReset();
//   }
//   if (countries.length > 10) {
//     Notiflix.Notify.info(
//       'Too many matches found. Please enter a more specific name.'
//     );
//     // reset();
//   }
// }

const makeCountryList = countries =>
  countries.map(
    ({ name: { official }, flags: { svg } }) =>
      `<li class="country-items">
        <img src="${svg}" alt="flags" />
        <span>${official}</span>
      </li>`
  );

console.log(makeCountryList);

const makeCountryInfo = countries =>
  countries.map(
    ({
      name: { official },
      capital,
      population,
      flags: { svg },
      languages,
    }) => `  <ul>
    <li>
      <img src="${svg}" alt="flags" width="40" />
      <span>${official}</span>
    </li>
    <li>Capital : ${capital}</li>
    <li>Population : ${population}</li>
    <li>Languages : ${Object.values(languages)}</li>
  </ul>;`
  );

console.log(makeCountryInfo);
