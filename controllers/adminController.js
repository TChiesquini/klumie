const Admin = require('../models/Admin.js');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Arquivo de exportação das rotas utilizadas no Routes

exports.create = async (req, res) => {
    try{
        const { password, ...dados } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const admin = await Admin.create({ ...dados, password: hashedPassword});
        admin.password = undefined;
  
        return res.status(200).send({ admin });      
      }
      catch(ex){
        res.status(400).json({ erro: `${ex}`});
      }
};

exports.read = async (req, res) => {
    let id  = {_id:new mongoose.Types.ObjectId(req.params.id)};
  
    try{
      if(req.params.id){
        res.status(200).json(await Admin.findOne({'_id': id }));
      } else {
        res.status(200).json(await Admin.find());
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
      
      res.status(200).json(await Admin.updateOne({ "_id" : id },{$set: dados}));
    }
    catch(ex){
      res.status(400).json({ erro: `${ex}` });
    }
};

exports.delete = async (req, res) => {
    let id  = {_id:new mongoose.Types.ObjectId(req.params.id)};  
  
    try{
      res.status(200).json(await Admin.deleteOne({'_id': id }));
    }
    catch(ex){
      res.status(400).json({ erro: `${ex}`});
    }
};