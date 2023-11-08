import express from 'express';
import fs from 'fs';

const PORT = 3000;
const petDatabase = "../pets.json";
const app = express();

const petData = fs.readFileSync(petDatabase, 'utf8');
const pets = JSON.parse(petData);

app.use(express.json());

app.get('/pets', (req, res) => {
res.status(200).json(pets);
});

app.get('/pets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < pets.length) {
        res.status(200).json(pets[id]);
    } else {
        res.status(404).send('Not Found');
    }
});







app.listen(PORT, () => {
console.log(`Listening on port: ${PORT}`)
});