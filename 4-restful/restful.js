/*import express from 'express';
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

app.post('/pets', (req, res) => {
const pet = req.body;
if ([pet.name, pet.kind, pet.age].includes(undefined)) {
    res.status(400).send("Bad Request");
}else{
    pets.push(pet);
    fs.writeFileSync('../pets.json', JSON.stringify(pets))
    res.status(201).json(pet);
}
})

app.put('/pets/:id', (req, res) => {
    const updatedPetData = req.body;
    const index = parseInt(req.params.id);
  
    if (index >= 0 && index < pets.length) {
      const updatedPet = pets[index];
  
      if ([updatedPetData.name, updatedPetData.kind, updatedPetData.age].includes(undefined)) {
        res.status(400).send("Bad Request");
      } else {
        updatedPet.name = updatedPetData.name;
        updatedPet.kind = updatedPetData.kind;
        updatedPet.age = updatedPetData.age;
  
        fs.writeFileSync(petDatabase, JSON.stringify(pets));
  
        res.status(200).json(updatedPet);
      }
    } else {
      res.status(404).send("Pet not found");
    }
  });

  app.delete('/pets/:id', (req, res) => {
    const index = parseInt(req.params.id);
  
    if (index >= 0 && index < pets.length) {
      const deletedPet = pets.splice(index, 1);
      fs.writeFileSync(petDatabase, JSON.stringify(pets));
      res.status(200).json(deletedPet)
  }else{
    res.status(404).send("Pet not found")
  }
})
  
app.use((req, res) => {
    res.status(404).send('Bad Request');
})

app.listen(PORT, () => {
console.log(`Listening on port: ${PORT}`)
});*/

import express from 'express';
import pg from 'pg'
const { Pool } = pg;

const PORT = 3000;
const app = express();

const pool = new Pool({
  user: 'colin',
  host: 'localhost',
  database: 'petsdb',
  password: '2211056',
  port: 5432,
})

app.use(express.json());

app.get('/pets', async (req, res) => {
  try {
    const all = await pool.query('SELECT * FROM pets');
    res.status(200).json(all.rows);
  } catch (err) {
    res.status(500).send('Server Error');
  }
})


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})

