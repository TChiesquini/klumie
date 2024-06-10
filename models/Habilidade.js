const mongoose = require('../database/index.js');

const habilidadeSchema = new mongoose.Schema({
    nome: { 
        type: String,
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
  
module.exports = mongoose.model('Habilidade', habilidadeSchema);