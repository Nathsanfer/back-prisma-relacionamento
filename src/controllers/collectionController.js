import CollectionModel from "../models/collectionModel.js";

class CollectionController {
  // GET /colecoes
  async getAllCollections(req, res) {
    try {
      const colecoes = await CollectionModel.findAll();
      res.json(colecoes);
    } catch (error) {
      console.error("Erro ao buscar coleções:", error);
      res.status(500).json({ error: "Erro ao buscar coleções" });
    }
  }

  // GET /colecoes/:id
  async getCollectionById(req, res) {
    try {
      const { id } = req.params;

      const colecao = await CollectionModel.findById(id);

      if (!colecao) {
        return res.status(404).json({ error: "Coleção não encontrado" });
      }

      res.json(colecao);
    } catch (error) {
      console.error("Erro ao buscar coleção:", error);
      res.status(500).json({ error: "Erro ao buscar coleção" });
    }
  }

  // POST /colecoes
  async createCollection(req, res) {
    try {
      // Validação básica
      const {
        name,       
        description,
        releaseYear
      } = req.body;

      // Verifica se todos os campos das coleções foram fornecidos
      if (
        !name ||
        !description||
        !releaseYear
      ) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      // Criar a nova coleção
      const newCollection = await CollectionModel.create(
        name,
        description,
        releaseYear
      );

      if (!newCollection) {
        return res.status(400).json({ error: "Erro ao criar coleção" });
      }

      res.status(201).json(newCollection);
    } catch (error) {
      console.error("Erro ao criar coleção:", error);
      res.status(500).json({ error: "Erro ao criar coleção" });
    }
  }

  // PUT /api/personagens/:id
  async updatePersonagem(req, res) {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        episodes,
        releaseYear,
        studio,
        genres,
        rating,
        imageUrl,
      } = req.body;

      // Atualizar o personagem
      const updatedPersonagem = await PersonagemModel.update(
        id,
        title,
        description,
        episodes,
        releaseYear,
        studio,
        genres,
        rating,
        imageUrl
      );

      if (!updatedPersonagem) {
        return res.status(404).json({ error: "Personagem não encontrado" });
      }

      res.json(updatedPersonagem);
    } catch (error) {
      console.error("Erro ao atualizar personagem:", error);
      res.status(500).json({ error: "Erro ao atualizar personagem" });
    }
  }

  // DELETE /api/personagens/:id
  async deletePersonagem(req, res) {
    try {
      const { id } = req.params;

      // Remover o personagem
      const result = await PersonagemModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Personagem não encontrado" });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover personagem:", error);
      res.status(500).json({ error: "Erro ao remover personagem" });
    }
  }
}

export default new CollectionController();
