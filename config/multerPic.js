const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/pics');
    },
    filename: function(req, file, cb) {
      const id = req.body.nome;
      cb(null, id + '.png');
    }
});
  
const upload = multer({ storage });

module.exports = upload;