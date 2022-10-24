import mongoose, { Schema } from 'mongoose';
import { TBook } from '../types/types';

const BookSchema: Schema<TBook> = new Schema ({
    bookAuthor: { type: String, required: true },
    bookTitle: { type: String, required: true },
    bookDesc: { type: String, required: true },
    genre: { type: String, require: true },
});

export default mongoose.model('Book', BookSchema);