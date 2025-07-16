# Backend API Documentation

## Endpoint

`POST /users/register`

## Description

Registers a new user in the system. The endpoint expects user details in the request body, validates the input, hashes the password, creates the user, and returns an authentication token along with the user data.

## Request Body

Send a JSON object with the following structure:

```
{
  "fullName": {
    "firstName": "string (min 3 chars, required)",
    "lastName": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, min 5 chars, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example

```
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

- **201 Created**

  - User registered successfully.
  - Response body:
    ```
    {
      "token": "<jwt_token>",
      "user": { ...userObject }
    }
    ```

- **400 Bad Request**
  - Validation failed. Response contains an array of error messages.
    ```
    {
      "errors": [
        { "msg": "Error message", ... }
      ]
    }
    ```

## Notes

- All required fields must be provided and valid.
- The password is securely hashed before storage.
- The response includes a JWT token for authentication.

---

## Endpoint

`POST /users/login`

## Description

Authenticates an existing user. The endpoint checks the provided credentials, and if valid, returns an authentication token and user data.

## Request Body

Send a JSON object with the following structure:

```
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example

```
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

- **200 OK**

  - Login successful.
  - Response body:
    ```
    {
      "token": "<jwt_token>",
      "user": { ...userObject }
    }
    ```

- **400 Bad Request**

  - Validation failed. Response contains an array of error messages.
    ```
    {
      "errors": [
        { "msg": "Error message", ... }
      ]
    }
    ```

- **401 Unauthorized**
  - Invalid email or password.
    ```
    {
      "message": "Invalid email or password"
    }
    ```

## Notes

- Both fields are required and must be valid.
- Returns a JWT token for authentication on successful login.

---

## Endpoint

`GET /users/profile`

## Description

Retrieves the profile information of the currently authenticated user.

## Authentication

Requires a valid JWT token in the Authorization header or as a cookie.

### Example Request

```
GET /users/profile
Authorization: Bearer <jwt_token>
```

## Responses

- **200 OK**

  - Profile retrieved successfully.
  - Response body:
    ```
    {
      "_id": "user_id",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      ...otherUserFields
    }
    ```

- **401 Unauthorized**
  - No token provided or invalid token.
    ```
    {
      "message": "Unauthorized"
    }
    ```

## Notes

- Must include a valid JWT token in the request header or as a cookie.
- Returns the authenticated user's profile data.

---

## Endpoint

`GET /users/logout`

## Description

Logs out the currently authenticated user by invalidating their token.

## Authentication

Requires a valid JWT token in the Authorization header or as a cookie.

### Example Request

```
GET /users/logout
Authorization: Bearer <jwt_token>
```

## Responses

- **200 OK**

  - Successfully logged out.
  - Response body:
    ```
    {
      "message": "Logged out"
    }
    ```

- **401 Unauthorized**
  - No token provided or invalid token.
    ```
    {
      "message": "Unauthorized"
    }
    ```

## Notes

- Must include a valid JWT token in the request header or as a cookie.
- Clears the authentication cookie and blacklists the token to prevent reuse.
