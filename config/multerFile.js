const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/files');
    },
    filename: function(req, file, cb) {
      const id = req.body.id;
      cb(null, id + '.pdf');
    }
});
  
const upload = multer({ storage });

module.exports = upload;