const { promisify } = require("util");
const { getUserProfileByField } = require("../HelperObjects/profile");

const getUserProfilePicture = async (req, res) => {
  const user = req.user;

  try {
    const trueProfile = await getUserProfileByField("name", user.name);

    if (trueProfile) {
      const userProfilePicture = trueProfile.picture;

      res.status(200).json({
        UserProfilePicture: userProfilePicture.toString("base64"), // Convert Buffer to base64 string
        statusCode: "200",
      });
    } 
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error or User has no profile picture",
      statusCode: "500 or 204",
    });
  }
};

module.exports = getUserProfilePicture;

