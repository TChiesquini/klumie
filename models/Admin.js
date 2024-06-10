const mongoose = require('../database/index.js');

const adminSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    nome: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
  
module.exports = mongoose.model('Admin', adminSchema);