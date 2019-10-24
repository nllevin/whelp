import axios from 'axios';

export const createReview = review => (
  axios.post('/api/reviews/', review)
);

export const editReview = (reviewId, review) => (
  axios.patch(`/api/reviews/${reviewId}`, review)
);

export const deleteReview = reviewId => (
  axios.delete(`/api/reviews/${reviewId}`)
);