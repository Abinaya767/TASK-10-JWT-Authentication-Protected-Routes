const test = require("node:test");
const assert = require("node:assert/strict");
process.env.JWT_SECRET = "test-secret-that-is-long-enough-for-hmac-signing";
const { signToken, verifyToken } = require("../utils/jwt");

test("signs and verifies a JWT with the expected claims", () => {
  const token = signToken({ sub: "student-1", email: "student@example.com" });
  const payload = verifyToken(token);
  assert.equal(payload.sub, "student-1");
  assert.equal(payload.email, "student@example.com");
  assert.ok(payload.exp > payload.iat);
});

test("rejects a token with a modified signature", () => {
  const token = signToken({ sub: "student-1" });
  const parts = token.split(".");
  parts[2] = `${parts[2].slice(0, -1)}${parts[2].endsWith("a") ? "b" : "a"}`;
  assert.throws(() => verifyToken(parts.join(".")));
});

test("rejects an expired token", () => {
  const token = signToken({ sub: "student-1" }, -1);
  assert.throws(() => verifyToken(token), /Token expired/);
});
