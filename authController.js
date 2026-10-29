const authService = require("../services/authService");

async function register(req, res, next) {
  try {
    const student = await authService.registerStudent(req.body);

    return res.status(201).json({
      success: true,
      message: "Student registered successfully",
      student,
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const result = await authService.loginStudent(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: result.token,
      tokenType: result.tokenType,
      expiresIn: result.expiresIn,
      student: result.student,
    });
  } catch (error) {
    next(error);
  }
}

function me(req, res) {
  return res.status(200).json({ success: true, user: req.user });
}

module.exports = {
  register,
  login,
  me,
};