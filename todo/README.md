# Django REST To-Do API

A simple RESTful To-Do application built with Django and Django REST Framework, featuring token-based authentication, comprehensive permissions, and CRUD operations.

## 🚀 Features

- **Token-based Authentication** - Secure user authentication system
- **Permission Control** - Users can only access their own to-do items
- **CRUD Operations** - Create, read, update, and delete to-do items
- **Profile Image Upload** - Support for user profile images
- **Advanced Filtering** - Search, pagination, sorting
- **Rate Limiting** - API throttling
- **Automated Testing** - Test coverage

## 📦 API Endpoints

### Authentication
| Method | Endpoint            | Description             |
|--------|---------------------|-------------------------|
| POST   | `/auth/register/`   | Register a new user     |
| POST   | `/auth/login/`      | Get authentication token|
| POST   | `/auth/logout/`     | Logout (delete token)   |

### To-Do Operations
| Method   | Endpoint            | Description                                    |
|----------|---------------------|------------------------------------------------|
| GET      | `/todos/`           | List user's to-do items                        |
| GET/POST | `/create/`          | Create a new to-do adn list user's to-do items |
| PUT      | `/<id>/update/`     | Update a specific to-do                        |
| DELETE   | `/<id>/delete/`     | Delete a specific to-do                        |

## 🔐 Authentication

All endpoints except `/auth/register/` and `/auth/login/` require authentication.

Send the token in the `Authorization` header:

Authorization: Token your_token_here

## 📝 API Usage Examples

### User Registration
**POST** `/auth/register/`

**Content-Type:** `application/json` (or `multipart/form-data` for image upload)

json:
{
    "username": "johndoe",
    "password": "securepassword123",
    "password2": "securepassword123",
    "email": "john@example.com"
}

For profile image upload, use `multipart/form-data` with an additional `image` field.

### User Login
**POST** `/auth/login/`

json:
{
    "username": "johndoe",
    "password": "securepassword123"
}

**Response:**
json:
{
    "token": "your_authentication_token_here"
}

### User Logout
**POST** `/auth/logout/`

No request body required. Include the Authorization header.

### List To-Do Items
**GET** `/todos/`

**Query Parameters:**
- `limit` - Number of items per page
- `ordering` - Sort by: `title`, `created`, `updated`, `end_date` (prefix with `-` for descending)
- `search` - Filter by title (partial match)

**Examples:**

GET /todos/?ordering=-end_date
GET /todos/?search=shopping
GET /todos/?limit=10&search=work&ordering=created

### Create To-Do Item
**POST** `/create/`

json:
{
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation",
    "completed": false,
    "end_date": "2024-12-31"
}

**Field Details:**
- `title` - Required, must be unique per user
- `description` - Optional
- `completed` - Boolean, defaults to `false`
- `end_date` - Date format: `YYYY-MM-DD` or ISO 8601

### Update To-Do Item
**PUT** `/<id>/update/`

Send only the fields you want to update:

json:
{
    "title":"shopping - updated",
    "completed": true,
    "description": "Updated description",
    "end_date": 2025-01-01
}

### Delete To-Do Item
**DELETE** `/<id>/delete/`

No request body required.

## ⚠️ Important Notes

### Permissions
- Users can only access their own to-do items
- Authentication is required for all operations except registration and login

### Data Validation
- Usernames must be unique
- To-do titles must be unique per user
- Passwords must match during registration
- Valid email format required

### Rate Limiting
API requests are throttled to prevent abuse. Check response headers for rate limit information.

## 🧪 Testing

The application includes automated tests covering:
- Authentication
- CRUD operations


Built with ❤️ using Django REST Framework
