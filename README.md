# Social Media App & API

## Overview

The server & client for my Pretendster Social Media app.

Live URLs

- Client: https://pretendster-app.netlify.app/
- Server: https://pretendster-api.adaptable.app

## REST API Endpoints

Base URL => /api/v1

### Auth

| Description | Method | Endpoint       |
| ----------- | ------ | -------------- |
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

- MONGO_URI=<URI used to connect to a production MongoDB database>
- TEST_MONGO_URI=<URI used to connect to a test MongoDB database>
- PORT=<Your server port, ex: 3003>
- ACCESS_TOKEN_SECRET=<Secret for your access tokens>
- REFRESH_TOKEN_SECRET=<Secret for your refresh tokens>
