validPass(String passValue, String confirmPasswordValue) {
  if (confirmPasswordValue.isEmpty) {
    return "Value couldn't be empty";
  }
  if (passValue != confirmPasswordValue) {
    return "Passwords don't match";
  }
}
