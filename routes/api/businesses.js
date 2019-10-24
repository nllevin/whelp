const express = require('express');
const router = express.Router();
const Business = require('../../models/Business');
const Review = require('../../models/Review');

// business#index
// will be changed later to incorporate search/filters
// grabbing all businesses for now
router.get('/', (req, res) => {
  Business
    .find()
    .then(businessesArray => {
      const businesses = {};
      businessesArray.forEach(business => {
        businesses[business.id] = business;
      });
      res.json(businesses);
    })
    .catch(err => res.status(404).json({ nobusinessesfound: "No businesses found" })); // Is this right?
});

// business#show
router.get('/:id', (req, res) => {
  Business
    .findById(req.params.id)
    .then(business => {
      Review
        .find({businessId: business.id})
        .then(reviewsArray => {
          const reviews = {};
          reviewsArray.forEach(review => {
            reviews[review.id] = review;
          });
          res.json({
            business,
            reviews
          });
        })
        .catch(err => res.status(404).json({ noreviewsfound: "No reviews found for that business"})); // This doesn't seem right. Some businesses won't have reviews
    })
    .catch(err => res.status(404).json({ nobusinessfound: "No business found with that ID" }));
});

module.exports = router;