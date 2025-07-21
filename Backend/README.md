# URBIK Backend API Documentation

## User Endpoints

### Register User

**Endpoint:**  
`POST /users/register`

**Description:**  
Registers a new user in the system. Expects user details in the request body, validates input, hashes the password, creates the user, and returns an authentication token with user data.

**Request Body:**

```json
{
  "fullName": {
    "firstName": "string (min 3 chars, required)",
    "lastName": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, min 5 chars, required)",
  "password": "string (min 6 chars, required)"
}
```

**Example:**

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Responses:**

- **201 Created**
  ```json
  {
    "token": "<jwt_token>",
    "user": {
      /* user object */
    }
  }
  ```
- **400 Bad Request**
  ```json
  {
    "errors": [{ "msg": "Error message" }]
  }
  ```

**Notes:**

- All required fields must be provided and valid.
- Password is securely hashed before storage.
- Response includes a JWT token for authentication.

---

### Login User

**Endpoint:**  
`POST /users/login`

**Description:**  
Authenticates an existing user. Checks credentials and, if valid, returns an authentication token and user data.

**Request Body:**

```json
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

**Example:**

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Responses:**

- **200 OK**
  ```json
  {
    "token": "<jwt_token>",
    "user": {
      /* user object */
    }
  }
  ```
- **400 Bad Request**
  ```json
  {
    "errors": [{ "msg": "Error message" }]
  }
  ```
- **401 Unauthorized**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

**Notes:**

- Both fields are required and must be valid.
- Returns a JWT token for authentication on successful login.

---

### Get User Profile

**Endpoint:**  
`GET /users/profile`

**Description:**  
Retrieves the profile information of the currently authenticated user.

**Authentication:**  
Requires a valid JWT token in the Authorization header or as a cookie.

**Example Request:**

```
GET /users/profile
Authorization: Bearer <jwt_token>
```

**Responses:**

- **200 OK**
  ```json
  {
    "_id": "user_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
    /* other user fields */
  }
  ```
- **401 Unauthorized**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

**Notes:**

- Must include a valid JWT token in the request header or as a cookie.
- Returns the authenticated user's profile data.

---

### Logout User

**Endpoint:**  
`GET /users/logout`

**Description:**  
Logs out the currently authenticated user by invalidating their token.

**Authentication:**  
Requires a valid JWT token in the Authorization header or as a cookie.

**Example Request:**

```
GET /users/logout
Authorization: Bearer <jwt_token>
```

**Responses:**

- **200 OK**
  ```json
  {
    "message": "Logged out"
  }
  ```
- **401 Unauthorized**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

**Notes:**

- Must include a valid JWT token in the request header or as a cookie.
- Clears the authentication cookie and blacklists the token to prevent reuse.

---

## Captain Endpoints

### Register Captain

**Endpoint:**  
`POST /captains/register`

**Description:**  
Registers a new captain in the system. Expects captain details, including vehicle information, in the request body. Validates input, hashes the password, creates the captain, and returns an authentication token with captain data.

**Request Body:**

```json
{
  "fullName": {
    "firstName": "Alice", // string, required, min 3 chars
    "lastName": "Smith" // string, optional, min 3 chars
  },
  "email": "alice.smith@example.com", // string, required, valid email, unique
  "password": "Secure@123", // string, required, min 8 chars, must include uppercase, lowercase, number, special char
  "vehicle": {
    "color": "Red", // string, required, min 3 chars
    "plate": "XYZ123", // string, required, min 3 chars, unique
    "capacity": 4, // number, required, min 1
    "vehicleType": "car" // string, required, one of: "car", "bike", "auto", "e-rikshaw"
  }
}
```

**Responses:**

- **201 Created**
  ```json
  {
    "token": "<jwt_token>",
    "captain": {
      "_id": "captain_id",
      "fullName": {
        "firstName": "Alice",
        "lastName": "Smith"
      },
      "email": "alice.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      }
      /* other captain fields */
    }
  }
  ```
- **400 Bad Request**
  ```json
  {
    "errors": [{ "msg": "Error message" }]
    // or
    // "message": "Captain already exist"
  }
  ```

**Notes:**

- All required fields must be provided and valid.
- Password is securely hashed before storage.
- Response includes a JWT token for authentication.

---

### Login Captain

**Endpoint:**  
`POST /captains/login`

**Description:**  
Authenticates a captain. Checks credentials and, if valid, returns an authentication token and captain data.

**Request Body:**

```json
{
  "email": "alice.smith@example.com", // string, required, valid email
  "password": "Secure@123" // string, required, min 8 chars, must include uppercase, lowercase, number, special char
}
```

**Responses:**

- **200 OK**
  ```json
  {
    "token": "<jwt_token>",
    "captain": {
      "_id": "captain_id",
      "fullName": {
        "firstName": "Alice",
        "lastName": "Smith"
      },
      "email": "alice.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      }
      /* other captain fields */
    }
  }
  ```
- **400 Bad Request**
  ```json
  {
    "errors": [{ "msg": "Error message" }]
  }
  ```
- **401 Unauthorized**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

---

### Get Captain Profile

**Endpoint:**  
`GET /captains/profile`

**Description:**  
Retrieves the profile information of the currently authenticated captain.

**Authentication:**  
Requires a valid JWT token in the Authorization header or as a cookie.

**Example Request:**

```
GET /captains/profile
Authorization: Bearer <jwt_token>
```

**Responses:**

- **200 OK**
  ```json
  {
    "captain": {
      "_id": "captain_id",
      "fullName": {
        "firstName": "Alice",
        "lastName": "Smith"
      },
      "email": "alice.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      }
      /* other captain fields */
    }
  }
  ```
- **401 Unauthorized**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

### Logout Captain

**Endpoint:**  
`GET /captains/logout`

**Description:**  
Logs out the currently authenticated captain by invalidating their token.

**Authentication:**  
Requires a valid JWT token in the Authorization header or as a cookie.

**Example Request:**

```
GET /captains/logout
Authorization: Bearer <jwt_token>
```

**Responses:**

- **200 OK**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```
- **401 Unauthorized**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---
