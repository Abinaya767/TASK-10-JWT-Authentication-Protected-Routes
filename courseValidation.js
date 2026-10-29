const fields = ["title", "description", "instructor", "duration"];
function validateCourse(req, res, next) {
  const body = req.body || {};
  for (const field of fields) if (typeof body[field] !== "string" || !body[field].trim()) return res.status(400).json({ success: false, message: `${field} is required and must be a non-empty string` });
  next();
}
function validateCourseUpdate(req, res, next) {
  const body = req.body || {}; const keys = Object.keys(body);
  if (!keys.length || keys.some((key) => !fields.includes(key))) return res.status(400).json({ success: false, message: "Provide at least one valid field: title, description, instructor, duration" });
  for (const field of keys) if (typeof body[field] !== "string" || !body[field].trim()) return res.status(400).json({ success: false, message: `${field} must be a non-empty string` });
  next();
}
module.exports = { validateCourse, validateCourseUpdate };
