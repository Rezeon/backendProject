const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/userController');
const auth = require('../middlewares/middleware')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath); 
        }
        cb(null, uploadPath);
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/verify-email', auth, userController.verifyEmail)
router.get('/movie1', auth, userController.daftarSaya)
router.post('/upload', auth, upload.single('photo'), userController.uploadFoto)

module.exports = router;