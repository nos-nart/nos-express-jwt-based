const express = require('express');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const expressPino = require('express-pino-logger');

const logger = require('./helpers/logger');
const errorHandler = require('./helpers/error-handler');
const connectDB = require('./config/connectDB');
const auth = require('./routes/api/auth');

// Load env vars
dotenv.config({
  path: './config/config.env'
});
const expressLogger = expressPino({
  logger,
})

connectDB();                    // Connect to DB

const app = express();          // Initialize app

app.use(express.json());        // Enable body-parser(for POST requests)
app.use(cors());                // Enable cors
app.use(cookieParser());        // Cookie parser
if (process.env.NODE_ENV === 'development') {
  app.use(expressLogger);       // Logger middleware for dev environment
}
app.use(hpp());                 // Prevent http param pollution
app.use(mongoSanitize());       // Sanitize data
app.use(helmet());              // Set security headers
app.use(xss());                 // Prevent XSS attacks

app.use('/api/v1/auth', auth);  // Mount routers

app.use(errorHandler());        // Error middleware

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

// Handle promise rejections and exit app gracefully
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});