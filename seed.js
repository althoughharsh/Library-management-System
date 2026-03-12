const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const Book = require('./models/Book');

const books = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0-7432-7356-5',
    genre: 'Fiction',
    publisher: 'Scribner',
    publicationYear: 1925,
    totalCopies: 5,
    availableCopies: 5,
    shelfLocation: 'A1',
    bookType: 'Circulating',
    status: 'Available'
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0-06-112008-4',
    genre: 'Fiction',
    publisher: 'J.B. Lippincott & Co.',
    publicationYear: 1960,
    totalCopies: 4,
    availableCopies: 3,
    shelfLocation: 'A2',
    bookType: 'Circulating',
    status: 'Available'
  },
  {
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0-452-28423-4',
    genre: 'Dystopian Fiction',
    publisher: 'Secker & Warburg',
    publicationYear: 1949,
    totalCopies: 6,
    availableCopies: 6,
    shelfLocation: 'A3',
    bookType: 'Circulating',
    status: 'Available'
  },
  {
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    isbn: '978-0-262-03384-8',
    genre: 'Computer Science',
    publisher: 'MIT Press',
    publicationYear: 2009,
    totalCopies: 3,
    availableCopies: 1,
    shelfLocation: 'C1',
    bookType: 'Reference',
    status: 'Available'
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '978-0-13-235088-4',
    genre: 'Computer Science',
    publisher: 'Prentice Hall',
    publicationYear: 2008,
    totalCopies: 4,
    availableCopies: 4,
    shelfLocation: 'C2',
    bookType: 'Circulating',
    status: 'Available'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    isbn: '978-0-06-231500-7',
    genre: 'Adventure Fiction',
    publisher: 'HarperOne',
    publicationYear: 1988,
    totalCopies: 5,
    availableCopies: 2,
    shelfLocation: 'B1',
    bookType: 'Circulating',
    status: 'Available'
  },
  {
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    isbn: '978-0-06-231609-7',
    genre: 'History',
    publisher: 'Harper',
    publicationYear: 2011,
    totalCopies: 3,
    availableCopies: 3,
    shelfLocation: 'B2',
    bookType: 'Circulating',
    status: 'Available'
  },
  {
    title: 'The Art of War',
    author: 'Sun Tzu',
    isbn: '978-1-59030-225-9',
    genre: 'Philosophy',
    publisher: 'Shambhala',
    publicationYear: 500,
    totalCopies: 2,
    availableCopies: 2,
    shelfLocation: 'D1',
    bookType: 'Reference',
    status: 'Available'
  },
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    isbn: '978-0-439-70818-8',
    genre: 'Fantasy',
    publisher: 'Scholastic',
    publicationYear: 1997,
    totalCopies: 7,
    availableCopies: 5,
    shelfLocation: 'B3',
    bookType: 'Circulating',
    status: 'Available'
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    isbn: '978-0-7352-1129-2',
    genre: 'Self-Help',
    publisher: 'Avery',
    publicationYear: 2018,
    totalCopies: 4,
    availableCopies: 4,
    shelfLocation: 'E1',
    bookType: 'Circulating',
    status: 'Available'
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Book.deleteMany({});
    console.log('Cleared existing books');

    const inserted = await Book.insertMany(books);
    console.log(`Successfully inserted ${inserted.length} books:`);
    inserted.forEach(b => console.log(`  - ${b.title} by ${b.author}`));

  } catch (err) {
    console.error('Seed failed:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();
