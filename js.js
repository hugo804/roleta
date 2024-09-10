const express = require('express');
const app = express();

// Porta dinâmica para Heroku ou 3000 localmente
const port = process.env.PORT || 3000;

// Middleware para processar o JSON enviado no corpo da requisição
app.use(express.json());

// Array em memória para armazenar os valores
let valores = [];

// Rota POST para armazenar os cinco valores enviados no corpo da requisição
app.post('/valores', (req, res) => {
    const { valor1, valor2, valor3, valor4, valor5 } = req.body;
    
    // Verificar se todos os valores foram enviados
    if (valor1 !== undefined && valor2 !== undefined && valor3 !== undefined && valor4 !== undefined && valor5 !== undefined) {
        // Armazenar os valores como um objeto
        valores.push({ valor1, valor2, valor3, valor4, valor5 });
        res.status(201).json({ message: 'Valores armazenados com sucesso!', valores: { valor1, valor2, valor3, valor4, valor5 } });
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
