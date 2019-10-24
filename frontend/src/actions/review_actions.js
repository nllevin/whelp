import * as APIReviewUtil from '../util/review_api_util';

export const RECEIVE_REVIEW = 'RECEIVE_REVIEW';
export const REMOVE_REVIEW = 'REMOVE_REVIEW';

export const receiveReview = review => ({
  type: RECEIVE_REVIEW,
  review
});

export const removeReview = reviewId => ({
  type: REMOVE_REVIEW,
  reviewId
});

export const createReview = review => dispatch => (
  APIReviewUtil.createReview(review)
    .then(res => dispatch(receiveReview(res.data)))
    .catch(err => console.log(err))
);

export const editReview = (reviewId, review) => dispatch => (
  APIReviewUtil.editReview(reviewId, review)
    .then(res => dispatch(receiveReview(res.data)))
    .catch(err => console.log(err))
);

export const deleteReview = reviewId => dispatch => (
  APIReviewUtil.deleteReview(reviewId)
    .then(res => dispatch(removeReview(res.data._id)))
    .catch(err => console.log(err))
);