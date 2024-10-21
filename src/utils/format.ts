export const isStringEmpty = (str: null | undefined | string) => {
  if (str === undefined || str === null || str.length === 0) {
    return true;
  }

  return false;
};
