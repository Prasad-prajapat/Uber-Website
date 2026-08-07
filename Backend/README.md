# Backend API Documentation

## User Registration Endpoint

## POST /users/register

Registers a new user in the system.

### Description
This endpoint creates a new user account with a full name, email, and password.

### Request Body
The request body should be a JSON object in the following format:

- `fullname` (object):
  - `firstname` (string, required): User's first name (minimum 3 characters)
  - `lastname` (string, optional): User's last name
- `email` (string, required): User's email address (must be valid)
- `password` (string, required): User's password (minimum 8 characters)

Example request body:

### Response
#### Success
- Status Code: 201 Created
- Returns a JSON object with:
  - `user` (object)
    - `fullname` (object)
      - `firstname` (string) User's first name (minimum 3 characters)
      - `lastname` (string) User's last name
    - `email` (string) User's email address (must be valid)
    - `password` (string) User's password (minimum 8 characters)
  - `token` (string): JWT Token

## User Login Endpoint

## POST /users/login

Authenticates an existing user in the system.

### Description
This endpoint logs in a user using their email and password.

### Request Body
The request body should be a JSON object in the following format:

- `email` (string, required): User's email address (must be valid)
- `password` (string, required): User's password (minimum 8 characters)

Example request body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Response
#### Success
- Status Code: 200 OK
- Returns a JSON object with:
  - `user` (object)
    - `fullname` (object)
      - `firstname` (string) User's first name (minimum 3 characters)
      - `lastname` (string) User's last name
    - `email` (string) User's email address (must be valid)
    - `password` (string) User's password (minimum 8 characters)
  - `token` (string): JWT Token
