function erroHandler(err, req, res) {
  console.error("Error encontrado:", err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode);

  res.json({
    error: {
      message: err.message || "Ha ocurrido un error en el servidor.",
    },
  });
}

module.exports = { verifyParams, erroHandler };
