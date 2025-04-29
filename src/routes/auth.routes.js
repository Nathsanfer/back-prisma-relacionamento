import express from 'express';
import authController from '../controllers/authController.js';

const authRouter = express.Router();

// GET / - Listar todas as Cartas

// POST / auth/register - Registrar um novo usuário
authRouter.post("/register", authController.register);

export default authRouter;
