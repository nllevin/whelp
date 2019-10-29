const express = require('express');
const router = express.Router();
const Review = require('../../models/Review');
const validateReviewInput = require('../../validation/reviews');

router.post('/',
  (req, res) => {
    const { errors, isValid } = validateReviewInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newReview = new Review({
      authorId: req.body.authorId,
      businessId: req.body.businessId,
      businessName: req.body.businessName,
      body: req.body.body,
      rating: req.body.rating,
      createdAt: req.body.createdAt
    });

    newReview.save().then(review => res.status(201).json(review));
  }
);

router.patch('/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false }, (err, review) => {
    if (!review) return res.status.json(404).json({ noreviewfound: 'No review found with that ID'});
    if (err) return res.status.json(500).json({ failedreviewedit: 'Problem editing review' });
    res.status(200).json(review);
  });
});

router.delete('/:id', (req, res) => {
  Review.findByIdAndDelete(req.params.id, { useFindAndModify: false }, (err, review) => {
    if (err) return res.status.json({ failedreviewdelete: 'Problem deleting review' });
    res.status(200).json(review);
  });
});

module.exports = router;