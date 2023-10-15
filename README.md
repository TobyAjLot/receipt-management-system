# Receipt Management System API

![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green)
![npm](https://img.shields.io/badge/npm-latest-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

The Receipt Management System API is a Node.js application designed to manage receipts for users. It allows users to register, log in, upload receipts, view their receipts, update their profile, and delete receipts. This README.md provides an overview of the project structure and instructions on how to use the API.

## Getting Started

### Prerequisites

Before setting up and running the API, ensure you have the following prerequisites installed:

- Node.js (v14 or later)
- npm
- MongoDB

### Installation

1. Fork and clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   cd receipt-management-system
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Create a .env file in the project root directory with the following content:

   ```dotenv
   MONGO_URL: The URL for your MongoDB database.
   JWT_SECRET: A secret key for JWT token generation
   ```

   Replace 'your-mongodb-connection-string' with your MongoDB connection URI.

## Running the API

To start the API server, run the following command:

```bash
npm start
```

The server will start on port 3000 by default

## Usage

### User Registration

- POST /api/register: Register a new user by providing first name, last name, email, and password in the request body.

### User Login

- POST /api/login: Log in with an existing user by providing email and password in the request body. This will return an access token.

### Receipt Management

- GET /api/users/receipts: Retrieve receipts for the authenticated user. You can filter receipts by store, product, price, and purchase date using query parameters.
- POST /api/upload-receipt: Upload a receipt by providing store, product, price, purchase date, and an image file in the request body. This endpoint requires a valid access token.
- DELETE /api/users/receipts/:receiptId: Delete a receipt by its ID. This endpoint also requires a valid access token.

### User Profile Updates

-PUT /api/users/update-profile: Update the user's profile by providing the new first name and last name in the request body. This endpoint requires a valid access token.
