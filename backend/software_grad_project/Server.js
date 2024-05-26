const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(cors());

// Socket.IO setup
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });

  socket.on("sendMessage", (message) => {
    console.log("Message received:", message);
    io.emit("receiveMessage", message);
  });
});

// Include your routes
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
const filterFeedbackByCategory = require('./Routes/filterFeedbackByCategory'); 
const filterFeedbackByName = require('./Routes/filterFeedbackByName'); 
const ageFeedbackRatio = require('./Routes/ageFeedbackRatio'); 
const genderFeedbackRatio = require('./Routes/genderFeedbackRatio'); 
const getBusinessFeedbackByType = require('./Routes/getBusinessFeedbackByType'); 
const getUserFeedbackByType = require('./Routes/getUserFeedbackByType'); 
const getFeedbackStatsByType = require('./Routes/getFeedbackStatsByType'); 
const addChatMessageRoute = require('./Routes/addChatMessage'); 
const getChatMessages = require('./Routes/getChatMessages'); 
const userChatPartners = require('./Routes/userChatPartners'); 
const businessChatPartners = require('./Routes/businessChatPartners');
const getPostsForFollowedBusinesses = require('./Routes/getPostsForFollowedBusinesses');

// Use your routes
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
app.use('/RateRelay', filterFeedbackByCategory); 
app.use('/RateRelay', filterFeedbackByName); 
app.use('/RateRelay', genderFeedbackRatio); 
app.use('/RateRelay', ageFeedbackRatio); 
app.use('/RateRelay', getBusinessFeedbackByType); 
app.use('/RateRelay', getUserFeedbackByType); 
app.use('/RateRelay', getFeedbackStatsByType); 
app.use('/RateRelay', addChatMessageRoute(io)); 
app.use('/RateRelay', getChatMessages); 
app.use('/RateRelay', userChatPartners); 
app.use('/RateRelay', businessChatPartners);
app.use('/RateRelay', getPostsForFollowedBusinesses);

// Start server
server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});
