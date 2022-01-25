module.exports = (number, desc) => {
  const objError = {
    status: number,
    message: desc,
  };

  return objError;
};