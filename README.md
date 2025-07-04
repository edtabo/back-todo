<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest" /></a>
</p>

# Domina Backend API

A NestJS backend application with Firebase authentication and PostgreSQL database using Prisma ORM.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Firebase project

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd back
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Firebase Configuration
FIREBASE_PROJECT_ID="your-firebase-project-id"
FIREBASE_CLIENT_EMAIL="your-firebase-client-email"
FIREBASE_PRIVATE_KEY="your-firebase-private-key"
```

### Database Setup

1. **Install Prisma CLI** (if not already installed)
```bash
npm install -g prisma
```

2. **Generate Prisma Client**
```bash
npx prisma generate
```

3. **Run Database Migrations**
```bash
npx prisma migrate dev
```


### Firebase Configuration

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select an existing one

2. **Generate Service Account Key**
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Download the JSON file
   - Extract the following values to your `.env` file:
     - `project_id` → `FIREBASE_PROJECT_ID`
     - `client_email` → `FIREBASE_CLIENT_EMAIL`
     - `private_key` → `FIREBASE_PRIVATE_KEY`

### Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

The application will be available at `http://localhost:3005`

## 📚 API Documentation

### Authentication

All API endpoints require Firebase authentication. Include the Firebase ID token in the Authorization header:

```
Authorization: Bearer <firebase-id-token>
```

### Response Format

All API responses follow this format:

```json
{
  "success": boolean,
  "message": string,
  "data": any
}
```

### Endpoints

#### Authentication

##### POST /auth
Create a new user account.

**Request Body:**
```json
{
  "fullName": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": "user-id"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message"
}
```

#### Tasks

##### POST /tasks
Create a new task.

**Request Body:**
```json
{
  "title": "string",
  "description": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": "task-id"
}
```

##### GET /tasks
Get all tasks for the authenticated user.

**Response:**
```json
{
  "success": true,
  "message": "Tasks retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "Task title",
      "description": "Task description",
      "status": 0,
      "userId": 1,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

##### GET /tasks/:id
Get a specific task by ID.

**Parameters:**
- `id` (number): Task ID

**Response:**
```json
{
  "success": true,
  "message": "Task retrieved successfully",
  "data": {
    "id": 1,
    "title": "Task title",
    "description": "Task description",
    "status": 0,
    "userId": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

##### PATCH /tasks/:id
Update a task.

**Parameters:**
- `id` (number): Task ID

**Request Body:**
```json
{
  "title": "string",     // optional
  "description": "string" // optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": 1,
    "title": "Updated title",
    "description": "Updated description",
    "status": 0,
    "userId": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

##### DELETE /tasks/:id
Delete a task.

**Parameters:**
- `id` (number): Task ID

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

## 📁 Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── dto/             # Data transfer objects
│   ├── entities/        # Database entities
│   ├── interfaces/      # TypeScript interfaces
│   ├── queries/         # Database queries
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── tasks/               # Tasks module
│   ├── dto/             # Data transfer objects
│   ├── entities/        # Database entities
│   ├── interfaces/      # TypeScript interfaces
│   ├── queries/         # Database queries
│   ├── tasks.controller.ts
│   ├── tasks.service.ts
│   └── tasks.module.ts
├── commons/             # Shared utilities
│   ├── interfaces.ts    # Common interfaces
│   ├── localizations/   # Localization messages
│   └── queries/         # Shared database queries
├── guards/              # Authentication guards
├── prisma/              # Prisma configuration
├── utils/               # Utility functions
│   └── firebase.ts      # Firebase configuration
├── app.module.ts        # Main application module
└── main.ts             # Application entry point
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email | Yes |
| `FIREBASE_PRIVATE_KEY` | Firebase service account private key | Yes |

## 📝 Database Schema

### Users Table
- `id` (Primary Key, Auto Increment)
- `fullName` (String)
- `email` (String, Unique)
- `password` (String)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Tasks Table
- `id` (Primary Key, Auto Increment)
- `title` (String)
- `description` (String)
- `status` (Integer, Default: 0)
  - 0: Todo
  - 1: In Progress
  - 2: Done
- `userId` (Foreign Key to Users)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)
