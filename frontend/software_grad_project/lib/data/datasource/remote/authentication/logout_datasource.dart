import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class LogoutDataSource {
  CRUDRequests crud;

  LogoutDataSource(this.crud);

  deleteDataWithAuthorization(String accessToken, String refreshToken) async {
    var response = await crud.deleteDataWithAuthorization(
        AppLink.logoutLink, {"token": refreshToken}, accessToken);
    return response.fold((l) => l, (r) => r);
  }
}
