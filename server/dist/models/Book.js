import mongoose, { Schema } from 'mongoose';
const BookSchema = new Schema({
    bookAuthor: { type: String, required: true },
    bookTitle: { type: String, required: true },
    bookDesc: { type: String, required: true },
    genre: { type: String, require: true },
});
export default mongoose.model('Book', BookSchema);
