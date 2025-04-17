# Express Mongoose CRUD Project

This project is a simple Express application that implements CRUD (Create, Read, Update, Delete) operations using Mongoose and MongoDB. It serves as a basic template for building RESTful APIs with TypeScript.

## Project Structure

```

├── src
│   ├── app.ts                # Entry point of the application
│   ├── controllers
│   │   └── userController.ts # Controller for user-related operations
│   ├── models
│   │   └── userModel.ts      # Mongoose model for user
│   ├── routes
│   │   └── userRoutes.ts     # Routes for user-related operations
│   └── config
│       └── db.ts             # Database connection configuration
├── package.json               # NPM package configuration
├── tsconfig.json              # TypeScript configuration
├── nodemon.json              # Nodemon env configurations
├── firebase.json, .firebaserc             # Firebase configurations
└── README.md                  # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd user-details-pic
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up MongoDB:**
   Ensure you have MongoDB installed and running. You can use a local instance or a cloud service like MongoDB Atlas. Update the connection string in `src/config/db.ts` accordingly. 

4. **Run the application:**
   ```
   npm start
   ```

## Usage

- **Create a User:**
  - Endpoint: `POST /users`
  - Body: `{ "email": "ashok@test.com", "password": "password" }`

- **Get a User:**
  - Endpoint: `GET /users/:id`

- **Update a User:**
  - Endpoint: `PUT /users/:id`
  - Body: `{ "email": "ashok@test.com" }`

- **Delete a User:**
  - Endpoint: `DELETE /users/:id`

## Contributing

Feel free to fork the repository and submit pull requests for any improvements or features.

## License

This project is licensed under the MIT License.