const con = require('./config/config')
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const userSignup = require('./Routes/userSignup'); 
const login = require('./Routes/login'); 
const refreshToken = require('./Routes/refreshToken'); 
const logout = require('./Routes/logout'); 
const checkEmail = require('./Routes/checkEmail'); 
const resetPassword = require('./Routes/resetPassword'); 

app.use(express.json());

app.use('/RateRelay', userSignup); 
app.use('/RateRelay', login); 
app.use('/RateRelay', refreshToken); 
app.use('/RateRelay', logout); 
app.use('/RateRelay', checkEmail); 
app.use('/RateRelay', resetPassword); 

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("listen on port " + PORT);
        console.log(`server is running on http://localhost:${PORT}`);
    }
});
