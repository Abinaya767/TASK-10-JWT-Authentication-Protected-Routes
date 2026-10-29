const service = require("../services/studentService");
function run(res, fn, status = 200) { try { return res.status(status).json({ success: true, ...fn() }); } catch (error) { return res.status(error.statusCode || 500).json({ success: false, message: error.message || "Internal Server Error" }); } }
exports.getAllStudents = (req, res) => run(res, () => { const students = service.getAllStudents(); return { count: students.length, students }; });
exports.getStudentById = (req, res) => run(res, () => ({ student: service.getStudentById(req.params.id) }));
exports.createStudent = (req, res) => run(res, () => ({ message: "Student created successfully", student: service.createStudent(req.body) }), 201);
exports.updateStudent = (req, res) => run(res, () => ({ message: "Student updated successfully", student: service.updateStudent(req.params.id, req.body) }));
exports.deleteStudent = (req, res) => run(res, () => { service.deleteStudent(req.params.id); return { message: "Student deleted successfully" }; });
