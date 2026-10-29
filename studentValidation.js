const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateStudent(req, res, next) {
  const { name, email, department } = req.body || {};
  if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !EMAIL.test(email.trim()) || typeof department !== "string" || !department.trim()) return res.status(400).json({ success: false, message: "Name, valid email, and department are required" });
  next();
}
function validateStudentUpdate(req, res, next) {
  const body = req.body || {}; const allowed = ["name", "email", "department"]; const keys = Object.keys(body);
  if (!keys.length || keys.some((key) => !allowed.includes(key))) return res.status(400).json({ success: false, message: "Provide at least one valid field: name, email, department" });
  if (body.name !== undefined && (typeof body.name !== "string" || !body.name.trim())) return res.status(400).json({ success: false, message: "Name must be a non-empty string" });
  if (body.department !== undefined && (typeof body.department !== "string" || !body.department.trim())) return res.status(400).json({ success: false, message: "Department must be a non-empty string" });
  if (body.email !== undefined && (typeof body.email !== "string" || !EMAIL.test(body.email.trim()))) return res.status(400).json({ success: false, message: "Enter a valid email" });
  next();
}
module.exports = { validateStudent, validateStudentUpdate };
