import { readJSONFile, writeJSONFile } from "../../tools/filesystem.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Media object modell:
// {
//     "Title": "The Lord of the Rings: The Fellowship of the Ring",
//     "Year": "2001",
//     "imdbID": "tt0120737",  //UNIQUE
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMTM5MzcwOTg4MF5BMl5BanBnXkFtZTgwOTQwMzQxMDE@._V1_SX300.jpg"
// }

const mediaJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "media.json"
);

export const mediaIdsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "mediaIds.json"
);

const readExistingMediasJSON = async () => {
  return await readJSONFile(mediaJSONPath);
};

export const readExistingMediaIdsJSON = async () => {
  return await readJSONFile(mediaIdsJSONPath);
};

const writeExistingMediasJSON = async (dataToWrite) => {
  await writeJSONFile(mediaJSONPath, dataToWrite);
};

const writeExistingIdsJSON = async (idToWrite) => {
  await writeJSONFile(mediaIdsJSONPath, idToWrite);
};

export const createNewMedia = async (mediaBody) => {
  const existingMediaIds = await readExistingMediaIdsJSON();
  const isMediaAlreadyExists = existingMediaIds.find(
    (imdbID) => imdbID === mediaBody.imdbID
  );
  let success = false;
  let message = "Media already exists with the id of " + mediaBody.imdbID;
  if (isMediaAlreadyExists === undefined) {
    existingMediaIds.push(mediaBody.imdbID);
    await writeExistingIdsJSON(existingMediaIds);
    const existingMedias = await readExistingMediasJSON();
    existingMedias.push(mediaBody);
    await writeExistingMediasJSON(existingMedias);
    success = true;
    message =
      "Media has been successfully created with the id of " + mediaBody.imdbID;
  }
  const newMedia = {
    success,
    message,
    mediaData: mediaBody
  };
  return newMedia;
};

export const getMedias = async () => {
  return await readJSONFile(mediaJSONPath);
};

export const getMediaById = async (id) => {
  const existingMedias = await readExistingMediasJSON();
  const findResult = existingMedias.find((media) => media.imdbID === id);
  return findResult;
};

export const updateMedia = async (id, mediaBody) => {
  const existingMediaIds = await readExistingMediaIdsJSON();
  const isMediaAlreadyExists = existingMediaIds.find(
    (imdbID) => imdbID === mediaBody.imdbID
  );
  let success = false;
  let message = "Media doesn't exist with the id of " + mediaBody.imdbID;
  let updatedMedia = {};
  if (isMediaAlreadyExists) {
    const existingMedias = await readExistingMediasJSON();
    const targetMedia = existingMedias.findIndex(
      (media) => media.imdbID === id
    );
    existingMedias[targetMedia] = {
      ...existingMedias[targetMedia],
      ...mediaBody
    };
    updatedMedia = existingMedias[targetMedia];
    await writeExistingMediasJSON(existingMedias);
    success = true;
    message =
      "Media has been successfully created with the id of " + mediaBody.imdbID;
  }
  const newMedia = {
    success,
    message,
    mediaData: updatedMedia
  };
  return newMedia;
};

export const deleteMedia = async (id) => {
  let success = false;
  let message = "Media not found with the id of " + id;
  const existingMediaIds = await readExistingMediaIdsJSON();
  const targetMedia = existingMediaIds.find((mediaId) => mediaId === id);
  if (targetMedia) {
    const existingMedias = await readExistingMediasJSON();
    existingMedias = existingMedias.filter((media) => media.imdbID !== id);
    await writeExistingMediasJSON(existingMedias);
    const filteredOutIds = existingMediaIds.filter(mediaId === id);
    await writeExistingIdsJSON(filteredOutIds);
    success = true;
    message = "Media successfully deleted with the id of" + id;
  }
  return {
    success,
    message
  };
};
