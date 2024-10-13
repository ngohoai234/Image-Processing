import sharp from 'sharp';
import { sharpResize } from '../models/SharpResize.model';

const changeResizeImage = async (data: sharpResize) => {
  try {
    const { width, height, source, target } = data;
    await sharp(source).resize(width, height).toFormat('jpeg').toFile(target);
    return true;
  } catch (err) {
    return false;
  }
};

export default changeResizeImage;
