const express = require('express')
const server = express()
const db = require('./data/db')

server.use(express.json());

server.get('/', (req, res) => {
    res.send('it is working')
})

// POST  /api/posts
server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res
        .status(400)
        .json({errorMessage: "Please provide title and contents for the post."})
    } else {
        db.insert(req.body)
        .then(item => {
            res
            .status(201)
            .json(item)
        })
        .catch(error => {
            res
            .status(500)
            .json({errorMessage: 'There was an error while saving the user to the database'})
        })
    }
})

// POST   /api/posts/:id/comments
server.post('/api/posts/:id/comments', (req, res) => {
    const comment  = req.body;
     comment.post_id = Number(req.params.id) 
    if (!comment.text) {
        res
        .status(400)
        .json({ errorMessage: "Please provide text for the comment." })
    } else {
        db.insertComment(comment)
        .then(item => {
            res
            .status(201)
            .json(item)
        })
        .catch(error => {
            res
            .status(500)
            .json({errorMessage: 'There was an error while saving the comment to the database'})
        })
    }
    
})

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
        if(item[0]) {
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
        .json({ errorMessage: 'The post information could not be retrieved.' });
    })
})
// GET    /api/posts/:id/comments
server.get('/api/posts/:id/comments', (req, res) => {
    db.findPostComments(req.params.id)
    .then(item => {
        if(item[0]) {
            res.status(200).json(item)
        } else {
            res
            .status(404)
            .json({ message: 'The post comments with the specified ID does not exist.'})
        }
    })
    .catch(error => {
        res
        .status(500)
        .json({ errorMessage: 'The post comments information could not be retrieved.' });
    })
})

// DELETE /api/posts/:id
server.delete('/api/posts/:id', (req, res) => {
    db.remove(req.params.id)
    .then(item => {
        if(item && item > 0) {
            res
            .status(200)
            .json({message: 'the item was deleted.'})
        } else {
            res
            .status(404)
            .json({ message: 'The item with the specified ID does not exist.' })
        }
    })
    .catch(error => {
        res
        .status(500)
        .json({ errorMessage: 'The item could not be removed' })
    })
})
// PUT    /api/posts/:id
server.put('/api/posts/:id', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res
        .status(400)
        .json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        db.update(req.params.id, req.body)
        .then(item => {
            if(item) {
                res.status(200).json(item)
            } else {
                res
                .status(404)
                .json({ message: 'The post with the specified ID does not exist.'});
            }

        })
        .catch(error => {
            res
            .status(500)
            .json({errorMessage: 'The post information could not be modified.' });
        })
    }
})
const port = 8000;
server.listen(port, () => console.log(`server listening to ${port}`))