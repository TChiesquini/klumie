const mongoose = require('../database/index.js');

const pictureSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    src: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
  
module.exports = mongoose.model('Picture', pictureSchema);