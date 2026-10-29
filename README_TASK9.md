# LearnSpace Backend — Task 9

## Start
1. Open a terminal in this `backend` folder.
2. Run `npm install`.
3. Run `npm start`. The server runs at `http://localhost:5000`.

## Endpoint prefixes
Both the original `/api/v1/...` routes and the Task 9 short routes are supported.

### Auth
- `POST /api/auth/register` (also `/api/v1/auth/register`) — JSON: `{ "name": "Kavya", "email": "kavya@example.com", "password": "Password123", "department": "Computer Science" }`
- `POST /api/auth/login` (also `/api/v1/auth/login`) — JSON: `{ "email": "kavya@example.com", "password": "Password123" }`

### Students
- `GET /api/students` — list
- `GET /api/students/:id` — get one
- `POST /api/students` — create with `name`, `email`, `department`
- `PUT /api/students/:id` or `PATCH /api/students/:id` — update one or more of `name`, `email`, `department`
- `DELETE /api/students/:id` — delete

### Courses
- `GET /api/courses` — list
- `GET /api/courses/:id` — get one
- `POST /api/courses` — create with `title`, `description`, `instructor`, `duration`
- `PUT /api/courses/:id` or `PATCH /api/courses/:id` — update one or more course fields
- `DELETE /api/courses/:id` — delete

## Postman
Import `postman/Task9-LearnSpace.postman_collection.json`. The collection includes sample requests. For create-then-update/delete tests, copy the `id` from the create response into the relevant URL.

## Notes
- Passwords are hashed and never included in student responses.
- Validation errors return HTTP 400, duplicate emails return HTTP 409, missing records return HTTP 404, successful creates return HTTP 201, and successful reads/updates/deletes return HTTP 200.
- This project uses in-memory arrays as in the submitted project, so records reset when the server restarts.
