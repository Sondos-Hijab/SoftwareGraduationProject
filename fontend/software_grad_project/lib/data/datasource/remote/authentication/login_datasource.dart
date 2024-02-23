import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class LoginDataSource {
  CRUDRequests crud;

  LoginDataSource(this.crud);

  postData(String username, String password) async {
    var response = await crud.postData(AppLink.loginLink, {
      "username": username,
      "password": password,
    });
    return response.fold((l) => l, (r) => r);
  }
}
