import axios from 'axios';

export const createReview = data => (
  axios.post('/api/reviews/', data)
);

export const editReview = (reviewId, data) => (
  axios.patch(`/api/reviews/${reviewId}`, data)
);

export const deleteReview = reviewId => (
  axios.delete(`/api/reviews/${reviewId}`)
);