const { getUserProfileByField } = require("../HelperObjects/profile");

const getUserInfo = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({
        error: "Name is required in query parameters",
        statusCode: "400",
      });
    }

  
    // Using getUserProfileByField function to query the userprofile table
    const userProfile = await getUserProfileByField("name", name);

    if (!userProfile) {
      return res.status(404).json({
        error: `No user profile found for user '${name}'`,
        statusCode: "404",
      });
    }

    return res.status(200).json({
      userProfile,
      message: "User information retrieved successfully",
      statusCode: "200",
    });
  } catch (error) {
    console.error("Error getting user information by name:", error);
    return res.status(500).json({
      error: "Internal server error",
      statusCode: "500",
    });
  }
};

module.exports = getUserInfo;
