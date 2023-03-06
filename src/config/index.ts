import markgenConfig from '../../markgen.default.json';
import path from 'path';
import fs from 'fs';

const filename = 'markgen.config.json';

export const config = markgenConfig;
export const color = markgenConfig.colorPalette.light;
export const compilationOpts = markgenConfig.compilationOptions;

// Assigns a default baseDir
Object.assign(config, { baseDir: __dirname.split('/').slice(0, -2).join('/') });

// Search for config file in parent directories
const dirs = __dirname.split(path.sep);
while (dirs.length > 0) {
  const dir = dirs.join(path.sep);
  const file = path.join(dir, filename);

  if (fs.existsSync(file)) {
    const json = fs.readFileSync(file, 'utf-8');
    const c = JSON.parse(json);

    Object.assign(config, c);
    Object.assign(color, c.colorPalette.light);
    Object.assign(compilationOpts, c.compilationOptions);
    Object.assign(config, { configPath: file, baseDir: dir });
    Object.assign(config.baseDir, { configPath: file, baseDir: dir });
    break;
  }

  dirs.pop();
}

export default config;
