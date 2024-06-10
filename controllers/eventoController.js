const Evento = require('../models/Evento.js');
const mongoose = require('mongoose');

exports.create = async (req, res) => {
    try{
        var body = req.body;
        body.inicioprevio = new Date(body.inicioprevio);
        body.terminoprevio = new Date(body.terminoprevio);

        const checkData = await Evento.findOne({
          idCliente: req.body.idCliente,
          inicioprevio: {
            $gte: req.body.inicioprevio, 
            $lt: req.body.terminoprevio
          } 
        });

        if(checkData) {
          return res.status(401).send({ erro: 'Já existe um evento marcado para esse horário!'})
        }
          
        const evento = await Evento.create(body);

        return res.status(200).send({ evento });      
      }
      catch(ex){
        console.log(ex);
        res.status(400).json({ erro: `${ex}`});
      }
};

exports.read = async (req, res) => {
    try {
        if (req.params.id) {
            const evento = await Evento.findOne({ _id: req.params.id });
            if (evento) {
                res.status(200).json(evento);
            } else {
                res.status(404).json({ erro: 'Evento não encontrado' });
            }
        } else { 
            let query = {};
    
            if (req.query.idCliente) {
                query.idCliente = req.query.idCliente;
            }
            if (req.query.idInterprete) {
                query.idInterprete = req.query.idInterprete;
            }
            if (req.query.status) {
                query.status = { $in: JSON.parse(req.query.status) };    
            }
            if (req.query.habilidades) {
                query.habilidades = { $in: JSON.parse(req.query.habilidades) };
            }
    
            const eventos = await Evento.find(query);
            res.status(200).json(eventos);
        }
    } catch (error) {
        res.status(500).json({ erro: 'Ocorreu um erro ao processar a solicitação', error: error });
    }
};

exports.update = async (req, res) => {
    try {
        const id = { _id: new mongoose.Types.ObjectId(req.params.id) };
  
        const dados = req.body;
        
        res.status(200).json(await Evento.updateOne({ "_id": id }, { $set: dados }));
  
    } catch (ex) {
        res.status(400).json({ erro: `${ex}` });
    }
};

exports.delete = async (req, res) => {
    let id  = {_id:new mongoose.Types.ObjectId(req.params.id)};  
    
    try{
        res.status(200).json(await Evento.deleteOne({'_id': id }));
    }
    catch(ex){
        res.status(400).json({ erro: `${ex}`});
    }
};