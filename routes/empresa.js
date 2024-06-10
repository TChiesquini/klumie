const express = require('express');
const router = express.Router()

const EmpresaController = require('../controllers/empresaController.js');
const verifyJWT = require('../controllers/verifyJWT.js');

router.post("/", EmpresaController.create)
router.get("/:id?", verifyJWT, EmpresaController.read)
router.put("/:id?", verifyJWT, EmpresaController.update)
router.delete("/:id", verifyJWT, EmpresaController.delete)

module.exports = router;