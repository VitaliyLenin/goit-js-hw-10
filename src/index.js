import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  const countryName = evt.target.value.trim();

  if (countryName === '') {
    reset();
    return '';
  }

  fetchCountries(countryName)
    .then(data => {
      if (data.length > 10) {
        reset();
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return '';
      }
      if (data.length > 1) {
        reset();
        const country = new Countries(data);
        country.makeCountryList(refs.countryList);
        return '';
      }
      reset();
      const countries = new Countries(data);
      countries.makeCountryInfo(refs.countryInfo);
    })
    .catch(error => {
      reset();
      Notiflix.Notify.failure(error);
    });
}

class Countries {
  constructor(data) {
    this.data = [...data];
  }

  makeCountryList(country) {
    country.innerHTML = this.data
      .map(
        ({ flags: { svg }, name: { official } }) => `
            <li class="country-list_item">
            <img class="country-flag" width=40 height=40 src=${svg}>
            <span class="country-name">${official}</span>
            </li>`
      )
      .join('');
  }

  makeCountryInfo(country) {
    const {
      name: { official },
      capital,
      population,
      flags: { svg },
      languages,
    } = this.data[0];

    country.innerHTML = ` <div class="country-list_item">
            <img class="country-flag" width=40 height=40 src=${svg}>
            <span class="country-name">${official}</span>
            </div>
            <p class='country-info'>Capital:
            <span class='country-info__details'>${capital}</span></p>
            <p class='country-info'>Population:
            <span class='country-info__details'>${population}</span></p>
            <p class='country-info'>Languages:
            <span class='country-info__details'>${Object.values(
              languages
            )}</span></p>
    `;
  }
}

function reset() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
