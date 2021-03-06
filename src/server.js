import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import { publicFolderPath } from "../tools/filesystem.js";
import mediaRouter from "../services/media/index.js";
import reviewsRouter from "../services/reviews/index.js";
import {
  badRequestErrorHandler,
  notFoundErrorHandler,
  forbiddenErrorHandler,
  genericServerErrorHandler
} from "./errorHandlers.js";

const server = express();
export const port = process.env.PORT || 3001;

server.use(cors());
server.use(express.json());
server.use(express.static(publicFolderPath));

server.use("/media", mediaRouter);
server.use("/reviews", reviewsRouter);

server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(forbiddenErrorHandler);
server.use(genericServerErrorHandler);

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log("Server is listening on port:" + port);
});
