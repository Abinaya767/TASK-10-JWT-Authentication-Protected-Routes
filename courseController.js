const service = require("../services/courseService");
function run(res, fn, status = 200) { try { return res.status(status).json({ success: true, ...fn() }); } catch (error) { return res.status(error.statusCode || 500).json({ success: false, message: error.message || "Internal Server Error" }); } }
exports.getAllCourses = (req, res) => run(res, () => { const courses = service.getAllCourses(); return { count: courses.length, courses }; });
exports.getCourseById = (req, res) => run(res, () => ({ course: service.getCourseById(req.params.id) }));
exports.createCourse = (req, res) => run(res, () => ({ message: "Course created successfully", course: service.createCourse(req.body) }), 201);
exports.updateCourse = (req, res) => run(res, () => ({ message: "Course updated successfully", course: service.updateCourse(req.params.id, req.body) }));
exports.deleteCourse = (req, res) => run(res, () => { service.deleteCourse(req.params.id); return { message: "Course deleted successfully" }; });
