import path from 'path';
import { promises as fs } from 'fs';

import { ImageData } from '../models/File.model';
import { isStringEmpty } from './format';

class FileUtils {
  static basePathImage = path.resolve(__dirname, '../assets/images/base ');
  static resizePathImage = path.resolve(__dirname, '../assets/images/resize ');

  static async getFullPathImage(data: ImageData) {
    const { name, width, height } = data;
    if (isStringEmpty(name)) {
      return null;
    }

    const filePath =
      width && height
        ? path.resolve(
            FileUtils.resizePathImage,
            `${name}-${width}x${height}.jpg`
          )
        : path.resolve(FileUtils.basePathImage, `${name}.jpg`);

    return await fs
      .access(filePath)
      .then(() => filePath)
      .catch(() => null);
  }
}

export default FileUtils;
