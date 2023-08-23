import { Router } from 'express';
import BookController from '../controllers/Book';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = Router();

router.post('/create', ValidateSchema(Schemas.book.create), BookController.createBook);
router.get('/get', BookController.readAll);
router.get('/get/:bookId', BookController.readBook);
router.put('/update/:bookId', ValidateSchema(Schemas.book.update), BookController.updateBook);
router.delete('/delete/:bookId', BookController.deleteBook);

export default router;
