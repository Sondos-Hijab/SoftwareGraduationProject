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
  static const String getBusinessPostsLink = "$server/user/getPost";

  //Test
  static const String test = "https://jsonplaceholder.typicode.com/posts/1";
}
