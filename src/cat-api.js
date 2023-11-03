import axios from 'axios';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';
axios.defaults.headers.common['Authorization'] =
  'live_2QNehEpaqEWbB7vA804GHTvS1cQ9PvLnOv152a8LH1dSxfgBkfeaifHsSc3DLBkN';


async function fetchBreeds() {
  const response = await axios.get(`breeds`);
  return response.data;
}

async function fetchCatByBreed(breedId) {
  const response = await axios.get(`images/search?breed_ids=${breedId}`);
  return response.data;
}

async function fetchCatByID(id) {
  const response = await axios.get(`images/${id}`);
  return response.data;
}

export { fetchBreeds, fetchCatByBreed, fetchCatByID };
