const { promisify } = require("util");
const bcrypt = require("bcrypt");
const validator = require("validator");
const con = require("../config/config");
const { getAdminByField } = require("../HelperObjects/admin");
const { sendingEmail } = require("../HelperObjects/sendEmail");
const { generateEmailContent } = require("../HelperObjects/emailContent");
const { emailContent } = require("../HelperConstants/registrationEmail");

const queryAsync = promisify(con.query).bind(con);

const adminSignup = async (req, res, next) => {
  const {
    adminName,
    password: plaintextPassword,
    confirmPassword,
    email,
    name,
    location,
    phoneNumber,
    category,
    description,
  } = req.body;

  try {
    const existingAdminByName = await getAdminByField("adminName", adminName);
    if (existingAdminByName) {
      return res.status(409).json({
        error: "This admin name already exists",
        statusCode: "409",
      });
    }

    const existingBusinessByName = await getAdminByField("name", name);
    if (existingBusinessByName) {
      return res.status(409).json({
        error: "This business name already exists",
        statusCode: "409",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        error: "Invalid email format",
        statusCode: "400",
      });
    }

    const existingAdminByEmail = await getAdminByField("email", email);
    if (existingAdminByEmail) {
      return res.status(409).json({
        error: "Email already exists",
        statusCode: "409",
      });
    }

    if (typeof plaintextPassword !== "string") {
      return res.status(400).json({
        error: "Invalid password format",
        statusCode: "400",
      });
    }

    if (plaintextPassword !== confirmPassword) {
      return res.status(400).json({
        error: "Passwords do not match",
        statusCode: "400",
      });
    }

    const hash = await bcrypt.hash(plaintextPassword, 10);
    const userData = [
      {
        adminName: adminName,
        email: email,
        businessName: name,
        location: location,
        phoneNumber: phoneNumber,
        category: category,
        description: description,
      },
    ];
    // Generate registration email content
    const registrationEmailContent = generateEmailContent(
      userData,
      emailContent.registration
    );

    // Send registration email
    await sendingEmail(email, "Registration", registrationEmailContent);

    // Insert user into the database after sending the email
    await queryAsync(
      "INSERT INTO business (adminName,email,password,name,location,phoneNumber,category,description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [adminName, email, hash,name,location,phoneNumber,category,description]
    );

    return res.status(201).json({
      msg: "Admin created and registration email sent",
      statusCode: "201",
    });
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).json({
      error: err.msg || "Internal Server Error",
      statusCode: "500",
    });
  }
};

module.exports = {
  adminSignup,
};
