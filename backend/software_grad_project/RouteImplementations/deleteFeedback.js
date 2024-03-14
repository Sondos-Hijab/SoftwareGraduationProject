const { promisify } = require('util');
const con = require('../config/config');

const queryAsync = promisify(con.query).bind(con);

const deleteFeedback = async (req, res) => {
  const user = req.user;

  try {
    // Check if required fields are provided in the request
    const { feedbackID } = req.body;
    if (!feedbackID) {
      return res.status(400).json({
        error: 'Feedback ID is required',
        statusCode: '400',
      });
    }

    // Check if the feedback exists and belongs to the logged-in user
    const feedbackCheckResult = await queryAsync('SELECT * FROM feedback WHERE feedbackID = ? AND userName = ?', [feedbackID, user.name]);
    if (feedbackCheckResult.length === 0) {
      return res.status(404).json({
        error: 'Feedback not found or does not belong to the logged-in user',
        statusCode: '404',
      });
    }

    // Delete the feedback from the database using queryAsync
    await queryAsync('DELETE FROM feedback WHERE feedbackID = ?', [feedbackID]);

    return res.status(200).json({
      message: 'Feedback deleted successfully',
      statusCode: '200',
    });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    return res.status(500).json({
      error: 'Internal server error',
      statusCode: '500',
    });
  }
};

module.exports = deleteFeedback;
