const { promisify } = require('util');
const con = require('../config/config');

const queryAsync = promisify(con.query).bind(con);

// Function to get user by a specific field from the database
const getUserByField = async (fieldName, value) => {
  try {
    const query = `SELECT * FROM user WHERE ${fieldName} = ?`;
    const result = await queryAsync(query, [value]);
    return result[0]; // Assuming we expect at most one user with the given field value
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserByField,
};
