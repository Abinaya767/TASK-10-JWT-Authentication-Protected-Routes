const bcrypt = require("bcryptjs");
const { randomUUID } = require("crypto");
const students = require("../data/students");
const { signToken } = require("../utils/jwt");

async function registerStudent({ name, email, password, department }) {
  const normalizedEmail = email.trim().toLowerCase();

  const existingStudent = students.find(
    (student) => student.email === normalizedEmail
  );

  if (existingStudent) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const student = {
    id: randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    department: department.trim(),
    createdAt: new Date().toISOString(),
  };

  students.push(student);

  const { passwordHash: ignored, ...safeStudent } = student;
  return safeStudent;
}

async function loginStudent({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();

  const student = students.find(
    (item) => item.email === normalizedEmail
  );

  if (
    !student ||
    !(await bcrypt.compare(password, student.passwordHash))
  ) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const safeStudent = {
    id: student.id,
    name: student.name,
    email: student.email,
    department: student.department,
  };

  const token = signToken({
    sub: student.id,
    name: student.name,
    email: student.email,
    department: student.department,
  });

  return { student: safeStudent, token, tokenType: "Bearer", expiresIn: 3600 };
}

module.exports = {
  registerStudent,
  loginStudent,
};