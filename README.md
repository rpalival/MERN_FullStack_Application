# MERN_FullStack_Application
Project to learn how to create a complete Full stack social media web application using MERN Stack.

## Overview

This project is a simple social media application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to share pictures, interact with posts through comments and likes, and switch between dark and light modes for a personalized viewing experience.

## Features

- User authentication (sign up, log in, log out)
- Create and delete posts with images
- Like and comment on posts
- Dark/light mode toggle
- Responsive design for mobile and desktop
- Profile pages for users

## Technologies Used

### Frontend
- React.js
- Redux for state management
- React Router for navigation
- Material-UI for styling

### Backend
- Node.js
- Express.js
- MongoDB for database
- Mongoose for object modeling

### Other Libraries and Tools
- Multer for handling multipart/form-data and storing images locally
- Bcrypt for password hashing
- JSON Web Tokens (JWT) for authentication

## Installation

1. Clone the repository
2. Install dependencies for backend and frontend
3. Set up environment variables
Create a `.env` file in the backend directory and add the following:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
4. Start the backend server
5. Start the frontend development server
6. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Register a new account or log in with existing credentials
2. Create a new post by clicking the "New Post" button
3. Upload an image and add a caption to your post
4. Interact with other users' posts by liking or commenting
5. Toggle between dark and light modes using the switch in the navigation bar
