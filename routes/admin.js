const express = require('express');
const router = express.Router()

const AdminController = require('../controllers/adminController.js');
const verifyJWT = require('../controllers/verifyJWT.js');

// CRUD de criação de contas Admin
router.post("/", verifyJWT, AdminController.create)
router.get("/:id?", verifyJWT, AdminController.read)
router.put("/:id?", verifyJWT, AdminController.update)
router.delete("/:id", verifyJWT, AdminController.delete)

module.exports = router;