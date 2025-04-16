import mongoose from "mongoose";

const password = encodeURIComponent(process.env.DB_PASSWORD || "");
const mongoDbConnectionString = `mongodb+srv://${process.env.DB_USERNAME}:${password}${process.env.DB_NAME}.${process.env.DB_CLUSTER_DOMAIN}/?retryWrites=true&w=majority&appName=${process.env.APP_NAME}`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDbConnectionString);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
