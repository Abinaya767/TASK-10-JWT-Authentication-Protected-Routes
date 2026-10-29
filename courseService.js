const { randomUUID } = require("crypto");
const courses = require("../data/courses");
function getAllCourses() { return courses; }
function getCourseById(id) {
  const course = courses.find((item) => item.id === id);
  if (!course) { const error = new Error("Course not found"); error.statusCode = 404; throw error; }
  return course;
}
function createCourse({ title, description, instructor, duration }) {
  const course = { id: randomUUID(), title: title.trim(), description: description.trim(), instructor: instructor.trim(), duration: duration.trim(), createdAt: new Date().toISOString() };
  courses.push(course); return course;
}
function updateCourse(id, updates) {
  const course = getCourseById(id);
  for (const field of ["title", "description", "instructor", "duration"]) if (updates[field] !== undefined) course[field] = updates[field].trim();
  course.updatedAt = new Date().toISOString(); return course;
}
function deleteCourse(id) {
  const index = courses.findIndex((item) => item.id === id);
  if (index === -1) { const error = new Error("Course not found"); error.statusCode = 404; throw error; }
  courses.splice(index, 1);
}
module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };
