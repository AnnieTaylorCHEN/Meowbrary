const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

authorSchema.pre('remove', function(next) {
    Book.find({author: this.id}, (error, books) => {
        if (error) {
            next(error)
        } else if (books.length > 0 ){
            next(new Error('This author has books still and you can not remove this author'))
        } else {
            next()
        }
    })
})

module.exports =mongoose.model('Author', authorSchema)