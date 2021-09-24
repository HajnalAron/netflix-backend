import express from "express";

const reviewsRouter = express.Router();

reviewsRouter.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

reviewsRouter.get("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

reviewsRouter.delete("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default reviewsRouter;
