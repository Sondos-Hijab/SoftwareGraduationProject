// require("dotenv").config();
// var bcrypt = require("bcrypt");
// const validator = require("validator");
// var jwt = require("jsonwebtoken");
// // const util = require("util");
// const con = require("../config/config");

// const logout = async (req, res, next) => {
//   const refresh_Token = req.body.token;

//   // Remove the refreshToken from the database
//   con.query(
//     "DELETE FROM refreshtoken WHERE token = ?",
//     [refresh_Token],
//     (err, results) => {
//       if (err) {
//         console.error("Error deleting refreshToken from database:", err);
//         return res.sendStatus(500);
//       }

//       if (results.affectedRows === 0) {
//         console.log("Token not found in the database");
//         return res.status(404).json({
//           error: "Token not found in the database",
//         });
//       }

//       console.log("Token successfully deleted from the database");
//       return res.status(200).json({
//         msg: "Success logout",
//       });
//     }
//   );
// };

// module.exports = {
//   logout,
// };
