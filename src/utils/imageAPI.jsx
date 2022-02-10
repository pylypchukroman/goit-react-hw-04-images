import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const setParams = ({ q, page }) =>
  (axios.defaults.params = {
    q,
    page,
    key: '24543353-3824dfbf23e7b5ead533e5f72',
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

export const getImage = (q = 'coding', page = 1) => {
  setParams({ q, page });
  return axios
    .get('/')
    .then(res => res.data.hits)
    .catch(error => {
      throw error;
    });
};
