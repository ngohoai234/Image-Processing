import sharp from 'sharp';
import { sharpResize } from '../models/SharpResize.model';

const changeResizeImage = async (data: sharpResize): Promise<null | string> => {
  try {
    const { width, height, source, target } = data;
    await sharp(source).resize(width, height).toFormat('jpeg').toFile(target);
    return null;
  } catch (err) {
    return 'Error with image';
  }
};

export default changeResizeImage;
