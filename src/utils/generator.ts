const inlineFunction = (func: (...args: any) => void): string => {
  const code = func.toString();
  return code.substring(code.indexOf('{') + 1, code.lastIndexOf('}')).trim();
};

export const generateInlineFunction = (
  func: (...args: any) => void,
  params: Record<string, any>
): string => {
  return Object.entries(params).reduce<string>((acc, [key, value]) => {
    return acc.replace(key, `"${value}"`);
  }, inlineFunction(func));
};
