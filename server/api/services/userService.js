const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User } = require('../../database/models');

const isValidUser = async ({ name, email }) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [
        { name },
        { email },
      ],
    },
  });
  return user;
};

const validateLogin = async ({ email, password }) => {
  const validUser = await User.findOne({ where: { email } });
  if (!validUser) return { error: { code: 'notFound', message: 'Usuário não encontrado' } };

  if (validUser.dataValues.password !== md5(password)) {
    return { error: { code: 'notFound', message: 'Senha inválida' } };
  }

  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ data: validUser.dataValues }, secret.trim());

  return { result: { token } };
};

const registerByAdmin = async ({ name, email, password, role }) => {
  const hash = md5(password);
  const createdUser = await User.create({ name, email, password: hash, role });
  return createdUser;
};

const validateRegister = async (registerObj) => {
  const user = await isValidUser(registerObj);
  if (user) return { error: { code: 'alreadyExists', message: 'Usuário já possui um cadastro' } };
  const createdUser = await registerByAdmin(registerObj);
  return { result: createdUser };
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id } });
  if (!user) return { error: { code: 'notFound', message: 'Usuário não encontrado' } };
  return { result: user };
};

const getAllSellers = async () => {
  const sellers = await User.findAll({ where: { role: 'seller' } });
  return { result: sellers };
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return { result: users };
};

const removeUser = async (id) => {
  const users = await User.destroy({ where: { id } });
  return { result: users };
};

module.exports = {
  isValidUser,
  validateLogin,
  validateRegister,
  getUserById,
  getAllUsers,
  getAllSellers,
  removeUser,
};
