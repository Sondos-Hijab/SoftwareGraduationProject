const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const header = req.headers['authorization'];
  const token = header && header.split(' ')[1];

  if (token == null) {
    console.error('Token not found in headers');
    return res.status(401).json({
      statusCode: '401',
    });
  }

  console.log('Extracted token:', token);

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error('JWT verification failed:', err);
      return res.status(403).json({
        statusCode: '403',
        token: 'Forbidden',
      }); // Forbidden
    }

    // If verification is successful, store the user information in the request
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  });
};

module.exports = authenticateToken;


