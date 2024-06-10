const express = require('express');
const router = express.Router()

const InterpreteController = require('../controllers/interpreteController.js');
const verifyJWT = require('../controllers/verifyJWT.js');

router.post("/", InterpreteController.create)
router.get("/:id?", verifyJWT, InterpreteController.read)
router.put("/:id", verifyJWT, InterpreteController.update)
router.delete("/:id", verifyJWT, InterpreteController.delete)

module.exports = router;