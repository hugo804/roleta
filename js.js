const express = require('express');
const app = express();

// Porta dinâmica para Heroku ou 3000 localmente
const port = process.env.PORT || 3000;

// Middleware para processar o JSON enviado no corpo da requisição
app.use(express.json());

// Array em memória para armazenar os valores com um identificador
let valores = [];

// Rota POST para armazenar ou atualizar os valores enviados no corpo da requisição
app.post('/valores/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;

    // Verificar se todos os valores (item1 até item23) estão presentes
    const requiredItems = Array.from({ length: 23 }, (_, i) => `item${i + 1}`);
    const allValuesPresent = requiredItems.every(key => body.hasOwnProperty(key));

    if (allValuesPresent) {
        // Procurar se já existe um conjunto de valores com o ID fornecido
        const index = valores.findIndex(v => v.id === id);
        
        if (index !== -1) {
            // Atualizar o conjunto de valores existente
            valores[index] = { id, ...body };
            res.status(200).json({ message: 'Valores atualizados com sucesso!', valores: { id, ...body } });
        } else {
            // Adicionar um novo conjunto de valores
            valores.push({ id, ...body });
            res.status(201).json({ message: 'Valores armazenados com sucesso!', valores: { id, ...body } });
        }
    } else {
        res.status(400).json({ message: 'Um ou mais valores estão ausentes.' });
    }
});

// Rota GET para obter todos os conjuntos de valores armazenados
app.get('/valores', (req, res) => {
    res.status(200).json({ valores });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
