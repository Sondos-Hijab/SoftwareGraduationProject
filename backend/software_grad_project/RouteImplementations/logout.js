require('dotenv').config();
const { promisify } = require('util');
const con = require('../config/config');

const queryAsync = promisify(con.query).bind(con);

const logout = async (req, res) => {
  const refresh_Token = req.body.token;

  try {
    // Remove the refreshToken from the database
    const results = await queryAsync('DELETE FROM refreshtoken WHERE token = ?', [refresh_Token]);

    if (results.affectedRows === 0) {
      console.log('Token not found in the database');
      return res.status(404).json({
        error: 'Token not found in the database',
        statusCode: '404',
      });
    }

    console.log('Token successfully deleted from the database');
    return res.status(200).json({
      msg: 'Success logout',
      statusCode: '200',
    });
  } catch (err) {
    console.error('Error deleting refreshToken from database:', err);
    return res.status(500).json({
      statusCode: '500',
    });
  }
};

module.exports = {
  logout,
};
