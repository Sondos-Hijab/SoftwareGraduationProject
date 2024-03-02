import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class ResetPasswordDataSource {
  CRUDRequests crud;

  ResetPasswordDataSource(this.crud);

  putDataWithAuthorization(
      String authToken, String password, String confirmPassword) async {
    var response = await crud.putDataWithAuthorization(
        AppLink.resetPassword,
        {
          "password": password,
          "confirmPassword": confirmPassword,
        },
        authToken);
    return response.fold((l) => l, (r) => r);
  }
}
