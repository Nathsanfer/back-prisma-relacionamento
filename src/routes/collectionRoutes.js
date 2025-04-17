import express from "express";
import CollectionController from "../controllers/collectionController.js";

const collectionRouter = express.Router();

// Rotas de Coleções
// GET /colecoes - Listar todas as Coleções
collectionRouter.get("/", CollectionController.getAllCollections);

// GET /colecoes/:id - Obter uma coleções pelo ID
//collectionRouter.get("/:id", CollectionController.getPersonagemById);

// POST /colecoes - Criar uma nova Coleção
collectionRouter.post("/", CollectionController.createCollection);

// PUT /personagens/:id - Atualizar um Personagem
//collectionRouter.put("/:id", CollectionController.updatePersonagem);

// DELETE /personagens/:id - Remover um Personagem
//collectionRouter.delete("/:id", CollectionController.deletePersonagem);

export default collectionRouter;
