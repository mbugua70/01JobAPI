require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// connectdb
const connectDB = require('./db/connect');

// routes
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');

const MONGODB_STRING = process.env.MONGODB_STRING;

app.use(express.json());
// extra packages

// routes
app.use('/api/v1/user', authRoutes);
app.use('/api/v1/jobs', jobRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4040;

const start = async () => {
  try {
    await connectDB(MONGODB_STRING)
    app.listen(port, () =>
      console.log(`Connected to the database and listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
