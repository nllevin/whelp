const express = require('express');
const router = express.Router();
const Business = require('../../models/Business');
const Review = require('../../models/Review');
const User = require('../../models/User');

// business#index
router.post('/search', (req, res) => {
  const query = req.body.query;
  const bounds = req.body.bounds;
  Review
    .aggregate([ 
      { $match: { $text: { $search: query } } },
      { $group: { _id: "$businessId", avgScore: { $avg: { $meta: "textScore" } } } },
      { $sort: { avgScore: -1 } }
    ])
    .then(results => {
      const searchResults = results.map(result => result._id.toHexString());
      const businesses = {}
      const queryWords = query.toLowerCase().split(" ");

      Business
        .find({ 
          _id: { $in: searchResults },
          lat: { $gt: bounds.southWest.lat, $lt: bounds.northEast.lat },
          lng: { $gt: bounds.southWest.lng, $lt: bounds.northEast.lng } 
        })
        .populate("reviews")
        .then(businessesArray => {
          businessesArray.forEach(business => {
            const snippet = getSnippet(business, queryWords)
            const numReviews = business.reviews.length;
            const avgUserRating = business.reviews.reduce((totalStars, review) => (
              totalStars + review.rating
            ), 0) / numReviews;
            
            businesses[business.id] = {
              _id: business.id,
              name: business.name,
              address: business.address,
              lat: business.lat,
              lng: business.lng,
              phoneNumber: business.phoneNumber,
              schedules: business.schedules,
              priceRating: business.priceRating,
              imageUrl: business.imageUrl,
              numReviews,
              avgUserRating,
              snippet
            };
          });
          res.json({
            businesses,
            searchResults: searchResults.filter(businessId => businesses[businessId])
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

const getSnippet = (business, queryWords) => {
  let snippet;
  if (queryWords.some(word => business.name.toLowerCase().includes(word))) {
    const snippetReviewWords = business.reviews[0].body.split(" ");
    if (snippetReviewWords.length < 20) {
      snippet = snippetReviewWords.join(" ");
    } else {
      snippet = `${business.reviews[0].body.split(" ").slice(0, 20).join(" ")}...`;
    }
  } else {
    let snippetReview = business.reviews.find(review => (
      queryWords.some(word => (review.body.toLowerCase().includes(word)))
    ));

    if (!snippetReview) {
      return business.reviews[0].length < 20 ?
        business.reviews[0].body
        : `${business.reviews[0].body.split(" ").slice(0, 20).join(" ")}...`;  
    } else {
      snippetReview = snippetReview.body;
    }

    const snippetReviewWords = snippetReview.toLowerCase().split(" ");
    const snippetTargetWord = snippetReviewWords.find(word => (
      queryWords.includes(word)
    ));
    const snippetMidIdx = snippetReviewWords.indexOf(snippetTargetWord);

    if (snippetMidIdx < 10) {
      if (snippetReviewWords.length < 20) {
        snippet = snippetReview;
      } else {
        snippet = `${snippetReview.split(" ").slice(0, 20).join(" ")}...`;
      }
    } else if (snippetReviewWords.length - snippetMidIdx < 10) {
      snippet = `...${snippetReview.split(" ").slice(snippetMidIdx - 10, snippetReviewWords.length).join(" ")}`;
    } else {
      snippet = `...${snippetReview.split(" ").slice(snippetMidIdx - 10, snippetMidIdx + 10).join(" ")}...`;
    }
  }
  return snippet;
};

module.exports = router;