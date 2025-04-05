const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.getMovie);
router.get('/:id', movieController.getMovieByID);
router.put('/:id', movieController.updateMovie);
router.post('/', movieController.addMovie)
router.delete('/:id', movieController.deleteMovie);

module.exports = router;