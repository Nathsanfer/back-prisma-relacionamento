# 🌐 Configuração do Banco de Dados no `.env` e `schema.prisma`
Para que o Prisma funcione corretamente com o banco de dados que você escolher, é necessário configurar dois pontos:

A variável `DATABASE_URL` no arquivo `.env`

O `provider` dentro do bloco `datasource` no arquivo `schema.prisma`

## 1. Arquivo `.env`

Para SQLite

```env
DATABASE_URL="file:./nome.db"
```

Para PostgreSQL

```env
DATABASE_URL="postgresql://user:password@localhost:5432/nome?schema=public"
```

## 2. Arquivo `schema.prisma`
No início do seu `schema.prisma`, localize o bloco `datasource` e altere o `provider` de acordo com o banco usado:

Para SQLite

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

Para PostgreSQL

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

> ⚠️ Importante: O provider precisa corresponder ao tipo de banco de dados definido em DATABASE_URL. Se estiver usando PostgreSQL mas o provider estiver como sqlite, o Prisma não funcionará corretamente.

## 🛠️ Lembrete: Rodar a Migração
Sempre que você fizer qualquer alteração no schema, seja para ajustar o banco, criar ou editar modelos, execute o seguinte comando no terminal:

```bash
npx prisma migrate dev
```

Esse comando:
- Aplica as alterações no banco de dados
- Gera e executa a migração
- Atualiza o cliente Prisma (Prisma Client) automaticamente

# 🔗 Relacionamento entre Tabelas
Estamos utilizando o Prisma ORM para definir um relacionamento 1 para muitos (1:N) entre `Collection` e `Card`:

- Uma Collection pode conter vários Cards

- Um Card pertence a uma única Collection

## 🧩 Modelos no Prisma

```prisma
model Collection {
  id          Int     @id @default(autoincrement())
  name        String  @unique            // Nome único para cada coleção
  description String?                    // Descrição opcional da coleção
  releaseYear Int                        // Ano de lançamento

  cards       Card[]                     // Relacionamento 1:N (uma coleção tem vários cards)

  createAt    DateTime @default(now())   // Data de criação
  updatedAt   DateTime @updatedAt        // Data da última atualização

  @@map("collections")                   // Mapeia para a tabela 'collections' no banco de dados
}

model Card {
  id            Int        @id @default(autoincrement())
  name          String     @unique           // Nome único para cada card
  rarity        String                        // Raridade do card
  attackPoints  Int                           // Pontos de ataque
  defensePoints Int                           // Pontos de defesa
  imageUrl      String?                       // URL da imagem do card (opcional)

  collectionId  Int                           // Chave estrangeira que referencia a Collection
  collection    Collection @relation(fields: [collectionId], references: [id], onDelete: Cascade, onUpdate: Cascade)

  createAt      DateTime @default(now())      // Data de criação
  updatedAt     DateTime @updatedAt           // Data da última atualização

  @@map("cards")                              // Mapeia para a tabela 'cards' no banco de dados
}
```

## ✅ Explicação do Relacionamento

Na tabela `Card` (dependente):
Definimos o campo `collectionId` como a chave estrangeira que aponta para o `id` da `Collection`.
Usamos a anotação `@relation` para configurar o relacionamento e definir o comportamento de `onDelete` e `onUpdate` como `Cascade`.

Na tabela `Collection` (principal):
Definimos o campo `cards` como uma lista `(Card[])`, representando todos os cards pertencentes a essa coleção.

