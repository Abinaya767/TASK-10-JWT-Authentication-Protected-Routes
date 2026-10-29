const { randomUUID } = require("crypto");
const students = require("../data/students");
function publicStudent(student) { const { passwordHash, ...safeStudent } = student; return safeStudent; }
function getAllStudents() { return students.map(publicStudent); }
function getStudentById(id) {
  const student = students.find((item) => item.id === id);
  if (!student) { const error = new Error("Student not found"); error.statusCode = 404; throw error; }
  return publicStudent(student);
}
function createStudent({ name, email, department }) {
  const normalizedEmail = email.trim().toLowerCase();
  if (students.some((student) => student.email === normalizedEmail)) { const error = new Error("Email is already registered"); error.statusCode = 409; throw error; }
  const student = { id: randomUUID(), name: name.trim(), email: normalizedEmail, department: department.trim(), createdAt: new Date().toISOString() };
  students.push(student); return publicStudent(student);
}
function updateStudent(id, updates) {
  const student = students.find((item) => item.id === id);
  if (!student) { const error = new Error("Student not found"); error.statusCode = 404; throw error; }
  if (updates.email !== undefined) {
    const email = updates.email.trim().toLowerCase();
    if (students.some((item) => item.id !== id && item.email === email)) { const error = new Error("Email is already registered"); error.statusCode = 409; throw error; }
    student.email = email;
  }
  for (const field of ["name", "department"]) if (updates[field] !== undefined) student[field] = updates[field].trim();
  student.updatedAt = new Date().toISOString(); return publicStudent(student);
}
function deleteStudent(id) {
  const index = students.findIndex((item) => item.id === id);
  if (index === -1) { const error = new Error("Student not found"); error.statusCode = 404; throw error; }
  students.splice(index, 1);
}
module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };
