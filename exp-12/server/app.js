const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON body in requests
app.use(express.json());

// Simple welcome route
app.get('/', (req, res) => {
    res.send('Welcome to the Book Store API. Access book data via /api/books');
});

// Define the Book Schema
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim: true,
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true,
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        unique: true,
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'],
    },
    description: {
        type: String,
        required: false,
        default: 'No description provided.',
    },
    publishedDate: {
        type: Date,
        default: Date.now,
    },
    // Optional field for stock tracking
    stock: {
        type: Number,
        default: 1,
        min: [0, 'Stock cannot be negative'],
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Create the Book Model
const Book = mongoose.model('Book', BookSchema);

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("FATAL ERROR: MONGO_URI not defined. Please create a .env file.");
    process.exit(1);
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
           });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log("Database Name:", conn.connection.name);
        console.log("Database Host:", conn.connection.host);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

connectDB(); // Connect to the database

// ------------------------------------
// 4. API ROUTES (CRUD OPERATIONS)
// ------------------------------------

const bookRouter = express.Router();

bookRouter.get('/', async (req, res) => {
    try {
        const books = await Book.find({}).sort({ title: 1 }); // Find all, sort by title
        res.status(200).json(books);
    } catch (error) {
        // Handle database or server errors
        res.status(500).json({ message: 'Server error while fetching books', error: error.message });
    }
});

bookRouter.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        // Handle invalid ID format or server error
        if (error.kind === 'ObjectId') {
             return res.status(400).json({ message: 'Invalid Book ID format' });
        }
        res.status(500).json({ message: 'Server error while fetching book', error: error.message });
    }
});

bookRouter.post('/', async (req, res) => {
    // req.body contains the JSON data for the new book
    try {
        const newBook = new Book(req.body);
        const book = await newBook.save();
        res.status(201).json(book); // 201 Created
    } catch (error) {
        // Handle validation errors (e.g., missing title, duplicate ISBN)
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation failed', errors: error.errors });
        }
        if (error.code === 11000) { // MongoDB duplicate key error (for unique ISBN)
             return res.status(400).json({ message: 'ISBN already exists', fields: error.keyPattern });
        }
        res.status(500).json({ message: 'Server error while creating book', error: error.message });
    }
});

bookRouter.put('/:id', async (req, res) => {
    try {
        // Set 'new: true' to return the updated document
        // Set 'runValidators: true' to re-run schema validators on update
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!book) {
            return res.status(404).json({ message: 'Book not found for update' });
        }

        res.status(200).json(book);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation failed', errors: error.errors });
        }
        if (error.kind === 'ObjectId') {
             return res.status(400).json({ message: 'Invalid Book ID format' });
        }
        res.status(500).json({ message: 'Server error while updating book', error: error.message });
    }
});

bookRouter.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found for deletion' });
        }

        res.status(200).json({ message: 'Book successfully deleted', deletedBook: book });
    } catch (error) {
        if (error.kind === 'ObjectId') {
             return res.status(400).json({ message: 'Invalid Book ID format' });
        }
        res.status(500).json({ message: 'Server error while deleting book', error: error.message });
    }
});

// Use the book routes under the /api/books path
app.use('/api/books', bookRouter);

// ------------------------------------
// 5. START SERVER
// ------------------------------------
app.listen(PORT, () => {
    console.log(`Server running in development mode on port ${PORT}`);
});
