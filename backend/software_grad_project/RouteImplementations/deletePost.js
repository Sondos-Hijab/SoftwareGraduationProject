const { promisify } = require('util');
const con = require('../config/config');

const queryAsync = promisify(con.query).bind(con);

const deletePost = async (req, res) => {
  const user = req.user;

  try {
    // Check if required fields are provided in the request
    const { postId } = req.body;
    if (!postId) {
      return res.status(400).json({
        error: 'Post ID is required',
        statusCode: '400',
      });
    }


    // Check if the post exists and belongs to the logged-in admin
    const postCheckResult = await queryAsync('SELECT * FROM post WHERE postID = ? AND name = ?', [postId, user.name]);
    if (postCheckResult.length === 0) {
      return res.status(404).json({
        error: 'Post not found or does not belong to the logged-in admin',
        statusCode: '404',
      });
    }

    // Delete the post from the database using queryAsync
    await queryAsync('DELETE FROM post WHERE postID = ?', [postId]);

    return res.status(200).json({
      message: 'Post deleted successfully',
      statusCode: '200',
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({
      error: 'Internal server error',
      statusCode: '500',
    });
  }
};

module.exports = deletePost;
