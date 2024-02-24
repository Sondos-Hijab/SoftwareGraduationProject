class AppLink {
  //Server link
  static const String server = "http://192.168.1.49:3000/RateRelay";
  //Authentication links
  static const String signupLink = "$server/user/signup";
  static const String loginLink = "$server/user/login";
//forgot password
  static const String checkEmail = "$server/user/checkEmail";
  static const String resetPassword = "$server/user/resetPassword";
  static const String verifyCode = "$server/verifyCode";

  //Test
  static const String test = "https://jsonplaceholder.typicode.com/posts/1";
}
