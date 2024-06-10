const mongoose = require('../database/index.js');

const fileSchema = new mongoose.Schema({
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
  
module.exports = mongoose.model('File', fileSchema);