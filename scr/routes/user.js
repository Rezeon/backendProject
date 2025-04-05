const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send("hello ren")
})
router.get('/:id', (req,res) => {
    const id = req.params.id
    res.send(`ini id admin ${id}`)
})
router.get('/home', (req,res) => {
    res.send("welcome admin")
})
router.get('/about', (req,res) => {
    res.send("ini admin")
})

module.exports = router;