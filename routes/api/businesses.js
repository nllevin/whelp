const express = require('express');
const router = express.Router();
const Business = require('../../models/Business');
const Review = require('../../models/Review');
const User = require('../../models/User');

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
        .find({ businessId: business.id })
        .then(reviewsArray => {
          const reviews = {};
          const authorIds = []

          reviewsArray.forEach(review => {
            reviews[review.id] = review;
            authorIds.push(review.authorId);
          });
          User
            .find()
            .where('_id')
            .in(authorIds)
            .then(authors => {
              const users = {};
              authors.forEach(author => users[author.id] = author);
              res.json({
                business,
                reviews,
                users
              });
            }
            );
        })
    })
    .catch(err => res.status(404).json({ nobusinessfound: "No business found with that ID" }));
});

module.exports = router;