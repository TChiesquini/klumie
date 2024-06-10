const Interprete = require('../models/Interprete.js');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

exports.create = async (req, res) => {
    try{
        const checkEmail = await Interprete.findOne({ email: req.body.email });

        if (checkEmail) {
            return res.status(400).json({ erro: 'Este email já está em uso!' });
        }
        
        const { password, ...dados } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const interprete = await Interprete.create({ ...dados, password: hashedPassword });
        interprete.password = undefined;
  
        return res.status(200).send({ interprete });      
    }
    catch(ex){
      res.status(400).json({ erro: `${ex}`});
    }
};

exports.read = async (req, res) => {
    let id  = {_id:new mongoose.Types.ObjectId(req.params.id)};
  
    try{
      if(req.params.id){
        res.status(200).json(await Interprete.findOne({'_id': id }));
      } else {
        res.status(200).json(await Interprete.find());
      }
    }
    catch(ex){
      res.status(400).json({ erro: `${ex}`});
    }
};

exports.update = async (req, res) => { 
    try{
      const dados = req.body;
      await Interprete.updateOne({ "_id" : req.params.id },{$set: dados})
      res.status(200).json({ user: await Interprete.findOne({ "_id" : req.params.id }) });
    }
    catch(ex){
      res.status(400).json({ erro: `${ex}` });
    }
};

exports.delete = async (req, res) => {
    let id  = {_id:new mongoose.Types.ObjectId(req.params.id)};  
  
    try{
      res.status(200).json(await Interprete.deleteOne({'_id': id }));
    }
    catch(ex){
      res.status(400).json({ erro: `${ex}`});
    }
};