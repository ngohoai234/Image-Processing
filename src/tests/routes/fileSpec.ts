import { promises as fs } from 'fs';
import path from 'path';
import File from '../../utils/file';

const sampleFileName = 'Harpers-Bazaa';
describe('Sharp Image Processing', () => {
  it('returns an error for invalid width value', async () => {
    const error = await File.makeResizeImage({
      height: '300',
      width: '-200',
      filename: 'test-invalid-width'
    });
    expect(error).toBeDefined();
  });

  it('returns invalid file name', async () => {
    const error = await File.makeResizeImage({
      height: '300',
      width: '-200',
      filename: ''
    });
    expect(error).toBeDefined();
  });

  it('returns an error for nonexistent filename', async () => {
    const error = await File.makeResizeImage({
      filename: 'file-not-found',
      width: '100',
      height: '500'
    });
    expect(error).toBeDefined();
  });
});

// Remove test files after tests are completed
afterAll(async () => {
  const resizedImagePath = path.resolve(
    File.resizePathImage,
    `${sampleFileName}.jpg`
  );

  try {
    await fs.access(resizedImagePath);
    await fs.unlink(resizedImagePath);
  } catch {
    // No action needed if file does not exist
  }
});
