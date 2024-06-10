const Habilidade = require('../models/Habilidade.js');
const mongoose = require('mongoose');

exports.create = async (req, res) => {
    try{
        const checkHabilidade = await Habilidade.findOne({ nome: req.body.nome });

        if(checkHabilidade) {
          res.status(400).send({ erro: 'Essa habilidade já foi cadastrada!'})
        }

        const habilidade = await Habilidade.create(req.body);
  
        return res.status(200).send({ habilidade });      
    }
    catch(ex){
      res.status(400).json({ erro: `${ex}`});
    }
};

exports.read = async (req, res) => {
    let id  = {_id:new mongoose.Types.ObjectId(req.params.id)};
  
    try{
      if(req.params.id){
        const habilidade = await Habilidade.findOne({'_id': id });
        res.status(200).json({ habilidade: habilidade });
      } else {
        const habilidades = await Habilidade.find();
        res.status(200).json({ habilidades: habilidades });
      }
    }
    catch(ex){
      res.status(400).json({ erro: `${ex}`});
    }
};

exports.update = async (req, res) => {
    let id  = {_id:new mongoose.Types.ObjectId(req.params.id)};  
  
    try{
      const dados = req.body;
      
      res.status(200).json(await Habilidade.updateOne({ "_id" : id },{$set: dados}));
    }
    catch(ex){
      res.status(400).json({ erro: `${ex}` });
    }
};

exports.delete = async (req, res) => {
    let id  = {_id:new mongoose.Types.ObjectId(req.params.id)};  
  
    try{
      res.status(200).json(await Habilidade.deleteOne({'_id': id }));
    }
    catch(ex){
      res.status(400).json({ erro: `${ex}`});
    }
};