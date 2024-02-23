import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class ResetPasswordDataSource {
  CRUDRequests crud;

  ResetPasswordDataSource(this.crud);

  postData(String email, String password, String confirmPassword) async {
    var response = await crud.postData(AppLink.resetPassword, {
      "email": email,
      "password": password,
      "confirmPassword": confirmPassword,
    });
    return response.fold((l) => l, (r) => r);
  }
}
