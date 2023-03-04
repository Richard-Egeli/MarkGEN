import config from '../../markgen.default.json';
import path from 'path';
import fs from 'fs';

const filename = 'markgen.config.json';
export const Color = config.colorPalette.light;
export const Config = config;

// Search for config file in parent directories
const dirs = __dirname.split(path.sep);
while (dirs.length > 0) {
  const dir = dirs.join(path.sep);
  const file = path.join(dir, filename);
  if (fs.existsSync(file)) {
    const json = fs.readFileSync(file, 'utf-8');
    const c = JSON.parse(json);
    Object.assign(Config, c);
    Object.assign(Color, c.colorPalette.light);
    break;
  }

  dirs.pop();
}

export default Config;
