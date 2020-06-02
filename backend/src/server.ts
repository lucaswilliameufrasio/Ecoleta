import express from 'express';

const app = express();

app.get('/users', (request, response) => {
    console.log('Listagem de Usuários');

    response.json(['Lucas', 'Luan', 'Henrique']);
});

app.listen(3333, () => console.log('Listening on PORT 3333!'));
