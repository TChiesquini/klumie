const jwt = require('jsonwebtoken');

async function verify(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ auth: false, message: 'Você não tem autorização para tal requisição!' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Você não tem autorização para tal requisição!' });
    
      req.userId = decoded.id;
      next();
  });
}

// Exporte a função usando module.exports
module.exports = verify;