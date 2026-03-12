const express = require('express');
const Book = require('../models/Book');

const router = express.Router();

// POST /books
router.post('/', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).json(book);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to create book', error: error.message });
  }
});

// GET /books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch books', error: error.message });
  }
});

// GET /books/search?title=xyz&author=xyz  — must be BEFORE /:id
router.get('/search', async (req, res) => {
  try {
    const { title, author } = req.query;
    const query = {};
    if (title)  query.title  = { $regex: title,  $options: 'i' };
    if (author) query.author = { $regex: author, $options: 'i' };

    const books = await Book.find(query).sort({ createdAt: -1 });
    if (!books.length) {
      return res.status(404).json({ message: 'No books found matching the search criteria' });
    }
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: 'Search failed', error: error.message });
  }
});

// GET /books/:id
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).json(book);
  } catch (error) {
    return res.status(400).json({ message: 'Invalid book ID', error: error.message });
  }
});

// PUT /books/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).json(updatedBook);
  } catch (error) {
    const statusCode = error.name === 'CastError' ? 400 : 500;
    return res.status(statusCode).json({ message: 'Failed to update book', error: error.message });
  }
});

// DELETE /books/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    const statusCode = error.name === 'CastError' ? 400 : 500;
    return res.status(statusCode).json({ message: 'Failed to delete book', error: error.message });
  }
});

module.exports = router;
