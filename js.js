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
    const { valor1, valor2, valor3, valor4, valor5 } = req.body;
    
    // Verificar se todos os valores foram enviados
    if (valor1 !== undefined && valor2 !== undefined && valor3 !== undefined && valor4 !== undefined && valor5 !== undefined) {
        // Procurar se já existe um conjunto de valores com o ID fornecido
        const index = valores.findIndex(v => v.id === id);
        
        if (index !== -1) {
            // Atualizar o conjunto de valores existente
            valores[index] = { id, valor1, valor2, valor3, valor4, valor5 };
            res.status(200).json({ message: 'Valores atualizados com sucesso!', valores: { id, valor1, valor2, valor3, valor4, valor5 } });
        } else {
            // Adicionar um novo conjunto de valores
            valores.push({ id, valor1, valor2, valor3, valor4, valor5 });
            res.status(201).json({ message: 'Valores armazenados com sucesso!', valores: { id, valor1, valor2, valor3, valor4, valor5 } });
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
