import { ImageData } from '../models/File.model';
import FileUtils from '../utils/file';

const validateFile = async (data: ImageData): Promise<null | string> => {
  const { height, name, width } = data;
  // Check if the requested file exists
  if (!(await FileUtils.isExistImageName(name))) {
    const availableImageNames: string = (
      await FileUtils.getCurrentImageNames()
    ).join(', ');
    return `The filename '${name}' does not exist. Available filenames are: ${availableImageNames}.`;
  }

  // Return early if no size values are provided
  if (!width && !height) {
    return null;
  }

  // Validate width
  const widthImg: number = parseInt(width || '', 10);
  if (Number.isNaN(widthImg) || widthImg < 1) {
    return "Invalid width. Please provide a positive numeric value for the 'width' field.";
  }

  // Validate height
  const heightImg: number = parseInt(height || '', 10);
  if (Number.isNaN(heightImg) || heightImg < 1) {
    return "Invalid height. Please provide a positive numeric value for the 'height' field.";
  }

  return null;
};

export default validateFile;
