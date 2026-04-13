import express from 'express';

const app = express();   // create an Express application

app.use(express.json()); // middleware to parse JSON bodies

// import routes
import userRoutes from './routes/user.routes.js';

//routes declaration
app.use('/api/v1/users', userRoutes);

// example URL: http://localhost:3000/api/v1/users/register


export default app;