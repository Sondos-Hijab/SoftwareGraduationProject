const { promisify } = require('util');
const con = require('../config/config');

const queryAsync = promisify(con.query).bind(con);

const getPostsForFollowedBusinesses = async (req, res) => {
  try {
    // Check if required fields are provided in the request query parameters
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({
        error: 'Username is required',
        statusCode: '400',
      });
    }

    // Fetch posts for businesses followed by the user
    const query = `
      SELECT 
        p.postID, p.name AS postName, p.description AS postDescription, p.picture AS postPicture, p.created_at AS postCreatedAt,
        b.name AS businessName, b.picture AS businessPicture
      FROM post p
      JOIN business b ON p.admin_id = b.adminID
      JOIN follow f ON b.adminID = f.admin_id
      JOIN user u ON f.user_id = u.userID
      WHERE u.name = ?
    `;

    const posts = await queryAsync(query, [username]);

    return res.status(200).json({
      posts,
      message: 'Posts retrieved successfully',
      statusCode: '200',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      statusCode: '500',
    });
  }
};

module.exports = getPostsForFollowedBusinesses;
