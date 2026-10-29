# LearnSpace Backend — Task 10: JWT Authentication & Protected Routes

This version extends the Task 9 Student & Course Management REST API with JWT-based authentication.

## Requirements
- Node.js 18 or newer
- npm

## Run locally
1. Extract the ZIP.
2. Open a terminal in the `backend` folder.
3. Run `npm install`.
4. Run `npm start`.
5. Check `http://localhost:5000/api/health`.

The included `.env` is for local development only. Before deployment, replace `JWT_SECRET` with a unique, random secret of at least 32 characters and do not commit `.env` to a public repository.

## Authentication flow
1. Register using `POST /api/auth/register`.
2. Log in using `POST /api/auth/login`.
3. A successful login returns a signed HS256 JWT in `token`; it expires in 1 hour.
4. Send the token to protected endpoints in the HTTP header: `Authorization: Bearer <token>`.
5. The middleware verifies the signature and expiry, then exposes the token claims as `req.user`.
6. Requests with no, invalid, or expired token receive `401 Unauthorized`.

## Endpoints

### Public
- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`

### Protected
- `GET /api/auth/me` — returns the authenticated user from `req.user`.
- All `/api/students` CRUD endpoints.
- All `/api/courses` CRUD endpoints.

The `/api/v1/...` aliases are also supported.

## Example requests

Register (`POST http://localhost:5000/api/auth/register`):
```json
{
  "name": "Test Student",
  "email": "abi.test2026@example.com",
  "password": "Test@12345",
  "department": "Computer Science"
}
```

Login (`POST http://localhost:5000/api/auth/login`):
```json
{
  "email": "abi.test2026@example.com",
  "password": "Test@12345"
}
```

Copy the `token` from the login response. For a protected request, set the `Authorization` header to `Bearer YOUR_TOKEN`.

## Client-side token handling
This ZIP contains the backend only, so it cannot change the separate React frontend automatically. On the frontend, keep the token in application memory when possible; if persistence across a page refresh is needed for this coursework, `sessionStorage` is a simpler short-lived option. Do not put passwords in storage. Send the token as a Bearer header on protected API calls and clear it on logout. For production browser applications, consider an appropriately configured Secure, HttpOnly, SameSite cookie and CSRF protections.

Example:
```js
const token = sessionStorage.getItem("learnspace_token");
const response = await fetch("http://localhost:5000/api/students", {
  headers: { Authorization: `Bearer ${token}` }
});
```

## Tests
Run `npm test` to execute the included JWT unit tests.

## Current project limitations
Student and course data are held in in-memory arrays, so they reset when the server restarts. Use a database for persistent storage. This is a coursework implementation, not a production security review.
