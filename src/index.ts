import express from 'express';
import { PORT } from './constatns/app';
import FileUtils from './utils/file';
import routes from './routes';

const app = express();

app.use(routes);

app.listen(PORT, async () => {
  await FileUtils.makeResizeImagePath();

  const url: string = `\x1b[2mhttp://localhost:${PORT}\x1b[0m`;
  console.log(`Please open ${url} to review the project ...`);
});
