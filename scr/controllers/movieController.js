const db = require('../config/db')

const getMovie = async(req, res, next) => {
    db.query(`SELECT * FROM seriesfilm`, (err, results) => {
        try {
            res.json(results);
        }catch{
            res.status(500).send(err);
        }
    })
}
const getMovieByID = async(req, res , next) => {
    const {id} = req.params;
    db.query(`SELECT * FROM seriesfilm WHERE series_id = ?`, [id], (err, results) => {
        if(err) return res.status(500).send(err);
        if(results.length === 0) return res.status(404).json({messege: 'movie not found'})
        res.json(results[0]);
    })
}
const addMovie = async(req, res) => {
    const { judul, age_rating, cast, description_F, director, new_F, rating_film, trailer } = req.body;
    db.query(`INSERT INTO seriesfilm (judul, age_rating, cast, description_F, director, new_F, rating_film, trailer) VALUES (?, ?, ?, ?, ? ,?, ?, ?)`,[judul, age_rating, cast, description_F, director, new_F, rating_film, trailer], (err,result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: 'movie created', series_id: result.insertId });
    });
}
const updateMovie = async(req, res) => {
    const {id} = req.params;
    const { judul, age_rating, cast, description_F, director, new_F, rating_film, trailer } = req.body;
    db.query(`UPDATE seriesfilm SET  judul=?, age_rating=?, cast=?, description_F=?, director=?, new_F=?, rating_film=?, trailer=? WHERE series_id=?`,[judul, age_rating, cast, description_F, director, new_F, rating_film, trailer,id], (err,result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'movie updated' });
    });
}
const deleteMovie = async(req, res) => {
    const {id} = req.params;
    db.query(`DELETE FROM seriesfilm WHERE series_id=?`,[id],(err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'series deleted' });
    })
}
module.exports = {addMovie,getMovie,updateMovie,deleteMovie,getMovieByID};