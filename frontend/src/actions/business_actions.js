import * as APIBusinessUtil from '../util/business_api_util';

export const RECEIVE_BUSINESSES = "RECEIVE_BUSINESSES";
export const RECEIVE_BUSINESS_AND_REVIEWS_WITH_AUTHORS = "RECEIVE_BUSINESS_AND_REVIEWS_WITH_AUTHORS";

const receiveBusinesses = businesses => ({
  type: RECEIVE_BUSINESSES,
  businesses
});

const receiveBusinessAndReviewsWithAuthors = data => ({
  type: RECEIVE_BUSINESS_AND_REVIEWS_WITH_AUTHORS,
  business: data.business,
  reviews: data.reviews,
  users: data.users
});

export const fetchBusinesses = () => dispatch => (                              // will change for search/filters
  APIBusinessUtil.fetchBusinesses()
    .then(res => dispatch(receiveBusinesses(res.data)))
);

export const fetchBusinessAndReviewsWithAuthors = businessId => dispatch => (
  APIBusinessUtil.fetchBusinessAndReviewsWithAuthors(businessId)
    .then(res => dispatch(receiveBusinessAndReviewsWithAuthors(res.data)))
);