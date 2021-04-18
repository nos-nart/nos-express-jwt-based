const mongoose = require('mongoose');

const connectDB = async () => {
  const dbURI =
    process.env.NODE_ENV === 'production'
      ? process.env.MONGO_URI_PROD
      : process.env.MONGO_URI_DEV;

  const conn = await mongoose.connect(dbURI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;
