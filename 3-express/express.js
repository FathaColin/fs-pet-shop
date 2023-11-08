import express from 'express';
import fs from 'fs';

const petDatabase = '../pets.json';
const petData = fs.readFileSync(petDatabase, 'utf8');
let pets = JSON.parse(petData);

const app = express();
const PORT = 3000;

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

app.use(express.json());
app.post('/pets', (req, res) => {
    const newPet = req.body;

    if (!isValidPet(newPet)) {
        res.status(400).send('Bad Request');
    } else {
        pets.push(newPet);
        fs.writeFileSync(petDatabase, JSON.stringify(pets, null, 2));
        res.status(201).json(newPet);
    }
});

app.use((req,res) => {
    app.status(404).send('Not Found')
})

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});

function isValidPet(newPet) {
    return (
        newPet &&
        typeof newPet.age === 'number' &&
        typeof newPet.kind === 'string' &&
        typeof newPet.name === 'string'
    );
}
