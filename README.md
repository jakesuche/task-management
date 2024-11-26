
# Task Management Application

This is a **Task Management Application** built using Vue 3 and a mock JSON server. The app provides features like task management, Kanban board functionality with drag-and-drop support, and a clean, responsive UI. 

---

## Tools and Technologies

### Frontend
- **Vue 3**: Progressive JavaScript framework for building the user interface.
- **TypeScript**: Type-safe language for JavaScript development.
- **Pinia**: State management library for managing application state.
- **Vee-Validate + Zod**: Libraries for robust and schema-based form validation.
- **TailwindCSS**: Utility-first CSS framework for responsive and modern styling.
- **Vue Draggable**: Library for enabling drag-and-drop functionality in the Kanban board.

### Backend
- **JSON Server**: Provides a mock backend for API testing.

### Development Tools
- **Vite**: Build tool and development server for fast performance.
- **ESLint**: Ensures code consistency through linting.
- **Prettier**: Code formatter for clean and uniform code.
- **Vitest**: Lightweight unit testing framework.

---


# Available Scripts

The project provides several useful scripts to streamline development, build, testing, and code quality processes.

## Scripts and Their Descriptions

| Script             | Description                                      |
|--------------------|--------------------------------------------------|
| `npm run dev`      | Starts the development server using **Vite**.    |
| `npm run build`    | Builds the application for production.           |
| `npm run mock`     | Starts the **JSON Server** on `http://localhost:8080`. |
| `npm run lint`     | Lints and fixes code issues using **ESLint**.    |
| `npm run format`   | Formats code to ensure consistency using **Prettier**. |
| `npm run test:unit`| Runs unit tests with **Vitest**.                 |

## Usage

### Development
To start the development server and begin working on the application:

## Features

- **Task Management**:
  - Add, update, delete, and retrieve tasks.
- **Kanban Board**:
  - Drag-and-drop functionality for task progress.
- **API Mocking**:
  - Uses a lightweight JSON server for local and remote testing.
  
---

## Project Details

### API Endpoints

The application interacts with tasks using a RESTful API. Below are the endpoints:

#### Base URLs
- **Local**: `http://localhost:8080`
- **Test**: `https://my-json-server.typicode.com/jakesuche/task-management`

#### Task Actions

| Method | Endpoint       | Description            |
|--------|----------------|------------------------|
| GET    | `/task`        | Fetch all tasks.       |
| POST   | `/task`        | Create a new task.     |
| PUT    | `/task/:id`    | Update a task by ID.   |
| DELETE | `/task/:id`    | Delete a task by ID.   |

---

## Installation Guide

### Prerequisites

Make sure you have the following installed on your system:
- **Node.js** (v16 or above)
- **npm** (v8 or above)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jakesuche/task-management.git
   cd task-management
   ```

2. **Install dependencies**:
   ```bash
   npm install or yarn install
   ```

3. **Start the mock API server**:

    ```bash
    npm run mock or yarn mock
   ```

4. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/task-management.git
   cd task-management
   npm install or yarn install
   npm run mock or yarn mock




## Project Structure

```plaintext
src/
├── assets/           # Static assets like images, fonts, etc.
├── components/       # Reusable Vue components
│   ├── button/       # Custom buttons
│   ├── panel/        # Task panels
│   ├── __test__/     # Unit tests for components
├── composables/      # Vue 3 Composition API utilities
├── schema/           # JSON schemas and validation rules
├── stores/           # Pinia stores for state management
├── types/            # TypeScript types and interfaces
├── util/             # Utility functions
├── views/            # Page-level views
│   ├── kanban-board/ # Kanban board view
│   ├── task-*        # Task-related views (details, forms, filters, etc.)
├── App.vue           # Root Vue component
└── main.ts           # Application entry point

```
