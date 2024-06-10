const express = require('express');
const router = express.Router()

const HabilidadeController = require('../controllers/habilidadeController.js');
const verifyJWT = require('../controllers/verifyJWT.js');

router.post("/", verifyJWT, HabilidadeController.create)
router.get("/:id?", verifyJWT, HabilidadeController.read)
router.put("/:id?", verifyJWT, HabilidadeController.update)
router.delete("/:id", verifyJWT, HabilidadeController.delete)

module.exports = router;