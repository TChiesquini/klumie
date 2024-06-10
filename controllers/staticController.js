const Picture = require('../models/Picture.js');
const File = require('../models/File.js');
const Empresa = require('../models/Empresa.js');
const Interprete = require('../models/Interprete.js');
const fs = require('fs');

exports.savePic = async (req, res) => {
    try{
        const { nome } = req.body;

        const file = req.file;

        const empresa = await Empresa.findOne({ '_id': nome });
        if(empresa) {
            await Empresa.updateOne({'_id': nome },{ 'pic': '/' + nome + '.png' });
        } else {
            const interprete = await Interprete.findOne({ '_id': nome });
            if(interprete) {
                await Interprete.updateOne({ '_id': nome },{ 'pic': '/' + nome + '.png' });
            }
        }

        const picture = new Picture({
            nome,
            src: file.path
        });

        await picture.save();

        res.json({ picture, msg: "Imagem salva com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao salvar a imagem." })
    }
};

exports.getPic = async (req, res) => {
    try {
        if(req.params.id) {
            const picture = await Picture.findOne({ 'nome': req.params.id });

            if(!picture) {
                res.status(404).json({ mensage: "Imagem não encontrada"});
            }

            res.status(200).json({ src: picture.src });
        } else {
            const pictures = await Picture.find();

            if(!pictures) {
                res.status(404).json({ mensage: "Imagem não encontrada"});
            }

            res.status(200).json({ pics: pictures });
        }
        

    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar imagem.' });
    }
};

exports.deletePic = async (req, res) => {
    
    try{
        const picture = await Picture.findOne({ 'nome': req.params.id });

        if(!picture){
            return res.status(404).json({ erro: "Imagem não encontrada!" });
        }

        fs.unlinkSync(picture.src);

        await Picture.deleteOne({ 'nome': req.params.id });

        const empresa = await Empresa.findOne({ '_id': req.params.id });
        if(empresa) {
            await Empresa.updateOne({'_id': req.params.id },{ 'pic': '/avatar.png' });
        } else {
            const interprete = await Interprete.findOne({ '_id': req.params.id });
            if(interprete) {
                await Interprete.updateOne({ '_id': req.params.id },{ 'pic': '/avatar.png' });
            }
        }

        res.json({ message: "Imagem removida com sucesso!" });
    }
    catch(ex){
        res.status(400).json({ erro: `${ex}`});
    }
};

exports.updatePic = async (req, res) => {
    try{
        const { nome } = req.body;

        const file = req.file;

        const empresa = await Empresa.findOne({ '_id': nome });
        if(empresa) {
            await Empresa.updateOne({'_id': nome },{ 'pic': '/' + nome + '.png' });
        } else {
            const interprete = await Interprete.findOne({ '_id': nome });
            if(interprete) {
                await Interprete.updateOne({ '_id': nome },{ 'pic': '/' + nome + '.png' });
            }
        }

        const newPicture = new Picture({
            nome,
            src: file.path
        });

        await newPicture.save();

        res.json({ picture, msg: "Imagem salva com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao salvar a imagem."})
    }
};

exports.saveFile = async (req, res) => {
    try{
        const { nome } = req.body;
        const file = req.file;

        const arquivo = new File({
            nome,
            src: file.path
        });

        await arquivo.save();

        res.json(({ arquivo, msg: 'Arquivo salvo com sucesso'}));
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao salvar arquivo' });
    }
}

exports.deleteFile = async (req, res) => {
    
    try{
        const file = await File.findOne({ 'nome': req.params.id });

        if(!file){
            return res.status(404).json({ erro: "Arquivo não encontrado!" });
        }

        fs.unlinkSync(file.src);

        await File.deleteOne({ '_id': req.params.id });

        res.json({ message: "Arquivo removido com sucesso!" });
    }
    catch(ex){
        res.status(400).json({ erro: `${ex}`});
    }
};

exports.getFile = async (req, res) => {
    try {
        const file = await file.findOne({ 'nome': req.params.id });

        if(!file) {
            res.status(404).json({ mensage: "Arquvio não encontrada"});
        }

        res.status(200).json({ src: file.src });

    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar arquivo.' });
    }
};