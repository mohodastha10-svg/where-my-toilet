const express = require('express');
const router = express.Router();
const demandController = require('../controllers/demandController');
const userController = require('../controllers/userController');

// This defines the /api/search path
router.post('/search', demandController.handleSearch);

// POST /api/users - save user data
router.post('/users', userController.createUser);

// GET /api/users - list users
router.get('/users', userController.getUsers);

// DELETE /api/users/:id - remove a user (admin)
router.delete('/users/:id', userController.deleteUser);

module.exports = router;