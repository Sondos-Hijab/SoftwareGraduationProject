import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class SignUpDataSource {
  CRUDRequests crud;

  SignUpDataSource(this.crud);

  postData(String username, String email, String password,
      String confirmPassword) async {
    var response = await crud.postData(AppLink.signupLink, {
      "username": username,
      "email": email,
      "password": password,
      "confirmPassword": confirmPassword,
    });
    return response.fold((l) => l, (r) => r);
  }
}
