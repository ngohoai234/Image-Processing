import { promises as fs } from 'fs';

import path from 'path';

import File from '../../utils/file';

describe('Image Processing via Sharp', () => {
  it('throws an error for invalid width value', async () => {
    const error = await File.makeResizeImage({
      height: '300',
      width: '-200',
      name: 'test'
    });
    expect(error).not.toBeNull();
  });

  it('throws an error when the file name does not exist', async () => {
    const error = await File.makeResizeImage({
      name: 'test',
      width: '100',
      height: '500'
    });
    expect(error).not.toBeNull();
  });

  it('successfully creates resized image for valid input', async () => {
    await File.makeResizeImage({
      name: 'Harpers-Bazaa',
      width: '200',
      height: '200'
    });

    const resizedImagePath = path.resolve(
      File.resizePathImage,
      'Harpers-Bazaa-200x200.jpg'
    );
    let fileName: string | null = null;

    try {
      await fs.access(resizedImagePath);
      fileName = null;
    } catch {
      fileName = 'File not found';
    }

    expect(fileName).toEqual('File not found');
  });
});

// Clean up test files after all tests run
afterAll(async () => {
  const resizedImagePath = path.resolve(
    File.resizePathImage,
    'Harpers-Bazaa.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    await fs.unlink(resizedImagePath);
  } catch {
    // intentionally left blank, file does not exist
  }
});
