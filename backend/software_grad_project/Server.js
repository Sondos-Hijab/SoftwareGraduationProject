const con = require('./config/config')
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");


const userSignup = require('./Routes/userSignup'); 
const login = require('./Routes/login'); 
const refreshToken = require('./Routes/refreshToken'); 
const logout = require('./Routes/logout'); 
const checkEmail = require('./Routes/checkEmail'); 
const resetPassword = require('./Routes/resetPassword'); 
const checkOTP = require('./Routes/checkOTP'); 
const addUserBio = require('./Routes/addUserBio'); 
const getUserBio = require('./Routes/getUserBio'); 
const addUserProfilePicture = require('./Routes/addUserProfilePicture'); 
const getUserProfilePicture = require('./Routes/getUserProfilePicture'); 
const checkAuthenticationToken = require('./Routes/checkAuthenticationToken'); 
const adminSignup = require('./Routes/adminSignup'); 
const checkAdminEmail = require('./Routes/checkAdminEmail'); 
const resetAdminPassword = require('./Routes/resetAdminPassword'); 
const adminLogin = require('./Routes/adminLogin'); 
const addAdminProfilePicture = require('./Routes/addAdminProfilePicture'); 
const getAdminProfilePicture = require('./Routes/getAdminProfilePicture'); 
const getAdminProfileInfo = require('./Routes/getAdminProfileInfo'); 
const updateAdminProfile = require('./Routes/updateAdminProfile'); 
const addPost = require('./Routes/addPost'); 
const deletePost = require('./Routes/deletePost'); 
const getPost = require('./Routes/getPost'); 
const addFeedback = require('./Routes/addFeedback'); 
const getBusinessFeedback = require('./Routes/getBusinessFeedback'); 
const getUserFeedback = require('./Routes/getUserFeedback'); 
const deleteFeedback = require('./Routes/deleteFeedback'); 
const getBusinessesByCategory = require('./Routes/getBusinessesByCategory'); 
const getBusinessesByName = require('./Routes/getBusinessesByName'); 
const getBusinessesBySearch = require('./Routes/getBusinessesBySearch'); 
const getBusinesseInfo = require('./Routes/getBusinesseInfo'); 
const getUserInfo = require('./Routes/getUserInfo'); 
const editPost = require('./Routes/editPost'); 
const follow = require('./Routes/follow'); 
const unfollow = require('./Routes/unfollow'); 
const followers = require('./Routes/followers'); 
const following = require('./Routes/following'); 
const followersNumber = require('./Routes/followersNumber'); 
const avgRate = require('./Routes/avgRate'); 
const feedbackGenderRatio = require('./Routes/feedbackGenderRatio'); 
const followGenderRatio = require('./Routes/followGenderRatio'); 
const followAgeRatio = require('./Routes/followAgeRatio'); 
const feedbackAgeRatio = require('./Routes/feedbackAgeRatio'); 
const ageFeedbackRatio = require('./Routes/ageFeedbackRatio'); 
const genderFeedbackRatio = require('./Routes/genderFeedbackRatio'); 


app.use(express.json());
app.use(cors());



app.use('/RateRelay', userSignup); 
app.use('/RateRelay', login); 
app.use('/RateRelay', refreshToken); 
app.use('/RateRelay', logout); 
app.use('/RateRelay', checkEmail); 
app.use('/RateRelay', resetPassword); 
app.use('/RateRelay', checkOTP); 
app.use('/RateRelay', addUserBio); 
app.use('/RateRelay', getUserBio);
app.use('/RateRelay', addUserProfilePicture); 
app.use('/RateRelay', getUserProfilePicture); 
app.use('/RateRelay', checkAuthenticationToken); 
app.use('/RateRelay', adminSignup); 
app.use('/RateRelay', checkAdminEmail); 
app.use('/RateRelay', resetAdminPassword); 
app.use('/RateRelay', adminLogin); 
app.use('/RateRelay', addAdminProfilePicture); 
app.use('/RateRelay', getAdminProfilePicture); 
app.use('/RateRelay', getAdminProfileInfo); 
app.use('/RateRelay', updateAdminProfile); 
app.use('/RateRelay', addPost); 
app.use('/RateRelay', deletePost); 
app.use('/RateRelay', getPost); 
app.use('/RateRelay', addFeedback); 
app.use('/RateRelay', getBusinessFeedback); 
app.use('/RateRelay', getUserFeedback); 
app.use('/RateRelay', deleteFeedback); 
app.use('/RateRelay', getBusinessesByCategory); 
app.use('/RateRelay', getBusinessesByName); 
app.use('/RateRelay', getBusinessesBySearch); 
app.use('/RateRelay', getBusinesseInfo); 
app.use('/RateRelay', getUserInfo); 
app.use('/RateRelay', editPost); 
app.use('/RateRelay', follow); 
app.use('/RateRelay', unfollow); 
app.use('/RateRelay', followers); 
app.use('/RateRelay', following); 
app.use('/RateRelay', followersNumber); 
app.use('/RateRelay', avgRate); 
app.use('/RateRelay', feedbackGenderRatio); 
app.use('/RateRelay', followGenderRatio); 
app.use('/RateRelay', followAgeRatio); 
app.use('/RateRelay', feedbackAgeRatio); 
app.use('/RateRelay', genderFeedbackRatio); 
app.use('/RateRelay', ageFeedbackRatio); 


app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("listen on port " + PORT);
        console.log(`server is running on http://localhost:${PORT}`);
    }
});
