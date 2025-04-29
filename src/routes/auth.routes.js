import express from 'express';
import authController from '../controllers/authController.js';

const authRouter = express.Router();

// GET / - Listar todas as Cartas

// POST / auth/register - Registrar um novo usuário
authRouter.post("/register", authController.register);

// POST / auth/login - Fazer login
authRouter.post("/login", authController.login);

export default authRouter;
