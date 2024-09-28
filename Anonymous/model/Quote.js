const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    quote: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                const characterCount = value.length;
                return characterCount >= 10 && characterCount <= 200; 
            },
            message: 'Quote must be between 10 and 200 characters'
        }
        
    },
    likes: {
        type: Number,
        default: 0
    },
    flags: {
        type: Number,
        default: 0
    }
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
