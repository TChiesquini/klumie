const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Empresa = require('../models/Empresa.js');
const Interprete = require('../models/Interprete.js');
const Admin = require('../models/Admin.js');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
  }
});

exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;
  
      const usuario = await encontrarUsuario(email);
      if (!usuario) {
        return res.status(401).json({ error: 'Este usuário não existe' });
      }
  
      const passwordMatch = await bcrypt.compare(password, usuario.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Senha incorreta!' });
      }
  
      usuario.password = undefined;
      var expiresIn;
      if(usuario.tipo == 3){
        expiresIn = 86400;
      } else {
        expiresIn = usuario.verificado == true ? 86400 : 180;
      }
      const token = jwt.sign({ id: usuario._id }, process.env.SECRET, {
        expiresIn: expiresIn
      });
  
      res.status(200).json({ user: usuario, token: token, tipouser: usuario.tipo });
  } catch (error) {
      res.status(500).json({ error: error });
  }
};

async function encontrarUsuario(email) {
    const interprete = await Interprete.findOne({ email: email }, '+password');
    if (interprete) {
      interprete.tipo = 1;
      return interprete;
    }
  
    const empresa = await Empresa.findOne({ email: email }, '+password');
    if (empresa) {
      empresa.tipo = 2;
      return empresa;
    }

    const admin = await Admin.findOne({ email: email }, '+password');
    if (admin) {
      admin.tipo = 3;
      return admin;
    }
  
    return null;
}

exports.senha = async (req, res) => {
  try{
    const { password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const interprete = await Interprete.findOne({ email: email });
    if (interprete) {
      await Interprete.updateOne({ "email" : email },{password: hashedPassword});
      res.status(200).json('Senha alterada com sucesso!');
    }
  
    const empresa = await Empresa.findOne({ email: email });
    if (empresa) {
      await Empresa.updateOne({ "email" : email },{password: hashedPassword});
      res.status(200).json('Senha alterada com sucesso!');
    }

  }
  catch(ex){
    res.status(400).json({ erro: `${ex}` });
  }
};

exports.emailsenha = async (req, res) => {
  const { email } = req.body;
  const numeroAleatorio = Math.floor(Math.random() * 1000000);
  const numeroFormatado = numeroAleatorio.toString().padStart(6, '0');

  if (!email) {
      return res.status(400).json({ erro: 'O campo de email é obrigatório.' });
  } else {
    const interprete = await Interprete.findOne({ email: email });
    if (!interprete) {
      const empresa = await Empresa.findOne({ email: email });
      if(!empresa){
        return res.status(401).json({ error: 'Este usuário não existe' });
      }
    }
  }

  // Dados do email
  const mailOptions = {
      from: '"Klumie" <klumie.cursos@gmail.com>',
      to: email,
      subject: 'Assunto: Klumie | Redefinição de senha',
      html: `<html>
      <head>
        <style>
          /* Estilos CSS para o e-mail */
          .container {
            font-family: Arial, sans-serif;
            text-align: center;
          }
          .large-bold {
            font-size: 24px; /* Tamanho de fonte grande */
            font-weight: bold; /* Texto em negrito */
          }
        </style>
      </head>
      <body>
        <div class="container">
          <p>Olá,</p>
          <p>Você recebeu este e-mail porque solicitou a redefinição da senha da sua conta na Klumie.</p>
          <p>O código abaixo expira em 3 minuto</p>
          <p><span class="large-bold">${numeroFormatado}</span></p>
          <p>Se você não solicitou a redefinição de senha, ignore este e-mail.</p>
          <p>Atenciosamente,</p>
          <p>Klumie</p>
        </div>
      </body>
    </html>`
  };

  // Enviar o email
  transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          res.status(500).json({ erro: `Erro ao enviar o email: ${error}` });  
      } else {
          const token =jwt.sign({ numeroFormatado, email }, process.env.SECRET, {
            expiresIn: 180
          });
          res.status(200).json({ 
            mensagem: 'Email de redefinição de senha enviado com sucesso.',
            token: token
          });
      }
  });
};

exports.verificar = async (req, res) => {
  try{
    const { id } = req.body;
    const token = jwt.sign({ id: id }, process.env.SECRET, {
      expiresIn: expiresIn
    });

    const interprete = await Interprete.findOne({ "_id": id });
    if (interprete) {
      await Interprete.updateOne({ "_id" : id },{"verificado": true});
      res.status(200).json({ message: 'E-mail verificado!', token: token });
    }
  
    const empresa = await Empresa.findOne({ "_id": id });
    if (empresa) {
      await Empresa.updateOne({ "_id" : id },{"verificado": true});
      res.status(200).json({ message: 'E-mail verificado!', token: token });
    }
  }
  catch(ex){
    res.status(400).json({ erro: `${ex}` });
  }

};

exports.emailverificar = async (req, res) => {
  const { email } = req.body;
  const numeroAleatorio = Math.floor(Math.random() * 1000000);
  const numeroFormatado = numeroAleatorio.toString().padStart(6, '0');

  // Verifique se o email é válido antes de enviar
  if (!email) {
      return res.status(400).json({ erro: 'O campo de email é obrigatório.' });
  } else {
    const interprete = await Interprete.findOne({ email: email });
    if (!interprete) {
      const empresa = await Empresa.findOne({ email: email });
      if(!empresa){
        return res.status(401).json({ error: 'Este usuário não existe' });
      }
    }
  }

  // Dados do email
  const mailOptions = {
      from: '"Klumie" <klumie.cursos@gmail.com>',
      to: email,
      subject: 'Assunto: Klumie | Verificação de e-mail',
      html: `<html>
      <head>
        <style>
          /* Estilos CSS para o e-mail */
          .container {
            font-family: Arial, sans-serif;
            text-align: center;
          }
          .large-bold {
            font-size: 24px; /* Tamanho de fonte grande */
            font-weight: bold; /* Texto em negrito */
          }
        </style>
      </head>
      <body>
        <div class="container">
          <p>Olá,</p>
          <p>Você recebeu este e-mail para verificar sua conta da Klumie.</p>
          <p>O código abaixo expira em 3 minuto</p>
          <p><span class="large-bold">${numeroFormatado}</span></p>
          <p>Caso não verifique o e-mail em até 2 dias, essa conta será excluída.</p>
          <p>Atenciosamente,</p>
          <p>Klumie</p>
        </div>
      </body>
    </html>`
  };

  // Enviar o email
  transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          res.status(500).json({ erro: `Erro ao enviar o e-mail: ${error}` });  
      } else {
        const token = jwt.sign({ numeroFormatado, email }, process.env.SECRET, {
          expiresIn: 180
        });
          res.status(200).json({ 
            mensagem: 'E-mail de validação enviado com sucesso.',
            token: token
          });
      }
  });
};

exports.token = async (req, res, next) => {
    const token = req.headers['authorization'];
    const { email, numero } = req.body;
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err || decoded.numeroFormatado != numero || decoded.email != email) {
        return res.status(401).json({ erro: "Código inválido" });
      }
    
      next();
    });
}