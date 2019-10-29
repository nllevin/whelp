import axios from 'axios';

export const searchBusinesses = searchParams => (
  axios.get(`api/businesses/search${searchParams}`)
);

export const fetchBusinessAndReviewsWithAuthors = businessId => (
  axios.get(`api/businesses/${businessId}`)
);