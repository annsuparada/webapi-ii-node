const express = require('express')
const server = express()
const db = require('./data/db')

server.use(express.json());

server.get('/', (req, res) => {
    res.send('it is working')
})

// POST  /api/posts 
server.post('/api/posts', (req, res) => {
    
})

// POST   /api/posts/:id/comments

// GET    /api/posts 
server.get('/api/posts', (req, res) => {
    db.find()
    .then(item => {
        res.status(200).json(item)
    })
    .catch(error => {
        res.status(500).json({errorMessage: 'error'})
    })
})

// GET    /api/posts/:id 
// GET    /api/posts/:id/comments
// DELETE /api/posts/:id   
// PUT    /api/posts/:id

const port = 8000;
server.listen(port, () => console.log(`server listening to ${port}`))