const multer = require('multer');

const storage = multer.memoryStorage(); // Store the file in memory as a Buffer

const multerConfig = multer({ storage: storage });

module.exports = multerConfig;
