const mongoose = require('../database/index.js');

const eventoSchema = new mongoose.Schema({
    nomeEvento: { 
        type: String,
    },
    descricao: { 
        type: String
    },
    inicioprevio: {
        type: Date
    },
    terminoprevio: {
        type: Date
    },
    inicioefetivo: {
        type: Date
    },
    terminoefetivo: {
        type: Date
    },
    tempoutilizado:{
        type: Number
    },
    endereco: {
        type: String
    },
    tipoEvento: {
        type: String
    },
    modalidade: {
        type: String
    },
    habilidades: {
        type: Array
    },
    idInterprete: {
        type: String,
        default: ""
    },
    idCliente: { 
        type: String
    },
    status: {
        type: Number    
    }, //1 = Evento Criado 2 = Esperando resposta do Interprete  3 = Esperando resposta da Klumie/contratante
    // 4 = Esperando liberação do evento  5 = Evento Aberto/Ao vivo  6 = Evento finalizado
    areaDoEvento: {
        type: String
    },
    motivoDeMudanca: {
        type: String    // Motivo de cancelamento ou adiamento do evento
    },
    indicacaoKlumie: {
        type: Boolean
    },
    idEventoAdiado: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
   
module.exports = mongoose.model('Evento', eventoSchema);