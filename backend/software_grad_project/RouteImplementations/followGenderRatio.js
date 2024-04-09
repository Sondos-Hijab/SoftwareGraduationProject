const { promisify } = require('util');
const con = require('../config/config');

const queryAsync = promisify(con.query).bind(con);

const followGenderRatio = async (req, res) => {
  try {
    const { businessName } = req.query;

    // Ensure businessName is provided in the URL query string
    if (!businessName) {
      return res.status(400).json({
        error: 'Business name is required in the URL query string',
        statusCode: '400',
      });
    }

    // Fetch total number of followers for the specified business
    const totalFollowersResult = await queryAsync(`
      SELECT COUNT(*) AS totalFollowers
      FROM follow
      WHERE businessName = ?`, [businessName]);

    const totalFollowers = totalFollowersResult[0].totalFollowers || 0;

    // Fetch number of male followers for the specified business
    const maleFollowersResult = await queryAsync(`
      SELECT COUNT(*) AS maleFollowers
      FROM follow
      INNER JOIN user ON follow.user_id = user.userID
      WHERE follow.businessName = ? AND user.gender = 0`, [businessName]);

    const maleFollowers = maleFollowersResult[0].maleFollowers || 0;
    const femaleFollowers = totalFollowers - maleFollowers;

    // Calculate male percentage
    const malePercentage = totalFollowers === 0 ? 0 : (maleFollowers / totalFollowers) * 100;

    // Calculate female percentage by subtracting male percentage from total percentage
    const femalePercentage = totalFollowers === 0 ? 0 : (femaleFollowers / totalFollowers) * 100;

    return res.status(200).json({
      malePercentage,
      femalePercentage,
      message: 'Followers gender ratio retrieved successfully',
      statusCode: '200',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
      statusCode: '500',
    });
  }
};

module.exports = followGenderRatio;
