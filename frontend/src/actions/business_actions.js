import * as APIBusinessUtil from '../util/business_api_util';

export const RECEIVE_BUSINESSES = "RECEIVE_BUSINESSES";
export const RECEIVE_BUSINESS_AND_REVIEWS = "RECEIVE_BUSINESS_AND_REVIEWS";

const receiveBusinesses = businesses => ({
  type: RECEIVE_BUSINESSES,
  businesses
});

const receiveBusinessAndReviews = data => ({
  type: RECEIVE_BUSINESS_AND_REVIEWS,
  business: data.business,
  reviews: data.reviews
});

export const fetchBusinesses = () => dispatch => (                              // will change for search/filters
  APIBusinessUtil.fetchBusinesses()
    .then(businesses => dispatch(receiveBusinesses(businesses)))
);

export const fetchBusinessAndReviews = businessId => dispatch => (
  APIBusinessUtil.fetchBusinessAndReviews(businessId)
    .then(data => dispatch(receiveBusinessAndReviews(data)))
);