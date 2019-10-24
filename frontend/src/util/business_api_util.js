import axios from 'axios';

export const fetchBusinesses = () => (                                          // will be changed for search/filters
  axios.get('api/businesses')
);

export const fetchBusinessAndReviews = businessId => (
  axios.get(`api/businesses/${businessId}`)
);