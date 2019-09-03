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
        res.status(500).json({errorMessage: 'The posts information could not be retrieved'})
    })
})

// GET    /api/posts/:id
server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
    .then(item => {
        if(item) {
            res.status(200).json(item)
        } else {
            res
            .status(404)
            .json({ message: 'The post with the specified ID does not exist.'})
        }
    })
    .catch(error => {
        res
        .status(500)
        .json({ errorMessage: 'The user information could not be retrieved.' });
    })
}) 
// GET    /api/posts/:id/comments
// DELETE /api/posts/:id   
// PUT    /api/posts/:id

const port = 8000;
server.listen(port, () => console.log(`server listening to ${port}`))