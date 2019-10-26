const express = require('express');
const router = express.Router();
const Business = require('../../models/Business');
const Review = require('../../models/Review');

// business#index
router.get('/search', (req, res) => {
  const query = req.query['q'];
  Review
    .aggregate([ 
      { $match: { $text: { $search: query } } },
      { $group: { _id: "$businessName", avgScore: { $avg: { $meta: "textScore" } } } },
      { $sort: { avgScore: -1 } }
    ])
    .then(results => {
      const resultNames = results.map(result => result._id);
      const searchResultIds = [];
      const businesses = {}
      const reviews = {};
      
      Business
        .find( { name: { $in: resultNames } } )
        .then(businessesArray => {
          Promise.all(businessesArray.map(business => {
            return (
              Review
                .find( 
                  { businessId: business._id, $text: { $search: query } },  
                  { score: { $meta: "textScore" } }
                )
                .sort( { score: { $meta: "textScore" } } )
                .limit(1)
                .then(result => {
                  const review = result[0];
                  reviews[review._id] = review;
                  businesses[business._id] = business;

                  businessRank = resultNames.indexOf(business.name);
                  searchResultIds[businessRank] = {
                    businessId: business._id,
                    reviewId: review._id
                  };
                })
            );
          })).then(() => {
            res.json({
              businesses,
              reviews,
              searchResultIds
            });
          });
        });
    });
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