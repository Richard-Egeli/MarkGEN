import { CSS } from '../types';

const convertFunctionToInline = (func: (...args: any) => void): string => {
  const code = func.toString();
  return code.substring(code.indexOf('{') + 1, code.lastIndexOf('}')).trim();
};

export const generateInlineFunction = (
  func: (...args: any) => void,
  params: Record<string, any> | null
): string => {
  return params
    ? Object.entries(params).reduce<string>((acc, [key, value]) => {
        return acc.replace(new RegExp(`${key}`, 'g'), `"${value}"`);
      }, convertFunctionToInline(func))
    : convertFunctionToInline(func);
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
