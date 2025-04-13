const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const registerUser = async(req, res, next)=> {
    const { Nama, Email, password, fullname } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(`INSERT INTO user (Nama, Email, Password, fullname) VALUE (?, ?, ?, ?)`,
             [Nama, Email, hashedPassword, fullname], (err) =>{
                if (err) return res.status(500).json({error:err});
                res.json({message: 'User registered'});
             }
    )
}

const loginUser = async(req, res) => {
    const {email, password} = req.body;
    db.query(`SELECT * FROM user WHERE Email = ?`, [email], async (err, results) => {
        if(err || results.length === 0) return res.status(401).json({error:'invalid credential'});
        const user = results[0];
        const match = await bcrypt.compare(password, user.Password);
        if(!match) return res.status(401).json({error:'Wrong Password'})
            const token = jwt.sign({id: user.id, email:user.email}, process.env.JWT_SECRET);
        res.json({token});
    })
}

const verifyEmail = (req, res) => {
    res.json({ message: 'Email verified', user: req.user });
}

const daftarSaya = (req, res) => {
    db.query(`SELECT f.* FROM films f
              JOIN daftar_saya ds ON f.id = ds.series_id
              WHERE ds.user_id = ?`, [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
}

const uploadFoto = (req, res) => {
    const photoUrl = `/uploads/${req.file.filename}`;
    const sql = 'UPDATE user SET photo = ? WHERE id = ?';
    db.query(sql, [photoUrl, req.user.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Photo updated', photo: photoUrl });
    });
};

module.exports = {registerUser, loginUser, verifyEmail, daftarSaya, uploadFoto};