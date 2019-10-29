import * as APIBusinessUtil from '../util/business_api_util';

export const RECEIVE_BUSINESSES_SEARCH = "RECEIVE_BUSINESSES";
export const RECEIVE_BUSINESS_AND_REVIEWS_WITH_AUTHORS = "RECEIVE_BUSINESS_AND_REVIEWS_WITH_AUTHORS";

const receiveBusinessesSearch = data => ({
  type: RECEIVE_BUSINESSES_SEARCH,
  businesses: data.businesses,
  searchResults: data.searchResults
});

const receiveBusinessAndReviewsWithAuthors = data => ({
  type: RECEIVE_BUSINESS_AND_REVIEWS_WITH_AUTHORS,
  business: data.business,
  reviews: data.reviews,
  users: data.users
});

export const searchBusinesses = searchParams => dispatch => (
  APIBusinessUtil.searchBusinesses(searchParams)
    .then(res => dispatch(receiveBusinessesSearch(res.data)))
);

export const fetchBusinessAndReviewsWithAuthors = businessId => dispatch => (
  APIBusinessUtil.fetchBusinessAndReviewsWithAuthors(businessId)
    .then(res => dispatch(receiveBusinessAndReviewsWithAuthors(res.data)))
);