import express from 'express';
import validateFile from '../../validations/files';
import FileUtils from '../../utils/file';
import { ImageData } from '../../models/File.model';

const images: express.Router = express.Router();

images.get(
  '/',
  async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    const query = request.query as unknown as ImageData;
    try {
      // Validate the request
      const validationMessage: null | string = await validateFile(query);
      if (validationMessage) {
        response.status(400).send(`Invalid request: ${validationMessage}`);
        return;
      }

      let error: null | string = '';

      // Create thumbnail if not yet available
      if (!(await FileUtils.isAvailableResizeImage(query))) {
        error = await FileUtils.makeResizeImage(query);
      }

      // Handle image processing error
      if (error) {
        response.status(500).send(`Image processing error: ${error}`);
        return;
      }

      // Retrieve appropriate image path and send the image file
      const path: null | string = await FileUtils.getFullPathImage(query);
      if (path) {
        response.sendFile(path);
      } else {
        response
          .status(500)
          .send(
            'Unexpected error: Image path not found. Please check your request.'
          );
      }
    } catch (err) {
      // General error handling
      console.log(err);
      response
        .status(500)
        .send('An unexpected error occurred. Please try again later.');
    }
  }
);

export default images;
