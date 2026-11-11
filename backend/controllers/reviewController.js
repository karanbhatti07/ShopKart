import Product from "../models/Product_model.js";
import Review from "../models/Review_model.js";

export const createReview = async (req, res) => {
  try {
    const user = req.user.id;
    const { product, rating, comment } = req.body;
    const review = await Review.findOne({
      user: user,
      product: product,
    });
    if (review) {
      return res.status(404).json({
        message: "Already Reviwed",
      });
    }
    const reviewdetails = await Review.create({
      user,
      product,
      rating,
      comment,
    });

    const reviewdetails2 = await Product.findById(product);
    if (reviewdetails2) {
      const oldRating = reviewdetails2.rating;
      const oldReviewCount = reviewdetails2.numReviews;
      // console.log("oldRating:", oldRating);
      // console.log("oldReviewCount:", oldReviewCount);
      // console.log("new rating:", rating);
      const newAverage =
        (oldRating * oldReviewCount + rating) / (oldReviewCount + 1);
      console.log("newAverage:", newAverage);
      reviewdetails2.rating = newAverage;
      reviewdetails2.numReviews = oldReviewCount + 1;
      await reviewdetails2.save();
      // console.log("saved rating:", reviewdetails2.rating);
      // console.log("saved numReviews:", reviewdetails2.numReviews);
    }
    res.status(200).json({
      message: "Review Created",
      reviewdetails,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getReview = async (req, res) => {
  try {
    const { product } = req.params;
    const review = await Review.find({
      product,
    }).populate("user");
    res.status(200).json({
      message: "Review Found",
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
