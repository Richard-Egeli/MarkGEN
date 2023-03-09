import config from '../../config';
import { DOMFactory } from '../../dom';
import fs from 'fs';
import { join } from 'path';

const dataTypes = [
  'uint16_t',
  'uint32_t',
  'uint64_t',
  'ssize_t',
  'int16_t',
  'int32_t',
  'int64_t',
  'uint8_t',
  'size_t',
  'int8_t',
  'double',
  'struct',
  'float',
  'enum',
  'bool',
  'void',
  'char',
  'int',
];

export const translate = (path: string) => {
  const file = fs.readFileSync(join(config.baseDir, path), 'utf8');
  file.split('\n').forEach((line) => {
    if (line.includes('enum') || line.includes('struct')) {
    }
  });
};
