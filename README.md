# Blog Application README

## Introduction

Welcome to the Blog Application! This full-stack application allows users to create accounts, post blogs, like and comment on blogs, follow friends, explore popular and recent blogs, and perform both full-text and fuzzy search. The application is built using **Node.js**, **React.js**, and **Express**, with additional features such as sentiment analysis and media uploads.

---

## Features

### User Accounts

- **Sign Up and Log In**: Users can create an account using their email, name, and phone number. The application supports OTP authentication for both signup and login.
- **Profile Management**: Users can update their profile details and manage their account settings.

### Blog Posting

- **Create Blogs**: Users can write and post blogs with the option to upload images and PDFs.
- **Edit and Delete Blogs**: Users can edit or delete their own blogs.
- **Rich Text Editor**: The blog editor supports rich text formatting for better content presentation.

### Interactions

- **Like Blogs**: Users can like or unlike blogs. Each blog card displays whether the logged-in user has already liked the blog.
- **Comment on Blogs**: Users can add comments to blogs, fostering discussions and interactions.
- **Follow Friends**: Users can follow their friends and view their friends' activities.

### Exploration and Search

- **Popular and Recent Blogs**: Users can explore the most popular and recent blogs on the platform.
- **Full-Text Search**: Users can search for blogs using keywords.
- **Fuzzy Search**: Users can search for other users using a fuzzy search algorithm to handle typos and partial matches.

### Media and Sentiment Analysis

- **Media Uploads**: Users can upload images and PDFs along with their blogs.
- **Sentiment Analysis**: The application performs sentiment analysis on blog posts to gauge the overall sentiment of the content.
- **Age Restriction and User Consent** : The application confirms if you are willing to visit the blog if it contains any derogatory content, if the user age is below 18 he/she wouldnt be allowed to read the blog

---

## Technologies Used

### Backend

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express**: Web framework for building the API and handling requests.
- **Prisma**: ORM for managing the database and performing CRUD operations.

### Frontend

- **React.js**: JavaScript library for building the user interface.
- **Material-UI**: Component library for styling and theming the application.
- **react-responsive-carousel**: Library for creating responsive carousels.

### Database

- **PostgreSQL : Supabase**: Relational database for storing user data, blog posts, and interactions.

### Additional Libraries

- **sentiment**: Library for performing sentiment analysis on blog posts.

---

## Screenshots

### User Interface

<div>
  <img src="https://github.com/user-attachments/assets/fe2a3123-0d19-4245-bfa4-92044d9f57d9" width="45%" />
  <img src="https://github.com/user-attachments/assets/1efe31d1-2a55-4975-b86b-ac82a38e1b36" width="45%" />
</div>
<div>
  <img src="https://github.com/user-attachments/assets/94688a83-8c73-483d-863f-9fabd9ae483d" width="45%" />
  <img src="https://github.com/user-attachments/assets/f1604b1b-cc8e-4bcd-a51c-c73f67c1ea3c" width="45%" />
</div>
<div>
  <img src="https://github.com/user-attachments/assets/fa17717b-cf12-4a8c-a2e9-a2e9fcd40ac9" width="45%" />
  <img src="https://github.com/user-attachments/assets/a4e8050b-9e8d-442a-8256-6860a08a5f0c" width="45%" />
</div>
<div>
  <img src="https://github.com/user-attachments/assets/b94e1943-7719-41cc-a79e-2b3737699bc8" width="45%" />
  <img src="https://github.com/user-attachments/assets/5cee8c66-bf68-4993-93d7-24b0db69336e" width="45%" />
</div>
<div>
  <img src="https://github.com/user-attachments/assets/299a6e8f-ed4d-4629-8a53-eba6d7d85cae" width="45%" />
  <img src="https://github.com/user-attachments/assets/d2523d79-87c7-449d-b48e-c27301b1b44f" width="45%" />
</div>
<div>
  <img src="https://github.com/user-attachments/assets/cac37d1d-08a2-4ade-ac52-a69011617b4e" width="45%" />
  <img src="https://github.com/user-attachments/assets/1011d76c-2cd7-496b-a747-1117ab819c8a" width="45%" />
</div>
<div>
  <img src="https://github.com/user-attachments/assets/7a5059c0-ca7f-4b5f-b9f8-2a792de091c9" width="45%" />
  <img src="https://github.com/user-attachments/assets/a9e010b9-603a-4e1f-81e9-61200f368521" width="45%" />
</div>
<div>
  <img src="https://github.com/user-attachments/assets/b53361a6-aab9-4e95-a09b-b0678f5b544e" width="45%" />
  <img src="https://github.com/user-attachments/assets/4a983885-c8b9-452c-b476-2e9e6707de39" width="45%" />
</div>
<div>
  <img src="https://github.com/user-attachments/assets/e64c078a-9c2e-459b-94b1-78e54c4c898b" width="45%" />
</div>

---

## Setup and Installation

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your machine.
- **PostgreSQL**: Set up a PostgreSQL database.

### Installation Steps

1. **Clone the Repository**
    ```bash
    git clone https://github.com/Veer-Parikh/Blogify.git
    cd Blogify
    ```

2. **Install Dependencies**
    ```bash
    cd client
    npm install
    cd ..
    cd server
    npm install
    ```

3. **Environment Variables**
    - Create a `.env` file in the root directory and add the necessary environment variables.
    ```env
    DATABASE_URL=your-database-url
    JWT_SECRET=your-jwt-secret
    ```

4. **Run the Application**
    ```bash
    cd client
    npm run dev
    cd server
    npm start
    ```
