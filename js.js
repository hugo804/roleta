const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Rota POST para armazenar ou atualizar os valores enviados no corpo da requisição
app.post('/valores/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    // Verificar se todos os valores (item1 até item23) estão presentes
    const requiredItems = Array.from({ length: 23 }, (_, i) => `item${i + 1}`);
    const allValuesPresent = requiredItems.every(key => body.hasOwnProperty(key));

    if (allValuesPresent) {
        try {
            // Procurar se já existe um conjunto de valores com o ID fornecido
            const existingValor = await prisma.valor.findUnique({ where: { id } });

            if (existingValor) {
                // Atualizar o conjunto de valores existente
                const updatedValor = await prisma.valor.update({
                    where: { id },
                    data: body,
                });
                res.status(200).json({ message: 'Valores atualizados com sucesso!', valores: updatedValor });
            } else {
                // Adicionar um novo conjunto de valores
                const newValor = await prisma.valor.create({
                    data: { id, ...body },
                });
                res.status(201).json({ message: 'Valores armazenados com sucesso!', valores: newValor });
            }
        } catch (error) {
            console.error('Erro ao processar a requisição', error);
            res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    } else {
        res.status(400).json({ message: 'Um ou mais valores estão ausentes.' });
    }
});

// Rota GET para obter todos os conjuntos de valores armazenados
app.get('/valores', async (req, res) => {
    try {
        const valores = await prisma.valor.findMany();
        res.status(200).json({ valores });
    } catch (error) {
        console.error('Erro ao obter os valores', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
