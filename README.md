# Social Media App & API

## Overview

The server & client for my Pretendster Social Media app.

Pretendster has the following functionalities:

- [x] Customize Profile Bio and Profile Picture
- [x] Search Users on the App
- [x] Follow and Unfollow Users
- [x] See posts from you and your followed users
- [x] Make your own posts. Optionally add an image. 
- [x] Create and delete comments to posts
- [x] Like posts made by users
- [ ] And more in the future (hopefully!)...

Live URLs

- [Render](https://pretendster-mono.onrender.com/)

Previews

<div align="center">
  <kbd>
    <img src="https://i.imgur.com/HzkWmlW.png" width="800" height="auto"/>
    <div>Web View</div>
  </kbd>
  
</div>

<br>

<div align="center">
  <kbd>
    <img src="https://i.imgur.com/0Z17pxT.png" width="250" height="auto"/>
    <div>Timeline Mobile View</div>
  </kbd>
  <kbd>
    <img src="https://i.imgur.com/FbOH6W8.png" width="250" height="auto"/>
    <div>Profile Mobile View</div>
  </kbd>
</div>
 
## REST API Endpoints

Base URL => /api/v1

### Auth

| Description | Method | Endpoint       |
| ----------- | ------ | -------------- |
| Session     | GET    | /auth/session  |
| Register    | POST   | /auth/register |
| Login       | POST   | /auth/login    |
| Logout      | POST   | /auth/logout   |

### Users

| Description      | Method | Endpoint                      |
| ---------------- | ------ | ----------------------------- |
| All Users        | GET    | /user/all                     |
| User Suggestions | GET    | /user/suggestions             |
| Search Users     | GET    | /user/search/:search          |
| Single User      | GET    | /user/profile/:userId         |
| Update Picture   | GET    | /user/profile/:userId/picture |
| Update Profile   | PATCH  | /user/profile/:userId         |
| User Follow      | PATCH  | /user/:userId/follow          |
| User Unfollow    | PATCH  | /user/:userId/unfollow        |

### Posts

| Description   | Method | URL                |
| ------------- | ------ | ------------------ |
| All Post      | GET    | /post/all          |
| All User Post | GET    | /post/all/:userId  |
| Create Post   | POST   | /post              |
| Like Post     | PATCH  | /post/like/:postId |
| Update Post   | PATCH  | /post/:postId      |
| Delete Post   | DELETE | /post/:postId      |

### Comments

| Description            | Method | URL                          |
| ---------------------- | ------ | ---------------------------- |
| Create Comment to Post | POST   | /comments/:postId/all        |
| Get Comments of Post   | GET    | /comments/:postId            |
| Delete Comment to Post | DELETE | /comments/:postId/:commentId |

## Development

Technologies:

- React + Vite
- TypeScript
- TanStack Query
- ExpressJS
- MongoDB
- Prisma
- JWT for Auth

## Installation and Running the Project Locally

1. Go to client and server directory and run `npm install` to both install dependencies.
2. Create `.env` file and add your configs.
3. Run `npm run dev` for development for client & server or `npm run build` for production.

## Setup for ENV variables
> :warning: **Warning:** Do not push your `.env` secrets carelessly.

Check .env.example

- DATABASE_URL="YOUR_DB_URL"
- PORT=5000
- ACCESS_TOKEN="SECRET_FOR_JWT"
- CLOUD_NAME="CLOUDINARY_NAME"
- CLOUD_API_KEY="CLOUDINARY_KEY"
- CLOUD_API_SECRET="CLOUDINARY_SECRET"
