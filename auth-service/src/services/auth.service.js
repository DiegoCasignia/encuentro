const bcrypt = require('bcryptjs');
const { generateToken, generateRefreshToken } = require('../utils/jwt');
const { User } = require('../models/user.model');

const register = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 12);
  const user = await User.create({
    ...userData,
    password: hashedPassword
  });
  
  return {
    userId: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role
  };
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Usuario no encontrado');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Credenciales inválidas');

  const payload = {
    userId: user.userId,
    email: user.email,
    role: user.role
  };

  const token = generateToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Actualizar refresh token en la base de datos
  await User.update({ refreshToken }, { where: { userId: user.userId } });

  return {
    user: {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    },
    token,
    refreshToken
  };
};

const refreshAccessToken = async (refreshToken) => {
  const { userId } = verifyToken(refreshToken);
  const user = await User.findOne({ where: { userId, refreshToken } });
  
  if (!user) {
    throw new Error('Refresh token inválido');
  }

  const payload = {
    userId: user.userId,
    email: user.email,
    role: user.role
  };

  return generateToken(payload);
};

const validateToken = (token) => {
  return verifyToken(token);
};

module.exports = {
  register,
  login,
  refreshAccessToken,
  validateToken
};