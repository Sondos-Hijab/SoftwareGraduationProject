class AppLink {
  //Server link
  static const String server = "http://192.168.1.49:3000/RateRelay";
  //Authentication links
  static const String signupLink = "$server/user/signup";
  static const String loginLink = "$server/user/login";
  static const String logoutLink = "$server/user/logout";

  //forgot password
  static const String checkEmail = "$server/user/checkEmail";
  static const String resetPassword = "$server/user/resetPassword";
  static const String verifyCode = "$server/user/checkOTP";

  //user profile page
  static const String getUserBioLink = "$server/user/getUserBio";
  static const String addUserBioLink = "$server/user/addUserBio";
  static const String addUserPictureLink = "$server/user/addUserProfilePicture";
  static const String getUserPictureLink = "$server/user/getUserProfilePicture";

  //business page
  static const String getBusinessBySearchLink =
      "$server/user/getBusinessesBySearch";
  static const String getBusinessesByCategoryLink =
      "$server/user/getBusinessesByCategory";
  static const String getBusinessByNameLink =
      "$server/user/getBusinessesByName";
  static const String getBusinessPostsLink = "$server/user/getPost";
  static const String getBusinessFeedbackLink =
      "$server/user/getBusinessFeedback";
  static const String getBusinessInfoLink = "$server/user/getBusinesseInfo";

  //checking access token
  static const String checkAccessTokenLink =
      "$server/user/checkAuthenticateToken";

  //feedback
  static const String addFeedbackLink = "$server/user/addFeedback";
  static const String deleteFeedbackLink = "$server/user/deleteFeedback";

  //get other user info
  static const String getOtherUserInfoLink = "$server/user/getUserInfo";
  static const String getOtherUserFeedback = "$server/user/getUserFeedback";

  // follow , unfollow
  static const String followLink = "$server/user/follow";
  static const String unfollowLink = "$server/user/unfollow";
  static const String followersNumberLink = "$server/user/followersNumber";
  static const String followersLink = "$server/user/followers";
  static const String followingLink = "$server/user/following";

  //Test
  static const String test = "https://jsonplaceholder.typicode.com/posts/1";
}
