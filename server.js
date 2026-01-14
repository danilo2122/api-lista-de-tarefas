const express = require("express");

const app = express();
app.use(express.json());

// banco de dados fake (em memória)
let tarefas = [];
let proximoId = 1;

// GET - listar tarefas
app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

// POST - criar tarefa
app.post("/tarefas", (req, res) => {
  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({ erro: "Título é obrigatório" });
  }

  const novaTarefa = {
    id: proximoId++,
    titulo,
    concluida: false
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// PUT - concluir tarefa
app.put("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  tarefa.concluida = true;
  res.json(tarefa);
});

// DELETE - remover tarefa
app.delete("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  tarefas = tarefas.filter(t => t.id !== id);
  res.status(204).send();
});

// servidor
app.listen(3000, () => {
  console.log("API de tarefas rodando em http://localhost:3000");
});
