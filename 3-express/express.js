import express from 'express'
const app = express();

app.get('/pets', (req, res) => {
    res.send('Welcome to the pet shop')
})

app.listen(8000, () => {
    console.log('server is running')
})