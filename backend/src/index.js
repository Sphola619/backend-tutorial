import dotenv from 'dotenv';
import connectDB from './config/database.js';
import app from './app.js';

dotenv.config({
  path: './.env',  // Specify the path to your .env file
});  // Load environment variables from .env file

const startServer = async () => {
  try {
    await connectDB();
    app.on("error", (error) => {
      console.error("Server error:", error);
      throw error; // Rethrow the error to be caught by the outer catch block
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1); // Exit with failure
  }
}

startServer();
  