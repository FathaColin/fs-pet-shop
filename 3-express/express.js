import express from 'express';
import fs from 'fs';

const petDatabase = "../pets.json"
const petData = fs.readFileSync(petDatabase, 'utf8');
let pets = JSON.parse(petData);

const app = express();
const PORT = 3000;

app.get('/pets', (req, res) => {
    res.status(200).json(pets);
});

app.get('/pets/:id', (req, res) => {
    const index = parseInt(req.params.id);
    if (index >= 0 && index < pets.length) {
        res.status(200).json(pets[index]);
      } else {
        res.status(404).send('Not Found');
}});

app.post('/pets', (req,res) => {
    const newPet = req.body;
    
    if(!isValidPet(newPet)) {
        res.status(400).send('Bad Request');
    }else{
        pets.push(newPet);
    }
    });

app.listen(PORT, () => {
    console.log('server is running');
});

function isValidPet(newPet) {
    return (
      newPet &&
      typeof newPet.age === 'number' &&
      typeof newPet.kind === 'string' &&
      typeof newPet.name === 'string'
    );
  };