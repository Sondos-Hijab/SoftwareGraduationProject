import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class SignUpDataSource {
  CRUDRequests crud;

  SignUpDataSource(this.crud);

  postData(String username, String email, String password,
      String confirmPassword) async {
    var response = await crud.postData(AppLink.signupLink, {
      "name": username,
      "password": password,
      "confirmPassword": confirmPassword,
      "email": email,
    });
    return response.fold((l) => l, (r) => r);
  }
}
