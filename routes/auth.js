const express = require('express');
const router = express.Router()

const AuthController = require('../controllers/authController.js');

// Rotas de fluxos de autenticação
router.post("/login", AuthController.login); // Autenticar usuário
router.put("/redsenha", AuthController.token, AuthController.senha); // Redefinir senha
router.post("/emailsenha", AuthController.emailsenha); // Envio de e-mail com código para redefinição de senha
router.post("/emailverificar", AuthController.emailverificar); // Envio de e-mail com código para confirmar existência
router.put("/verificar", AuthController.token, AuthController.verificar); // Valida e-mail do usuário
router.post("/token", AuthController.token); // Verifica a validade do token

module.exports = router;