import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Author from '../models/Author';
import Logging from '../library/Logging';

/**
 *
 * @param req request.body.name
 * @param res response.status(201).json({success: true, message: 'New Author created successfully', author: newAuthor}) || response.status(500).json({success: false, message: 'Server error. Please try again.', error: error.message})
 * @param next
 * @returns author || error
 */
const createAuthor = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name
    });

    return author
        .save()
        .then((newAuthor) => {
            return res.status(201).json({
                success: true,
                message: 'New Author created successfully',
                author: newAuthor
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
 * @param req request.params.authorId
 * @param res response.status(200).json({success: true, message: `Author found`}) || response.status(404).json({success: false, message: `Author not found`})
 * @param next
 * @returns author || error
 */

const readAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;
    return Author.findById(authorId)
        .then((author) => {
            if (author) {
                return res.status(200).json({
                    success: true,
                    message: `Author found`
                });
            }
            return res.status(404).json({
                success: false,
                message: `Author not found`
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
 * @param res response.status(200).json({success: true, message: `Authors found`, authors: authors}) || response.status(500).json({success: false, message: 'Server error. Please try again.', error: error.message})
 * @param next
 * @returns authors || error
 */

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Author.find({})
        .then((authors) => {
            return res.status(200).json({
                success: true,
                message: `Authors found`,
                authors: authors
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
 * @param req request.params.authorId
 * @param res response.status(200).json({success: true, message: 'Author updated'}) || response.status(404).json({success: false, message: 'Author not found'})
 * @param next
 * @returns author || error
 */

const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;
    const { name } = req.body;
    Author.updateOne({ _id: authorId }, { name })
        .exec()
        .then((result) => {
            if (result) {
                return res.status(200).json({
                    success: true,
                    message: 'Author updated'
                });
            }
            return res.status(404).json({
                success: false,
                message: 'Author not found'
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
 * @param req request.params.authorId
 * @param res response.status(200).json({success: true, message: 'Author deleted'}) || response.status(404).json({success: false, message: 'Author not found'})
 * @param next
 * @returns author || error
 */
const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return Author.findByIdAndRemove(authorId)
        .then((result) => {
            if (result) {
                return res.status(200).json({
                    success: true,
                    message: 'Author deleted'
                });
            }
            return res.status(404).json({
                success: false,
                message: 'Author not found'
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

export default { createAuthor, readAuthor, readAll, updateAuthor, deleteAuthor };
