const Empresa = require('../models/Empresa.js');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

exports.create = async (req, res) => {
    try{
        const checkEmail = await Empresa.findOne({ email: req.body.email });
  
        if (checkEmail) {
            return res.status(400).json({ erro: 'Este email já está em uso!' });
        }
        
        const { password, ...dados } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const empresa = await Empresa.create({ ...dados, password: hashedPassword});
        empresa.password = undefined;
  
        return res.status(200).send({ empresa });      
      }
      catch(ex){
        res.status(400).json({ erro: `${ex}`});
      }
};

exports.read = async (req, res) => {
    let id  = {_id:new mongoose.Types.ObjectId(req.params.id)};
  
    try{
      if(req.params.id){
        res.status(200).json(await Empresa.findOne({'_id': id }));
      } else {
        res.status(200).json(await Empresa.find());
      }
    }
    catch(ex){
      res.status(400).json({ erro: `${ex}`});
    }
};

exports.update = async (req, res) => {  
    try{
      const dados = req.body;
      await Empresa.updateOne({ "_id" : req.params.id },{$set: dados})
      res.status(200).json({ user: await Empresa.findOne({ "_id" : req.params.id }) });
    }
    catch(ex){
      res.status(400).json({ erro: `${ex}` });
    }
};

exports.delete = async (req, res) => {
    let id  = {_id:new mongoose.Types.ObjectId(req.params.id)};  
  
    try{
      res.status(200).json(await Empresa.deleteOne({'_id': id }));
    }
    catch(ex){
      res.status(400).json({ erro: `${ex}`});
    }
};