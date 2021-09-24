import { readJSONFile, writeJSONFile } from "../../tools/filesystem.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { readExistingMediaIdsJSON } from "../media/mediaFunctionality.js";
import uniqid from "uniqid";

// Review modell:
// {
//     "_id": "123455", //SERVER GENERATED
//     "comment": "A good book but definitely I don't like many parts of the plot", //REQUIRED
//     "rate": 3, //REQUIRED, max 5
//     "elementId": "5d318e1a8541744830bef139", //REQUIRED = IMDBID
//     "createdAt": "2019-08-01T12:46:45.895Z" // SERVER GENERATED
// }

const reviewsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "reviews.json"
);

const readReviewsJSON = async () => {
  return await readJSONFile(reviewsJSONPath);
};

const writeReviewsJSON = async (dataToWrite) => {
  await writeJSONFile(reviewsJSONPath, dataToWrite);
};

export const getReviewsByImdbId = async (ImdbId) => {
  const reviews = await readReviewsJSON();
  filteredReviews = reviews.filter((review) => (review.imdbID = ImdbId));
  return filteredReviews;
};

export const getReviewByReviewId = async (id) => {
  const reviews = await readReviewsJSON();
  targetReview = reviews.filter((review) => (review._id = id));
  return targetReview;
};

export const newReview = async (id, reviewBody) => {
  let success = false;
  let message = `Media with the id of ${id} doesn't exist. You can only attach reviews to a valid media.`;
  const existingMediaIds = readExistingMediaIdsJSON();
  const targetMedia = existingMediaIds.find(mediaId === id);
  if (targetMedia) {
    const previousReviews = await readReviewsJSON();
    const newReview = {
      ...reviewBody,
      _id: uniqid(),
      createdAt: new Date(),
      imdbID: id
    };
    previousReviews.push(newReview);
    await writeReviewsJSON(previousReviews);
    success = true;
    message =
      `Review with the id of ${_id} has been successfully created for media with id of ` +
      id;
  }
  return {
    success,
    message,
    bodyData: reviewBody
  };
};

export const deleteReview = async (reviewId) => {
  let success = false;
  let message = "Review not found with the id of " + reviewId;
  const previousReviews = await readReviewsJSON();
  const targetReview = previousReviews.find(
    (review) => review._id === reviewId
  );
  if (targetReview) {
    filteredOutReviews = previousReviews.filter(
      (review) => review._id !== reviewId
    );
    await writeReviewsJSON(filteredOutReviews);
    success = true;
    message = "Review has been successfully deleted with the id of:" + reviewId;
  }
  return {
    success,
    message
  };
};
