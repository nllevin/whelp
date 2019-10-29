import axios from 'axios';

export const searchBusinesses = searchParams => (
  axios.post(`api/businesses/search`, searchParams)
);

export const fetchBusinessAndReviews = businessId => (
  axios.get(`api/businesses/${businessId}`)
);