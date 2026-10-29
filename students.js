// Shared in-memory student store used by authentication and student CRUD APIs.
// Data resets whenever the server restarts; use a database for persistence.
const students = [];
module.exports = students;
