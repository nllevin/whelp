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
      { $group: { _id: "$businessId", avgScore: { $avg: { $meta: "textScore" } } } },
      { $sort: { avgScore: -1 } }
    ])
    .then(results => {
      const searchResults = results.map(result => result._id.toHexString());
      const businesses = {}
      const reviews = {};
      const queryWords = query.toLowerCase().split(" ");

      Business
        .find( { _id: { $in: searchResults } } )
        .populate("reviews")
        .then(businessesArray => {
          businessesArray.forEach(business => {
            let snippet;
            if (queryWords.some(word => business.name.toLowerCase().includes(word))) {
              const snippetReviewWords = business.reviews[0].body.split(" ");
              if (snippetReviewWords.length < 30) {
                snippet = snippetReviewWords.join(" ");
              } else {
                snippet = `${business.reviews[0].split(" ").slice(0, 30).join(" ")}...`;
              }
            } else {
              const snippetReview = business.reviews.find(review => (
                queryWords.some(word => (review.body.toLowerCase().includes(word)))
              )).body;
              const snippetReviewWords = snippetReview.toLowerCase().split(" ");
              const snippetTargetWord = snippetReviewWords.find(word => (
                queryWords.includes(word)
              ));
              const snippetMidIdx = snippetReviewWords.indexOf(snippetTargetWord);

              if (snippetMidIdx < 15) {
                if (snippetReviewWords.length < 30) {
                  snippet = snippetReview;
                } else {  
                  snippet = `${snippetReview.split(" ").slice(0, 30).join(" ")}...`;
                }
              } else if (snippetReviewWords.length - snippetMidIdx < 15) {
                snippet = `...${snippetReview.split(" ").slice(snippetMidIdx - 15, snippetReviewWords.length).join(" ")}`;
              } else {
                snippet = `...${snippetReview.split(" ").slice(snippetMidIdx - 15, snippetMidIdx + 15).join(" ")}...`;
              }
            }
            
            businesses[business.id] = {
              name: business.name,
              address: business.address,
              phoneNumber: business.phoneNumber,
              schedules: business.schedules,
              priceRating: business.priceRating,
              snippet
            };
          });
          res.json({
            businesses,
            searchResults
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
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