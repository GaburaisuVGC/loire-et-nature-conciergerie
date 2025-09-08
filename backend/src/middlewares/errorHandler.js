export const errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.message.includes('non trouvé') ? 404 : 500;
  res.status(status).json({ error: err.message });
};