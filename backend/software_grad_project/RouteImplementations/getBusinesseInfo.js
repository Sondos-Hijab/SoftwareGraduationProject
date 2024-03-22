const { getAdminByField } = require("../HelperObjects/admin");

// Function to get businesses by search term from the database
const getBusinesseInfo = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({
        error: "Search term is required in query parameters",
        statusCode: "400",
      });
    }

    // Using getAdminByField function to query the database
    const business = await getAdminByField("LOWER(name)", name.toLowerCase());

    if (!business) {
      return res.status(404).json({
        error: `No business found for the specified term '${name}'`,
        statusCode: "404",
      });
    }

    // Remove the password field from the business object
    delete business.password;

    return res.status(200).json({
      business,
      message: "Business retrieved successfully",
      statusCode: "200",
    });
  } catch (error) {
    console.error("Error getting business by search term:", error);
    return res.status(500).json({
      error: "Internal server error",
      statusCode: "500",
    });
  }
};


module.exports = getBusinesseInfo;
