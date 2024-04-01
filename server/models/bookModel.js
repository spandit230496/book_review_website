const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const bookSchema = new mongoose.Schema({
   
"title": String,
"authors": String,
"description": String,
"edition": String,
"format": String,
"num_pages": Number,
"rating": Number,
"rating_count": Number,
"review_count": Number,
"genres": String,
"genre_list": [String],
"image_url": String,
"Quote1": String,
"Quote2": String,
"Quote3": String,
"isBookmarked": { type: Boolean, default: false },

}, { timestamps: true });

bookSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Book', bookSchema);
