const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken, checkRole } = require('../middlewares/auth.middleware');

// Públicas
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);

// Protegidas
router.get('/validate', verifyToken, authController.validate);
router.get('/admin', verifyToken, checkRole(['admin']), (req, res) => {
  res.json({ message: 'Acceso de administrador autorizado' });
});

module.exports = router;