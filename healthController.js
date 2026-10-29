const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    message: "LearnSpace API is healthy",
  });
};

module.exports = { getHealth };