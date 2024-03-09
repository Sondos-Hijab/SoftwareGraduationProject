const { promisify } = require('util');
const con = require('../config/config');

const queryAsync = promisify(con.query).bind(con);

const getPost = async (req, res) => {

  try {
    // Check if required fields are provided in the request
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        error: 'Name is required',
        statusCode: '400',
      });
    }

    // Fetch posts from the database for the specified name
    const posts = await queryAsync('SELECT * FROM post WHERE name = ?', [name]);

    if (posts.length === 0) {
        return res.status(404).json({
          error: 'No posts found for the specified name',
          statusCode: '404',
        });
      }

    return res.status(200).json({
      posts,
      message: 'Posts retrieved successfully',
      statusCode: '200',
    });
  } catch (error) {
    console.error('Error getting posts by name:', error);
    return res.status(500).json({
      error: 'Internal server error',
      statusCode: '500',
    });
  }
};

module.exports = getPost;
