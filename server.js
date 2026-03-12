const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const booksRouter = require('./routes/books');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();

app.use(cors());
app.use(express.json());


app.use('/books', booksRouter);


  app.get('/', (req, res) => {
  res.status(200).json({
    message: '📚 Library Management System API',
    status: 'Running',
    endpoints: {
      getAllBooks: 'GET /books',
      addBook: 'POST /books',
      getBookById: 'GET /books/:id',
      updateBook: 'PUT /books/:id',
      deleteBook: 'DELETE /books/:id',
      searchBook: 'GET /books/search?title=xyz&author=xyz',
      health: 'GET /health'
    }
  });
});
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`\nPort ${PORT} is already in use.`);
        console.error('Run this to fix it: taskkill /F /IM node.exe');
        console.error('Then restart the server.\n');
      } else {
        console.error('Server error:', err.message);
      }
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });

 