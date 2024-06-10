const mongoose = require('../database/index.js');

const interpreteSchema = new mongoose.Schema({
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
    sobrenome: {
        type: String
    },
    sobre: {
        type: String,
        default: ""
    },
    senioridade: {
        type: String
    },
    cidade: {
        type: String
    },
    bairro: {
        type: String
    },
    uf: {
        type: String
    },
    cep: {
        type: String
    },
    pic: {
        type: String,
        default: "/avatar.png"
    },
    habilidadesEmAnalise: {
        type: Array
    },
    habilidadesAutorizadas: {
        type: Array
    },
    eventosAgendados: {
        type: Array
    },
    eventosAbertos: {
        type: Array
    },
    carteira: {
        type: Number,
        default:0
    },
    verificado: {
        type: Boolean,
        default: false
    },
    banco: {
        type: String,
        default: ""
    },
    agencia: {
        type: String,
        default: ""
    },
    conta: {
        type: String,
        default: ""
    },
    pix: {
        type: String,
        default: ""
    },
    picpay: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
  
module.exports = mongoose.model('Interprete', interpreteSchema);