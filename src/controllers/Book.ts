import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Book from '../models/Book';
import Logging from '../library/Logging';

/**
 *
 * @param req request.body.title && request.body.author
 * @param res response.status(201).json({success: true, message: 'New Book created successfully', book: newBook}) || response.status(500).json({success: false, message: 'Server error. Please try again.', error: error.message})
 * @param next
 * @returns book || error
 */
const createBook = (req: Request, res: Response, next: NextFunction) => {
    const { title, author } = req.body;

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title,
        author: author
    });

    return book
        .save()
        .then((newBook) => {
            return res.status(201).json({
                success: true,
                message: 'New Book created successfully',
                book: newBook
            });
        })
        .catch((error) => {
            Logging.error(error);
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message
            });
        });
};

/**
 *
 * @param req request.params.bookId
 * @param res response.status(200).json({success: true, message: `Book found`}) || response.status(404).json({success: false, message: `Book not found`})
 * @param next
 * @returns book || error
 */

const readBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    return Book.findById(bookId)
        .populate('author', 'name')
        .select('-__v')
        .then((book) => {
            if (book) {
                return res.status(200).json({
                    success: true,
                    message: `Book found`,
                    book
                });
            }
            return res.status(404).json({
                success: false,
                message: `Book not found`
            });
        })
        .catch((error) => {
            Logging.error(error);
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message
            });
        });
};

/**
 *
 * @param req request
 * @param res response.status(200).json({success: true, message: `Books found`, books: books}) || response.status(500).json({success: false, message: 'Server error. Please try again.', error: error.message})
 * @param next
 * @returns books || error
 */

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Book.find({})
        .populate('author', 'name')
        .select('-__v')
        .then((books) => {
            return res.status(200).json({
                success: true,
                message: `Books found`,
                books: books
            });
        })
        .catch((error) => {
            Logging.error(error);
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message
            });
        });
};

/**
 * @param req request.params.bookId
 * @param res response.status(200).json({success: true, message: 'Book updated'}) || response.status(404).json({success: false, message: 'Book not found'})
 * @param next
 * @returns book || error
 */

const updateBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    const { title, author } = req.body;
    Book.updateOne({ _id: bookId }, { title, author: author })
        .exec()
        .then((result) => {
            if (result) {
                return res.status(200).json({
                    success: true,
                    message: 'Book updated'
                });
            }
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        })
        .catch((error) => {
            Logging.error(error);
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message
            });
        });
};

/**
 *
 * @param req request.params.bookId
 * @param res response.status(200).json({success: true, message: 'Book deleted'}) || response.status(404).json({success: false, message: 'Book not found'})
 * @param next
 * @returns book || error
 */
const deleteBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return Book.findByIdAndRemove(bookId)
        .then((result) => {
            if (result) {
                return res.status(200).json({
                    success: true,
                    message: 'Book deleted'
                });
            }
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        })
        .catch((error) => {
            Logging.error(error);
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message
            });
        });
};

export default { createBook, readBook, readAll, updateBook, deleteBook };
