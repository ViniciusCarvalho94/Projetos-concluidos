const error = (err, _req, res, _next) => {
  if (err.status) {
    const { status, code, message } = err;
    return res.status(status).json({ err: { code, message } });
  }

  return res.status(500).json({ message: 'Internal Error' });
};

module.exports = error;