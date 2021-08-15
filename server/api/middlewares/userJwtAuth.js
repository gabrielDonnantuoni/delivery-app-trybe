const jwt = require('jsonwebtoken');
const { userService } = require('../services');

module.exports = async (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return next({ code: 'unauthenticated', message: 'Token not found' });

    const secret = process.env.JWT_SECRET;
    const payload = jwt.verify(token, secret.trim());

    const { email, name } = payload.data;
    const user = await userService.isValidUser({ email, name });
    if (!user) return next({ code: 'unauthenticated', message: 'Expired or invalid token' });

    req.user = user;
    next();
  } catch (err) {
    next({ code: 'unauthenticated', message: 'Expired or invalid token' });
  }
};
