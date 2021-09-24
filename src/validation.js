import { body } from "express-validator";

export const mediaValidationMiddleware = [
  body("Title")
    .exists()
    .isString()
    .withMessage("Title is required and it should be a string"),
  body("Year")
    .exists()
    .isString()
    .withMessage("Year is required and it should be a string"),
  body("imdbID")
    .exists()
    .isString()
    .withMessage("imdbID is required and it should be a string"),
  body("Type")
    .exists()
    .isString()
    .withMessage("Type is required and it should be a number"),
  body("Poster")
    .exists()
    .isString()
    .withMessage("Poster is required and it should be a string")
];

export const reviewValidationMiddleware = [
  body("comment")
    .exists()
    .isString()
    .withMessage("comment is required and it should be a string"),
  body("rate")
    .exists()
    .isNumeric()
    .withMessage("rate is required and should it be a number")
];
