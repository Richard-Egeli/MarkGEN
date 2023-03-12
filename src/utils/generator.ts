import { CSS } from '../types';

const convertFunctionToInline = (code: string): string => {
  return code.substring(code.indexOf('{') + 1, code.lastIndexOf('}')).trim();
};

const extractFunctionParams = (code: string): string[] => {
  return code
    .substring(code.indexOf('(') + 1, code.indexOf(')'))
    .split(',')
    .map((param) => param.trim());
};

export const generateInlineFunction = (
  func: (...args: any) => void,
  ...args: any
): string => {
  const str = func.toString();
  const params = extractFunctionParams(str);
  const code = convertFunctionToInline(str);

  return params.reduce<string>((acc, param, index) => {
    return acc.replace(
      new RegExp(`${param}`, 'g'),
      args[index] ? `"${args[index]}"` : undefined
    );
  }, code);
};

export const generateInlineCSS = (styles: CSS): string => {
  return Object.entries(styles)
    .map(([key, value]) => {
      if (typeof value !== 'object') {
        return `${key}:${value.toLowerCase()};`;
      } else {
        return `${key} {${generateInlineCSS(value)}}`;
      }
    })
    .join('')
    .toString()
    .replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
};
