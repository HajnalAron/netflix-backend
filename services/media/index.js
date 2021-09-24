import express from "express";
import {
  createNewMedia,
  deleteMedia,
  getMediaById,
  getMedias,
  updateMedia
} from "./mediaFunctionality.js";
import createHttpError from "http-errors";

const mediaRouter = express.Router();

mediaRouter.post("/", async (req, res, next) => {
  try {
    const newMedia = await createNewMedia(req.body);
    if (newMedia.success === true) {
      res.status(201).send(newMedia);
    } else next(createHttpError(404, newMedia.message));
  } catch (error) {
    next(error);
  }
});

mediaRouter.get("/", async (req, res, next) => {
  try {
    res.status(200).send(await getMedias());
  } catch (error) {
    next(error);
  }
});

mediaRouter.get("/:id", async (req, res, next) => {
  try {
    res.status(200).send(await getMediaById(req.params.id));
  } catch (error) {
    next(error);
  }
});

mediaRouter.put("/:id", async (req, res, next) => {
  try {
    const updatedMedia = await updateMedia(req.params.id, req.body);
    if (updatedMedia.success === true) {
      res.status(200).send(updatedMedia);
    } else next(createHttpError(404, updatedMedia.message));
  } catch (error) {
    next(error);
  }
});

mediaRouter.delete("/:id", async (req, res, next) => {
  try {
    const deletedPost = await deleteMedia(req.params.id);
    if (deletedPost.success === true) {
      res.status(200).send(deletedPost.message);
    } else next(createHttpError(404, updatedMedia.message));
  } catch (error) {
    next(error);
  }
});

export default mediaRouter;
