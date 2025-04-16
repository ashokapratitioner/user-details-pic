# Express Mongoose CRUD Project

This project is a simple Express application that implements CRUD (Create, Read, Update, Delete) operations using Mongoose and MongoDB. It serves as a basic template for building RESTful APIs with TypeScript.

## Project Structure

```
express-mongoose-crud
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
└── README.md                  # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd express-mongoose-crud
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
  - Body: `{ "name": "John Doe", "email": "john@example.com" }`

- **Get a User:**
  - Endpoint: `GET /users/:id`

- **Update a User:**
  - Endpoint: `PUT /users/:id`
  - Body: `{ "name": "Jane Doe" }`

- **Delete a User:**
  - Endpoint: `DELETE /users/:id`

## Contributing

Feel free to fork the repository and submit pull requests for any improvements or features.

## License

This project is licensed under the MIT License.