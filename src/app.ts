import express from 'express';
import connectDB from './config/db';
import router from './routes/userRoutes';

const app = express();
const PORT = process.env.APP_PORT || 5000;

app.use(express.json());

// Database connection
connectDB();

// Listen to these Routes 
app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.APP_HOST}`);
});