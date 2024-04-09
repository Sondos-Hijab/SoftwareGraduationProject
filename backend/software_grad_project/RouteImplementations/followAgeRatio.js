const { promisify } = require('util');
const con = require('../config/config');

const queryAsync = promisify(con.query).bind(con);

const followAgeRatio = async (req, res) => {
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

    // Fetch number of followers in each age group for the specified business
    const ageGroupsResult = await queryAsync(`
      SELECT
        SUM(CASE WHEN user.age < 18 THEN 1 ELSE 0 END) AS below18,
        SUM(CASE WHEN user.age >= 18 AND user.age <= 30 THEN 1 ELSE 0 END) AS age18to30,
        SUM(CASE WHEN user.age > 30 THEN 1 ELSE 0 END) AS above30
      FROM follow
      INNER JOIN user ON follow.user_id = user.userID
      WHERE follow.businessName = ?`, [businessName]);


    const below18 = ageGroupsResult[0].below18 || 0;
    const age18to30 = ageGroupsResult[0].age18to30 || 0;
    const above30 = ageGroupsResult[0].above30 || 0;


    // Calculate percentages for each age group
    const below18Percentage = totalFollowers === 0 ? 0 : (below18 / totalFollowers) * 100;
    const age18to30Percentage = totalFollowers === 0 ? 0 : (age18to30 / totalFollowers) * 100;
    const above30Percentage = totalFollowers === 0 ? 0 : (above30 / totalFollowers) * 100;

    return res.status(200).json({
      below18,
      age18to30,
      above30,
      below18Percentage,
      age18to30Percentage,
      above30Percentage,
      message: 'Followers age ratio retrieved successfully',
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

module.exports = followAgeRatio;
