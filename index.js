const express = require("express");

const app = express();
app.use(express.json()); // permite receber JSON no corpo das requisições

// banco de dados fake em memória
let tarefas = [];
let proximoId = 1;

const PORT = 3000;

// ROTA TESTE
app.get("/", (req, res) => {
  res.send("API de Tarefas funcionando!");
});

// CRIAR NOVA TAREFA (POST)
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

// LISTAR TODAS AS TAREFAS (GET)
app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

// CONCLUIR UMA TAREFA (PUT)
app.put("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  tarefa.concluida = true;
  res.json(tarefa);
});

// DELETAR UMA TAREFA (DELETE)
app.delete("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  tarefas = tarefas.filter(t => t.id !== id);
  res.status(204).send();
});

// INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log(`API de tarefas rodando em http://localhost:${PORT}`);
});
