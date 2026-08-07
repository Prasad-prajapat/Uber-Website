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

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "password123"
}
```

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

Example response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "password": "hashed_password"
  }
}
```

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

Example response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "password": "hashed_password"
  }
}
```

## User Profile Endpoint

## GET /users/profile

Retrieves the authenticated user's profile information.

### Description
This endpoint returns the profile details of the currently logged-in user.

### Request Headers
- `Authorization` (string, required): Bearer token received after login or registration

Example request header:

```http
Authorization: Bearer <jwt_token>
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

Example response:

```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "password": "hashed_password"
  }
}
```

## User Logout Endpoint

## GET /users/logout

Logs out the authenticated user from the system.

### Description
This endpoint clears the authentication cookie and invalidates the current token.

### Request Headers
- `Authorization` (string, required): Bearer token received after login or registration

Example request header:

```http
Authorization: Bearer <jwt_token>
```

### Response
#### Success
- Status Code: 200 OK
- Returns a JSON object with:
  - `message` (string): Confirmation that the user logged out successfully

## Captain Registration Endpoint

## POST /captains/register

Registers a new captain in the system.

### Description
This endpoint creates a new captain account with personal details, email, password, and vehicle information.

### Request Body
The request body should be a JSON object in the following format:

- `fullname` (object):
  - `firstname` (string, required): Captain's first name (minimum 3 characters)
  - `lastname` (string, optional): Captain's last name
- `email` (string, required): Captain's email address (must be valid)
- `password` (string, required): Captain's password (minimum 8 characters)
- `vehicle` (object, required):
  - `color` (string, required): Vehicle color
  - `plateNumber` (string, required): Vehicle plate number
  - `capacity` (number, required): Vehicle passenger capacity (minimum 1)
  - `vehicleType` (string, required): Vehicle type (car, bike, or auto)

Example request body:

```json
{
  "fullname": {
    "firstname": "Ali",
    "lastname": "Khan"
  },
  "email": "ali@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Black",
    "plateNumber": "ABC-123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Response
#### Success
- Status Code: 201 Created
- Returns a JSON object with:
  - `captain` (object)
    - `fullname` (object)
      - `firstname` (string) Captain's first name
      - `lastname` (string) Captain's last name
    - `email` (string) Captain's email address
    - `vehicle` (object)
      - `color` (string) Vehicle color
      - `plateNumber` (string) Vehicle plate number
      - `capacity` (number) Vehicle capacity
      - `vehicleType` (string) Vehicle type
  - `token` (string): JWT Token

Example response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  "captain": {
    "fullname": {
      "firstname": "Ali",
      "lastname": "Khan"
    },
    "email": "ali@example.com",
    "vehicle": {
      "color": "Black",
      "plateNumber": "ABC-123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

## Captain Login Endpoint

## POST /captains/login

Authenticates an existing captain in the system.

### Description
This endpoint logs in a captain using their email and password.

### Request Body
The request body should be a JSON object in the following format:

- `email` (string, required): Captain's email address (must be valid)
- `password` (string, required): Captain's password (minimum 8 characters)

Example request body:

```json
{
  "email": "ali@example.com",
  "password": "password123"
}
```

### Response
#### Success
- Status Code: 200 OK
- Returns a JSON object with:
  - `captain` (object)
    - `fullname` (object)
      - `firstname` (string) Captain's first name
      - `lastname` (string) Captain's last name
    - `email` (string) Captain's email address
    - `vehicle` (object)
      - `color` (string) Vehicle color
      - `plateNumber` (string) Vehicle plate number
      - `capacity` (number) Vehicle capacity
      - `vehicleType` (string) Vehicle type
  - `token` (string): JWT Token

Example response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  "captain": {
    "fullname": {
      "firstname": "Ali",
      "lastname": "Khan"
    },
    "email": "ali@example.com",
    "vehicle": {
      "color": "Black",
      "plateNumber": "ABC-123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

## Captain Profile Endpoint

## GET /captains/profile

Retrieves the authenticated captain's profile information.

### Description
This endpoint returns the profile details of the currently logged-in captain.

### Request Headers
- `Authorization` (string, required): Bearer token received after captain login or registration

Example request header:

```http
Authorization: Bearer <jwt_token>
```

### Response
#### Success
- Status Code: 200 OK
- Returns a JSON object with:
  - `captain` (object)
    - `fullname` (object)
      - `firstname` (string) Captain's first name
      - `lastname` (string) Captain's last name
    - `email` (string) Captain's email address
    - `vehicle` (object)
      - `color` (string) Vehicle color
      - `plateNumber` (string) Vehicle plate number
      - `capacity` (number) Vehicle capacity
      - `vehicleType` (string) Vehicle type

Example response:

```json
{
  "captain": {
    "fullname": {
      "firstname": "Ali",
      "lastname": "Khan"
    },
    "email": "ali@example.com",
    "vehicle": {
      "color": "Black",
      "plateNumber": "ABC-123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

## Captain Logout Endpoint

## GET /captains/logout

Logs out the authenticated captain from the system.

### Description
This endpoint clears the authentication cookie and invalidates the current token.

### Request Headers
- `Authorization` (string, required): Bearer token received after captain login or registration

Example request header:

```http
Authorization: Bearer <jwt_token>
```

### Response
#### Success
- Status Code: 200 OK
- Returns a JSON object with:
  - `message` (string): Confirmation that the captain logged out successfully

Example response:

```json
{
  "message": "Captain logged out successfully"
}
```
