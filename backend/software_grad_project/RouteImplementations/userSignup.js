const { promisify } = require('util');
const bcrypt = require('bcrypt');
const validator = require('validator');
const con = require('../config/config');
const { getUserByField } = require('../HelperObjects/user');
const { sendingEmail } = require('../HelperObjects/sendEmail');
const { generateEmailContent } = require('../HelperObjects/emailContent');
const { emailContent } = require('../HelperConstants/registrationEmail');


const queryAsync = promisify(con.query).bind(con);

const signup = async (req, res, next) => {
  const { name, password: plaintextPassword, confirmPassword, email } = req.body;

  try {
    const existingUserByName = await getUserByField('name', name);
    if (existingUserByName) {
      return res.status(409).json({ 
        error: 'This user name already exists',
        statusCode: '409',
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format',
        statusCode: '400',
      });
    }

    const existingUserByEmail = await getUserByField('email', email);
    if (existingUserByEmail) {
      return res.status(409).json({ 
        error: 'Email already exists',
        statusCode: '409',
       });
    }

    if (typeof plaintextPassword !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid password format',
        statusCode: '400',
      });
    }

    if (plaintextPassword !== confirmPassword) {
      return res.status(400).json({ 
        error: 'Passwords do not match',
        statusCode: '400',
      });
    }

    const hash = await bcrypt.hash(plaintextPassword, 10);
    const userData = [
      {
        name: name,
        email: email,
      },
    ];
    // Generate registration email content
    const registrationEmailContent = generateEmailContent(userData,emailContent.registration);

    // Send registration email
    await sendingEmail(email, 'Registration', registrationEmailContent);

    // Insert user into the database after sending the email
    await queryAsync('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [name, email, hash]);

    const trueName = await getUserByField('name', name);

    const userID = trueName.userID;

    await queryAsync('INSERT INTO userprofile (name, user_id) VALUES (?, ?)', [name, userID]);


    return res.status(201).json({ 
      msg: 'User created and registration email sent',
      statusCode: '201',
    });

  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).json({ 
      error: err.msg || 'Internal Server Error',
      statusCode: '500',
    });
  }
};


module.exports = {
  signup,
};
