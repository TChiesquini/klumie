const express = require('express');
const router = express.Router()

const EventoController = require('../controllers/eventoController.js');
const verifyJWT = require('../controllers/verifyJWT.js');

router.post("/", verifyJWT, EventoController.create)
router.get("/:id?", verifyJWT, EventoController.read)
router.put("/:id?", verifyJWT, EventoController.update)
router.delete("/:id", verifyJWT, EventoController.delete)

module.exports = router;