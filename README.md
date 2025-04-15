[Hosted on Vercel](https://stride-three.vercel.app/)

This project is published solely for review by Stride Therapy, Inc. No license is granted for reuse, modification, or distribution of the source code.

# Appointment Scheduler, Note Taker, and Patient List

This project is a take-home interview assignment designed to showcase an appointment scheduler, note-taking functionality, and a patient list.

## Technologies Used

This project leverages the following technologies and tools:

- **React**
- **TypeScript**
- **SCSS**
- **Material UI**
- **Context API**: For global state management.
- **API Caching**: To optimize performance and reduce redundant API calls and avoid burdensome state management.

## Getting Started

### Environment Setup
To configure the project, create a `.env` file at the `src` level with the following variable:

```
VITE_API_BASE_URL=<your_api_base_url>
```

If `VITE_API_BASE_URL` is not provided, the application will default to using `http://localhost:3000`.

### Installation and Running the Project
1. Install dependencies:
  ```bash
  npm i
  ```
2. Start the development server:
  ```bash
  npm run dev
  ```

The application will be available at the URL provided by the development server.

## Features
- **Appointment Scheduler**: Manage and schedule appointments for patietns.
- **Note Taker**: Add, edit, and delete notes tied to appointments.
- **Patient List**: View and manage a list of patients.
