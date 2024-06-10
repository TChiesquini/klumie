const mongoose = require('../database/index.js');

const empresaSchema = new mongoose.Schema({
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
    fantasia: {
        type: String
    },
    cnpj: {
        type: String
    },
    endereço: {
        type: String
    },
    bairro: {
        type: String
    },
    municipio: {
        type: String
    },
    cep: {
        type: String
    },
    uf: {
        type: String
    },
    telefone: {
        type: String
    },
    pic: {
        type: String,
        default: "/avatar.png"
    },
    cpf: {
        type: String
    },
    nomeResp: {
        type: String
    },
    carteira: {
        type: Number,
        default:0
    },
    tempoBonus: {
        type: Number,
    },
    verificado: {
        type: Boolean,
        default: false
    },
    tipoDePessoa: {
        type: String,
    },
    sobre: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
  
module.exports = mongoose.model('Empresa', empresaSchema);