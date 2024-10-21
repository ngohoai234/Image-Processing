import path from 'path';
import { promises as fs } from 'fs';

import { ImageData } from '../models/File.model';
import { isStringEmpty } from './format';
import changeResizeImage from './sharp-process';

class FileUtils {
  static basePathImage = path.resolve(__dirname, '../assets/images/base');
  static resizePathImage = path.resolve(__dirname, '../assets/images/resize');

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
    console.log(FileUtils.basePathImage);

    return await fs
      .access(filePath)
      .then(() => filePath)
      .catch(() => null);
  }

  static async getCurrentImageNames(): Promise<string[]> {
    try {
      const filenames = await fs.readdir(FileUtils.basePathImage);
      return filenames.map(f => {
        return f.split('.')[0];
      }); // Removes the file extension
    } catch (error) {
      console.error('Error reading image directory:', error);
      return [];
    }
  }

  static async isExistImageName(name: string): Promise<boolean> {
    if (isStringEmpty(name)) {
      return false;
    }

    const files = await FileUtils.getCurrentImageNames();
    console.log(files, ' files');

    return files.includes(name);
  }

  static async isAvailableResizeImage(data: ImageData) {
    const { height, name, width } = data;
    if (!height || !name || !width) {
      return false;
    }

    try {
      const pathImage: string = path.resolve(
        FileUtils.resizePathImage,
        `${name}-${width}x${height}.jpg`
      );
      await fs.access(pathImage);
      return true;
    } catch (error) {
      return false;
    }
  }

  static async makeResizeImagePath() {
    try {
      await fs.access(FileUtils.resizePathImage);
    } catch (error) {
      fs.mkdir(FileUtils.resizePathImage);
    }
  }

  static async makeResizeImage(data: ImageData) {
    const { height, name, width } = data;
    if (!height || !name || !width) {
      return null;
    }
    const basePath: string = path.resolve(
      FileUtils.basePathImage,
      `${name}.jpg`
    );
    const resizePath: string = path.resolve(
      FileUtils.resizePathImage,
      `${name}-${width}x${height}.jpg`
    );

    return await changeResizeImage({
      width: parseInt(width),
      height: parseInt(height),
      source: basePath,
      target: resizePath
    });
  }
}

export default FileUtils;
