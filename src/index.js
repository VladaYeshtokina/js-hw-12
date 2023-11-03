
 
import { fetchBreeds, fetchCatByBreed, fetchCatByID } from './cat-api.js';
import { toCreateOptionsMarkup, toCreateCatInfoMarkup } from './markup.js';

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';


const BASE_URL = 'https://api.thecatapi.com/v1/';

const ref = {
  breeds: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};
const { breeds, catInfo, loader, error } = ref;

toggle([error, breeds]);

fetchBreeds()
  .then(cat => {   
    toCreateOptionsMarkup(cat, breeds);
    toggle([loader, breeds]);
    
    new SlimSelect({
      select: breeds,      
    });  
  })
  .catch(onFetchError);

breeds.addEventListener('change', onBreedClick);

async function onBreedClick(e) {
  try {
    const catData = await fetchCatByBreed(e.currentTarget.value);
    const { id, url } = catData[0];
    catInfo.innerHTML = `<img src=${url} width='400px'>`;

    toggle([catInfo, loader]);
    setTimeout(toggle, 1000, [catInfo, loader]);

    const catDescr = await fetchCatByID(id);    
    const { breeds } = catDescr;    
    toCreateCatInfoMarkup(catInfo, breeds);     
  }
  catch (error) {
    onFetchError();
  };  
}

function onFetchError() {
  toggle([catInfo, breeds]); 
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
  
function toggle(arr) {
  arr.forEach(selector => selector.classList.toggle('is-hidden'));
}




